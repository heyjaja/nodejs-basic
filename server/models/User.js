const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt 글자 수

const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({// schema == table 선언
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function(next) { // User 저장 전에 처리할 내용

  const user = this;

  if(user.isModified('password')) {// 비밀번호 변경 시에만 암호화
     // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)

      bcrypt.hash(user.password, salt, function(err, hash) { // hash: 암호화된 비밀번호
        if(err) return next(err)
        user.password = hash;
        next(); //다음 동작 호출
      });
    });
  } else {
    next();
  }

});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // plainPassword를 암호화해서 비교
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch)
  })

}

userSchema.methods.generateToken = function(cb) {

  const user = this;

  // jsonwebtoken을 이용하여 토큰 생성하기
  const token = jwt.sign(user._id.toHexString(), 'secretToken')
  // user._id + 'secretToken' = token

  user.token = token;
  user.save(function(err, user) {
    if(err) return cb(err)

    cb(null, user);
  })

}

userSchema.statics.findByToken = function(token, cb) {
  const user = this;

  // user._id + '' = token

  // 토큰 decode
  jwt.verify(token, 'secretToken', function(err, decoded) { // decoded == user._id
    
    // 유저아이디를 이용하여 유저를 찾고 클라이언트에서 가져온 token과 DB 보관 토큰 일치 확인
    user.findOne({ "_id": decoded, "token": token}, function(err, user) {
      if(err) return cb(err)
      cb(null, user)
    })
  });
}

const User = mongoose.model('User', userSchema)

module.exports = { User }