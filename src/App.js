import logo from './logo.svg';
import './App.css';
import CreatePost from './component/createPost';
import ListPost from './component/ListPost';
import {BrowserRouter,Route,Routes} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="" element={<CreatePost/>}/>
    <Route path="/posts" element={<ListPost/>}/>
   </Routes>
   </BrowserRouter>

  );
}

export default App;
