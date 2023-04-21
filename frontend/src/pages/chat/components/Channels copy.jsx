import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';
import { useSelector, useDispatch } from 'react-redux';
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
                <Button className="p-0 text-primary btn btn-group-vertical btn-light">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="gray"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {renderChannels(channels, currentChannelId, setCurrentChannelId)}
            </ul>
        </>
    )
}
