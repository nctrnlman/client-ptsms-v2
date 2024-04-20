import AccessCard from "../components/cards/AccessCard";
import AccessManagementCard from "../components/cards/AccessManagementCard";
import { useSelector } from "react-redux";
import smsLogo from "../assets/logo/sms-logo.jpeg";
function Home() {
  const userData = useSelector((state) => state.user.User);
  return (
    <div className="min-h-screen  bg-white">
      <img
        src={smsLogo}
        alt="SMS Logo"
        width={140}
        className="ml-4 items-start"
      />
      <div className=" flex flex-col justify-center items-center pt-10">
        <p className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome back, {userData.name}!
        </p>
        <p className="text-2xl">
          We're glad to see you back at PT Sehat Murni Sejahtera System.
        </p>

        <div className="p-8 mt-10 flex gap-14">
          <AccessManagementCard
            card={{
              title: "Operasional",
              link: "operasional/dashboard",
              description: "Manage operational activities",
              icon: "mdi:database",
            }}
          />

          <AccessManagementCard
            card={{
              title: "Setting",
              link: "setting/dashboard",
              description: "Configure system settings",
              icon: "mdi:cog-outline",
            }}
          />
          <AccessManagementCard
            card={{
              title: "Marketing",
              link: "marketing/dashboard",
              description: "Manage marketing campaigns",
              icon: "mdi:bullhorn",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
