import axios from "axios";
import { useState } from "react";
import NavBar from "./elements/NavBar";

export default function CreatePost() {
    const [data, setData] = useState({
        title: "",
        description: "",
        video: null
    });
    const [error, setError] = useState(null); // For error messages
    const [success, setSuccess] = useState(false); // For success feedback

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    function handleVideoChange(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setData({ ...data, video: file });
        } else {
            alert("Please upload a valid video file.");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); // Clear previous errors
        setSuccess(false); // Reset success state

        // Validation
        if (!data.title || !data.description || !data.video) {
            setError("All fields are required.");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("video", data.video);
        formData.append("user",1)

        try {
            const res = await axios.post("http://localhost:8000/api/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 201) {
                console.log("Data added successfully");
                setSuccess(true); // Indicate success
                setData({ title: "", description: "", video: null }); // Clear form
            }
        } catch (error) {
            console.error("Upload failed:", error);
            setError("Failed to upload the post. Please try again.");
        }
    }

    return (
        <>
        <NavBar/>
        <div className="container">
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Post uploaded successfully!</div>}

                <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter title"
                        name="title"
                        onChange={handleChange}
                        value={data.title}
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        placeholder="Enter description"
                        name="description"
                        onChange={handleChange}
                        value={data.description}
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="video" className="form-label">Video:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="video"
                        name="video"
                        onChange={handleVideoChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        </>
    );
}