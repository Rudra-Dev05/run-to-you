import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthWrapper from './components/auth/AuthWrapper';
import Dashboard from './pages/Dashboard';
import Runs from './pages/Runs';
import RoutesPage from './pages/Routes';
import Challenges from './pages/Challenges';
import Achievements from './pages/Achievements';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import Social from './pages/Social';
import UserProfilePage from './pages/UserProfile';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* Protected routes with layout */}
          <Route path="/dashboard" element={
            <Layout>
              <AuthWrapper>
                <Dashboard />
              </AuthWrapper>
            </Layout>
          } />
          <Route path="/runs" element={
            <Layout>
              <AuthWrapper>
                <Runs />
              </AuthWrapper>
            </Layout>
          } />
          <Route path="/routes" element={
            <Layout>
              <AuthWrapper>
                <RoutesPage />
              </AuthWrapper>
            </Layout>
          } />
          <Route path="/challenges" element={
            <Layout>
              <AuthWrapper>
                <Challenges />
              </AuthWrapper>
            </Layout>
          } />
          <Route path="/achievements" element={
            <Layout>
              <AuthWrapper>
                <Achievements />
              </AuthWrapper>
            </Layout>
          } />
          
          {/* New social routes */}
          <Route path="/social" element={
            <Layout>
              <AuthWrapper>
                <Social />
              </AuthWrapper>
            </Layout>
          } />
          <Route path="/profile/:userId" element={
            <Layout>
              <AuthWrapper>
                <UserProfilePage />
              </AuthWrapper>
            </Layout>
          } />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
