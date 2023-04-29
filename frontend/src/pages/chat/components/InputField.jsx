import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../contexts/AuthContext';
import { useChatApi } from '../../../contexts/ChatApiContext.js';

const InputField = () => {
  const { t } = useTranslation();
  const socket = useChatApi();
  const inputFieldRef = useRef(null);

  const { currentChannelId } = useSelector((state) => state.channels);

  // const [inputField, setInputField] = useState('');
  const [isInputActive, setInputActive] = useState(true);

  const { authUser } = useAuth();

  useEffect(() => {
    if (isInputActive) inputFieldRef.current?.focus();
  }, [isInputActive, currentChannelId]);

  // const sendMessage = (e) => {
  //     e.preventDefault();

  //     if (!socket.connected) {
  //         console.log('Problem with socket')
  //         return;
  //     }

  //     setInputActive(false)
  //     socket.emit(
  //         'newMessage',
  //         { body: inputField, channelId: currentChannelId, username: authUser },
  //         ({ status }) => {
  //             if (status === 'ok') {
  //                 setInputField('');
  //             } else {
  //                 console.log('Problem with connection')
  //             }
  //             setInputActive(true);
  //         });
  // }

  const sendMessage = (values) => {
    if (!socket.connected) {
      console.log(t('errors.socket'));
      return;
    }

    setInputActive(false);
    socket.emit(
      'newMessage',
      { body: filter.clean(values.body), channelId: currentChannelId, username: authUser },
      ({ status }) => {
        if (status !== 'ok') {
          console.log(t('errors.connection'));
        }
        setInputActive(true);
      }
    );
  }

  // const inputGroupClass = inputField.trim() ? "" : "has-validation"

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema: Yup.object({
      body: Yup.string().trim().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      sendMessage(values);
      resetForm();
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <Form.Group className="input-group">
          <Form.Control
            type="text"
            ref={inputFieldRef}
            aria-label={t('chat.inputLabel')}
            placeholder={t('chat.inputField')}
            onChange={formik.handleChange}
            value={formik.values.body}
            name="body"
            className="border-0 p-0 ps-2 form-control"
            disabled={!isInputActive}
          />
          <Button type="submit" className="btn btn-group-vertical" variant="outline-light" disabled={!(formik.isValid && formik.dirty) || !isInputActive}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="gray">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">{t('chat.send')}</span>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default InputField;
