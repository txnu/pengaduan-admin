import { useEffect, useState } from "react";

interface ModalProps {
  onClose: () => void;
  edit: boolean;
  id: string;
}

const ModalNews = ({ onClose, edit, id }: ModalProps) => {
  const [isModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [judul, setJudul] = useState("");
  const [publikasi, setPublikasi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/berita/getbyid/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const getBerita = await response.json();
        const berita = getBerita.data;

        setJudul(berita.judul);
        setPublikasi(berita.publikasi);
        setDeskripsi(berita.deskripsi);
        setDeskripsi(berita.deskripsi);
        setTanggal(berita.publishedAt);
        setImage(berita.image);
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

  const handleConfirm = async () => {
    try {
      await fetch(`http://localhost:5001/berita/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: judul,
          publikasi: publikasi,
          deskripsi: deskripsi,
          publishedAt: tanggal,
          image: image,
        }),
      });
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

      window.location.reload();
      alert("Laporan Telah Diterima");
    } catch (error) {
      console.error("Failed to update:", error);
    }
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
                <h5 className="modal-title text-center w-100">Update Berita</h5>
              </div>
              <div className="modal-body">
                <div className="mb-4">
                  <label className="form-label fw-bold">Judul Berita</label>
                  <input
                    id="judul"
                    type="text"
                    className="form-control"
                    value={judul || ""}
                    onChange={(e) => setJudul(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Publikasi</label>
                  <input
                    id="publikasi"
                    type="text"
                    className="form-control"
                    value={publikasi}
                    onChange={(e) => setPublikasi(e.target.value)}
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
                  <label className="form-label fw-bold">Deskripsi</label>
                  <textarea
                    id="deskripsi"
                    className="form-control"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Gambar</label>
                  <input
                    id="tanggal_lahir"
                    type="text"
                    className="form-control"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                    disabled={!edit}
                  />
                </div>
                <div className="image-container">
                  <img
                    src={"http://localhost:5001/static/" + image}
                    alt="Gambar Berita"
                    className="img-fluid justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                  style={{ width: "45%" }}
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalNews;
