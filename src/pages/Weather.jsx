import React from 'react'
import { useState, useEffect } from 'react'

function Weather() {
  const [onOffTime, setOnOffTime] = useState({startTime: "00:00", endTime: "23:59"})

  useEffect(() => {
    //Make a request to the server to get the current time set to display
  }, [])

  function changeTime() {
    //pop up a change time modal maybe
    //use setOnOffTime to change the time of state then send that to the server
  }

  return (
    <div className="weather">  
      <h1>Weather</h1>
      <p>Current time set to display: {onOffTime.startTime} to {onOffTime.endTime}</p>
      <button onClick={changeTime}>Change Time</button>
    </div>
  )
}

export default Weather