import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    currentChannelId: null,
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        updateChannel: channelsAdapter.updateOne,
        setCurrentChannelId: (state, { payload }) => {
            state.currentChannelId = payload;
        },
    }
})

export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;