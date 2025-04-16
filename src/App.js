import logo from './logo.svg';
import './App.css';
import CreatePost from './component/createPost';
import ListPost from './component/ListPost';
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Registration from './component/auth/Registration';
import Login from './component/auth/login';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="" element={<CreatePost/>}/>
    <Route path="/posts" element={<ListPost/>}/>
    <Route path="/register" element={<Registration/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>

  );
}

export default App;
