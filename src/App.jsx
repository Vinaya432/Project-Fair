import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'
import Authentication from './Pages/Authentication'
import Projects from './Pages/Projects'
import Footer from './Components/Footer'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Authentication/>}/>
        <Route path='/register' element={<Authentication insideRegister/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
        <Route path='/projects' element={<Projects/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>

      <Footer/>
        
    </>
  )
}

export default App
