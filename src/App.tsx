import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/authProvides';
import {
  BookingsPage,
  ContactPage,
  DashboardPage,
  LoginPage,
  RoomDetails,
  RoomsPage,
  UserDetails,
  UsersPage,
} from './pages';
import DashBoard from './routes/DashBoard';
import { routes } from './routes/routes';
import AuthTemplate from './template/AuthTemplate';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthTemplate />}>
            <Route index element={<LoginPage />} />
          </Route>

          <Route path="/admin/*" element={<DashBoard />}>
            <Route index path="dashboard" element={<DashboardPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="users" element={<UsersPage />} />

            <Route path="rooms/:id" element={<RoomDetails />} />
            <Route path="users/:id" element={<UserDetails />} />
            <Route path="*" element={<Navigate to={routes[0].to} replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
