import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { Layout } from './pages/components/Layout.jsx';
import { Login } from './pages/Login.jsx';
import { PageNotFound } from './pages/PageNotFound.jsx';
import { Chat } from './pages/chat/Chat.jsx'
import { AuthProvider } from './contexts/AuthContext.js';
import { ChatApiProvider } from './contexts/ChatApiContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index.js';
import { Provider } from 'react-redux';
import React, { useEffect } from 'react';

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
  useEffect(() => {
    document.querySelector('html').classList.add('h-100')
    document.body.classList.add('h-100')
    document.querySelector('#root').classList.add('h-100')
  })

  return (
    <Provider store={store}>
      <AuthProvider>
        <ChatApiProvider>
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
        </ChatApiProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App;
