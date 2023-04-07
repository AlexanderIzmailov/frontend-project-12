import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { Layout } from './components/Layout.jsx';
import { Login } from './components/Login.jsx';
import { PageNotFound } from './components/PageNotFound.jsx';
import { Chat } from './components/Chat.jsx'
import { AuthProvider } from './components/AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import { Provider } from 'react-redux';
import { useEffect } from 'react';

const CheckAuth = () => localStorage.getItem('user') ? <Chat /> : <Navigate to="login" />;

function App() {
  useEffect(() => {
    document.querySelector('html').classList.add('h-100')
    document.body.classList.add('h-100')
    document.querySelector('#root').classList.add('h-100')
  })

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<CheckAuth />} />
              {/* <Route index element={<Navigate to='/login' />}/> */}
              <Route path="*" element={<PageNotFound />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  )
}

export default App;
