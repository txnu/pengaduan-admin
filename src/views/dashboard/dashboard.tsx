import Header from "../../components/headers/header";

function Dashboard() {
  return (
    <>
      <Header pages={"Dashboard"} title={"Dashboard"} />
      <div className="container-fluid py-1 px-4">
        <div className="row">
          <div className="position-relative z-index-2">
            <div className="card card-plain mb-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex flex-column h-100">
                      <h2 className="font-weight-bolder mb-0">
                        Statistik Umum
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="card mb-2">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark shadow text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10 align">weekend</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Pengunjung</p>
                      <h4 className="mb-0">281</h4>
                    </div>
                  </div>

                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +55%{" "}
                      </span>
                      minggu terakhir
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card mb-2">
                  <div className="card-header p-3 pt-2">
                    <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary shadow text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">leaderboard</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Pengunjung Hari Ini
                      </p>
                      <h4 className="mb-0">2,300</h4>
                    </div>
                  </div>

                  <hr className="dark horizontal my-0" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +3%{" "}
                      </span>
                      beberapa bulan terakhir
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div className="card mb-2">
                  <div className="card-header p-3 pt-2 bg-transparent">
                    <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">store</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">Kepuasan</p>
                      <h4 className="mb-0">34k</h4>
                    </div>
                  </div>

                  <hr className="horizontal my-0 dark" />
                  <div className="card-footer p-3">
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        +60%{" "}
                      </span>
                      kemarin
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="card">
                  <div className="card-header p-3 pt-2 bg-transparent">
                    <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                      <i className="material-icons opacity-10">person_add</i>
                    </div>
                    <div className="text-end pt-1">
                      <p className="text-sm mb-0 text-capitalize">
                        Kepuasan Pengguna
                      </p>
                      <h4 className="mb-0">95%</h4>
                    </div>
                  </div>

                  <hr className="horizontal my-0 dark" />
                  <div className="card-footer p-3">
                    <p className="mb-0">Just updated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-5 mb-lg-0 mb-4">
            <div className="card z-index-2 mt-4">
              <div className="card-body mt-n5 px-3">
                <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1 mb-3">
                  <div className="chart">
                    <canvas
                      id="chart-bars"
                      className="chart-canvas"
                      height="170"
                    ></canvas>
                  </div>
                </div>
                <h6 className="ms-2 mt-4 mb-0">Active Users</h6>
                <p className="text-sm ms-2">
                  (<span className="font-weight-bolder">+11%</span>) than last
                  week
                </p>
                <div className="container border-radius-lg">
                  <div className="row">
                    <div className="col-3 py-3 ps-0">
                      <div className="d-flex mb-2">
                        <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-primary text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="material-icons opacity-10">groups</i>
                        </div>
                        <p className="text-xs my-auto font-weight-bold">
                          Users
                        </p>
                      </div>
                      <h4 className="font-weight-bolder">42K</h4>
                    </div>
                    <div className="col-3 py-3 ps-0">
                      <div className="d-flex mb-2">
                        <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-info text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="material-icons opacity-10">ads_click</i>
                        </div>
                        <p className="text-xs mt-1 mb-0 font-weight-bold">
                          Clicks
                        </p>
                      </div>
                      <h4 className="font-weight-bolder">1.7m</h4>
                    </div>
                    <div className="col-3 py-3 ps-0">
                      <div className="d-flex mb-2">
                        <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-warning text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="material-icons opacity-10">receipt</i>
                        </div>
                        <p className="text-xs mt-1 mb-0 font-weight-bold">
                          Sales
                        </p>
                      </div>
                      <h4 className="font-weight-bolder">399$</h4>
                    </div>
                    <div className="col-3 py-3 ps-0">
                      <div className="d-flex mb-2">
                        <div className="icon icon-shape icon-xxs shadow border-radius-sm bg-gradient-danger text-center me-2 d-flex align-items-center justify-content-center">
                          <i className="material-icons opacity-10">category</i>
                        </div>
                        <p className="text-xs mt-1 mb-0 font-weight-bold">
                          Items
                        </p>
                      </div>
                      <h4 className="font-weight-bolder">74</h4>
                      <div className="progress w-75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="card z-index-2">
              <div className="card-header pb-0">
                <h6>Sales overview</h6>
                <p className="text-sm">
                  <i className="fa fa-arrow-up text-success"></i>
                  <span className="font-weight-bold">4% more</span> in 2021
                </p>
              </div>
              <div className="card-body p-3">
                <div className="chart">
                  <canvas
                    id="chart-line"
                    className="chart-canvas"
                    height="300"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div
              id="globe"
              className="position-absolute end-0 top-10 mt-sm-3 mt-7 me-lg-7"
            >
              <canvas
                width="700"
                height="600"
                className="w-lg-100 h-lg-100 w-75 h-75 me-lg-0 me-n10 mt-lg-5"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
