import { useEffect, useState } from "react";
import News from "../news";

const NewsController = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/berita/getall`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const berita = await response.json();

        setNews(berita.data);

        // console.log(berita);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Terjadi Kesalahan: " + errorMessage);
        console.error("Terjadi Kesalahan", errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}>
          <div
            className="spinner-border"
            role="status"></div>
        </div>
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <News news={news} />;
};

export default NewsController;
