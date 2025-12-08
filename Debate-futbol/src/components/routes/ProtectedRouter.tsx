import {Navigate, Outlet} from 'react-router-dom'
import ModalLogin from '../../modals/modalLogin';

interface Props{
    isAllowed: boolean,
    redirectTo?: string,
    children?: React.ReactNode
}

export const ProtectedRouter=({isAllowed, redirectTo='/login', children}: Props)=>{
    if(!isAllowed){
        if(redirectTo === '/login'){
          return <ModalLogin></ModalLogin>
        }
    return <Navigate to={redirectTo}></Navigate>
    }
    else{
        return children ? children : <Outlet/>;
    };
}