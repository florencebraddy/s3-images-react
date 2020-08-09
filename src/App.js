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
  useEffect(() => {
    async function getPhotos() {
      const res = await axios.get("http://localhost:3000/photos");
      setPhotos(res.data.map(item => convertImage(item.Body.data)));
    }
    getPhotos();
  }, []);
  console.log(photos);
  return (
    <div className="App">
      {photos.map(photo => {
        return <img src={photo} alt="fail" />;
      })}
    </div>
  );
}

export default App;
