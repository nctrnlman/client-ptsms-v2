export default function DashboardCard({ title, description, icon }) {
  const Icon = icon;
  return (
    <div className="max-w-xs md:max-w-sm lg:max-w-md p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 m-2 h-auto md:h-32 lg:h-auto">
        <div className="rounded-full bg-lightPrimary p-3 dark:bg-navy-700 md:mr-4">
          <Icon className="w-10 h-10 text-teal-500 dark:text-gray-400" />
        </div>
        <div className="text-center md:text-left">
          <h5 className="font-dm text-sm font-medium text-gray-600">{title}</h5>
          <p className="text-xl font-bold text-navy-700 dark:text-white">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
