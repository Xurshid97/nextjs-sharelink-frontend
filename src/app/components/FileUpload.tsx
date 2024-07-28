import { useState } from "react";
import axios from "axios";

const FileUpload = ({
    onUploadSuccess,
}: {
    onUploadSuccess: (imageUrl: string) => void;
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append("image", file);
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/api/upload/",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setMessage("File uploaded successfully!");
            onUploadSuccess(response.data.imageUrl); // Assuming the response contains the URL or path to the uploaded image
        } catch (error) {
            setMessage("File upload failed.");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
