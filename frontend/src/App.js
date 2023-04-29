import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './pages/components/Layout.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';
import { PageNotFound } from './pages/PageNotFound.jsx';
import { Chat } from './pages/chat/Chat.jsx'
import { AuthProvider } from './contexts/AuthContext.js';
import { ChatApiProvider } from './contexts/ChatApiContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index.js';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

import { I18nextProvider } from 'react-i18next';
// import i18n from './i18n.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import filter from 'leo-profanity';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

// import io from 'socket.io-client';
// import { useDispatch, useSelector } from 'react-redux';
// // import { actions as channelsAction } from './slices/channelsSlice.js';
// // import store from './slices/index.js';
// import { actions as messageAction } from './slices/messagesSlice.js';

// const ChatApi = React.createContext({});

// export const useChatApi = () => useContext(ChatApi)

// export const ChatApiProvider = (props) => {
//   const socket = io();

//   socket.on('newMessage', (msg) => {
//     store.dispatch(messageAction.addMessage(msg))
//   })

//   return (
//     <ChatApi.Provider value={socket}>
//       {props.children}
//     </ChatApi.Provider>
//   )
// }

const CheckAuth = () => localStorage.getItem('user') ? <Chat /> : <Navigate to="login" />;

function App() {
  i18n
    .use(initReactI18next)
    .init({
      debug: false,
      lng: 'ru',
      resources,
    });

  const dictionaries = filter.getDictionary('ru', 'en');
  filter.add(dictionaries)

  useEffect(() => {
    document.querySelector('html').classList.add('h-100')
    document.body.classList.add('h-100')
    document.querySelector('#root').classList.add('h-100')
  })

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
  )
}

export default App;
