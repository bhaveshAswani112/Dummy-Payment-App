import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SignUp } from "./assets/pages/SignUp";
import { SignIn } from "./assets/pages/SignIn";
import { Dashboard } from "./assets/pages/Dashboard";
import { SendMoney } from "./assets/pages/SendMoney";
import { Redirect } from "./assets/pages/Redirect";
import { Transactions } from "./assets/pages/Transactions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Redirect></Redirect>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/send" element={<SendMoney></SendMoney>}></Route>
          <Route path="/transactions" element={<Transactions></Transactions>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
