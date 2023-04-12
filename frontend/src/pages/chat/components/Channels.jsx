import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';
import { useSelector, useDispatch, useEffect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { actions as channelsAction } from '../../../store/slices/channelsSlice.js';

const renderChannels = (channels, currentChanelId, setCurrentChannelId) => {
    return channels.map(({ name, id}) => {
        const btnClass = id === currentChanelId ? 'btn-secondary' : 'btn-light';
        return (
            <li className="nav-item w-100" key={id}>
                <Button onClick={() => setCurrentChannelId(id)} className={`w-100 rounded-0 text-start btn ${btnClass}`}>
                    <span className="me-1">#</span>
                    {name}
                </Button>
            </li>
        )
    })
}

export const Channels = () => {
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);

    const { currentChannelId } = useSelector((state) => state.channels);

    const setCurrentChannelId = (id) => dispatch(channelsAction.setCurrentChannelId(id))

    return (
        <>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Chanels</b>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {renderChannels(channels, currentChannelId, setCurrentChannelId)}
            </ul>
        </>
    )
}
