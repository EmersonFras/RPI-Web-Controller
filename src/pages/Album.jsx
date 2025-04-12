import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from '../components/Modal'
import Card from '../components/Card'
import CardBtn from '../components/CardBtn'
import placeholder from '../assets/images/placeholder.png'


function Album() {
    const [albumModalOpen, setAlbumModalOpen] = useState(false)
    const [albumData, setAlbumData] = useState([])
    const [currentAlbum, setCurrentAlbum] = useState(0)
    const [lastSearch, setLastSearch]= useState('')

    const titleRef = useRef()


    function albumSearch(input) {
        if (input != lastSearch) {
            axios.get(`https://rpi-display.duckdns.org:3000/api/album?search=${input}`, {
                withCredentials: true,
            })  
            .then(res => {
                setAlbumData(Object.entries(res.data.items).map(([name, url]) => ({
                    name,
                    image
                })))
            }) 
            .catch((err) => console.error(err))     
            
            setCurrentAlbum(0)
            setLastSearch(input)
        }
        setAlbumModalOpen(true)
    }

    const hasAlbums = albumData.length > 0

    const handleAlbumChange = (nextIndex) => {
        if (!hasAlbums) return

        const nextAlbum = albumData[nextIndex]
        if (nextAlbum?.image) {
            const img = new Image()
            img.src = nextAlbum.image

            img.onload = () => {
                setCurrentAlbum(nextIndex) // Update to the next album
            }
        } else {
            setCurrentAlbum(nextIndex) // If no image, update immediately
        }
    }

    function displayAlbum(albumImg) {
        axios.post('https://rpi-display.duckdns.org:3000/api/album/display', 
            { img: albumImg },
            { withCredentials: true }
        )
    }

    return (
        <div className='page album-display'>
            <h1 className="album-display__title">Album Display</h1>
            <Card 
                titleContent={<h2 className="album-display__card-title">Album Search</h2>}
                content={
                    <div className="album-display__search">
                        <label className="album-display__label">
                            <span className="album-display__label-text">Search for an album: </span>
                            <input ref={titleRef} type="text" id="albumSearch" className="album-display__input" />
                        </label>
                    </div>
                }
                footerContent={
                    <CardBtn 
                        onClick={() => {albumSearch(titleRef.current.value)}} 
                        content="Search Albums"
                    />
                }
            />

            <Modal 
                open={albumModalOpen}
                titleContent={<h2 className="album-display__modal-title"> Choose Album </h2>}
                cancelFn={() => setAlbumModalOpen(false)}
                primaryFn={() => {
                    if (hasAlbums) displayAlbum(albumData[currentAlbum].image)
                    setAlbumModalOpen(false)
                }}
                secondaryFn={() => setAlbumModalOpen(false)}
                content={
                    <div className="album-display__modal">
                        {hasAlbums ? (
                            <>
                                <button 
                                    className="album-display__arrow-btn album-display__arrow-btn--left"
                                    onClick={() => handleAlbumChange(currentAlbum === 0 ? albumData.length - 1 : currentAlbum - 1)} 
                                >
                                    &lt;
                                </button>

                                <div className="album-display__item">
                                    {albumData[currentAlbum]?.image ? (
                                        <img
                                            src={albumData[currentAlbum].image}
                                            alt={albumData[currentAlbum].name}
                                            className="album-display__image"
                                        />
                                    ) : (
                                        <img 
                                            src={placeholder} 
                                            alt="Placeholder album image"
                                            className="album-display__image album-display__image--placeholder"    
                                        />
                                    )}
                                    <p className="album-display__name">{albumData[currentAlbum].name}</p>
                                </div>
                                <button 
                                    className="album-display__arrow-btn album-display__arrow-btn--right"
                                    onClick={() => handleAlbumChange(currentAlbum === albumData.length - 1 ? 0 : currentAlbum + 1)}
                                >
                                        &gt;
                                </button>
                            </>
                        ) : (
                            <img 
                                src={placeholder} 
                                alt="Placeholder album image"
                                className="album-display__image album-display__image--placeholder"    
                            />
                        )}
                    </div>
               }
           />
        </div>
    )
}

export default Album