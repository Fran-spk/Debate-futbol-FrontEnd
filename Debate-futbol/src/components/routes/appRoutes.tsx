import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login';
import { MiPerfil } from '../pages/miPerfil';
import { ProtectedRouter } from './ProtectedRouter';
import { useAppSelector } from '../../hooks/store';
import { Home } from '../pages/home';
 
export const AppRoutes=()=> {
  const user = useAppSelector(state=> state.auth.User);
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path='/home' element={<Home/>}/>
      <Route
            path="/miPerfil" 
            element={
                <ProtectedRouter
                isAllowed={!!user}>
                <MiPerfil/>
                </ProtectedRouter>
            }/>
   </Routes>
  );
}


