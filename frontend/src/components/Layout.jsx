import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Nav from 'react-bootstrap/Nav';

const LSRemove = () => {
  console.log(localStorage.removeItem('user'));
}

export const Layout = () => {
  return (
    <>
        <header>
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

          </Nav>
        </header>

        <div className="h-100">
          <Outlet />
        </div>
    </>
  )
}
