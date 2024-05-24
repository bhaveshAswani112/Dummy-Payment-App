import { useCallback, useEffect, useMemo, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { SearchBox } from "../components/SearchBox";
import { Showcase } from "../components/Showcase";
import { User } from "../components/User";
import axios from "axios";
import { LogOut } from "../components/Logout";
import { Transactions } from "../components/TransactionButton";
import { TransLog } from "../components/TranLog";

export const Dashboard = function () {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [balance, setBalance] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setLoggedInUser(resp.data.user.firstName);
          setEmail(resp.data.user.email);
        });
    } catch (error) {
      console.log(error);
    }
    try {
      axios
        .get("http://localhost:3000/api/v1/account/getbalance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((resp) => {
          setBalance(resp.data.balance);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await axios.get(
        `http://localhost:3000/api/v1/user/find?filter=${filter}`
      );
      const showusers = [];
      for (let user of resp.data.users) {
        if (user.email != email) showusers.push(user);
      }
      setUsers(showusers);
    };
    fetchUsers();
  }, [filter, email]);

  return (
    <div className="h-screen">
      <div className="mx-8 my-8">
        <AppBar name={loggedInUser}></AppBar>
        <TransLog></TransLog>
        <Balance balance={balance}></Balance>
        <Showcase text={"Users"}></Showcase>
        <SearchBox
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        ></SearchBox>
        <div className="ml-4 w-4/5">
          {users.map((user) => {
            return (
              <User
                firstname={user.firstName}
                lastname={user.lastName}
                id={user.id}
                key={user.id}
              ></User>
            );
          })}
        </div>
      </div>
    </div>
  );
};
