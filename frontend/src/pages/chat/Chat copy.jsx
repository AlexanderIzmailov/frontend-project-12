import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import routes from '../../routes.js';

import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsAction } from '../../store/slices/channelsSlice.js';
import { actions as messagesAction } from '../../store/slices/messagesSlice.js';

import { useChatApi } from '../../contexts/ChatApiContext.js';

import store from '../../store/index.js';

import { Channels } from './components/Channels.jsx';
import { Messages } from './components/Messages.jsx';

export const Chat = () => {
    const socket = useChatApi();

    const inputFieldRef = useRef(null);

    const [inputField, setInputField] = useState('');    
    const [isInputActive, setInputActive] = useState(true);

    const dispatch = useDispatch();

    const { currentChannelId } = useSelector((state) => state.channels);

    const {
        token,
        authUser,
    } = useAuth();

    useEffect(() => {
        if (isInputActive) {
            inputFieldRef.current?.focus();
        }
    }, [isInputActive])

    useEffect(() => {
        routes.getData(token)
            .then((response) => {
                const channelsFromServ = response.data.channels;
                const messagesFromServ = response.data.messages;
                const currentChannelIdFromServ = response.data.currentChannelId;

                dispatch(channelsAction.addChannels(channelsFromServ))
                dispatch(messagesAction.addMessages(messagesFromServ))
                dispatch(channelsAction.setCurrentChannelId(currentChannelIdFromServ))
            })
            .catch((err) => console.log('ERROR: ', err.response))
    }, [token, dispatch])

    const sendMessage = (e, setInputActive) => {
        e.preventDefault();

        if (!socket.connected) {
            console.log('Problem with socket')
            return;
        }

        setInputActive(false)
        socket.emit(
            'newMessage',
            { body: inputField, channelId: currentChannelId, username: authUser },
            (response) => {
                if (response.status === 'ok') {
                    setInputActive(true);
                    setInputField('');
                } else {
                    setTimeout(() => {
                        setInputActive(true);
                    }, 3000)
                }
            });
    }

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex" sm={3}>
                    <Channels />
                </Col>
                <Col className="p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <Messages/>
                        <div className="mt-auto px-5 py-3">
                            <Form noValidate className="py-1 border rounded-2" onSubmit={(e) => sendMessage(e, setInputActive)}>
                                <div className="input-group has-validation">
                                    <Form.Control
                                        ref={inputFieldRef}
                                        type="text"
                                        placeholder="Enter message..."
                                        className="border-0 p-0 ps-2 form-control"
                                        disabled={!isInputActive}
                                        value={inputField}
                                        onChange={(e) => setInputField(e.target.value)}
                                    />
                                    <Button type="submit" className="btn btn-group-vertical">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
                                        <span className="visually-hidden">Send</span>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
