import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/profile" />} />
            <Route path='/profile' element={user ? <Profile/> : <Navigate to="/login" />} />
            <Route path='/create' element={user ? <CreatePost/> : <Navigate to="/login" />} />
          </Routes>
        </div>

      </BrowserRouter>

    </div>
  );
}

export default App;
