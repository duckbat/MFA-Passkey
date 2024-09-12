import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './views/Layout';
import Home from './views/Home';
import Login from './views/Login';
import Secret from './views/Secret';
import Logout from './views/Logout';

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/secret"
              element={
                <ProtectedRoute>
                  <Secret />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
