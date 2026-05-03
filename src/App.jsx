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
import Goals from './pages/Goals/Goals';
import ChatBot from './pages/ChatBot/ChatBot';
import Community from './pages/Community/Community';
import { SurveyProvider } from './Context/SurveyContext';
// import GoogleCallback from './GoogleCallback';



function App() {
  return (
    <ThemeProvider theme={formsTheme}>
      <SurveyProvider>
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
            <Route path='/dashboard/goals' element={<Goals />} />
            <Route path='/dashboard/chatbot' element={<ChatBot />} />
            <Route path='/dashboard/communitychat' element={<Community />} />
            {/* <Route path="/google-callback" element={<GoogleCallback />} /> */}
          </Route> 
        </Routes>
      </SurveyProvider>
    </ThemeProvider>
  )
}

export default App;