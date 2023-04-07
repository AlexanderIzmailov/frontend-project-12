import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
        updateMessage: messagesAdapter.updateOne,
    }
})

export default messagesSlice.reducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;