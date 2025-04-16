import axios from "axios";
import { useState } from "react";

export default function Registration() {
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

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/user/", data);

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
        <div className="container mt-5">
            <h1>Registration form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="title" className="form-label">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Enter title"
                        name="username"
                        onChange={handleChange}
                        value={data.username}
                    />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter description"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="password" className="form-label">password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter description"
                        name="password"
                        onChange={handleChange}
                        value={data.password}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="password" className="form-label">Confirm password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="re_password"
                        placeholder="Enter description"
                        name="re_password"
                        onChange={handleChange}
                        value={data.re_password}
                    />
                </div>

              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}