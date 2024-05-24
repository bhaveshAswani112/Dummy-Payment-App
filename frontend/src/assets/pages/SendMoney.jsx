import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { CircleName } from "../components/Circlename";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useState } from "react";
import axios from "axios";

export const SendMoney = function () {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const firstname = searchParams.get("name").toUpperCase();
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div className="h-screen flex justify-center bg-slate-100 items-center">
      <div className="bg-white w-auto text-center md:w-80">
        <Heading label={"Send Money"}></Heading>
        <div className="flex justify-start pt-10 pl-6">
          <CircleName
            charac={firstname.split("")[0]}
            fullname={firstname}
          ></CircleName>
        </div>
        <InputBox
          label={"Amount(in Rs)"}
          placeholder={"Enter Amount"}
          type={"number"}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
        ></InputBox>
        <Button
          text={"Initiate Transfer"}
          onClick={async () => {
            try {
              const resp = await axios.post(
                `http://localhost:3000/api/v1/account/transfer`,
                {
                  to: id,
                  amount: parseInt(amount),
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              navigate("/dashboard");
            } catch (error) {
              if (error?.response?.data?.message) {
                setErrorMessage(error?.response?.data?.message);
              } else {
                setErrorMessage("Error from our side");
                console.log(error);
              }
            }
          }}
        ></Button>

        {errorMessage && (
          <div className="text-red-500 mt-2">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};
