import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const { id } = useParams();
  const getDetail = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setDetail(json.data.detail);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <h1>Detail</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={detail.background_image}></img>
          <p>{detail.description_full}</p>
          <ul>
            {detail.genres.map((g) => `${g}`).join(`/`)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
