import LoginSignup from "./components/auth/LoginSignup";
import HomePage from "./components/Home/home";
// import PostByID from "./components/post/getPostById";
import PostID from "./components/post/postID";

import { Route, Routes } from 'react-router-dom';
import "./globals.css"
import Profile from "./components/profile/Profile";
import UserPage from "./components/profile/UserPage";
// import FeedPosts from "./components/post/feedPosts";

function App() {
      return(
    <div className='app'>
          <Routes>
              <Route path='/auth' element={<LoginSignup />}/>
              <Route path='/' element={<HomePage />}/>
              <Route path="/posts/:id" element={<PostID />}/>
              <Route path="/me" element={<Profile />} />
              <Route path="/:login" element={<UserPage />} />
          </Routes>
    </div>
   );
}

export default App;
