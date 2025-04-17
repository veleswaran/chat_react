import axios from 'axios';
import { useState, useEffect } from 'react'
import NavBar from './elements/NavBar';


export default function ListPost() {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function getPost() {
            const response = await axios.get('http://localhost:8000/api/posts/')
            if (response.status === 200) {
                console.log(response.data);
                setdata(response.data)
            }
        }
        getPost()
    }, [])
    return (
        <>
        <NavBar/>
        <div class="container mt-3">
            <div className='row'>
                {data.map((val) =>
                    <div className='col-4' key={val.id}>
                        <h3>{val.title}</h3>
                        <video  width={"100%"}>
                            <source src={val.video} />
                        </video>
                    </div>
                )}
            </div>
        </div>
        </>

    )
}