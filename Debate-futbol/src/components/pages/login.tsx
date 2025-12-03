import { useForm, type SubmitHandler } from "react-hook-form";
import { authService } from '../../services/authServices';
import { login as loginAction, logout } from "../../store/auth/slice";

import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useEffect } from 'react';

export interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=> state.auth.User);

  useEffect(() => {
    const Setlogout = () => {
      if (user) {
        dispatch(logout());
      }
    };
    Setlogout();
  }, []);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await authService.login(data);
      if (response) {
        dispatch(loginAction(response));
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "24px",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onsubmit)}>
        <div>
          <input
            type='email'
            placeholder='Email...'
            {...register("email", { required: "email requerido" })}
          />
        </div>

        <div>
          <input
            type='password'
            placeholder='Password...'
            {...register("password", { required: "password requerida" })}
          />
        </div>

        <button type='submit'>Ingresar</button>
      </form>

      <div style={{ marginTop: "12px" }}>
        <p>
          ¿No tenés cuenta?{" "}
          <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};
