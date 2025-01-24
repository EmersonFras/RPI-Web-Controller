import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import Card from '../components/Card'
import '../styles/weather.css'

function Weather() {
    /**
     * display data will look something like
     * 
     * const displayData = {
     *   startTime: "00:00",
     *   endTime: "23:59",
     *   text: "Hello World"
     * }
     */
    const [displayData, setDisplayData] = useState({})
    const [timeModalOpen, setTimeModalOpen] = useState(false)
    const [textModalOpen, setTextModalOpen] = useState(false)

    useEffect(() => {
        //Make a request to the server to get the current time set to display
    }, [])

    function changeTime() {
        //pop up a change time modal maybe
        //use setDisplayData to change the time of state then send that to the server
        setTimeModalOpen(true);
  }

    return (
        <div className="weather">
            <h1>Weather Display</h1>
            <Card
                titleContent={<h1>On/Off Time</h1>}
                content={
                    <p>Current time set to display: {displayData.startTime} to {displayData.endTime}</p>
                }
                footerContent={
                    <button onClick={changeTime}>Change Time</button>
                }
            />

            <Card 
                titleContent={<h1>Text Display</h1>}
                content={<p>Displaying: {displayData.text}</p>}
                footerContent={
                    <button onClick={() => setTextModalOpen(true)}>Change Text</button>
                }
            />

            <Modal 
                open={timeModalOpen}
                titleContent={<h1> Change Time </h1>}
                cancelFn={() => setTimeModalOpen(false)}
                primaryFn={() => setTimeModalOpen(false)}
                secondaryFn={() => setTimeModalOpen(false)}
                content={
                   <>
                     <h2>This is a time modal</h2>
                     <p>You can close it by pressing Escape key, pressing close, or clicking outside the modal.</p>
                  </>

               }
           />
            <Modal 
                open={textModalOpen}
                titleContent={<h1> Change Text </h1>}
                cancelFn={() => setTextModalOpen(false)}
                primaryFn={() => setTextModalOpen(false)}
                secondaryFn={() => setTextModalOpen(false)}
                content={
                   <>
                     <h2>This is a text modal</h2>
                     <p>You can close it by pressing Escape key, pressing close, or clicking outside the modal.</p>
                  </>

               }
           />
        </div>
    )
}

export default Weather