import { LogOut } from "../components/Logout";
import { Transactions } from "./TransactionButton";

export const TransLog = function () {
  return (
    <div className="flex justify-between">
      <Transactions />
      <LogOut />
    </div>
  );
};
