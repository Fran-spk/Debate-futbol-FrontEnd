import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/appRoutes'
import { useAppSelector } from '../hooks/store';


export const Nav =()=>{
  const user = useAppSelector(state=> state.auth.User);
  return (
    <>  
      <nav className='nav'>
          <Link to="/login">{user ? "Cerrar sesión" : "Login"}</Link>
          <Link to={'/miPerfil'}>Mi perfil</Link>
          <Link to={'/home'}>Home</Link>
      </nav>
     <AppRoutes/>
    </>
  );
}


