import axios from "axios";
import { useState } from "react";

export default function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null); // For error messages
    const [success, setSuccess] = useState(false); // For success feedback

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
            const res = await axios.post("http://localhost:8000/auth/jwt/create/", data);

            if (res.status === 201) {
                console.log(res.data);
                setSuccess(true); // Indicate success
                setData({ title: "", description: "", video: null }); // Clear form
            }
            console.log(res)
       
    }

    return (
        <div className="container mt-5">
            <h1>Login form</h1>
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
               

              
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}