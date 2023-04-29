import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectors as channelsSelectors,
  actions as channelsAction,
} from '../../../store/slices/channelsSlice.js';
import { actions as modalsAction } from '../../../store/slices/modalsSlice.js';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const { currentChannelId, defaultChannelId } = useSelector((state) => state.channels);

  const setCurrentChannelId = (id) => dispatch(channelsAction.setCurrentChannelId(id));
  const channelsRef = useRef();
  const lastChannelsItemId = channels.at(-1)?.id;

  const renameChannel = (id) => {
    dispatch(modalsAction.setChannelId(id));
    dispatch(modalsAction.setModalType('RenameChannel'));
    dispatch(modalsAction.setShowModal(true));
  };

  const removeChannel = (id) => {
    dispatch(modalsAction.setChannelId(id));
    dispatch(modalsAction.setModalType('RemoveChannel'));
    dispatch(modalsAction.setShowModal(true));
  };

  const addChannel = () => {
    dispatch(modalsAction.setModalType('AddChannel'));
    dispatch(modalsAction.setShowModal(true));
  };

  const createDropdown = (btnClass, id) => (
    <Dropdown>
      <Dropdown.Toggle className={`rounded-0 flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${btnClass}`}>
        <span className="visually-hidden">{t('chat.manageChannelSpan')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => removeChannel(id)}>{t('chat.removeChannel')}</Dropdown.Item>
        <Dropdown.Item onClick={() => renameChannel(id)}>{t('chat.renameChannel')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderChannels = () => channels.map(({ name, id, removable }) => {
    const btnClass = id === currentChannelId ? 'btn-secondary' : 'btn-light';
    const mainButton = (
      <Button onClick={() => setCurrentChannelId(id)} className={`w-100 rounded-0 text-start text-truncate ${btnClass}`}>
        <span className="me-1">#</span>
        {name}
      </Button>
    );

    return (
      <li className="nav-item w-100" key={id}>
        {removable
          ? (
            <div role="group" className="d-flex dropdown btn-group show">
              {mainButton}
              {createDropdown(btnClass, id)}
            </div>
          ) : (
            <>
              {mainButton}
            </>
          )}
      </li>
    );
  });

  useEffect(() => {
    if (currentChannelId === defaultChannelId) {
      channelsRef.current.scrollTop = 0;
    }
    if (currentChannelId === lastChannelsItemId) {
      channelsRef.current.scrollTop = channelsRef.current.scrollHeight;
    }
  }, [currentChannelId, lastChannelsItemId, defaultChannelId]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channelsTitle')}</b>
        {/* <AddingChannel channelsRef={channelsRef} /> */}
        <Button className="p-0 text-primary btn btn-group-vertical btn-light" onClick={addChannel}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="gray">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <ul ref={channelsRef} className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {renderChannels()}
      </ul>
    </>
  );
};

export default Channels;
