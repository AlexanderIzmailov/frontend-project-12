/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  defaultChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannelId: (state, { payload }) => {
      state.defaultChannelId = payload;
    },
  },
});

export default channelsSlice.reducer;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
