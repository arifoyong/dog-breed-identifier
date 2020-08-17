import fetch from "isomorphic-unfetch";
import { useState } from "react";

const API = "http://192.168.1.123:8000/uploadfile";

const Upload = () => {
  const [result, setResult] = useState({
    prediction: "",
    probability: 0,
    prediction2: "",
    probability2: 0,
    prediction3: "",
    probability3: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const onUpload = async (e) => {
    if (e.target.files) {
      setResult({
        prediction: "",
        probability: 0,
        prediction2: "",
        probability2: 0,
        prediction3: "",
        probability3: 0,
      });
      setIsLoading(true);
      setImgFile(URL.createObjectURL(e.target.files[0]));

      const formData = new FormData();
      await formData.append("file", e.target.files[0]);
      await formData.append("filename", "test");

      const res = await fetch(API, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await res.json();
      setResult(data);
      setIsLoading(false);
    }
  };

  const formatPrediction = (pred) => {
    if (pred) {
      let splitStr = pred.split("_");
      let capitalizeWords = [];

      splitStr.forEach((element) => {
        capitalizeWords.push(
          element[0].toUpperCase() + element.slice(1, element.Length)
        );
      });

      return capitalizeWords.join(" ");
    }
    return "";
  };

  const formatProbability = (prob) => {
    if (prob !== 0) {
      let num = prob * 100;
      let displayNum = " (" + num.toFixed(2).toString() + "%)";
      return displayNum;
    }
    return "";
  };

  const showResult = () => {
    if (isLoading) {
      return <p className="text-lg font-semibold text-teal-600">Loading</p>;
    } else {
      return (
        <ul>
          <li className="text-lg font-semibold text-teal-600">
            <span>{formatPrediction(result.prediction)}</span>
            <span>{formatProbability(result.probability)}</span>
          </li>

          <li className="text-lg font-normal text-teal-600">
            <span>{formatPrediction(result.prediction2)}</span>
            <span>{formatProbability(result.probability2)}</span>
          </li>

          <li className="text-lg font-normal text-teal-600">
            <span>{formatPrediction(result.prediction3)}</span>
            <span>{formatProbability(result.probability3)}</span>
          </li>
        </ul>
      );
    }
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="py-5 px-5">
          <h4 className="pt-5">
            <span className="text-xl font-bold text-teal-800 uppercase">
              Prediction Result
            </span>
            {showResult()}
          </h4>
        </div>
      </div>
      <div className="flex-1 overflow-y-hidden flex flex-col my-5 mx-5 items-center justify-center ">
        <div className="rounded-lg overflow-hidden border-black shadow-lg ">
          <img className="object-contain w-full " src={imgFile} />
        </div>
      </div>

      <div className="flex bg-teal-800 h-24 flex-none items-center justify-center px-10">
        <div className="flex ">
          <label className="mx-10 bg-gray-200 hover:bg-gray-300 text-gray-800 hover:text-teal-500 text-xl rounded-full font-bold py-3 px-8">
            GET IMAGE
            <input onChange={onUpload} type="file" accept="image/*" hidden />
          </label>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Upload;
