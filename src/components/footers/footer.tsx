function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer pt-4 mt-auto " style={{ display: "flex" }}>
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © {currentYear} Hak Cipta oleh{" "}
              <a
                className="font-weight-bold"
                target="_blank"
                rel="noopener noreferrer"
                href="https://txnu.github.io/Landingpage-KedaiProgrammer/"
              >
                Kedai Programmer
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Polsek Galing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
