interface ModalDeleteProps {
  onClose: () => void;
  onConfirm: (_id: string) => void;
  id: string;
  item: string;
}

const ModalDelete = ({ onClose, onConfirm, id, item }: ModalDeleteProps) => {
  const handleDelete = () => {
    onConfirm(id);
    onClose();

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
  };

  return (
    <div className="modal justify-content-center" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document" style={{ width: "500px" }}>
        <div className="modal-content" style={{ maxHeight: "100%" }}>
          <div className="modal-header text-center">
            <h5 className="modal-title">Konfirmasi Penghapusan</h5>
          </div>
          <div className="modal-body">
            <p>Apakah anda yakin untuk menghapus {item} ini?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Tutup
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
