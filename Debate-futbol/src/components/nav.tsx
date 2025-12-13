import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';

import '../styles/nav.css';

export const Nav = () => {

  return (
    <div className="d-flex flex-column flex-md-row">
      <nav className="sidebar p-3 border-end mt-5" style={{ backgroundColor: "#d5d1d1" }}>
        <h4 className="mb-5 d-none d-md-block mt-3">Menú</h4>

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