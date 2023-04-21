import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

import { actions as channelsAction } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
        updateMessage: messagesAdapter.updateOne,
        removeMessages: messagesAdapter.removeMany,
    },
    extraReducers: (builder) => {
        builder.addCase(channelsAction.removeChannel, (state, action) => {
            const channelId = action.payload;
            const restEntities = Object.values(state.entities).filter((e) => e.channelId !== channelId);
            messagesAdapter.setAll(state, restEntities);
        })
    },
})

export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;