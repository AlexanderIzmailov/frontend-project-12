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

import { useTranslation } from 'react-i18next';

import toast from '../../components/toasts.js';

const AddChannel = ({ handleClose }) => {
    const { t } = useTranslation();
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
            console.log(t('errors.socket'))
            toast.error(t('errors.socket'))
            return;
        }

        setInputActive(false)
        socket.emit(
            'newChannel',
            { name: values.channelName },
            ({ status, data }) => {
                if (status === 'ok') {
                    dispatch(channelsAction.setCurrentChannelId(data.id))
                    toast.success(t('chat.toasts.addChannel'))
                } else {
                    console.log(t('errors.connection'))
                    toast.error(t('errors.connection'))
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
                .required(t('modals.errors.requiredField'))
                .notOneOf(channels, t('modals.errors.channelExist')),
        }),
        onSubmit: (values) => {
            addChannel(values)
            handleClose();
        },
    });

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="h4">{t('modals.addChannel')}</Modal.Title>
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
                            <Button className="me-2 btn btn-secondary" onClick={handleClose}>{t('modals.cancelBtn')}</Button>
                            <Button className="btn btn-primary" type="submit" disabled={!isInputActive}>{t('modals.sendBtn')}</Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    )
}

const RenameChannel = ({ handleClose }) => {
    const { t } = useTranslation();
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
            console.log(t('errors.socket'))
            toast.error(t('errors.socket'))
            return;
        }

        setInputActive(false)
        socket.emit(
            'renameChannel',
            { id: channelId, name: values.channelName },
            ({ status }) => {
                if (status === 'ok') {
                    toast.success(t('chat.toasts.renameChannel'))
                } else {
                    console.log(t('errors.connection'))
                    toast.error(t('errors.connection'))
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
                .required(t('modals.errors.requiredField'))
                .notOneOf(channels, t('modals.errors.channelExist')),
        }),
        onSubmit: (values) => {
            renameChannel(values)
            handleClose();
        },
    });

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="h4">{t('modals.renameChannel')}</Modal.Title>
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
                            <Button className="me-2 btn btn-secondary" onClick={handleClose}>{t('modals.cancelBtn')}</Button>
                            <Button className="btn btn-primary" type="submit" disabled={!isInputActive}>{t('modals.sendBtn')}</Button>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </>
    )
}

const RemoveChannel = ({ handleClose }) => {
    const { t } = useTranslation();
    const socket = useChatApi();
    const { channelId } = useSelector((state) => state.modals);

    const removeChannel = (e) => {
        e.preventDefault();
        if (!socket.connected) {
            console.log(t('errors.socket'))
            toast.error(t('errors.socket'))
            return;
        }

        socket.emit(
            'removeChannel',
            { id: channelId },
            ({ status }) => {
                if (status === 'ok') {
                    toast.success(t('chat.toasts.removeChannel'))
                } else {
                    console.log(t('erros.connection'))
                    toast.error(t('erros.connection'))
                }
                handleClose()
            });
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title className="h4">{t('modals.removeChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">{t('modals.removeChannelConfirm')}</p>
                <Form onSubmit={removeChannel}>
                    <Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button className="me-2 btn btn-secondary" onClick={handleClose}>{t('modals.cancelBtn')}</Button>
                            <Button className="btn btn-danger" type="submit">{t('modals.removeBtn')}</Button>
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

const Modals = () => {
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

export default Modals;
