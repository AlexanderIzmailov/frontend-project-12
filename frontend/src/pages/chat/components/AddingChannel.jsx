import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useRef, useEffect } from 'react';

import { selectors as channelsSelectors } from '../../../store/slices/channelsSlice.js';
import { useSelector, useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useChatApi } from '../../../contexts/ChatApiContext.js';

import { actions as channelsAction } from '../../../store/slices/channelsSlice.js';

export const AddingChannel = ({ channelsRef }) => {
    const socket = useChatApi();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const inputModalRef = useRef(null);
    const [isInputActive, setInputActive] = useState(true);

    useEffect(() => {
        if (showModal) inputModalRef.current?.focus();
    }, [showModal])

    const handleShow = () => {
        formik.values.channelName = "";
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);
    
    const channels = useSelector(channelsSelectors.selectAll).map((c) => c.name);

    const addChannel = (values) => {
        if (!socket.connected) {
            console.log('Problem with socket')
            return;
        }

        setInputActive(false)
        socket.emit(
            'newChannel',
            { name: values.channelName },
            ({ status, data }) => {
                if (status !== 'ok') {
                    console.log('Problem with connection')
                } else {
                    dispatch(channelsAction.setCurrentChannelId(data.id))
                }
                setInputActive(true);
            });
    }

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: Yup.object({
            channelName: Yup
                .string()
                .trim()
                .required('Обязательное поле')
                .notOneOf(channels, 'Должно быть уникальным'),
        }),
        onSubmit: (values) => {
            addChannel(values)
            setShowModal(false);
        },
    });

    return (
        <>
            <Button className="p-0 text-primary btn btn-group-vertical btn-light" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="gray"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
                <span className="visually-hidden">+</span>
            </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="h4">Добавить канал</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                ref={inputModalRef}
                                onChange={formik.handleChange}
                                value={formik.values.channelName}
                                name="channelName"
                                disabled={!isInputActive}
                                className={`mb-2 form-control ${formik.errors.channelName ? 'is-invalid' : ''}`}
                            />
                            <div className="invalid-feedback">
                                {formik.errors && formik.errors.channelName}
                            </div>
                            <div className="d-flex justify-content-end">
                                <Button className="me-2 btn btn-secondary" onClick={handleClose}>Отменить</Button>
                                <Button className="btn btn-primary" type="submit" disabled={!isInputActive}>Отправить</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}