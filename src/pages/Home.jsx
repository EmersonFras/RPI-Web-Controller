import Card from '../components/Card'
import '../styles/home.css'

function Home() {
    return (
        <div className='page home'>
            <h1>Home</h1>
            <Card 
                titleContent={<h2>Current Display</h2>}
                content={<p>This is the home page. Click on the links above to navigate to other pages.</p>}
            />
        </div>    
    )
}   

export default Home