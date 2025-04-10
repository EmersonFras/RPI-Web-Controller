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
    const [isLoading, setIsLoading] = useState(true)

    const startTimeRef = useRef()
    const stopTimeRef = useRef()
    const textRef = useRef()

    useEffect(() => {
        //Make a request to the server to get the current time set to display
        axios.get('https://rpi-display.duckdns.org:3000/api/weather')
            .then((res) => {
                 setDisplayData({start_time: res.data.startTime, stop_time: res.data.stopTime, text: res.data.text})
            })
            .catch((error) => console.error('Error fetching display data:', error))
            .finally(() => {
                
                setIsLoading(false)
            })

        

        /*
            Debug code to simulate loading
            This code will simulate a loading state for 2 seconds before setting the display data
        */
        // const delay = setTimeout(() => {
        //     setIsLoading(false);
        // }, 2000);
        // setDisplayData({start_time: "11:00", stop_time: "11:00", text: "t"})
        // return () => clearTimeout(delay)
    }, [])

    async function updateTime(start, stop) {
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/display/data', {
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
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/display/data', {
                ...displayData,
                text: newText,
            })
            if (res.data.success) {
                setDisplayData((prevData) => ({...prevData, text: newText}))
                setTextModalOpen(false)
            }
            else console.error('Error in post request to update text.')
        } catch (error) {
            console.error('Error updating text:', error)
        }

        /*
            Debug code when disconnected from API
        */
        // setDisplayData((prevData) => ({...prevData, text: newText}))
    }

    function displayWeather() {
        axios.post('https://rpi-display.duckdns.org:3000/api/display', 
            { 
                display: "Weather",
                withCredentials: true 
            }
        )
    }

    return (
        <div className="page weather">
            <h1>Weather Display</h1>
            <Card
                className={`${isLoading ? 'card--loading' : 'card--loaded'}`}
                titleContent={<p className="card__content card__content--fade">On/Off Time</p>}
                content={
                    displayData.start_time && displayData.stop_time ?
                        <p className="card__content card__content--fade">
                            Current time set to display: {displayData.start_time && convertTo12HourFormat(displayData.start_time)} to {displayData.stop_time && convertTo12HourFormat(displayData.stop_time)}
                        </p> :
                        <p className="card__content card__content--fade">
                            Connection failed. Please check your connection.
                        </p>
                    
                }
                footerContent={
                    <CardBtn 
                        className={`card__content card__content--fade ${displayData.start_time && displayData.stop_time ? "" : "card__btn--locked"}`}
                        disabled={!(displayData.start_time && displayData.stop_time)}
                        onClick={() => {
                            console.log("Time Modal Button Clicked");
                            setTimeModalOpen(true)}} 
                        content="Change Time"/>
                }
            />


            <Card 
                className={`${isLoading ? 'card--loading' : 'card--loaded'}`}
                titleContent={<p className="card__content card__content--fade">Text Display</p>}
                content={
                    displayData.text ?
                        <p className="card__content card__content--fade">
                            Displaying: {displayData.text}
                        </p>:
                        <p className="card__content card__content--fade">
                            Connection failed. Please check your connection.
                        </p>
                }
                footerContent={
                    <CardBtn 
                        className={`card__content card__content--fade ${displayData.text ? "" : "card__btn--locked"}`} 
                        disabled={!displayData.text}
                        onClick={() => setTextModalOpen(true)} 
                        content="Change Text"
                    />
                }
            />

            <Card 
                content={
                    <CardBtn 
                        disabled={!(displayData.text && displayData.start_time && displayData.stop_time)}
                        className={(displayData.text && displayData.start_time && displayData.stop_time) ? "" : "card__btn--locked"} 
                        onClick={displayWeather} 
                        content="Display" 
                    />
                }
            />

            <Modal 
                open={timeModalOpen}
                titleContent={<h2> Change Time </h2>}
                cancelFn={() => setTimeModalOpen(false)}
                primaryFn={async () => {
                    const startTime = startTimeRef.current.value
                    const stopTime = stopTimeRef.current.value
                    await updateTime(startTime, stopTime)
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
                primaryFn={async () => {
                    const text = textRef.current.value
                    await updateText(text)
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