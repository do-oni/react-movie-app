import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);

  const { id } = useParams();
  const getDetail = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    console.log(json.data);

    setDetail(json.data.movie);
    setLoading(false);
  }, [id]);

  function onClick() {
    window.open(`https://www.google.com/search?q=${detail.title}`);
  }

  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <center>
            <button className="raise" onClick={onClick}>
              More about 👀
            </button>
            <h1>{detail.title}</h1>
            <h2>{detail.year}</h2>
            <img src={detail.background_image}></img>
            <p>{detail.description_full}</p>
            <ul>{detail.genres.map((g) => `${g}`).join(` / `)}</ul>
            <ul>⭐ {detail.rating} ⭐</ul>
            <ul>👍 {detail.like_count} 👍</ul>
          </center>
        </div>
      )}
    </div>
  );
}

export default Detail;
