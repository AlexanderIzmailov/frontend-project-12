import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import Layout from './pages/components/Layout.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Chat from './pages/chat/Chat.jsx';
import { AuthProvider } from './contexts/AuthContext.js';
import { ChatApiProvider } from './contexts/ChatApiContext.js';
import store from './store/index.js';
import resources from './locales/index.js';

import 'react-toastify/dist/ReactToastify.css';

const CheckAuth = () => (localStorage.getItem('user') ? <Chat /> : <Navigate to="login" />);

const App = () => {
  i18n
    .use(initReactI18next)
    .init({
      debug: false,
      lng: 'ru',
      resources,
    });

  const dictionaries = filter.getDictionary('ru', 'en');
  filter.add(dictionaries);

  useEffect(() => {
    document.querySelector('html').classList.add('h-100');
    document.body.classList.add('h-100');
    document.querySelector('#root').classList.add('h-100');
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <ChatApiProvider>
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<CheckAuth />} />
                  {/* <Route index element={<Navigate to='/login' />}/> */}
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ChatApiProvider>
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
