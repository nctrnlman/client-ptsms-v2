import { Icon } from "@iconify/react";

export default function AccessManagementCard({ card }) {
  return (
    <div className="max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg glassmorphism">
      <div className="flex flex-col justify-center items-center gap-4 m-2 ">
        <div className="rounded-full bg-lightPrimary p-10 dark:bg-navy-700 ">
          <Icon
            icon={card.icon}
            className="w-36 h-36  text-teal-500 dark:text-gray-400"
          />
        </div>
        <div className="text-center ">
          <h5 className="font-dm text-2xl font-medium text-teal-200">
            {card.title}
          </h5>
          <p className="text-md pt-2 text-white">{card.description}</p>
        </div>
        <div className="pt-2 d-flex ">
          <a
            className="bg-teal-500 hover:bg-teal-800 text-white p-2 rounded"
            href={card.link}
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
}
