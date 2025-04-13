import { useState, useEffect, useRef  } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import Modal from '../components/Modal'



function Home() {
    const [currentScript, setCurrentScript] = useState("")
    const [timeModalOpen, setTimeModalOpen] = useState(false)
    const [displayData, setDisplayData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const startTimeRef = useRef()
    const stopTimeRef = useRef()

    // TODO- Should move to context most likely later...
    useEffect(() => {
        const fetchScriptName = async () => {
            try {
                const res = await axios.get('https://rpi-display.duckdns.org:3000/api/running');
                
                if (res.data.message) {
                    setCurrentScript(formatScriptName(res.data.message));
                }
            } catch (error) {
                console.error('Error fetching current script:', error);
            }
        };

        fetchScriptName();

        //Make a request to the server to get the current time set to display
        axios.get('https://rpi-display.duckdns.org:3000/api/weather')
        .then((res) => {
                setDisplayData({start_time: res.data.startTime, stop_time: res.data.stopTime})
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
        // setTextData({text: "t"})
        // return () => clearTimeout(delay)
    }, []);
    
        const formatScriptName = (scriptPath) => {
        const parts = scriptPath.split('/');
        let scriptName = parts[parts.length - 1];

        return scriptName.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    async function updateTime(start, stop) {
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/display/data', {
                start_time: start,
                stop_time: stop,
            })
            if (res.data.success) {
                setDisplayData((prevData) => ({start_time: start, stop_time: stop}))
            }
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

    return (
        <div className="page">
            <h1>Home</h1>
            <Card 
                titleContent={<h2>Current Display</h2>}
                content={
                    <p>Currently Running: <strong>{currentScript}</strong></p>
                }
            />

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
                            setTimeModalOpen(true)
                        }} 
                        content="Change Time"/>
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
                    setTimeModalOpen(false)
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
        </div>    
    )
}   

export default Home