import { useState } from "react";
import Modal from "./components/modals/modal";
import Header from "../../components/headers/header";
import { Report } from "../../providers/data_interface";
import ModalDelete from "../../components/modals/modalDelete";
import { AlertSuccess } from "../../components/alert/alert_success";

export interface NewReportProps {
  reports: Report[];
}

const NewReport = ({ reports = [] }: NewReportProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setIsModal(true);
  };

  const openDeleteModal = (report: Report) => {
    setSelectedReport(report);
    setIsDeleteModal(true);
  };

  const closeModal = () => {
    setIsDeleteModal(false);
    setIsModal(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredReports = reports.filter((report) => {
    return (
      report.idUser.namalengkap.toLowerCase().includes(searchQuery) ||
      report.idJenisPengaduan.jenis.toLowerCase().includes(searchQuery) ||
      report.idUser.alamat.toLowerCase().includes(searchQuery)
    );
  });
  const handleDelete = async (_id: string) => {
    try {
      await fetch(`http://localhost:5001/pengaduan/delete/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setIsDeleteModal(false);
      setSelectedReport(null);
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentNewReport = filteredReports.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const emptyRows = itemsPerPage - currentNewReport.length;

  return (
    <>
      <Header pages={"News Report"} title={"Laporan Baru"} />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-3">
                  <div className="d-flex justify-content-between align-items-center mx-4">
                    <h5 className="text-white pt-2 text-capitalize">
                      Laporan Masuk
                    </h5>
                    <form action="" method="get" className="d-flex w-25">
                      <input
                        type="text"
                        className="form-control bg-white text-dark border border-2 border-gray-300 rounded-3 px-2"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase  text-secondary text-xxs font-weight-bolder">
                          Pelapor
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder">
                          Kasus
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder">
                          Alamat
                        </th>
                        <th className="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Status
                        </th>
                        <th className="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Tanggal
                        </th>
                        <th className="ext-center text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentNewReport.map((report) => (
                        <tr key={report._id}>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center ">
                                <h6 className="mb-0 text-sm">
                                  {report.idUser.namalengkap}
                                </h6>
                                <p className="text-xs text-secondary mb-0">
                                  {report.idUser.telepon}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs text-center font-weight-bold mb-0">
                              {report.idJenisPengaduan.jenis}
                            </p>
                          </td>
                          <td>
                            <p className="text-xs text-center font-weight-bold mb-0">
                              {report.idUser.alamat}
                            </p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <p className="text-xs font-weight-bold mb-0"></p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {new Date(report.tanggal).toLocaleDateString(
                                "en-GB"
                              )}
                            </span>
                          </td>
                          <td className="align-content-center d-flex justify-content-center">
                            <button
                              className="btn btn-primary btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Detail Report"
                              onClick={() => openModal(report)}
                            >
                              Detail
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Delete  Report"
                              onClick={() => openDeleteModal(report)}
                            >
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))}
                      {emptyRows > 0 &&
                        Array.from({ length: emptyRows }).map((_, index) => (
                          <tr key={`empty-${index}`}>
                            <td colSpan={7}>
                              <div className="d-flex justify-content-center my-4">
                                <span className="text-muted"></span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center">
                    <nav>
                      <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={`page-item mx-1 ${
                              currentPage === index + 1 ? "active" : "inactive"
                            }`}
                          >
                            <button
                              className="page-link text-dark text-bold"
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModal && selectedReport && (
        <Modal
          onClose={closeModal}
          id={selectedReport._id}
          edit={true}
          showConfirmButton={true}
        />
      )}

      {isDeleteModal && selectedReport && (
        <ModalDelete
          onClose={closeModal}
          onConfirm={handleDelete} // Pass the report ID to the handleDelete function
          id={selectedReport._id}
          item="Laporan" // Pass the selected report's ID to the modal
        />
      )}

      <AlertSuccess
        title="Data Berhasil DiHapus"
        time="Baru Saja"
        message="Data Laporan Berhasil dihapus"
      />
    </>
  );
};

export default NewReport;
