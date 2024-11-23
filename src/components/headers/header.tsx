import { useEffect, useState } from "react";
import Team2 from "../../assets/img/Lambang_Polri.png";

interface HeaderProps {
  pages: string;
  title: string;
}

const Header = ({ title, pages }: HeaderProps) => {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    if (isPinned) {
      document.body.classList.add("g-sidenav-pinned");
    } else {
      document.body.classList.remove("g-sidenav-pinned");
    }

    return () => {
      document.body.classList.remove("g-sidenav-pinned");
    };
  }, [isPinned]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPinned((prev) => !prev);
  };

  return (
    <>
      <nav
        className="navbar navbar-main bg-white navbar-expand-lg px-0 mx-2 shadow-none border-radius-xl"
        id="navbarBlur"
        data-scroll="true">
        <div className="container-fluid py-1 px-3 d-flex align-items-center">
          <nav
            aria-label="breadcrumb"
            className="me-auto">
            <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
              <li className="breadcrumb-item text-sm">
                <a
                  className="opacity-5 text-dark"
                  href="#">
                  Pages
                </a>
              </li>
              <li
                className="breadcrumb-item text-sm text-dark active"
                aria-current="page">
                {pages}
              </li>
            </ol>
            <h6 className="font-weight-bolder mb-0">{title}</h6>
          </nav>
          <div
            className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4 ms-auto"
            id="navbar">
            <ul className="navbar-nav ms-auto d-flex align-items-center justify-content-end">
              <li className="nav-item dropdown px-3 d-flex align-items-center">
                <a
                  className="nav-link text-body p-0"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-bell cursor-pointer"></i>
                </a>

                <ul
                  className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4"
                  aria-labelledby="dropdownMenuButton">
                  <li className="mb-2">
                    <a
                      className="dropdown-item border-radius-md"
                      href="#">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src={Team2}
                            className="avatar avatar-sm me-3"
                            alt="team member"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              Laporan Baru
                            </span>{" "}
                            dari Tanu Wijaya
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      className="dropdown-item border-radius-md"
                      href="#">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src={Team2}
                            className="avatar avatar-sm me-3"
                            alt="team member"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              Laporan Baru
                            </span>{" "}
                            dari Tanu Wijaya
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      className="dropdown-item border-radius-md"
                      href="#">
                      <div className="d-flex py-1">
                        <div className="my-auto">
                          <img
                            src={Team2}
                            className="avatar avatar-sm me-3"
                            alt="team member"
                          />
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                          <h6 className="text-sm font-weight-normal mb-1">
                            <span className="font-weight-bold">
                              Laporan Baru
                            </span>{" "}
                            dari Tanu Wijayaaaaaaaaaa
                          </h6>
                          <p className="text-xs text-secondary mb-0">
                            <i className="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item px-3 d-flex align-items-center">
                <a
                  href="#"
                  className="nav-link text-body p-0">
                  <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                </a>
              </li>
              <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                <a
                  href="#"
                  className="nav-link text-body p-0"
                  id="iconNavbarSidenav"
                  onClick={handleToggle}>
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                    <i className="sidenav-toggler-line"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
