import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModalLogin: React.FC = () => {
  const [show, setShow] = useState(true); // Se abre automáticamente
  const navigate = useNavigate();

  const handleOk = () => {
    setShow(false);
    navigate('/login'); // Redirige al home
  };

  if (!show) return null; // No renderizamos nada si está cerrado

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(32,201,151,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: '#e0f7f4', color: '#05695e' }}>
          <div className="modal-header">
            <h5 className="modal-title">Inicio de sesión</h5>
            <button type="button" className="btn-close" onClick={handleOk}></button>
          </div>
          <div className="modal-body">
            <p>¡Necesitas iniciar sesión!</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" onClick={handleOk}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
