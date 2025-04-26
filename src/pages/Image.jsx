import { useState, useRef, useEffect } from "react"
import axios from "axios"
import Card from "../components/Card"
import CardBtn from "../components/CardBtn"
import Modal from "../components/Modal"
import Cropper from "react-easy-crop"
import getCroppedImg from "../utils/cropImage"

function Image() {
    const [fileError, setFileError] = useState("")
    const [fileName, setFileName] = useState("")
    const [galleryList, setGalleryList] = useState([])

    // For the cropper
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [showCropper, setShowCropper] = useState(false)

    const fileInputRef = useRef()

    useEffect(() => {
        updateGallery();
    }, [])

    async function updateGallery() {
        try {
            // Get the list of images from the backend
            await axios.get('https://rpi-display.duckdns.org:3000/api/image')
            .then((res) => {
                setGalleryList(res.data.images)
            })
        } catch (error) {
            console.error('Error fetching images:', error)
        }
    }

    async function displayImage(id) {
        try {
            const res = await axios.post(
                'https://rpi-display.duckdns.org:3000/api/image/set',
                { id: id },
                { withCredentials: true }
            )
    
            if (!res.data.success) {
                console.error("Display failed:", res.data.message)
            }
        } catch (error) {
            console.error('Error sending display request:', error)
        }
    }

    // Logic for sending file to the backend
    async function uploadFile(formData) {
        const file = formData.get("file")
        const fileType = file.type.split("/")

        // Does not allow for file tpyes that are not images
        if (fileType[0] !== "image") {
            setFileError("Wrong file type. Must be Image/GIF.")
            return;
        }

        // Try to send the request to backend
        try {
            const res = await axios.post('https://rpi-display.duckdns.org:3000/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            })

            // Sets the url to access the image in the backend
            if (res.data.success) {
                const fileUrl = `${res.data.url}`

                updateGallery()

                // Clear form/errors
                fileInputRef.current.value = null
                setFileError("")
                setFileName("")
            }
            else console.error('Error in post request to upload image.')
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    const handleCropSubmit = async () => {
        const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels)
        const formData = new FormData()
        formData.append("file", croppedFile)
        console.log(formData)
        await uploadFile(formData)
        setShowCropper(false)
    }

    async function deleteFile(fileId) {
        try {
            await axios.delete(`https://rpi-display.duckdns.org:3000/api/image/${fileId}`, {
                withCredentials: true
            })
            .then((res) => {
                if (res.data.success) {
                    updateGallery()
                }
            })
        } catch (error) {   
            console.error('Error deleting image:', error)
        }
    }

    // Sets the title for the input area
    const setInput = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result)
                setShowCropper(true)
            }
            reader.readAsDataURL(file)
            setFileName(file.name)
            setFileError("")
        }
    }


    // Clears the title for the input area
    const clearFile = () => {
        fileInputRef.current.value = null
        setFileName("")
    }

    // Formats the gifs/images uploaded
    const galleryElements = galleryList.map((file, index) => {
        const anchorId = `--image-${index}`

        return (
            <div key={index} onClick={() => displayImage(file.id)}>
                <Card 
                    className="image-display__gallery--card"
                    content={
                        <>
                            <img 
                                className="image-display__gallery--image" 
                                src={file.url} 
                                style={{ anchorName: anchorId }}
                            />
                            <button 
                                className="image-display__gallery--delete" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteFile(file.id)
                                }}
                                style={{
                                    positionAnchor: anchorId,
                                    right: "anchor(right)",
                                    top: "anchor(top)"
                                }}
                            >
                                X
                            </button>
                            {/* <button
                                className="image-display__gallery--display"
                                onClick={() => displayImage(file.id)}
                            >
                                Display
                            </button> */}
                        </>
                    }
                />
            </div>
        )
    })

    return (
        <div className="page image-display">
            <h1 className="image-display__title">Upload Image/Gif</h1>

            <Card 
                titleContent={<p className="image-display__card--title">Browse Below</p>}
                content={
                    <form id="upload-form" className="image-display__form" action={() => setShowCropper(true)}>
                        <label className="image-display__form--label">
                            <input 
                                aria-label="Upload Image/GIF" 
                                type="file" 
                                accept="image/*" 
                                name="file"
                                className="image-display__form--input"
                                ref={fileInputRef}
                                onChange={(e) => setInput(e)}
                            />
                            <span>{fileName ? fileName : "Browse Images..."}</span>
                            <button className="image-display__form--clear" type="button" onClick={clearFile}>X</button>
                        </label> 
                        {fileError && <p className="image-display__form--error">{fileError}</p>}
                    </form>
                }
                footerContent={
                    <CardBtn form="upload-form" type="submit" content="Crop"/>
                }
            />

            <Modal 
                open={showCropper}
                content={
                    <div className="image-display__modal--cropper">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1} // Square
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                    />
                </div>
                }
                primaryFn={handleCropSubmit}
                secondaryFn={() => setShowCropper(false)}
                cancelFn={() => setShowCropper(false)}
            />

            <div className="image-display__gallery">
                {galleryElements}
            </div>
        </div>
    )
}

export default Image