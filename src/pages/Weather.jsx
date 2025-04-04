import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'


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
    const textRef = useRef()

    useEffect(() => {
        //Make a request to the server to get the current time set to display
        axios.get('https://rpi-display.duckdns.org:3000/api/weather')
            .then((res) => {
                setDisplayData({start_time: res.data.start_time, stop_time: res.data.stop_time, text: res.data.text})
            })
            .catch((error) => console.error('Error fetching display data:', error))
    }, [])

    async function updateTime(start, stop) {
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/weather', {
                ...displayData,
                start_time: start,
                stop_time: stop,
            })
            if (res.data.success) setDisplayData((prevData) => ({...prevData, start_time: start, stop_time: stop}))
            else console.error('Error in post request to update time.')
        } catch (error) {
            console.error('Error updating time:', error)
        }
    }

    // Helper function to convert 24-hour time to 12-hour format
    function convertTo12HourFormat(time) {
        const [hours, minutes] = time.split(':').map(Number)
        const period = hours >= 12 ? 'PM' : 'AM'
        const adjustedHours = hours % 12 || 12 // Convert 0 to 12 for 12 AM
        return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`
    }

    async function updateText(newText) {
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/weather', {
                ...displayData,
                text: newText,
            })
            if (res.data.success) setDisplayData((prevData) => ({...prevData, text: newText}))
            else console.error('Error in post request to update text.')
        } catch (error) {
            console.error('Error updating text:', error)
        }
    }

    function displayWeather() {
        axios.post('https://rpi-display.duckdns.org:3000/api/weather/display', 
            { withCredentials: true }
        )
    }

    return (
        <div className="page weather">
            <h1>Weather Display</h1>
            <Card
                titleContent={<h2>On/Off Time</h2>}
                content={
                    <p>
                        Current time set to display: {displayData.start_time ? convertTo12HourFormat(displayData.start_time) : 'Loading...'} to {displayData.stop_time ? convertTo12HourFormat(displayData.stop_time) : 'Loading...'}
                    </p>
                }
                footerContent={
                    <CardBtn onClick={() => setTimeModalOpen(true)} content="Change Time"/>
                }
            />


            <Card 
                titleContent={<h2>Text Display</h2>}
                content={<p>Displaying: {displayData.text}</p>}
                footerContent={
                    <CardBtn onClick={() => setTextModalOpen(true)} content="Change Text"/>
                }
            />

            <Card 
                titleContent={<h2>Display app</h2>}
                content={
                    <div>
                        <CardBtn onClick={displayWeather} content="Display" />
                    </div>
                }
            />

            <Modal 
                open={timeModalOpen}
                titleContent={<h2> Change Time </h2>}
                cancelFn={() => setTimeModalOpen(false)}
                primaryFn={() => {
                    const startTime = startTimeRef.current.value
                    const stopTime = stopTimeRef.current.value
                    updateTime(startTime, stopTime)
                    setTimeModalOpen(false) // Close the modal after submission
                }}
                secondaryFn={() => setTimeModalOpen(false)}
                content={
                    <div className="weather__container">
                        <label className="weather__label">
                            <span className="weather__label-text">Start Time: </span>
                            <input
                                className="weather__input weather__input--time"
                                type="time"
                                ref={startTimeRef}
                                defaultValue={displayData.start_time || "00:00"}
                            />
                        </label>
                        <label className="weather__label">
                            <span className="weather__label-text">Stop Time: </span>
                            <input
                                className="weather__input weather__input--time"
                                type="time"
                                ref={stopTimeRef}
                                defaultValue={displayData.stop_time || "23:59"}
                            />
                        </label>
                    </div>
               }
           />
            <Modal 
                open={textModalOpen}
                titleContent={<h2> Change Text </h2>}
                cancelFn={() => setTextModalOpen(false)}
                primaryFn={() => {
                    const text = textRef.current.value
                    updateText(text)
                    setTextModalOpen(false)
                }}
                secondaryFn={() => setTextModalOpen(false)}
                content={
                    <div className="weather__container">
                        <label className="weather__label">
                            <span className="weather__label-text">Text: </span>
                            <input 
                                className="weather__input weather__input--text"
                                type="text"
                                ref={textRef}
                                placeholder='Text to display here...'
                                defaultValue={displayData.text || ""}
                            />
                        </label>
                    </div>
               }
           />
        </div>
    )
}

export default Weather