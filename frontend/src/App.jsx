import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors/>
      <Routes>
        <Route path="/login" Component={Login}/>
        <Route path="/register" Component={Register}/>

        {/* protected */}
        <Route path="/" Component={Home}/>
    </Routes>
    </>
  );
}

export default App;
