import { useEffect, useState } from "react";
import NewReport from "../newReport";

const NewReportController = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/pengaduan/getall`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const laporan = await response.json();
        const filteredReports = laporan.data.filter(
          (report: { status: number }) => report.status == 0
        );
        setReports(filteredReports);
        console.log(filteredReports);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Terjadi Kesalahan: " + errorMessage);
        console.error("Terjadi Kesalahan", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}>
        <div
          className="spinner-border"
          role="status"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <NewReport reports={reports} />;
};

export default NewReportController;
