import React,{useEffect,useState} from 'react'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import Userpage from './pages/Userpage'
import Userprofilepage from './pages/Userprofile'
import { BrowserRouter,Routes,Route} from 'react-router-dom'

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
      const token = localStorage.getItem('userToken');
      setIsAuthenticated(!!token); // Set to true if token exists
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/user' element={<Userpage/>}/>
        <Route path='/profile' element={<Userprofilepage/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App