import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'


function Weather() {
    /**
     * display data will look something like
     * 
     * const textData = {
     *   startTime: "00:00",
     *   endTime: "23:59",
     *   text: "Hello World"
     * }
     */
    const [textData, setTextData] = useState({})
    const [textModalOpen, setTextModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    

    const textRef = useRef()

    useEffect(() => {
        //Make a request to the server to get the current time set to display
        axios.get('https://rpi-display.duckdns.org:3000/api/weather')
            .then((res) => {
                 setTextData({text: res.data.text})
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
    }, [])

    async function updateText(newText) {
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/display/data', {
                text: newText
            })
            if (res.data.success) {
                setTextData((prevData) => ({text: newText}))
            }
            else console.error('Error in post request to update text.')
        } catch (error) {
            console.error('Error updating text:', error)
        }

        /*
            Debug code when disconnected from API
        */
        // setTextData((prevData) => ({text: newText}))
    }

    function displayWeather() {
        axios.post('https://rpi-display.duckdns.org:3000/api/display', 
            { 
                display: "Weather",
                withCredentials: true 
            }
        )
    }

    const textReceived = !(typeof textData.text === 'undefined');

    return (
        <div className="page weather">
            <h1>Weather Display</h1>

            <Card 
                className={`${isLoading ? 'card--loading' : 'card--loaded'}`}
                titleContent={<p className="card__content card__content--fade">Text Display</p>}
                content={
                    textReceived ?
                        <p className="card__content card__content--fade">
                            Displaying: {textData.text}
                        </p> :
                        <p className="card__content card__content--fade">
                            Connection failed. Please check your connection.
                        </p>
                }
                footerContent={
                    <CardBtn 
                        className={`card__content card__content--fade ${textReceived ? "" : "card__btn--locked"}`} 
                        disabled={!textReceived}
                        onClick={() => setTextModalOpen(true)} 
                        content="Change Text"
                    />
                }
            />

            <Card 
                content={
                    <CardBtn 
                        disabled={!(textReceived)}
                        className={(textReceived) ? "" : "card__btn--locked"} 
                        onClick={displayWeather} 
                        content="Display" 
                    />
                }
            />

            
            <Modal 
                open={textModalOpen}
                titleContent={<h2> Change Text </h2>}
                cancelFn={() => setTextModalOpen(false)}
                primaryFn={async () => {
                    const text = textRef.current.value
                    await updateText(text)
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
                                defaultValue={textData.text || ""}
                            />
                        </label>
                    </div>
               }
           />
        </div>
    )
}

export default Weather