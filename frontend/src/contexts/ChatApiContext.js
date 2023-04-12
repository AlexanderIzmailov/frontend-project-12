
import io from 'socket.io-client';
import React, { useContext } from 'react';
import { actions as messageAction } from '../store/slices/messagesSlice.js';
import store from '../store/index.js';

const ChatApi = React.createContext({});

export const useChatApi = () => useContext(ChatApi)

export const ChatApiProvider = (props) => {
  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(messageAction.addMessage(msg))
  })

  return (
    <ChatApi.Provider value={socket}>
      {props.children}
    </ChatApi.Provider>
  )
}
