import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { authService } from "../../services/authServices"; 
import { getClubs as getTeams, type team } from "../../services/clubServices"; 
import type { user } from "../../types/user";
import { useAppSelector } from "../../hooks/store";
import ModalUserCreated from "../../modals/modalUserCreated";
import ModalLogin from "../../modals/modalLogin";

export const Register = () => {

    const [teams, setTeams] = useState<team[]>([]); 
    const [isLoadingTeams, setIsLoadingTeams] = useState(true);

    const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm<user>();

   
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeams(); 
                setTeams(response);
            } catch (error) {
                console.error("Error cargando equipos:", error); 
            } finally {
                setIsLoadingTeams(false); 
            }
        };
        fetchTeams();
    }, []); 


    const [showModalLogin, setShowModalLogin] = useState(false);

   
    const onsubmit: SubmitHandler<user> = async (data) => {
        const response = await authService.register(data);
        if (response) {
            setShowModalLogin(true); 
        }
        else{
            console.log(errors);
        }
    };


    return (
        <div className="container mt-4" style={{ maxWidth: "500px" }}>
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit(onsubmit)}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", {
                            required: "El nombre es obligatorio",
                        })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Formato de email inválido",
                            },
                        })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="team" className="form-label">Equipo Favorito</label> 
                    <select
                        id="team"
                        className={`form-control ${errors.team ? "is-invalid" : ""}`} 
                        {...register("team", { 
                            required: "Debes seleccionar un equipo"
                        })}
                        disabled={isLoadingTeams} 
                    >
                        <option value="">
                            {isLoadingTeams ? "Cargando equipos..." : "Selecciona un equipo..."}
                        </option>

                        {teams.map((t) => ( 
                            <option key={t.id} value={t.team}>
                                {t.team}
                            </option>
                        ))}
                    </select>

                    {errors.team && <div className="invalid-feedback">{errors.team.message}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "Debe tener al menos 6 caracteres",
                            },
                        })}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isSubmitting || isLoadingTeams} 
                >
                    {isSubmitting ? "Registrando..." : "Registrarme"}
                </button>
            </form>
              {showModalLogin && <ModalUserCreated />}
        </div>
    );
};
