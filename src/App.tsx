import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/authProvides';
import { Bookings, Contact, DashboardPage, Room, Rooms, User } from './pages';
import Login from './pages/Login';
import Users from './pages/Users';
import DashBoard from './routes/DashBoard';
import { routes } from './routes/routes';
import AuthTemplate from './template/AuthTemplate';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthTemplate />}>
            <Route index element={<Login />} />
          </Route>

          <Route path="/admin/*" element={<DashBoard />}>
            <Route index path="dashboard" element={<DashboardPage />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="contact" element={<Contact />} />
            <Route path="users" element={<Users />} />

            <Route path="rooms/:id" element={<Room />} />
            <Route path="users/:id" element={<User />} />
            <Route path="*" element={<Navigate to={routes[0].to} replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
