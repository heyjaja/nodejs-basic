import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response))
  }, [])

  return (
    <div>
      LandingPage 방구뽕
    </div>
  )
}

export default LandingPage