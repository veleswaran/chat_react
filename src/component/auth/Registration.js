import axios from "axios";
import { useState } from "react";
import NavBar from "../elements/NavBar";
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const [data, setData] = useState({});
    const router = useNavigate()

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/user/", data);

            if (res.status === 201) {
                console.log("User Register successfully");
                router("/login") 
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
    }

    return (
        <>
                <NavBar/>
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
        </>
    );
}