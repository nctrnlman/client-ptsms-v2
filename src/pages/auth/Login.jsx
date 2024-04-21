import { useState } from "react";
import logo from "../../assets/background/bg-login.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { setUser } from "../../features/users/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        identifier: username,
        password: password,
      });
      const data = response.data;
      if (data) {
        toast.success(response.data.message);
        localStorage.setItem("user_token", response.data.token);
        dispatch(setUser(data.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-lightPrimary min-h-screen flex flex-col md:flex-row justify-center md:justify-between overflow-y-hidden">
      <div className="flex flex-col justify-center mx-auto p-4 md:p-8 w-full md:w-1/2">
        <div className="login-card relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="mb-2.5 text-3xl md:text-4xl font-bold text-navy-700 dark:text-white  md:text-center pb-3">
              Sign In
            </h4>
            <p className="mb-9 text-base text-gray-600 md:text-center">
              Welcome! Please Sign In to access Sehat Murni Sejahtera System.
            </p>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group border-b-2">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label
                  htmlFor="username"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username/Email
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group border-b-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                  placeholder=" "
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                disabled={loading}
              >
                {loading ? (
                  <ClipLoader size={20} color={"#ffffff"} loading={loading} />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="items-center flex">
        <img
          src={logo}
          className="max-w-16xl md:h-screen hidden md:block"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
