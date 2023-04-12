import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';

import io from 'socket.io-client';

const test = () => {
  //  routes.authorise('admin', 'admin')
  //   .then((response) => response.data.token)
  //   .then((token) => routes.getData(token))
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log('ERR: ', err.response.data))
  // const { token } = useAuth();
  // console.log('TOKENNL ', token)
  // document.querySelector('html').classList.add('h-100')
  // document.body.classList.add('h-100')
  // document.querySelector('#root').classList.add('h-100')
  
    // socket.on('connection', (newSocket) => {
  //   console.log('User connnnnected');
  //   newSocket.on('disconnect', () => {
  //     console.log('User disconnnnected')
  //   })
  // })
  // socket.emit('newMessage', 'Test message 1')
  
  // const socket = io();
  // socket.emit('newMessage', { body: "message text", channelId: 1, username: 'admin' });
  // socket.on('newMessage', (msg) => {
  //   console.log('New message: ', msg)
  // })

}



const LSRemove = () => {
  console.log(localStorage.removeItem('user'));
}

export const Layout = () => {
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
            <Button onClick={test} className="mx-auto" variant="warning">Test</Button>
          </div>

        </Nav>
        <Outlet />
      </div>
    </>
  )
}
