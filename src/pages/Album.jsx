import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import '../styles/album.css'

function Album() {
    const [albumModalOpen, setAlbumModalOpen] = useState(false)
    const [albumData, setAlbumData] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState(0)

    const titleRef = useRef()

    function albumSearch(input) {
        axios.get(`http://localhost:3000/api/album?q=${input}`, {
            withCredentials: true,
        }).then((res) => {setAlbumData(res.data.albums.items)})
    }

    const albumElement = (
        <div className='album-container'>
            <div key={albumData[currentAlbum].id} className='album-item'>
                <img src={albumData[currentAlbum].image.url} alt={albumData[currentAlbum].name} />
                <p>{albumData[currentAlbum].name}</p>
            </div>
            <button onClick={setCurrentAlbum((prev) => {prev == 9 ? 0 : prev++})}>Next</button>
            <button onClick={setCurrentAlbum((prev) => (prev == 0 ? 9 : prev--))}>Previous</button>
        </div>
    )

    console.log(albumData)

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
                        {albumData.length > 0 ? 
                        <>
                            <div key={albumData[currentAlbum].id} className='album-item'> 
                                <img src={albumData[currentAlbum].image.url} alt={albumData[currentAlbum].name} />
                                <p>{albumData[currentAlbum].name}</p>
                            </div>
                            <button onClick={setCurrentAlbum((prev) => {prev == 9 ? 0 : prev++})}>Next</button>
                            <button onClick={setCurrentAlbum((prev) => (prev == 0 ? 9 : prev--))}>Previous</button>
                        </>
                        : undefined}
                    </div>
               }
           />
        </div>
    )
}

export default Album