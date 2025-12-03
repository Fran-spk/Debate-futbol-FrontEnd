import {Navigate, Outlet} from 'react-router-dom'

interface Props{
    isAllowed: boolean,
    redirectTo?: string,
    children?: React.ReactNode
}

export const ProtectedRouter=({isAllowed, redirectTo='/login', children}: Props)=>{
    if(!isAllowed){
        return <Navigate to={redirectTo}></Navigate>
    }
    else{
        return children ? children : <Outlet/>;
    }
}