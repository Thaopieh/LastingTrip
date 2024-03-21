import './App.css';
import SignUpComponent from './Components/SignUpComponent/SignUp.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './Components/SignInComponent/SignIn.js'
import UsersComponent from './Components/Admin/UsersComponent/Users.js';
import DashboardComponent from './Components/Admin/DashboardComponent/Dashboard.js';
import PromotionComponent from './Components/Admin/Promotions/Promotions.js';
import LoginComponent from './Components/Admin/LoginComponent/Login.js';
import OrderComponent from './Components/Admin/OrderComponent/Order.js';
import ChatbotComponent from './Components/Chatbot/Chatbot.js';
import PaymentComponent from './Components/PaymentComponent/Payment.js'
function App() {
  return (
    <Router >
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUpComponent />} />
        <Route path="/admin/dashboard" element={<DashboardComponent />} />
        <Route path="/admin/users" element={<UsersComponent />} />
        <Route path="/admin/promotions" element={<PromotionComponent />} />
        <Route path="/admin" element={<LoginComponent />} />
        <Route path="/admin/orders" element={<OrderComponent />} />
        <Route path="/chatbot" element={<ChatbotComponent />} />
        <Route path="/payment" element={<PaymentComponent />} />
      </Routes>
    </Router >
  );
}
export default App;