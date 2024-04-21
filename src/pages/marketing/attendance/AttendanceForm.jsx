import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import SignatureCanvas from "react-signature-canvas";
import { FaCamera } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/layouts/MarketingLayout";
import { useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default function AttendanceForm() {
  const [description, setDescription] = useState("");
  const [productsOffered, setProductsOffered] = useState("");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loclatitude, setLatitude] = useState("");
  const [loclongitude, setlongitude] = useState("");
  const [address, setAddress] = useState(null);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.User);

  const videoRef = useRef();
  const signatureRef = useRef();

  const handleSubmit = async () => {
    setLoading(true);

    // Konfigurasi Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyCED-mC5kxoZRv9BHerkWbZo_cwtxJmCOU",
      authDomain: "sehatmurnisejahtera-fd9d2.firebaseapp.com",
      projectId: "sehatmurnisejahtera-fd9d2",
      storageBucket: "sehatmurnisejahtera-fd9d2.appspot.com",
      messagingSenderId: "278921260940",
      appId: "1:278921260940:web:e56e46846de17e2e8a30a9",
    };

    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);

    try {
      // 1. Upload foto
      const blob = await fetch(capturedPhoto).then((res) => res.blob());
      const photoFileName = `images/${userData.id}_${Date.now()}.jpg`;
      const photoStorageRef = ref(storage, photoFileName);
      const photoUploadTask = uploadBytes(photoStorageRef, blob);

      // Dapatkan URL unduhan setelah unggah selesai
      const photoDownloadURL = await photoUploadTask.then((snapshot) => {
        return getDownloadURL(photoStorageRef);
      });
      // 2. Upload tanda tangan
      if (signature) {
        const signatureFileName = `signatures/${userData.id}_${Date.now()}.png`;
        const signatureStorageRef = ref(storage, signatureFileName);
        const signatureUploadTask = uploadBytes(signatureStorageRef, signature);
        const signatureDownloadURL = await signatureUploadTask.then(
          (snapshot) => {
            return getDownloadURL(signatureStorageRef);
          }
        );

        if (address && loclatitude && loclongitude) {
          // 3. Kirim data menggunakan Axios
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/attendance/submit`,
            {
              imageUrl: photoDownloadURL,
              signatureUrl: signatureDownloadURL,
              address: address,
              latitude: loclatitude,
              longitude: loclongitude,
              id_user: userData.id,
              description: description,
              product: productsOffered,
            }
          );

          if (response.status === 200) {
            toast.success(response.data.message);
            navigate("/marketing/dashboard");
            setLoading(false);
          }
        } else {
          toast.error("Waiting Address First");
          setLoading(false);
        }
      } else {
        toast.error("Signature first");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const toggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  const toggleLocation = () => {
    setIsLocationEnabled(!isLocationEnabled);
  };

  const enableGps = async () => {
    if (isLocationEnabled && navigator.geolocation) {
      try {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setlongitude(longitude);
            console.log(latitude);
            console.log(longitude);
            const apiKey = "39c16ccc43b54fb697f38ab5adbcfe4e";
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
            const axiosResponse = await axios.get(apiUrl);
            const data = axiosResponse.data;
            console.log(data);

            if (data.results.length > 0) {
              const formattedAddress = data.results[0].formatted;
              setAddress(formattedAddress);
            }
          },
          (error) => {
            console.error("Error akses GPS:", error.message);
          }
        );
      } catch (error) {
        console.error("Error akses GPS:", error.message);
      }
    }
  };

  const takePhoto = () => {
    const dataURL = videoRef.current.getScreenshot();
    setCapturedPhoto(dataURL);
  };

  const saveSignature = async () => {
    if (signatureRef.current) {
      const dataURL = signatureRef.current.toDataURL();
      const blob = await fetch(dataURL).then((res) => res.blob());
      setSignature(blob);
    }
  };

  useEffect(() => {
    setIsLocationEnabled(true);
    setIsCameraActive(true);
    enableGps();
  }, []);

  return (
    <Layout>
      <main className="flex flex-col gap-4 ">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 me-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                Marketing
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                >
                  Clock In
                </a>
              </div>
            </li>
          </ol>
        </nav>
        <div>
          <h1 className="text-3xl pb-3 font-medium">Attendance Page</h1>
        </div>
        <div className="flex flex-col overflow-x-hidden bg-slate-200 gap-4 md:px-4 px-2 w-full">
          <div className="">
            <h1 className="text-xl pb-3 font-medium">Camera</h1>

            {/* Loading indicator saat kamera aktif */}
            {!isCameraActive && (
              <div className="mb-4 text-center">
                <ClipLoader size={35} color={"#14b8a6"} />
              </div>
            )}

            {/* Tampilkan video kamera */}
            {isCameraActive && !capturedPhoto && (
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="bg-lightPrimary  rounded-3xl border border-brand-500 p-3">
                  <Webcam
                    ref={videoRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    className="w-full h-auto max-w-3xl rounded-3xl"
                  />
                </div>

                <button
                  className="h-50 text-center bg-teal-500 hover:bg-teal-800  p-4 rounded-full"
                  onClick={takePhoto}
                >
                  <FaCamera className="text-lightPrimary text-2xl " />
                </button>
              </div>
            )}

            {/* Tampilkan foto yang diambil */}
            {capturedPhoto && (
              <div className="flex flex-col justify-center items-center">
                <div className="bg-lightPrimary rounded-3xl border border-teal-500 p-3">
                  <img
                    src={capturedPhoto}
                    alt="Captured"
                    className="w-full h-auto max-w-3xl md:max-w-none rounded-3xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-3 ">
            <label
              htmlFor="description"
              className="block mb-2 text-xl  font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insert Description here"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Products Offered */}
          <div className="mb-3">
            <label
              htmlFor="product-offered"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Products Offered
            </label>
            <input
              type="text"
              id="product-offered"
              value={productsOffered}
              onChange={(e) => setProductsOffered(e.target.value)}
              placeholder="Insert Products Offered here"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div className="mb-3">
            <label
              htmlFor="location"
              className="block mb-2 text-xl font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            {!address ? (
              <div className="mb-4 ">
                <ClipLoader size={20} color={"#14b8a6"} />
              </div>
            ) : (
              <p>{address}</p>
            )}
          </div>

          {/* Signature */}
          <div className="">
            <h1 className="text-xl font-medium mb-3">Signature</h1>
            <div className="border bg-lightPrimary p-3 border-teal-500 rounded-3xl inline-flex">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className:
                    "signature-canvas w-full md:max-w-3xl h-32 md:h-64 rounded-3xl",
                }}
                penColor="black"
                backgroundColor="white"
                minWidth={1}
                maxWidth={2}
                onEnd={saveSignature}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-brand-500 dark:focus:ring-blue-800"
            >
              {loading ? <ClipLoader size={10} color={"#14b8a6"} /> : "Submit"}
            </button>
          </div>
          {/* Warning */}
          <div className="w-full">
            <h1 className="text-md font-medium mb-3">Note:</h1>
            <p className="text-sm">
              <span>
                - If Camera is not active, please{" "}
                <button onClick={toggleLocation} className="text-brand-500">
                  click here
                </button>
                .
              </span>
            </p>
            <p className="text-sm">
              <span>
                - If Location is not active. Please{" "}
                <button onClick={toggleCamera} className="text-brand-500">
                  click here
                </button>
                .
              </span>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
