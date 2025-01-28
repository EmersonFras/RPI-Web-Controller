import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import placeholder from '../assets/images/placeholder.png'
import '../styles/album.css'

function Album() {
    const [albumModalOpen, setAlbumModalOpen] = useState(false)
    const [albumData, setAlbumData] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState(0)

    const titleRef = useRef()

    let lastSearch = ''

    function albumSearch(input) {
        if (input != lastSearch) {
            axios.get(`http://localhost:3000/api/album?q=${input}`, {
                withCredentials: true,
            })
            .then((res) => {setAlbumData(res.data.albums.items)})
            .catch((err) => console.error(err))     
            
            setCurrentAlbum(0)
            lastSearch = input
        }
        setAlbumModalOpen(true)
    }

    const hasAlbums = albumData.length > 0

    const handleAlbumChange = (nextIndex) => {
        if (!hasAlbums) return;

        const nextAlbum = albumData[nextIndex];
        if (nextAlbum?.images?.[0]?.url) {
            const img = new Image()
            img.src = nextAlbum.images[0].url

            img.onload = () => {
                setCurrentAlbum(nextIndex) // Update to the next album
            }
        } else {
            setCurrentAlbum(nextIndex) // If no image, update immediately
        }
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
                        open={() => {albumSearch(titleRef.current.value)}} 
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
                                <button className='arrow-btn' onClick={() => handleAlbumChange(currentAlbum === 0 ? albumData.length - 1 : currentAlbum - 1)} >&lt;</button>
                                <div key={albumData[currentAlbum].id} className="album-item">
                                    {albumData[currentAlbum]?.images?.[0]?.url ? (
                                        <img
                                            src={albumData[currentAlbum].images[0].url}
                                            alt={albumData[currentAlbum].name}
                                        />
                                    ) : (
                                        <img src={placeholder} alt="Placeholder album image"/>
                                    )}
                                    <p>{albumData[currentAlbum].name}</p>
                                </div>
                                <button className='arrow-btn' onClick={() => handleAlbumChange(currentAlbum === albumData.length - 1 ? 0 : currentAlbum + 1)}>&gt;</button>
                            </>
                        ) : (
                            <img src={placeholder} alt="Placeholder album image"/>
                        )}
                    </div>
               }
           />
        </div>
    )
}

export default Album