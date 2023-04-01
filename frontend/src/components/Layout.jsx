import { Link, Outlet } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';

export const Layout = () => {
  return (
    <>
      <header className="container">
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
        </Nav>
      </header>
      <Outlet />
    </>
  )
}