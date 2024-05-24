import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { CircleName } from "./Circlename";

export const User = function ({ firstname, lastname, id }) {
  const fullname = `${firstname.toUpperCase()} ${lastname.toUpperCase()}`;
  const charac = fullname.split("")[0];
  const navigate = useNavigate();
  return (
    <div className="flex justify-between mt-4 border border-b-gray-200 items-center h-12">
      <CircleName fullname={fullname} charac={charac}></CircleName>
      <div className="">
        <button
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={() => {
            navigate(`/send?id=${id}&name=${firstname}`);
          }}
        >
          Send Money
        </button>
      </div>
    </div>
  );
};
