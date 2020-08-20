import fetch from "isomorphic-unfetch";
import { useState } from "react";

import { API } from "../config";

const Main = ({ children }) => {
  const [state, setState] = useState({
    top10: [],
    isLoading: false,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const onUpload = async (e) => {
    if (e.target.files) {
      const top10 = [];
      const isLoading = true;

      setState({ top10, isLoading });
      setImgFile(URL.createObjectURL(e.target.files[0]));

      const formData = new FormData();
      await formData.append("file", e.target.files[0]);
      await formData.append("filename", "test");

      const res = await fetch(`${API}uploadfile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      setState({ ...state, top10: data.top10, isLoading: false });
    }
  };

  const formatPrediction = (pred) => {
    let splitStr = pred.split("_");
    let capitalizeWords = [];

    splitStr.forEach((element) => {
      capitalizeWords.push(
        element[0].toUpperCase() + element.slice(1, element.Length)
      );
    });

    return capitalizeWords.join(" ");
  };

  const formatProbability = (prob) => {
    let num = prob * 100;
    let displayNum =
      num < 10.0
        ? "0" + num.toFixed(2).toString() + "%"
        : num.toFixed(2).toString() + "%";
    return displayNum;
  };

  const showResult = () => {
    const top3 = state.top10.slice(0, 3);

    return top3.map((item, i) => {
      const dogName = Object.keys(item)[0];
      const probability = item[dogName];

      return (
        <div key={i} className="flex items-center justify-start">
          <div className="ml-4">
            <span className="px-3 rounded-full text-xs bg-teal-600 text-white">
              {formatProbability(probability)}
            </span>
          </div>
          <h4 className="ml-4 text-md text-gray-600 ">
            {formatPrediction(dogName)}
          </h4>
        </div>
      );
    });
  };

  const card = () => {
    return (
      <div className="bg-white rounded-lg overflow-hidden  border text-gray-800 ">
        <img className="w-auto" src={imgFile} alt="dog image" />

        <div className="p-6">
          <h4 className="font-semibold text-lg uppercase">Predictions:</h4>

          {showResult()}
        </div>
      </div>
    );
  };

  const introCard = () => {
    return (
      <div className="bg-white rounded-lg overflow-hidden  border text-gray-800 ">
        <img className="w-auto" src={"svg/pet.svg"} alt="dog image" />

        <div className="p-6">
          <h4 className="font-semibold text-xl uppercase">Predictions:</h4>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container mx-auto flex flex-col viewport100 sm:h-screen sm:max-h-screen antialiased">
        <div className="bg-gray-100 flex-1 flex items-center justify-center p-4 ">
          {/* {state.top10.length > 0 ? resultCard() : introCard()} */}
          {introCard()}
          {/* {card()} */}
        </div>
        <div className="bg-gray-100 flex items-center py-4 justify-center">
          <label className="bg-teal-600 hover:bg-gray-600 text-white rounded-full w-16 h-16 md:text-2xl items-center flex justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <input onChange={onUpload} type="file" accept="image/*" hidden />
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
