import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
    }
});
