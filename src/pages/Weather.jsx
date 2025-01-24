import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Card from '../components/Card'
import '../styles/weather.css'

function Weather() {
    const [onOffTime, setOnOffTime] = useState({startTime: "00:00", endTime: "23:59"})
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        //Make a request to the server to get the current time set to display
    }, [])

    function changeTime() {
        //pop up a change time modal maybe
        //use setOnOffTime to change the time of state then send that to the server
        setModalOpen(true);
  }

    return (
        <div className="weather">
            <Card
                titleContent={<h1>Weather</h1>}
                content={
                    <p>Current time set to display: {onOffTime.startTime} to {onOffTime.endTime}</p>
                }
                footerContent={
                    <button onClick={changeTime}>Change Time</button>
                }
            />
            <Modal 
                open={modalOpen}
                titleContent={<h1> Close </h1>}
                cancelFn={() => setModalOpen(false)}
                primaryFn={() => setModalOpen(false)}
                secondaryFn={() => setModalOpen(false)}
                content={
                   <>
                     <h2>This is a modal</h2>
                     <p>You can close it by pressing Escape key, pressing close, or clicking outside the modal.</p>
                  </>

               }
           />
        </div>
    )
}

export default Weather