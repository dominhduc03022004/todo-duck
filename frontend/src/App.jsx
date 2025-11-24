import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>

        {/* protected */}
        <Route path="/" Component={Home}/>
    </Routes>
  );
}

export default App;
