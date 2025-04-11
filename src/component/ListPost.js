import axios from 'axios';
import { useState, useEffect } from 'react'


export default function ListPost() {
    const [data, setdata] = useState([])
    useEffect(() => {
        async function getPost() {
            const response = await axios.get('http://localhost:8000/api/comment/comments/')
            if (response.status === 200) {
                console.log(response.data);
                setdata(response.data)
            }
        }
        getPost()
    }, [])
    return (
        <div class="container mt-3">
            <h2>Dark Striped Table</h2>
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>content</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((val) =>
                        <tr key={val.id}>
                            <td>{val.id}</td>
                            <td>{val.content}</td>
                        </tr>
                    )}


                </tbody>
            </table>
        </div>

    )
}