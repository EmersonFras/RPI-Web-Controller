import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'


function Home() {
    const [currentScript, setCurrentScript] = useState("")

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
    }, []);
    
        const formatScriptName = (scriptPath) => {
        const parts = scriptPath.split('/');
        let scriptName = parts[parts.length - 1];

        return scriptName.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <div className="page">
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