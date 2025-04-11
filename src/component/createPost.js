import axios from "axios";
import { useState } from "react"

export default function CreatePost() {
    const [data,setdata] = useState({})
    function handlechange(e){
        setdata({...data,[e.target.name]:e.target.value});
    }

    async function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        const res = await axios.post("http://localhost:8000/api/comment/comments/",data)
        if(res.status ===200){
            console.log("data added success fully")
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div class="mb-3 mt-3">
                    <label for="content" class="form-label">Content:</label>
                    <input type="text" class="form-control" id="content" placeholder="Enter content" name="content"  onChange={handlechange}/>
                </div>
                {/* <div class="mb-3">
                    <label for="pwd" class="form-label">Password:</label>
                    <input type="number" class="form-control" id="user" placeholder="Enter user" name="user" onChange={handlechange} />
                </div> */}

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}