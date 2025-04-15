import { useState, useRef } from "react"
import axios from "axios"
import Card from "../components/Card"
import CardBtn from "../components/CardBtn"

function Image() {
    const [fileError, setFileError] = useState("")
    const [fileName, setFileName] = useState("")
    const [galleryList, setGalleryList] = useState([])

    const fileInputRef = useRef()

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
                const fileUrl = `https://rpi-display.duckdns.org:3000${res.data.url}`
                console.log(fileUrl)

                setGalleryList(prev => [...prev, fileUrl])

                // Clear form/errors
                formData = null
                setFileError("")
                setFileName("")
            }
            else console.error('Error in post request to upload image.')
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    // Sets the title for the input area
    const setInput = (e) => {
        setFileName(e.target.files[0].name)
        setFileError("")
    }


    // Clears the title for the input area
    const clearFile = () => {
        fileInputRef.current.value = null
        setFileName("")
    }

    // Formats the gifs/images uploaded
    const galleryElements = galleryList.map((fileUrl, index) => {
        return (
            <Card 
                key={index}
                content={<img src={fileUrl} />}
            />
        )
    })

    return (
        <div className="page image-display">
            <h1 className="image-display__title">Upload Image/Gif</h1>

            <Card 
                titleContent={<p className="image-display__card--title">Browse Below</p>}
                content={
                    <form id="upload-form" className="image-display__form" action={uploadFile}>
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
                    <CardBtn form="upload-form" type="submit" content="Submit"/>
                }
            />

            {galleryElements}
        </div>
    )
}

export default Image