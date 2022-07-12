import "./App.css";
import { useState } from "react";

function App() {
  const GIPHY_API = `https://api.giphy.com/v1/gifs/search?api_key=yCH88qDr3JCOEEWuESg34aXKYSbyUVQc&limit=40&offset=0&q=`;
  let [search, setSearch] = useState("");
  let [gifs, setGifs] = useState([]);
  let [loading, setLoading] = useState(false);

  const searchGif = () => {
    if (search.length > 0) {
      setLoading(true);
      fetch(GIPHY_API + search)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          setLoading(false);
          alert("something went wrong");
        });
    }
  };
  return (
    <div className="App">
      <input
        className="inputgig"
        type="text"
        placeholder="Serach Gifs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn" onClick={searchGif}>
        Search
      </button>

      <div className="imgdiv">
        {gifs.map((gif) => {
          return (
            <div>
              <img src={gif} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
