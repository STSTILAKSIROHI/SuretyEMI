
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/authentication/pages/Login';
import ForgotPassword from './pages/authentication/pages/ForgotPassword';
import OtpVerificationForm from './pages/authentication/pages/OtpVerificationForm';
import Layout from './layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import Distirbutor from './pages/dirtirbutor/Distirbutor';
import CreateDistirbutor from './pages/dirtirbutor/CreateDistirbutor';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgotpwd" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpVerificationForm />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/distributor" element={<Distirbutor />} />
          <Route path='/createdistirbutor' element={<CreateDistirbutor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
