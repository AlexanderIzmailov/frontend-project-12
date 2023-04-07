import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        updateChannel: channelsAdapter.updateOne,
    }
})

export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;