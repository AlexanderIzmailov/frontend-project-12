import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const modalsAdapter = createEntityAdapter();

const initialState = modalsAdapter.getInitialState({
    showModal: false,
    modalType: null,
    channelId: null,
});

const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setShowModal: (state, { payload }) => {
            state.showModal = payload;
        },
        setModalType: (state, { payload }) => {
            state.modalType = payload;
        },
        setChannelId: (state, { payload }) => {
            state.channelId = payload;
        },
    }
})

export default modalSlice.reducer;
export const selectors = modalsAdapter.getSelectors((state) => state.modals);
export const { actions } = modalSlice;
