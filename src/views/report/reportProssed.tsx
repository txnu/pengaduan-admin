import { useState } from "react";
import Header from "../../components/headers/header";
import Modal from "./components/modals/modal";
import { generateDocx } from "./components/docx/printDoc";
import { statusMessages } from "./components/statusMessages";
import { Report } from "../../providers/data_interface";

interface ReportProsessedProps {
  reports: Report[];
}

const ReportProsessed = ({ reports = [] }: ReportProsessedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
  };

  const filteredReports = reports.filter((report) => {
    return (
      report.idUser.namalengkap.toLowerCase().includes(searchQuery) ||
      report.idJenisPengaduan.jenis.toLowerCase().includes(searchQuery) ||
      report.idUser.alamat.toLowerCase().includes(searchQuery) ||
      report.kodeVerifikasi.toLowerCase().includes(searchQuery)
    );
  });

  const handlePrint = (report: Report) => {
    generateDocx(report);
    console.log(report.idUser.tanggal_lahir);
    console.log(report.idUser.pekerjaan);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentReportProssed = filteredReports.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const emptyRows = itemsPerPage - currentReportProssed.length;

  return (
    <>
      <Header
        pages={"Report Processed"}
        title={"Laporan Diproses"}
      />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-3">
                  <div className="d-flex justify-content-between align-items-center mx-4">
                    <h5 className="text-white text-capitalize pt-2">
                      Laporan Sedang Diproses
                    </h5>
                    <form
                      action=""
                      method="get"
                      className="d-flex w-25">
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
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Pelapor
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder ">
                          Alamat
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder">
                          Jenis Pengaduan
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Kode
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Tanggal
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Manage
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentReportProssed.map((report) => (
                        <tr key={report._id}>
                          <td>
                            <div className="d-flex px-3 py-1">
                              <div className="d-flex flex-column justify-content-center">
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
                              {report.idUser.alamat}
                            </p>
                          </td>
                          <td>
                            <p className="text-xs text-center font-weight-bold mb-0 text-center">
                              {report.idJenisPengaduan.jenis}
                            </p>
                            <p className="text-xs text-secondary mb-0">{}</p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <span className="badge badge-sm bg-gradient-success">
                              {statusMessages[report.status]}
                            </span>
                          </td>
                          <td>
                            <p className="text-xs text-center text-dark font-weight-bold mb-0 text-center">
                              {report.kodeVerifikasi}
                            </p>
                            <p className="text-xs text-secondary mb-0">{}</p>
                          </td>
                          <td className="align-center text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {new Date(report.tanggal).toLocaleDateString(
                                "en-GB"
                              )}
                            </span>
                          </td>
                          <td className="d-flex justify-content-center mt-auto">
                            <button
                              className="btn btn-primary btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Detail user"
                              onClick={() => openModal(report)}>
                              Detail
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Detail user"
                              onClick={() => handlePrint(report)}>
                              Cetak
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
                            }`}>
                            <button
                              className="page-link text-dark text-bold"
                              onClick={() => handlePageChange(index + 1)}>
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
          edit={false}
          showConfirmButton={false}
        />
      )}
    </>
  );
};

export default ReportProsessed;
