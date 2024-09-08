// import { useEffect, useState } from "react";

// export function Update() {
//     const [image, setImage] = useState("");
//     const [name, setName] = useState("");
//     const [address, setAddress] = useState("");
//     const [allImages, setAllImages] = useState([]);

//     useEffect(() => {
//         getImage();
//     }, []);

//     function convertToBase64(e) {
//         if (e.target.files.length === 0) {
//             return;
//         }
//         console.log(e);
//         var reader = new FileReader();
//         reader.readAsDataURL(e.target.files[0]);
//         reader.onload = () => {
//             console.log(reader.result);
//             setImage(reader.result);
//         };
//         reader.onerror = e => {
//             console.log("error", e);
//         };
//     }

//     async function onClickHandler() {
//         const url = "http://localhost:4000/update";
//         const data = {
//             image: image,
//             name: name,
//             address: address
//         };
//         try {
//             const response = await axios.post(url, data);
//             console.log('Response:', response.data);
//         } catch (e) {
//             console.log("error", e);
//         }
//     }

//     async function getImage() {
//         const getUrl = "http://localhost:4000/images";
//         axios.get(getUrl)
//             .then((res) => {
//                 console.log(res.data);
//                 setAllImages(res.data.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching images", error);
//             });
//     }

//     return (
//         <div>
//             <input accept="image/*" type="file" onChange={convertToBase64} />
//             <br /><br />
//             <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
//             <br /><br /><br />
//             <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
//             <button onClick={onClickHandler}>Submit</button>
//             <br /><br />
//             {allImages.map((data, index) => (
//                 <img key={index} width={100} height={100} src={data.image} alt={data.name || 'image'} />
//             ))}
//         </div>
//     );
// }

import axios from "axios";
import { useState } from "react";

export default function Update() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const submitImage = async (e) => {
    e.preventDefault();
    console.log(image, "image is hereeeeeeee");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("address", address);
    console.log(formData, "form data");
    try {
      console.log("going to try axios");
      const result = await axios.post(
        "http://localhost:3000/res/upload-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("fetch completed");
      console.log(result.data);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  function onInputChange(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" accept="image/*" onChange={onInputChange}></input>
        <input
          type="text"
          placeholder="Hotel Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Hotel Address"
          onChange={(e) => setAddress(e.target.value)}
        ></input>
        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

