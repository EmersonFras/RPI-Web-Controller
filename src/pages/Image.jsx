import { useState } from "react"
import Card from "../components/Card"
import CardBtn from "../components/CardBtn"

function Image() {
    const [fileError, setFileError] = useState("")
    const [fileName, setFileName] = useState("")

    const uploadFile =(formData) => {

        const file = formData.get("file")
        const fileType = file.type.split("/")

        if (fileType[0] !== "image") {
            setFileError("Wrong file type. Must be Image/GIF.")
            return;
        }

        setFileError("")
        console.log("Valid file upload", file)
    }

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
                                onChange={(e) => setFileName(e.target.files[0].name)}
                            />
                            <span>{fileName ? fileName : "Browse Images..."}</span>
                        </label>
                        {fileError && <p className="image-display__form--error">{fileError}</p>}
                    </form>
                }
                footerContent={
                    <CardBtn form="upload-form" type="submit" content="Submit"/>
                }
            />
        </div>
    )
}

export default Image