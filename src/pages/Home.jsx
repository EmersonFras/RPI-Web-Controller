import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import '../styles/home.css'

function Home() {
    const [currentScript, setCurrentScript] = useState("")

    // TODO- Should move to context most likely later...
    useEffect(() => {
        // Make a request to the server to get the current script running
        axios.get('https://rpi-display.duckdns.org:3000/api/running')
            .then((res) => {
                if (res.data.message) {
                    // Extract the last part of the path (script name)
                    const parts = res.data.message.split('/');
                    let scriptName = parts[parts.length - 1]; // Get the last part
    
                    // Format the name (replace underscores with spaces and capitalize each word)
                    scriptName = scriptName.replace(/_/g, ' ') // Replace underscores
                                           .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize words
    
                    setCurrentScript(scriptName); // Set formatted script name
                }
            })
            .catch((error) => console.error('Error fetching display data:', error));
    }, []);
    

    return (
        <div className='page home'>
            <h1>Home</h1>
            <Card 
                titleContent={<h2>Current Display</h2>}
                content={
                    <p>Currently Running: <strong>{currentScript}</strong></p>
                }
            />
        </div>    
    )
}   

export default Home