function SignInFooter() {
  return (
    <footer className="footer position-absolute bottom-2 py-2 w-100">
      <div className="container">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-12 col-md-6 my-auto">
            <div className="copyright text-center text-sm text-white text-lg-start">
              © Hak cipta oleh{" "}
              <a
                href="https://www.creative-tim.com"
                className="font-weight-bold text-white"
                target="_blank"
              >
                Kedai Programmer
              </a>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  className="nav-link text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  POLSEK GALING
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SignInFooter;
