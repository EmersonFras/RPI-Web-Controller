import { useRef } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import '../styles/album.css'

function Album() {
    const titleRef = useRef()

    function albumSearch(input) {
        axios.get(`http://localhost:3000/api/album?q=${input}`, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data.name)
        })
    }

    return (
        <div className='album'>
            <h1>Album Display</h1>
            <Card 
                titleContent={<h2>Album Search</h2>}
                content={
                    <div>
                        <label>Search for an album: <input ref={titleRef} type="text" id="albumSearch" />
                        </label>
                    </div>
                }
                footerContent={
                    <CardBtn open={() => albumSearch(titleRef.current.value)} content="Search Albums"/>
                }
            />
        </div>
    )
}

export default Album