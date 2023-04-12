import { useChatApi } from '../../../contexts/ChatApiContext.js';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../../contexts/AuthContext';
import { useSelector } from 'react-redux';

export const InputField = () => {
    const socket = useChatApi();
    const inputFieldRef = useRef(null);

    const { currentChannelId } = useSelector((state) => state.channels);

    const [inputField, setInputField] = useState('');
    const [isInputActive, setInputActive] = useState(true);

    const { authUser } = useAuth();

    useEffect(() => {
        if (isInputActive) inputFieldRef.current?.focus();
    }, [isInputActive, currentChannelId])


    const sendMessage = (e) => {
        e.preventDefault();

        if (!socket.connected) {
            console.log('Problem with socket')
            return;
        }

        setInputActive(false)
        socket.emit(
            'newMessage',
            { body: inputField, channelId: currentChannelId, username: authUser },
            ({ status }) => {
                if (status === 'ok') {
                    setInputField('');
                } else {
                    console.log('Problem with connection')
                }
                setInputActive(true);
            });
    }

    return (
        <div className="mt-auto px-5 py-3">
            <Form noValidate className="py-1 border rounded-2" onSubmit={sendMessage}>
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
    )
}