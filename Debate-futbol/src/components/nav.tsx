import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes';
import { useAppSelector } from '../hooks/store';

export const Nav = () => {
  const user = useAppSelector(state => state.auth.User);

  return (
    <div className="d-flex">

      <nav
        className="d-flex flex-column  p-3 border-end"
        style={{
          width: "220px",
          height: "100vh",
          position: "fixed",
          backgroundColor: "#77947bb8",
          border: "1px solid #2c2a2a",
          left: 0,
          top: 0
        }}
      >
        <h4 className="mb-4">Menú</h4>
       <Link className="nav-link text-secondary mb-2" to="/home">
        Home
      </Link>

      <Link className="nav-link text-secondary mb-2" to="/login">
        {user ? "Cerrar sesión" : "Login"}
      </Link>

      <Link className="nav-link text-secondary mb-4" to="/miPerfil">
        Mi perfil
      </Link>

      {user && user?.permissions?.includes("admin") && (
        <Link className="nav-link text-secondary mb-4" to="/users">
          Panel admin
        </Link>
      )}

      


      <Link 
        className="btn btn-success btn-lg rounded-pill shadow-sm mb-3 w-100" 
        to="/createPost"
      >
        Crear post
      </Link>


      </nav>

      <div style={{ marginLeft: "220px", width: "100%" }}>
        <AppRoutes />
      </div>
    </div>
  );
};
