import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import routes from '../../routes.js';

import { useDispatch } from 'react-redux';
import { actions as channelsAction } from '../../store/slices/channelsSlice.js';
import { actions as messagesAction } from '../../store/slices/messagesSlice.js';

import { Channels } from './components/Channels.jsx';
import { Messages } from './components/Messages.jsx';
import { InputField } from './components/InputField.jsx';

import Modals from './components/Modals.jsx';

export const Chat = () => {
    const dispatch = useDispatch();

    const { token } = useAuth();

    useEffect(() => {
        routes.getData(token)
            .then((response) => {
                const { channels, messages, currentChannelId} = response.data;

                dispatch(channelsAction.addChannels(channels))
                dispatch(messagesAction.addMessages(messages))
                dispatch(channelsAction.setCurrentChannelId(currentChannelId))
                dispatch(channelsAction.setDefaultChannelId(currentChannelId))
            })
            .catch((err) => console.log('ERROR: ', err.response))
    }, [token, dispatch])

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex" sm={3}>
                    <Channels />
                </Col>
                <Col className="p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <Messages/>
                        <InputField />
                    </div>
                </Col>
            </Row>
            <Modals />
        </Container>
    )
}
