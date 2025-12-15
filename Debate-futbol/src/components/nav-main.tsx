import { useAppSelector } from "../hooks/store";
import ConfigMe from "./configMe";
import { Link } from "react-router-dom";

export default function MainNav() {
  const user = useAppSelector((state) => state.auth.User);
  const Notifications = useAppSelector(
    (state) => state.auth.Notifications
  );

  return (
    <nav className="navbar fixed-top" style={{ backgroundColor: "#55605a" }}>
      <div className="container-fluid d-flex align-items-center">
        <span className="navbar-brand text-white fw-bold ms-5">
          Debates Futbol
        </span>

        {user ? (
          <div className="ms-auto me-3 d-flex align-items-center gap-2">
            {Notifications && (
              <span className="badge bg-warning text-dark">
                ¡Notificaciones nuevas!
              </span>
            )}
            <ConfigMe />
          </div>
        ) : (
          <Link className="btn btn-light text-dark me-4" to="/login">
            Iniciar sesión
          </Link>
        )}
      </div>
    </nav>
  );
}
