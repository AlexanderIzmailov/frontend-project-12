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

import { actions as modalsAction } from '../../../store/slices/modalsSlice.js';

const AddChannel = ({ handleClose }) => {
    const socket = useChatApi();
    const dispatch = useDispatch();
    const inputModalRef = useRef(null);
    const [isInputActive, setInputActive] = useState(true);
    const { showModal } = useSelector((state) => state.modals);

    useEffect(() => {
        if (showModal) inputModalRef.current?.focus();
    }, [showModal])

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
            handleClose();
        },
    });

    return (
        <>
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
        </>
    )
}

const RenameChannel = ({ handleClose }) => {
    const socket = useChatApi();
    const inputModalRef = useRef(null);
    const [isInputActive, setInputActive] = useState(true);
    const { showModal, channelId } = useSelector((state) => state.modals);

    useEffect(() => {
        if (showModal) inputModalRef.current?.focus();
    }, [showModal])

    const channels = useSelector(channelsSelectors.selectAll).map((c) => c.name);

    const renameChannel = (values) => {
        if (!socket.connected) {
            console.log('Problem with socket')
            return;
        }

        setInputActive(false)
        socket.emit(
            'renameChannel',
            { id: channelId, name: values.channelName },
            ({ status }) => {
                if (status !== 'ok') {
                    console.log('Problem with connection')
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
            renameChannel(values)
            handleClose();
        },
    });

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="h4">Переименовать канал</Modal.Title>
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
        </>
    )
}

const RemoveChannel = ({ handleClose }) => {
    const socket = useChatApi();
    const { channelId } = useSelector((state) => state.modals);

    const removeChannel = (e) => {
        e.preventDefault();
        if (!socket.connected) {
            console.log('Problem with socket')
            return;
        }

        socket.emit(
            'removeChannel',
            { id: channelId },
            ({ status }) => {
                if (status !== 'ok') {
                    console.log('Problem with connection')
                }
                handleClose()
            });
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="h4">Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">Уверены?</p>
                <Form onSubmit={removeChannel}>
                    <Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button className="me-2 btn btn-secondary" onClick={handleClose}>Отменить</Button>
                            <Button className="btn btn-danger" type="submit">Удалить</Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    )
}

const channelTypes = {
    AddChannel,
    RenameChannel,
    RemoveChannel,
}

export default () => {
    const dispatch = useDispatch();
    const { showModal, modalType } = useSelector((state) => state.modals);
    const handleClose = () => {
        dispatch(modalsAction.setShowModal(false));
    }

    const CurrentModal = channelTypes[modalType];

    return (
        <Modal show={showModal} onHide={handleClose}>
            {CurrentModal && <CurrentModal handleClose={handleClose} />}
        </Modal>
    )
}
