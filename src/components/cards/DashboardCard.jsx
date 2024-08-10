import { ClipLoader } from "react-spinners";

export default function DashboardCard({ title, description, icon, isLoading }) {
  const Icon = icon;

  return (
    <div className="w-full p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2 m-2">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700">
          <Icon className="w-10 h-10 text-teal-500 dark:text-gray-400" />
        </div>
        <div className="text-center">
          <h5 className="font-dm text-sm font-medium text-gray-600">{title}</h5>
          {isLoading ? (
            <div className="flex justify-center items-center h-full pt-4">
              <ClipLoader size={30} color={"#14b8a6"} loading={isLoading} />
            </div>
          ) : (
            <p className="text-xl font-bold text-navy-700 dark:text-white">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
