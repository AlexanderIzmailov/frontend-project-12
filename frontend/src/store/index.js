import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';
import modalsReducer from './slices/modalsSlice.js';
import { configureStore } from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
        channels: channelsReducer,
        messages: messagesReducer,
        modals: modalsReducer,
    }
});
