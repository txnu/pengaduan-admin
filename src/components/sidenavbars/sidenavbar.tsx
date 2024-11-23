import { NavLink } from "react-router-dom";
import logoNavbar from "../../assets/img/Lambang_Polri.png";

function SideNavbar() {
  return (
    <aside
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i>
        <a
          className="navbar-brand m-0"
          href="https://demos.creative-tim.com/material-dashboard/pages/dashboard"
          target="_blank"
        >
          <img
            src={logoNavbar}
            className="navbar-brand-img h-100"
            alt="main_logo"
          />
          <span className="ms-1 font-weight-bold text-white">
            POLSEK GALING
          </span>
          <br />
        </a>
      </div>

      <hr className="horizontal light mt-0 mb-2" />

      <div
        className="collapse navbar-collapse w-auto"
        id="sidenav-collapse-main"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">dashboard</i>
              </div>

              <span className="nav-link-text ms-1">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/laporan-masuk">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">article</i>
              </div>

              <span className="nav-link-text ms-1">Laporan Baru</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/laporan-diproses">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">assignment</i>
              </div>

              <span className="nav-link-text ms-1">Laporan Diproses</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/berita">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">newspaper</i>
              </div>

              <span className="nav-link-text ms-1">Berita</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/data">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">cloud</i>
              </div>

              <span className="nav-link-text ms-1">Data</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link text-white" to="/instansi">
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">work</i>
              </div>

              <span className="nav-link-text ms-1">Instansi</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideNavbar;
