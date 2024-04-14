import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OperasionalDashboard from "./pages/operational/Home.jsx";
import OperasionalSupplierDashboard from "./pages/operational/supplier/Home.jsx";
import OperasionalCustomerDashboard from "./pages/operational/customer/Home.jsx";
import OperasionalCustomerDetail from "./pages/operational/customer/CustomerDetail.jsx";
import OperasionalForm from "./pages/operational/supplier/SupplierForm.jsx";
import OperasionalTransactionInDetail from "./pages/operational/supplier/TransactionInDetail.jsx";
import OperasionalTransactionOutForm from "./pages/operational/customer/TransactionOutForm.jsx";
import Login from "./pages/auth/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { user } from "./features/users/user.js";
import { useEffect, useState } from "react";
import logo from "./assets/logo/icon-dark.png";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.user.User);

  const fetchData = async () => {
    try {
      if (userToken) {
        await dispatch(user());
        const decodedToken = jwtDecode(userToken);
        if (
          decodedToken.exp &&
          decodedToken.exp < Math.floor(Date.now() / 1000)
        ) {
          localStorage.removeItem("user_token");
          navigate("/login", { replace: true });
          return;
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkToken = async () => {
    const decodedToken = jwtDecode(userToken);

    if (decodedToken.exp && decodedToken.exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("user_token");
      navigate("/login", { replace: true });
      return;
    }
  };

  useEffect(() => {
    if (userToken) {
      setLoading(false);
      checkToken();

      if (userData < 1) {
        fetchData();
      }
    }

    if (!userToken) {
      setLoading(false);
      navigate("/login", { replace: true });
    }
  }, [userToken, userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto min-h-screen">
        <img src={logo} alt="" className="w-40" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        {userToken ? (
          <>
            <Route
              path="/operasional/dashboard"
              element={<OperasionalDashboard />}
            />
            <Route
              path="/operasional/suppliers"
              element={<OperasionalSupplierDashboard />}
            />
            <Route
              path="/operasional/customers"
              element={<OperasionalCustomerDashboard />}
            />
            <Route
              path="/operasional/customer/:id"
              element={<OperasionalCustomerDetail />}
            />
            <Route
              path="/operasional/supplier/form"
              element={<OperasionalForm />}
            />
            <Route
              path="/operasional/supplier/transaction/detail/:id"
              element={<OperasionalTransactionInDetail />}
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/operasional/transaction/out/form"
              element={<OperasionalTransactionOutForm />}
            />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
