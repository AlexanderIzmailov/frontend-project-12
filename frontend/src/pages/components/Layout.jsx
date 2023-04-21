import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

import Nav from 'react-bootstrap/Nav';

import { actions as modalsAction } from '../../store/slices/modalsSlice.js';
import { useDispatch, useSelector  } from 'react-redux';

// const test = () => {
//   // const dispatch = useDispatch();
//   // dispatch(modalsAction.setShowModal(true))
//   const channelId = useSelector((state) => state.modals.setShowModal(true));
// }




const LSRemove = () => {
  console.log(localStorage.removeItem('user'));
}

export const Layout = () => {
  const dispatch = useDispatch();

  const test = () => {
    dispatch(modalsAction.setModalType('RenameChannel'))
    dispatch(modalsAction.setShowModal(true))
    // const channelId = useSelector((state) => state.modals.setShowModal(true));
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Nav>
          <Nav.Item>
            <Link className="nav-link" to="/">Chat</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="api/v1/data">Server</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-link" to="login">Login</Link>
          </Nav.Item>
          <div className="text-center">
            <Button onClick={LSRemove} className="mx-auto" variant="warning">LS.remove</Button>
          </div>
          <div className="text-center">
            <Button onClick={handleShow} className="mx-auto" variant="warning">Test</Button>
          </div>
          <div className="text-center">
            <Button onClick={test} className="mx-auto" variant="warning">Test 2</Button>
          </div>

        </Nav>
        <Outlet />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="h4">Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                // ref={inputFieldRef}
                id="name"
                type="text"
                name="name"
                className="mb-2 form-control"
                // disabled={!isInputActive}
                // value={inputField}
                // onChange={(e) => setInputField(e.target.value)}
              />
              <Form.Label className="visually-hidden">
                Имя канала
              </Form.Label>
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
