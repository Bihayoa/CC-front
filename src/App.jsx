import LoginSignup from "./components/auth/LoginSignup";
import HomePage from "./components/Home/home";
import PostByID from "./components/post/getPostById";
import PostID from "./components/post/postID";

import { Route, Routes } from 'react-router-dom';
import "./globals.css"

function App() {
      return(
    <div className='app'>
          <Routes>
              <Route path='/auth' element={<LoginSignup />}/>
              <Route path='/' element={<HomePage />}/>
              <Route path="/posts/:id" element={<PostID />}/>
          </Routes>
    </div>
   );
}

export default App;
