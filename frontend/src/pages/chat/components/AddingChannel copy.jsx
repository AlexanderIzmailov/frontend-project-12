import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';

import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';
import { useSelector, useDispatch } from 'react-redux';

// const useCheckExist = (e) => {
//     e.preventDefault();
//     const channels = useSelector(channelsSelectors.selectAll);
//     const find = channels.find((channel) => channel.name === name)

//     if (find) {
//         console.log('FALSE')
//         return false
//     }
//     console.log('TRUE')
//     return true
// }

export const AddingChannel = () => {
    const [show, setShow] = useState(false);
    const inputFieldRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const channels = useSelector(channelsSelectors.selectAll);

    useEffect(() => {
        if (show) inputFieldRef.current?.focus();
    }, [show])
    
    // const channels = useSelector(channelsSelectors.selectAll);
    const [inputField, setInputField] = useState('');

    const checkUniq = (e) => {
        e.preventDefault();
        const find = channels.find((channel) => channel.name === inputField)
    
        if (find) {
            console.log('FALSE')
            return false
        }
        console.log('TRUE')
        return true
    }
    return (
        <>
            <Button className="p-0 text-primary btn btn-group-vertical btn-light" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="gray"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                <span className="visually-hidden">+</span>
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="h4">Добавить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={checkUniq}>
                        <Form.Group>
                            <Form.Control
                                ref={inputFieldRef}
                                required
                                id="name"
                                type="text"
                                name="name"
                                className="mb-2 form-control"
                                onChange={(e) => setInputField(e.target.value)}
                            // value={inputField}
                            // onChange={(e) => setInputField(e.target.value)}
                            />
                            <Form.Label className="visually-hidden">Имя канала</Form.Label>
                            <div className="invalid-feedback"></div>
                            <div className="d-flex justify-content-end">
                                <Button className="me-2 btn btn-secondary">Отменить</Button>
                                <Button className="btn btn-primary" type="submit">Отправить</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}