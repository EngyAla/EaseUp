import { Route, Routes } from 'react-router';
import './App.css'
import { ThemeProvider } from '@emotion/react';
import { formsTheme } from './createTheme';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import Otp from './pages/OTP/Otp';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Journaling from './pages/Journaling/Journaling';
import Survey from './pages/Survey/Survey';
import Exercises from './pages/Exercises/Exercises';



function App() {
  return (
    <ThemeProvider theme={formsTheme}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='/otp' element={<Otp />} />

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/dashboard/journaling' element={<Journaling />} />
          <Route path='/dashboard/survey' element={<Survey />} />
          <Route path='/dashboard/exercises' element={<Exercises />} />
        </Route> 
      </Routes>
    </ThemeProvider>
  )
}

export default App;