import { Link, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header>
        <ul>
          <li><Link to="/">Chat</Link></li>
          <li><Link to="/api/v1/data">Server</Link></li>
        </ul>
      </header>
      <Outlet />
      <footer>2023</footer>
    </>
  )
}