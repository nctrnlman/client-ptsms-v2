import AccessCard from "../components/cards/AccessCard";

function Home() {
  return (
    <div className="min-h-screen pt-10 bg-gradient-to-b from-white to-gray-300">
      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          PT Sehat Murni Sejahtera System
        </h1>

        <div className="p-8">
          <AccessCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
