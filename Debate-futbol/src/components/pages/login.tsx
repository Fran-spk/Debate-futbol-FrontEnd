import { useForm, type SubmitHandler } from "react-hook-form";
import { authService } from '../../services/authServices';
import { login as loginAction, logout, setNotifications } from "../../store/auth/slice";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useEffect, useState } from 'react'; 
import { notificationService } from "../../services/notificationServices";

export interface Inputs {
    email: string;
    password: string;
}

export const Login = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.User);
    const navigate = useNavigate();
    const [apiError, setApiError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    useEffect(() => {
        if (user) {
        dispatch(logout());
        }
        setApiError(null); 
    }, [dispatch]);

const onsubmit: SubmitHandler<Inputs> = async (data) => {
  setApiError(null);
  try {
    // 1️⃣ Login
    const response = await authService.login(data);
    dispatch(loginAction(response));

    // 2️⃣ Traer notificaciones
    try {
      const notis = await notificationService.getAll();
      if (Array.isArray(notis) && notis.length > 0) {
        dispatch(setNotifications(true));
      } else {
        dispatch(setNotifications(false));
      }
    } catch (err) {
      console.error("Error cargando notificaciones tras login", err);
    }

    navigate("/home");
  } catch (error) {
    setApiError("Hubo un error.");
  }      
};


    return (
        <div className="container d-flex justify-content-center" style={{marginTop:"8rem"}} >
            <div className="card shadow-sm p-4 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-success fw-bold mb-4 text-center">Iniciar sesión</h2>

                <form onSubmit={handleSubmit(onsubmit)}>

                    {apiError && (
                        <div className="alert alert-danger text-center py-2" role="alert">
                            {apiError}
                        </div>
                    )}

                    <div className="mb-3">
                        <input
                            type='email'
                            placeholder='Email...'
                            {...register("email", { required: "Email requerido" })}
                            className={`form-control border-success ${apiError ? 'is-invalid' : ''}`}
                        />
                        {errors.email && <small className="text-danger">{errors.email.message}</small>}
                    </div>

                    <div className="mb-3">
                        <input
                            type='password'
                            placeholder='Password...'
                            {...register("password", { required: "Password requerida" })}
                            className={`form-control border-success ${apiError ? 'is-invalid' : ''}`}
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