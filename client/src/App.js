import LandingPage from './pages/LandingPage';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navibar from './components/Navibar/Navibar';
import HomePage from './pages/HomePage';
import { useContext, useEffect, useState } from 'react';
import DetailPostPage from './pages/DetailPostPage';
import ProfilePage from './pages/ProfilePage';
import { Container } from 'react-bootstrap';
import AddPostPage from './pages/AddPostPage';
import EditProfilePage from './pages/EditProfilePage';
import HiredPage from './pages/HiredPage';
import SendProjectPage from './pages/SendProjectPage';
import OrderPage from './pages/OrderPage'
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import { PrivateRouteLogin } from './components/privateRoute';
import EditPostPage from './pages/EditPostPage';
import ProjectDetailPage from './pages/ProjectDetailPage';


function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate('/');
      }
    }
  }, [isLoading])

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();

    } else {
      setIsLoading(false)
    }
  }, []);

  return (

    <>
      {isLoading ? null :
        <Container style={{ backgroundColor: "#F9F9F9" }} fluid className='h-100'>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route element={<><PrivateRouteLogin /></>}>
              <Route path='/home' element={<><HomePage /></>} />
              <Route path='/detail-post/:id' element={<><DetailPostPage /></>} />
              <Route path='/edit-post/:id' element={<><EditPostPage /></>} />
              <Route path='/profile/:id' element={<><ProfilePage /></>} />
              <Route path='/upload' element={<><AddPostPage /></>} />
              <Route path='/send-project/:id' element={<><SendProjectPage /></>} />
              <Route path='/edit-profile/:id' element={<><EditProfilePage /></>} />
              <Route path='/hired/:id' element={<><HiredPage /></>} />
              <Route path='/order' element={<><OrderPage /></>} />
              <Route path='/project-detail/:id' element={<><ProjectDetailPage /></>} />
            </Route>
          </Routes>
        </Container>
      }
    </>
  );
}

export default App;
