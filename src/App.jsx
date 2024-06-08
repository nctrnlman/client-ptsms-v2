import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import OperasionalDashboard from "./pages/operational/Home.jsx";
import OperasionalSupplierDashboard from "./pages/operational/supplier/Home.jsx";
import OperasionalCustomerDashboard from "./pages/operational/customer/Home.jsx";
import OperasionalDistributorDashboard from "./pages/operational/distributor/Home.jsx";
import OperasionalCustomerDetail from "./pages/operational/customer/CustomerDetail.jsx";
import OperasionalProductDashboard from "./pages/operational/product/Home.jsx";
import OperasionalProductDetail from "./pages/operational/product/DetailProduct.jsx";
import OperasionalProductForm from "./pages/operational/product/ProductForm.jsx";
import OperasionalTransactionInForm from "./pages/operational/supplier/TransactionInForm.jsx";
import OperasionalTransactionInEdit from "./pages/operational/supplier/TransactionInEdit.jsx";
import OperasionalTransactionInDetail from "./pages/operational/supplier/TransactionInDetail.jsx";
import OperasionalTransactionOutForm from "./pages/operational/customer/TransactionOutForm.jsx";
import OperasionalTransactionOutDetail from "./pages/operational/customer/TransactionOutDetail.jsx";
import OperasionalTransactionOut from "./pages/operational/customer/TransactionOut.jsx";
import OperasionalTransactionOutEdit from "./pages/operational/customer/TransactionOutEdit.jsx";
import OperasionalSalesDashboard from "./pages/operational/sales/Home.jsx";
import OperasionalSalesTransaction from "./pages/operational/sales/SalesTransaction.jsx";
import SettingDashboard from "./pages/setting/Home.jsx";
import SettingRoleDashboard from "./pages/setting/roles/Home.jsx";
import MarketingDashboard from "./pages/marketing/Home.jsx";
import MarketingAttendanceForm from "./pages/marketing/attendance/AttendanceForm.jsx";
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
              element={<OperasionalTransactionOut />}
            />
            <Route
              path="/operasional/customer/list"
              element={<OperasionalCustomerDashboard />}
            />
            {/* <Route
              path="/operasional/customer/:id"
              element={<OperasionalCustomerDetail />}
            /> */}
            <Route
              path="/operasional/products"
              element={<OperasionalProductDashboard />}
            />
            <Route
              path="/operasional/product/form"
              element={<OperasionalProductForm />}
            />
            <Route
              path="/operasional/product/detail/:id"
              element={<OperasionalProductDetail />}
            />
            <Route
              path="/operasional/supplier/transaction/in/form"
              element={<OperasionalTransactionInForm />}
            />
            <Route
              path="/operasional/supplier/transaction/in/edit/:id"
              element={<OperasionalTransactionInEdit />}
            />
            <Route
              path="/operasional/supplier/transaction/detail/:id"
              element={<OperasionalTransactionInDetail />}
            />
            <Route path="/" element={<Home />} />
            <Route
              path="/operasional/customer/transaction/out/form/:id"
              element={<OperasionalTransactionOutForm />}
            />
            <Route
              path="/operasional/customer/transaction/out/form"
              element={<OperasionalTransactionOutForm />}
            />
            <Route
              path="/operasional/customer/transaction/detail/:id"
              element={<OperasionalTransactionOutDetail />}
            />
            <Route
              path="/operasional/customer/transaction/edit/:id"
              element={<OperasionalTransactionOutEdit />}
            />
            <Route
              path="/operasional/distributors"
              element={<OperasionalDistributorDashboard />}
            />
            <Route
              path="/operasional/sales"
              element={<OperasionalSalesDashboard />}
            />
            <Route
              path="/operasional/sales/transaction/:id"
              element={<OperasionalSalesTransaction />}
            />
            <Route path="/setting/dashboard" element={<SettingDashboard />} />
            <Route path="/setting/roles" element={<SettingRoleDashboard />} />
            <Route
              path="/marketing/dashboard"
              element={<MarketingDashboard />}
            />
            <Route
              path="/marketing/attendance"
              element={<MarketingAttendanceForm />}
            />
            <Route path="/login" element={<Login />} />
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
