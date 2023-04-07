import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import routes from './routes.js';

import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsAction } from '../slices/channelsSlice.js';
import { actions as messagesAction } from '../slices/messagesSlice.js';

import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const renderChannels = (channels) => {
    return channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
            <Button className="w-100 rounded-0 text-start btn btn-light">
                <span className="me-1">#</span>
                {channel.name}
            </Button>
        </li>
    ))
}

const renderMessages = (messages) => {
    return (
        messages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
                <b>{message.author}</b>
                : {message.text}
            </div>
        ))
    )
}

export const Chat = () => {
    const dispatch = useDispatch();
    const channels = useSelector(channelsSelectors.selectAll);
    const messages = useSelector(messagesSelectors.selectAll);

    // const [channels, setChannels] = useState([]);
    // const [messages, setMessages] = useState([]);
    const {
        token,
    } = useAuth();

    useEffect(() => {
        routes.getData(token)
            .then((response) => {
                const channelsFromServ = response.data.channels;
                const messagesFromServ = response.data.messages;

                // setChannels(channelsFromServ);
                // setMessages(messagesFromServ);

                dispatch(channelsAction.addChannels(channelsFromServ))
                dispatch(messagesAction.addMessages(messagesFromServ))
            })
            .catch((err) => console.log('ERR: ', err.response))
    }, [])

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white flex-md-row">
                <Col xs={4} md={2} className="border-end px-0 bg-light flex-column h-100 d-flex" sm={3}>
                    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                        <b>Chanels</b>
                    </div>
                    <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                        {renderChannels(channels)}
                    </ul>
                </Col>
                <Col className="p-0 h-100">
                    <div className="d-flex flex-column h-100">
                        <div className="bg-light mb-4 p-3 shadow-sm small">
                            <p className="m-0">
                                <b># X channel</b>
                            </p>
                            <span className="text-muted">X mesages</span>
                        </div>
                        <div className="overflow-auto px-5">
                            {renderMessages(messages)}
                        </div>
                        <div className="mt-auto px-5 py-3">
                            <Form noValidate className="py-1 border rounded-2">
                                <div className="input-group has-validation">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter message..."
                                        className="border-0 p-0 ps-2 form-control"
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
