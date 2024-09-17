import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { store } from './app/store';
import { AuthProvider } from './context/authProvides';
import { MenuProvider } from './context/menuProvider';
import {
  BookingsPage,
  ContactPage,
  DashboardPage,
  LoginPage,
  RoomDetails,
  RoomsPage,
  UsersPage,
} from './pages';
import BookingDeleteAdd from './pages/BookingDeleteAdd';
import BookingDetails from './pages/BookingDetails';
import RoomFormActions from './pages/RoomFormActions';
import UserFormActions from './pages/UserFormActions';
import DashBoard from './routes/DashBoard';
import { routes } from './routes/routes';
import AuthTemplate from './template/AuthTemplate';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<AuthTemplate />}>
              <Route index element={<LoginPage />} />
            </Route>

            <Route
              path="/admin/*"
              element={
                <MenuProvider>
                  <DashBoard />
                </MenuProvider>
              }
            >
              <Route index path="dashboard" element={<DashboardPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="booking-form/:id?" element={<BookingDeleteAdd />} />

              <Route path="rooms" element={<RoomsPage />} />
              <Route path="rooms-form/:id?" element={<RoomFormActions />} />

              <Route path="contact" element={<ContactPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="user-form/:id?" element={<UserFormActions />} />

              <Route path="bookings/:id" element={<BookingDetails />} />
              <Route path="rooms/:id" element={<RoomDetails />} />
              <Route path="*" element={<Navigate to={routes[0].to} replace />} />
            </Route>
          </Routes>
          <Toaster position="bottom-right" reverseOrder={false} />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
