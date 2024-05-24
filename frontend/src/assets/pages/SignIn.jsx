import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white rounded-lg w-auto sm:w-80 pb-4 text-center">
          <Heading label={"Sign In"}></Heading>
          <SubHeading
            text={"Enter your information to login to your account"}
          ></SubHeading>
          <InputBox
            label={"Email"}
            placeholder={"Enter your email"}
            type={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputBox>
          <Button
            text={"Sign In"}
            onClick={async () => {
              try {
                const resp = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    email,
                    password,
                  }
                );
                // console.log(resp);
                localStorage.setItem("token", resp.data.token);
                if (resp.status == 200) {
                  navigate("/dashboard");
                }
              } catch (error) {
                if (error?.response?.data?.message) {
                  setErrorMessage(error.response.data.message);
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
          <BottomWarning
            warning={"Don't have an account?"}
            link={"Sign up"}
            to={"/signup"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
};
