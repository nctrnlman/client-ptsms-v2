import AccessManagementCard from "../components/cards/AccessManagementCard";
// import smsLogo from "../assets/logo/sms-logo.jpeg";
import Particles from "../components/particle/Particles.jsx";
import localforage from "localforage";
import { useEffect, useState } from "react";

function Home() {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const data = await localforage.getItem("user_data");
    if (data) {
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-cover bg-center relative overflow-y-auto">
      <Particles className="absolute inset-0" />
      <header className="shadow-md">
        <div className="container mx-auto flex items-center justify-center"></div>
      </header>
      <main className="container mx-auto px-4 py-8 relative overflow-y-auto">
        <section className="bg-white bg-opacity-50 p-8 rounded-lg shadow-md mb-8 backdrop-filter backdrop-blur-lg animate-fade-in glassmorphism">
          <h1 className="text-4xl font-bold text-center text-teal-500 mb-4 animate-slide-up">
            Welcome back, {userData?.name}!
          </h1>
          <p className="text-xl text-center text-black animate-slide-up animate-delay-200">
            We are glad to see you back at PT Sehat Murni Sejahtera System.
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.role_id === 1 && (
            <>
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
            </>
          )}
          {userData.role_id === 2 && (
            <AccessManagementCard
              card={{
                title: "Marketing",
                link: "marketing/dashboard",
                description: "Manage marketing campaigns",
                icon: "mdi:bullhorn",
              }}
            />
          )}

          {userData.role_id === 3 && (
            <AccessManagementCard
              card={{
                title: "Operasional",
                link: "operasional/dashboard",
                description: "Manage operational activities",
                icon: "mdi:database",
              }}
            />
          )}
        </section>
      </main>
      <footer className="mt-8 position-bottom-6">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-gray-600">
            &copy; 2024 PT Sehat Murni Sejahtera System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
