import AccessCard from "../components/cards/AccessCard";

function Home() {
  return (
    <div className="min-h-screen pt-10 bg-lightPrimary">
      <div className="flex flex-col items-center justify-center  pt-10">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Welcome to PT Sehat Murni Sejahtera
        </h1>

        <div className="p-4 ">
          <AccessCard />
        </div>
      </div>
    </div>
  );
}

export default Home;
