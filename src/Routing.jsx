import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App";
import SignIn from "./SignIn";
import Dashboard from "./dashboard";
import SignUp from "./SignUp";

function Routing(){

return(
<BrowserRouter>
<Routes>
    <Route path="/" element={<App/>} />
    <Route path="/signIn" element={<SignIn/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/signUp" element={<SignUp/>} />
</Routes>
</BrowserRouter>
)

}
export default Routing