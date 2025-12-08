import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ModalDeleteProps {
  onConfirm: (confirmed: boolean) => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ onConfirm }) => {
  const handleOk = () => {
    onConfirm(true); 
  };

  const handleClose = () => {
    onConfirm(false);
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(201, 133, 32, 0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: '#e0f7f4', color: '#05695e' }}>
          <div className="modal-header">
            <h5 className="modal-title">Confirmar eliminación</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p>¿Estas seguro?</p>
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

export default ModalDelete;
