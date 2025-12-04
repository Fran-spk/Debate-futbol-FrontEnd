import { Routes, Route } from 'react-router-dom'
import { Login } from '../pages/login';
import { MiPerfil } from '../pages/miPerfil';
import { ProtectedRouter } from './ProtectedRouter';
import { useAppSelector } from '../../hooks/store';
import { Home } from '../pages/home';
import { Register } from '../pages/register';
import { CreatePost } from '../pages/createPost';
 
export const AppRoutes=()=> {
  const user = useAppSelector(state=> state.auth.User);
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path='/home' element={<Home/>}/>
       <Route element={<ProtectedRouter isAllowed={!!user} />}>
        <Route path="/miPerfil" element={<MiPerfil />} />
        <Route path="/createPost" element={<CreatePost />} />
       </Route>
       <Route path='/register' element={<Register/>}/>
   </Routes>
  );
}


