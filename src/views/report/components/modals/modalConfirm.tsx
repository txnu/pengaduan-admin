import { useState } from "react";

interface ModalConfirmProps {
  onClose: () => void;
  onConfirm: (confirmationCode: string) => void;
  id: string;
}

const ModalConfirm = ({ onClose, onConfirm }: ModalConfirmProps) => {
  const [confirmationCode, setConfirmationCode] = useState("");

  return (
    <div className="modal justify-content-center" tabIndex={-1} role="dialog">
      <div
        className="modal-dialog "
        role="document"
        style={{ width: "500px", height: "400px" }}
      >
        <div
          className="modal-content"
          style={{ overflowY: "auto", maxHeight: "100%" }}
        >
          <div className="modal-header text-center">
            <h5 className="modal-title">Konfirmasi Laporan/Pengaduan</h5>
          </div>
          <div className="modal-body">
            <div className="table">
              <div className="table-row">
                <label htmlFor="name" className="form-label fw-bold">
                  Masukkan Kode Konfirmasi
                </label>
                <input
                  id="no_laporan"
                  type="text"
                  className="form-control"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Tutup
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onConfirm(confirmationCode)}
            >
              Terima Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
