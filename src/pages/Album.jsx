import { useRef } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'

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
        <Card 
            titleContent={<h1>Album Search</h1>}
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
    )
}

export default Album