/* eslint-disable import/no-extraneous-dependencies */
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import React, { useContext } from 'react';
import { actions as messageAction } from '../store/slices/messagesSlice.js';
import { actions as channelAction } from '../store/slices/channelsSlice.js';
import store from '../store/index.js';

const ChatApi = React.createContext({});

export const useChatApi = () => useContext(ChatApi);

export const ChatApiProvider = (props) => {
  const socket = io();
  const { currentChannelId, defaultChannelId } = useSelector((state) => state.channels);

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`);
    // console.log('AAAAAAAAAA')
  });

  socket.on('newMessage', (msg) => {
    store.dispatch(messageAction.addMessage(msg));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelAction.addChannel(channel));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelAction.updateChannel({ id: channel.id, changes: channel }));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelAction.removeChannel(channel.id));

    if (currentChannelId === defaultChannelId) {
      store.dispatch(channelAction.setCurrentChannelId(defaultChannelId));
    }
  });

  const { children } = props;

  return (
    <ChatApi.Provider value={socket}>
      {children}
    </ChatApi.Provider>
  )
}
