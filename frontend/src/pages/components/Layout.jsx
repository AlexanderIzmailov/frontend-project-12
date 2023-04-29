import { Link, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Nav from 'react-bootstrap/Nav';

import { useAuth } from '../../contexts/AuthContext.js';

export const Layout = () => {

  const { t } = useTranslation();

  const { authUser, setAuthUser, setIsLoggedIn, setToken } = useAuth();

  const logout = () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    setToken(null);
    localStorage.clear();

    return <Navigate to="login" />
  };

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Nav className="d-flex shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <Nav.Item>
              <Link className="navbar-brand nav-link align-middle" to="/">Hexlet Chat</Link>
            </Nav.Item>

            {authUser
              ?
              <Nav.Item className="ms-auto">
                <Link className="nav-link" to="login" onClick={logout}>{t('loginForm.logout')}</Link>
              </Nav.Item>
              :
              null
            }

          </div>
        </Nav>
        <Outlet />
      </div>
    </>
  )
};
