import React from "react";
import { Link } from 'react-router-dom';
import { useAppSelector } from "../hooks/store";

const ConfigMe: React.FC = () => {
  const user = useAppSelector((state) => state.auth.User);
    return (
        <li 
        className="nav-item dropdown" // d-flex + align-items-center centra verticalmente
        style={{ 
        listStyle: "none", 
        marginRight: "15px", 
        marginLeft: "15px",
    }}
    >
    <a 
        className="nav-link dropdown-toggle d-flex align-items-center" // también aseguramos que el <a> sea flex y centrado
        data-bs-toggle="dropdown" 
        href="#" 
        role="button" 
        aria-expanded="false"
        style={{
            backgroundColor: "#455849", 
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
        }}
    >
        {user?.name}
    </a>
       
          <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/miPerfil">
                        Mi perfil
                  </Link>
                </li>
                <li>
                   <Link className="dropdown-item" to="/miPerfil">
                        Notificaciones
                    </Link>
                </li>
                <li><hr className="dropdown-divider"/></li>
                <li>
                  <Link className="dropdown-item" to="/login">
                        Cerrar sesión
                  </Link>
                </li>
            </ul>
           
        </li>
    );
};

export default ConfigMe;
