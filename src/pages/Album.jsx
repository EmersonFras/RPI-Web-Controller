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
        })
        .then((res) => {setAlbumData(res.data.albums.items)})
        .catch((err) => console.error(err))     
    }

    const hasAlbums = albumData.length > 0

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
                    <div className="album-container">
                        {hasAlbums ? (
                            <>
                                <button className='arrow-btn' onClick={() => setCurrentAlbum((prev) => prev === 0 ? albumData.length - 1 : prev - 1)} >&lt;</button>
                                <div key={albumData[currentAlbum].id} className="album-item">
                                    {albumData[currentAlbum]?.images?.[0]?.url ? (
                                        <img
                                            src={albumData[currentAlbum].images[0].url}
                                            alt={albumData[currentAlbum].name}
                                        />
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                    <p>{albumData[currentAlbum].name}</p>
                                </div>
                                <button className='arrow-btn' onClick={() => setCurrentAlbum((prev) => prev === albumData.length - 1 ? 0 : prev + 1)}>&gt;</button>
                            </>
                        ) : (
                            <p>No albums found. Try searching for something else.</p>
                        )}
                    </div>
               }
           />
        </div>
    )
}

export default Album