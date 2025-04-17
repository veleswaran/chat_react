import { useEffect, useState } from "react"
import cookies from 'js-cookie'
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
    let [token, setToken] = useState(null);
    const[user,setUser] = useState({username :"",id:""})
    const router = useNavigate();

    async function getAuthUser() {
        let tokenValue = cookies.get("token")
        try {
            const res = await axios.get("http://localhost:8000/auth/users/me/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenValue}`
                }
            });

            if (res.status === 200) {
                console.log("Data added successfully");
                console.log(res.data)
                setUser(res.data)
            }

        } catch (error) {
            console.error("Upload failed:", error);

        }
    }
    useEffect(() => {
        let tokenValue = cookies.get("token");
        console.log(typeof(tokenValue));
        if(tokenValue !== "null"){
            getAuthUser();
            setToken(tokenValue);
        }else{
            setToken(null);
        } 
    }, [])

    async function handleLogout(){
        let tokenValue = cookies.get("token");
       
        try {
            const res = await axios.get("http://localhost:8000/auth/jwt/refresh/", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenValue}`
                }
            });

            if (res.status === 200) {
                console.log("user logout successfully");
                cookies.set("token",null)
                setToken(null)
                router('/login')
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }
    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="javascript:void(0)">Y tube</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/">Videos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/about">About Us</a>
                        </li>
                    </ul>
                    <form class="d-flex">
                        {token === null ?
                            <>
                                <a href="/register" className="btn btn-primary me-3">Register</a>
                                <a class="btn btn-primary" href="/login">Login</a>
                            </> : <>
                                <a href="/register" className="btn btn-outline-primary me-3">{user && user.username}</a>
                                <a class="btn btn-primary" onClick={handleLogout}>Logout</a></>}

                    </form>
                </div>
            </div>
        </nav>
    )
}