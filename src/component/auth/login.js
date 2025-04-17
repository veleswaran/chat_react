import axios from "axios";
import { useState } from "react";
import NavBar from "../elements/NavBar";
import cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const router = useNavigate()

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await axios.post("http://localhost:8000/auth/jwt/create/", data);

        if (res.status === 200) {
            console.log(res.data);
            cookies.set("token",res.data.access)
            router("/")
        }
    }
    return (
        <>
        <NavBar/>
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
        </>
    );
}