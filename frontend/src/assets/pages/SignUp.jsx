import { Heading } from "../components/Heading.jsx";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button.jsx";
import { BottomWarning } from "../components/BottomWarning.jsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(firstName)
  // console.log(lastName)
  // console.log(email)
  // console.log(password)
  return (
    <div className="bg-slate-300 flex justify-center h-screen">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white text-center w-auto pb-4 sm:w-80">
          <Heading label={"SignUp"}></Heading>
          <SubHeading
            text={"Enter your information to create an account"}
          ></SubHeading>
          <InputBox
            label={"First Name"}
            placeholder={"Enter your first name"}
            type={"text"}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></InputBox>
          <InputBox
            label={"Last Name"}
            placeholder={"Enter your last name"}
            type={"text"}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></InputBox>
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
            text={"Sign Up"}
            onClick={async () => {
              try {
                const resp = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    firstName,
                    lastName,
                    email,
                    password,
                  }
                );

                localStorage.setItem("token", resp.data.token);
                console.log(resp);
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
            warning={"Already have an account?"}
            link={"Sign in"}
            to={"/signin"}
          ></BottomWarning>
        </div>
      </div>
    </div>
  );
}
