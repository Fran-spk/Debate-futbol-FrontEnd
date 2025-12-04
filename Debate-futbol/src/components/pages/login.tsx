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

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  useEffect(() => {
    if(user){
      dispatch(logout());
    }
  }, []); 

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
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-sm p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-success fw-bold mb-4 text-center">Iniciar sesión</h2>

        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <input
              type='email'
              placeholder='Email...'
              {...register("email", { required: "Email requerido" })}
              className="form-control border-success"
            />
            {errors.email && <small className="text-danger">{errors.email.message}</small>}
          </div>

          <div className="mb-3">
            <input
              type='password'
              placeholder='Password...'
              {...register("password", { required: "Password requerida" })}
              className="form-control border-success"
            />
            {errors.password && <small className="text-danger">{errors.password.message}</small>}
          </div>

          <button type='submit' className="btn btn-success w-100 fw-semibold">
            Ingresar
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="mb-0">
            ¿No tenés cuenta?{" "}
            <Link to="/register" className="text-success text-decoration-none fw-semibold">
              Crear cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
