import { useState } from "react";
import Header from "../../components/headers/header";
import { Berita } from "../../providers/data_interface";
import ModalDelete from "../../components/modals/modalDelete";
import ModalNews from "./components/modalNews";
import { AlertSuccess } from "../../components/alert/alert_success";

interface NewsProps {
  news: Berita[];
}
const News = ({ news }: NewsProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState<Berita | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const openModal = (news: Berita) => {
    setSelectedNews(news);
    setIsModal(true);
  };

  const openDeleteModal = (news: Berita) => {
    setSelectedNews(news);
    setIsDeleteModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setIsDeleteModal(false);
  };

  const handleDelete = async (_id: string) => {
    try {
      await fetch(`http://localhost:5001/berita/delete/${_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setIsDeleteModal(false);
      setSelectedNews(null);
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentNews = news.slice(startIdx, endIdx);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const emptyRows = itemsPerPage - currentNews.length;
  return (
    <>
      <Header pages={"News"} title={"Berita"} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-3 pb-3">
                  <div className="d-flex justify-content-between align-items-center mx-4">
                    <h5 className="text-white text-center text-capitalize pt-2">
                      Berita
                    </h5>
                    <form action="" method="get" className="d-flex w-25">
                      <input
                        type="text"
                        className="form-control bg-white text-dark border border-2 border-gray-300 rounded-3 px-2"
                        placeholder="Cari Berita..."
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="d-flex justify-content-start mt-3 mx-4">
                  <button className="btn btn-dark btn-lg">Tambah Berita</button>
                </div>
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase  text-secondary text-xxs font-weight-bolder opacity-7">
                          Judul
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">
                          Publikasi
                        </th>
                        <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                          Deskripsi
                        </th>
                        <th className="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Tanggal
                        </th>
                        <th className="text-center text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                          Gambar
                        </th>
                        <th className="text-secondary text-center opacity-7"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentNews.map((berita) => (
                        <tr key={berita._id}>
                          <td>
                            <div className="d-flex px-3 py-1 ">
                              <div className="d-flex flex-column justify-content-center ">
                                <h6 className="mb-0 text-sm">
                                  {berita.judul
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ") +
                                    (berita.judul.split(" ").length > 3
                                      ? "..."
                                      : "")}
                                </h6>
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="text-xs text-center font-weight-bold mb-0">
                              {berita.publikasi}
                            </p>
                          </td>
                          <td>
                            <p className="text-xs text-start font-weight-bold mb-0 text-truncate">
                              {berita.deskripsi
                                .split(" ")
                                .slice(0, 5)
                                .join(" ") +
                                (berita.deskripsi.split(" ").length > 5
                                  ? "..."
                                  : "")}
                            </p>
                          </td>
                          <td className="align-middle text-center text-sm">
                            <p className="text-xs font-weight-bold mb-0">
                              {new Date(berita.publishedAt).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-secondary text-xs font-weight-bold">
                              {berita.image}
                            </span>
                          </td>
                          <td className="align-middle d-flex justify-content-center">
                            <button
                              className="btn btn-success btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Detail user"
                              onClick={() => openModal(berita)}
                            >
                              Detail
                            </button>
                            <button
                              className="btn btn-danger btn-sm mx-1"
                              data-toggle="tooltip"
                              data-original-title="Detail user"
                              onClick={() => openDeleteModal(berita)}
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

      {isModal && selectedNews && (
        <ModalNews onClose={closeModal} edit={true} id={selectedNews._id} />
      )}
      {isDeleteModal && selectedNews && (
        <ModalDelete
          onClose={closeModal}
          onConfirm={handleDelete}
          id={selectedNews._id}
          item="Berita"
        />
      )}

      <AlertSuccess
        title="Data Berhasil DiHapus"
        time="Baru Saja"
        message="Data Berita Berhasil dihapus"
      />
    </>
  );
};

export default News;
