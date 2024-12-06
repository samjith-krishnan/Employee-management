import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formbuilders from "../components/Formbuilders";
import Formview from "../components/Formview";
import Home from "../components/Home";
import FormData from "../components/FormData";
import Login from "../components/Login";
import Register from "../components/Register";
import Account from "../components/Account";
import Passwordchange from "../components/Passwordchange";





function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/addform" element={<Formbuilders />} />
          <Route path="/formview/:id" element={<Formview />} />
          <Route path="/home" element={<Home />} />
          <Route path="/formdata/:id" element={<FormData />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/password-change" element={<Passwordchange />} />

          







        </Routes>
      </Router>
    </>
  );
}

export default App;
