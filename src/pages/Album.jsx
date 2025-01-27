import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import '../styles/album.css'

function Album() {
    const [albumModalOpen, setAlbumModalOpen] = useState(true)
    const [albumData, setAlbumData] = useState([])

    const titleRef = useRef()

    function albumSearch(input) {
        axios.get(`http://localhost:3000/api/album?q=${input}`, {
            withCredentials: true,
        }).then((res) => {setAlbumData(res.data.albums.items)})
    }

    return (
        <div className='page album'>
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
                    <CardBtn 
                        open={() => {
                            albumSearch(titleRef.current.value)
                            setAlbumModalOpen(true)
                        }} 
                        content="Search Albums"/>
                }
            />

            <Modal 
                open={albumModalOpen}
                titleContent={<h2> Choose Album </h2>}
                cancelFn={() => setAlbumModalOpen(false)}
                primaryFn={() => {
                    setAlbumModalOpen(false) // Close the modal after submission
                }}
                secondaryFn={() => setAlbumModalOpen(false)}
                content={
                    <div className='album-container'>
                        {albumData && albumData[0].name}
                    </div>
               }
           />
        </div>
    )
}

export default Album