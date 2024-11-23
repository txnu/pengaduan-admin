import { useEffect, useState } from "react";
import ModalConfirm from "./modalConfirm";
import { AlertSuccess } from "../../../../components/alert/alert_success";

interface ModalProps {
  onClose: () => void;
  edit: boolean;
  showConfirmButton: boolean;
  id: string;
}

const Modal = ({ onClose, edit, showConfirmButton, id }: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [inputNoLaporan, setInputNoLaporan] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputNIK, setInputNIK] = useState("");
  const [inputAlamat, setInputAlamat] = useState("");
  const [inputTTL, setInputTTL] = useState("");
  const [inputPekerjaan, setInputPekerjaan] = useState("");
  const [inputKronologi, setInputKronologi] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/pengaduan/getbyid/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const getlaporan = await response.json();
        const laporan = getlaporan.data;

        setInputNoLaporan(laporan.nomorLaporan);
        setInputKronologi(laporan.kronologi);
        setInputCode(laporan.kodeVerifikasi);

        if (laporan.idUser) {
          const userResponse = await fetch(
            `http://localhost:5001/user/getbyid/${laporan.idUser}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await userResponse.json();
          const user = userData.data;
          setInputName(user.namalengkap);
          setInputNIK(user.NIK);
          setInputAlamat(user.alamat);
          setInputTTL(user.tanggal_lahir);
          setInputPekerjaan(user.pekerjaan);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Terjadi Kesalahan: " + errorMessage);
        console.error("Terjadi Kesalahan", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

  const handleConfirm = async (confirmationCode: string) => {
    if (confirmationCode === inputCode) {
      try {
        await fetch(`http://localhost:5001/pengaduan/edit/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: 1,
            nomorLaporan: inputNoLaporan,
            NIK: inputNIK,
            kronologi: inputKronologi,
            namalengkap: inputName,
          }),
        });

        setIsModalConfirmOpen(false);
        setTimeout(() => {
          const toastElement = document.getElementById("successToast");
          if (toastElement) {
            toastElement.classList.remove("hide");
            toastElement.classList.add("show");

            setTimeout(() => {
              toastElement.classList.remove("show");
              toastElement.classList.add("hide");
              window.location.reload();
            }, 2300);
          }
        }, 500);
      } catch (error) {
        console.error("Failed to update:", error);
      }
    } else {
      alert("Kode konfirmasi tidak sesuai.");
    }
  };

  const openModalConfirm = () => {
    setIsModalOpen(false);
    setIsModalConfirmOpen(true);
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return alert("Error");
    }
  };

  const closeModalConfirm = () => {
    setIsModalConfirmOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div
          className="modal justify-content-center d-flex align-items-center"
          tabIndex={-1}
          role="dialog"
        >
          <div
            className="modal-dialog border border-4 border-radius-xl border-dark"
            role="document"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <div
              className="modal-content"
              style={{
                overflowY: "auto",
                borderRadius: "10px",
                border: "none",
              }}
            >
              <div className="modal-header border-bottom">
                <h5 className="modal-title text-center w-100">
                  Laporan Kehilangan
                </h5>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <label className="form-label fw-bold">NOMOR LAPORAN</label>
                  <input
                    id="no_laporan"
                    type="text"
                    className="form-control"
                    value={inputNoLaporan || ""}
                    onChange={(e) => setInputNoLaporan(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Nama</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">NIK</label>
                  <input
                    id="nik"
                    type="number"
                    className="form-control"
                    value={inputNIK}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,16}$/.test(value)) {
                        setInputNIK(value);
                      }
                    }}
                    maxLength={16}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Tempat/ Tanggal Lahir
                  </label>
                  <input
                    id="tanggal_lahir"
                    type="text"
                    className="form-control"
                    value={inputTTL}
                    onChange={(e) => setInputTTL(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Pekerjaan</label>
                  <input
                    id="pekerjaan"
                    type="text"
                    className="form-control"
                    value={inputPekerjaan}
                    onChange={(e) => setInputPekerjaan(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Alamat</label>
                  <input
                    id="alamat"
                    type="text"
                    className="form-control"
                    value={inputAlamat}
                    onChange={(e) => setInputAlamat(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Kronologi</label>
                  <textarea
                    id="kronologi"
                    className="form-control"
                    value={inputKronologi}
                    onChange={(e) => setInputKronologi(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  style={{ width: "45%" }}
                >
                  Tutup
                </button>
                {showConfirmButton && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={openModalConfirm}
                    style={{ width: "45%" }}
                  >
                    Konfirmasi
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalConfirmOpen && (
        <ModalConfirm
          onClose={closeModalConfirm}
          onConfirm={handleConfirm}
          id={id}
        />
      )}

      <AlertSuccess
        title="Konfirmasi Berhasil"
        time="Baru Saja"
        message={`Data Berhasil Di Konfirmasi dengan Nomor Laporan : \n <strong>${inputNoLaporan}</strong>`}
      />
    </>
  );
};

export default Modal;
