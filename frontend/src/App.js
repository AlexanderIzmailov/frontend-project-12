import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { Layout } from './components/Layout.jsx';
import { Login } from './components/Login.jsx';
import { PageNotFound } from './components/PageNotFound.jsx';
import { Chat } from './components/Chat.jsx'
import { AuthProvider } from './components/AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const CheckAuth = () => localStorage.getItem('token') ? <Chat /> : <Navigate to="login" />;

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<CheckAuth />}/>
            {/* <Route index element={<Navigate to='/login' />}/> */}
            <Route path="*" element={<PageNotFound />}/>
            <Route path="login" element={<Login />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
