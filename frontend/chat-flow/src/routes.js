import { Routes, Route } from "react-router-dom";
import ListSort from "./component/list1";
import Login from "./component/login";
import Signup from "./component/signup";


const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<ListSort />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
);

export default MainRoutes;
