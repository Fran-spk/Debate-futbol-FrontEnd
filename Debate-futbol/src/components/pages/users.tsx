import React, { useEffect, useState } from "react";
import { userService } from "../../services/userServicies";
import { useAppSelector } from "../../hooks/store";
import type { user } from "../../types/user";
import { Link } from "react-router-dom";
import ModalDelete from "../../modals/modalDelete";   


export const Users = () => {

  const currentUser = useAppSelector((state) => state.auth.User);
  
  const [users, setUsers] = useState<user[]>([]);
  const [loading, setLoading] = useState(true);


  const [userSelected, setUserSelected] = useState<user | null>(null);
  

  const isAdmin = currentUser?.permissions?.includes('admin');

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const clickDelete = (user: user) => {
    setUserSelected(user);
  };


  const handleDelete = async (confirmed:boolean) => {

    if(!confirmed || !userSelected) {
      setUserSelected(null);
      return;
    }

    try {
      await userService.delete(userSelected);
      setUsers(users.map((u => 
        u._id === userSelected._id ? { ...u, active: false } : u
      )));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
      alert("No se pudo eliminar al usuario.");
    } finally {
      setUserSelected(null);
    }
  };


  const handleActive = async (user: user) => {
    try {
      await userService.activeUser(user);
      alert("Estado del usuario actualizado.");
    
      setUsers(users.map((u => 
        u._id === user._id ? { ...u, active: true } : u
      )));

    } catch (error) {
      console.error("Error activando al usuario:", error);
      alert("No se pudo actualizar el estado del usuario.");
    }
  }

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-success"></div></div>;

  
return (
    <div className="container mt-4">
      <h3 className="mb-4 text-start text-success fw-bold">
        Comunidad ({users.length})
      </h3>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {users.map((userItem) => {
          
          const userId = userItem._id;
          const isActive = userItem.active === true;

          return (
            <div className="col" key={userId}>
              <div 
                className={`card h-100 shadow-sm ${!isActive ? 'border-danger bg-light opacity-75' : 'border-success-subtle'}`}
                style={{
                   backgroundColor: isActive ? "#77947bb8" : "#f8d7da",
                   border: "1px solid #2c2a2a",
                }}
              >
                
                <div className="card-body d-flex flex-column align-items-center text-center">
                  
                  {/* 1. Nombre */}
                  <h5 className="card-title fw-bold text-dark mb-1">
                    {userItem.name}
                  </h5>

                  {/* 2. Email */}
                  <p className="text-muted small mb-2 text-truncate" style={{maxWidth: "100%"}}>
                    {userItem.email}
                  </p>

                  {/* 3. Equipo */}
                  <div className="mb-2">
                    <span className="badge bg-light text-success border border-success">
                      {userItem.team || "Sin equipo"}
                    </span>
                  </div>

                  {/* 4. Estado (Activo / Inactivo) */}
                  <div className="mb-4">
                    {isActive ? (
                        <span className="badge bg-success rounded-pill">Activo</span>
                    ) : (
                        <span className="badge bg-danger rounded-pill">Inactivo</span>
                    )}
                  </div>

                  {/* Botonera (al fondo) */}
                  <div className="mt-auto d-flex gap-2 w-100 justify-content-center">
                    <Link 
                      to={`/miPerfil/${userId}`} 
                      className="btn btn-outline-dark btn-sm rounded-pill px-3 bg-white"
                    >
                      Ver Perfil
                    </Link>

                    {/* LÓGICA DE BOTONES ADMIN */}
                    {isAdmin && currentUser?._id !== userId && (
                        <>
                            {isActive && (
                                <button
                                    className="btn btn-danger btn-sm rounded-pill px-3"
                                    onClick={() => clickDelete(userItem)}
                                >
                                    Eliminar
                                </button>
                            )}

                            {!isActive && (
                                <button
                                    className="btn bg-success btn-primary btn-sm rounded-pill px-3"
                                    onClick={() => handleActive(userItem)}
                                >
                                    Activar
                                </button>
                            )}
                        </>
                    )}
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
      {userSelected && (
        <ModalDelete 
          onConfirm={handleDelete} 
        />
      )}

    </div>
  );
};