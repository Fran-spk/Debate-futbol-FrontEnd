import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import { useAppSelector } from '../hooks/store';
import '../styles/nav.css';

export const Nav = () => {
  const user = useAppSelector(state => state.auth.User);

  return (
    <div className="d-flex flex-column flex-md-row">
      <nav className="sidebar p-3 border-end">
        <h2 className="fs-4 fw-bold text-dark mb-3 mt-3">Debates de futbol</h2>
        <h4 className="mb-5 d-none d-md-block">Menú</h4>

        <div className="nav-links d-flex flex-md-column">
          <Link className="nav-link text-secondary mb-3 fs-4" to="/home">
            Home
          </Link>

          <Link className="nav-link text-secondary mb-3 fs-5" to="/users">
            Comunidad
          </Link>
          

          <Link className="nav-link text-secondary mb-3 fs-5" to="/miPerfil">
            Mi perfil
          </Link>

          <Link className="nav-link text-secondary mb-3 fs-5" to="/login">
            {user ? "Cerrar sesión" : "Login"}
          </Link>

          <Link
              className="btn btn-success btn-sm btn-md-lg rounded-pill shadow-sm mb-3 w-100 fs-5 fw-bold"
              to="/createPost" >
              Crear post
          </Link>
        </div>
      </nav>
      <div className="content">
        <AppRoutes />
      </div>
    </div>
  );
};