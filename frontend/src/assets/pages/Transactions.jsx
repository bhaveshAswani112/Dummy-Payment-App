import { useEffect, useState } from "react";
import { ErrorMessage } from "../components/Error";
import axios from "axios";
import { TransactionBlock } from "../components/TransactionBlock";

export const Transactions = function () {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/v1/user/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setTransactions(res.data.transactions);
        })
        .catch((error) => {
          console.log(error);
          setError(true);
        });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }, []);

  useEffect(() => {
    const fetchUsersData = async () => {
      const promises = transactions.map(async (transaction) => {
        try {
          const resp = await axios.post(
            "http://localhost:3000/api/v1/user/getusers",
            {
              id1: transaction.from,
              id2: transaction.to,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          return [resp.data.user1, resp.data.user2];
        } catch (error) {
          console.log(error);
          return [];
        }
      });
      const resolvedUsersData = await Promise.all(promises);
      setUsersData(resolvedUsersData);
    };

    if (transactions.length > 0) {
      fetchUsersData();
    }
  }, [transactions]);

  if (error) {
    return <ErrorMessage message={"Error in fetching transactions"} />;
  }

  return (
    <div className="flex justify-center h-screen items-start">
      <div className="mx-8 my-8 w-3/5 text-left">
        {usersData.map(([first, second], index) => (
          <TransactionBlock
            key={index}
            id={index}
            amount={transactions[index].amount}
            from={first.firstName}
            to={second.firstName}
          />
        ))}
      </div>
    </div>
  );
};
