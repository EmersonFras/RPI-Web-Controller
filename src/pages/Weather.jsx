import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
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

    const startTimeRef = useRef()
    const stopTimeRef = useRef()

    useEffect(() => {
        //Make a request to the server to get the current time set to display
        axios.get('http://localhost:3000/api/display')
            .then((res) => {
                setDisplayData({start_time: res.data.start_time, stop_time: res.data.stop_time})
            })
            .catch((error) => console.error('Error fetching display data:', error))
    }, [])

    async function updateTime(start, stop) {
        try {
            const res = await axios.post('http://localhost:3000/api/display', {
                start_time: start,
                stop_time: stop,
            })
            if (res.data.success) setDisplayData({start_time: start, stop_time: stop})
            else console.error('Error in post request to update time.')
        } catch (error) {
            console.error('Error updating time:', error)
        }
    }

    // Helper function to convert 24-hour time to 12-hour format
    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <div className="weather">
            <h1>Weather Display</h1>
            <Card
                titleContent={<h1>On/Off Time</h1>}
                content={
                    <p>
                        Current time set to display: {displayData.start_time ? convertTo12HourFormat(displayData.start_time) : 'Loading...'} to {displayData.stop_time ? convertTo12HourFormat(displayData.stop_time) : 'Loading...'}
                    </p>
                }
                footerContent={
                    <button onClick={() => setTimeModalOpen(true)}>Change Time</button>
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
                primaryFn={() => {
                    const startTime = startTimeRef.current.value;
                    const stopTime = stopTimeRef.current.value;
                    updateTime(startTime, stopTime);
                    setTimeModalOpen(false); // Close the modal after submission
                }}
                secondaryFn={() => setTimeModalOpen(false)}
                content={
                    <>
                        <h2>Select Start and Stop Time</h2>
                        <div>
                            <label>
                                Start Time:
                                <input
                                    type="time"
                                    ref={startTimeRef}
                                    defaultValue={displayData.start_time || "00:00"}
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Stop Time:
                                <input
                                    type="time"
                                    ref={stopTimeRef}
                                    defaultValue={displayData.stop_time || "23:59"}
                                />
                            </label>
                        </div>
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