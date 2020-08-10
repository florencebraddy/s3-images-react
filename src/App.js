import React, { useEffect, useState } from "react";
// import "./App.css";
import axios from "axios";

function convertImage(binaryArray) {
  let arrayBufferView = new Uint8Array(binaryArray);
  let blob = new Blob([arrayBufferView], { type: "image/jpeg" });
  let urlCreator = window.url || window.webkitURL;
  let imageUrl = urlCreator.createObjectURL(blob);
  return imageUrl;
}
function App() {
  const [photos, setPhotos] = useState([]);
  const [username, setUsername] = useState("");
  // useEffect(() => {
  //   async function getPhotos() {
  //     const res = await axios.get(`http://localhost:3000/photos?username=${}`);
  //     setPhotos(res.data.map(item => convertImage(item.Body.data)));
  //   }
  //   getPhotos();
  // }, []);
  // console.log(photos);

  async function getPhotosUsername(e) {
    const res = await axios.get(
      `http://localhost:3000/photos?username=${username}`
    );
    setPhotos(res.data.map(item => convertImage(item.Body.data)));
  }

  return (
    <div className="App">
      <input onChange={e => setUsername(e.target.value)} />
      <button onClick={e => getPhotosUsername(e)}>Get Photos</button>
      {photos.map(photo => {
        return <img style={{ width: "40vw" }} src={photo} alt="fail" />;
      })}
    </div>
  );
}
export default App;
