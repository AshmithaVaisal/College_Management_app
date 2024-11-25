import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import {Login}   from './pages/Login'
import { Register } from './pages/Register'
import {Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute';
import {StudentDashboard} from "./pages/StudentDashboard";
import {FacultyDashboard} from "./pages/FacultyDashboard";

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          <Route 
                    path="/student-dashboard" 
                    element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} 
                />
          <Route 
                    path="/faculty-dashboard" 
                    element={<ProtectedRoute><FacultyDashboard /></ProtectedRoute>} 
                />
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='/register' element={<RegisterAndLogout/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
