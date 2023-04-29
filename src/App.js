import "./index.css";
import { Routes, Route } from "react-router-dom";
import Report from "./components/Report";
import Home from "./components/Home";
import Onboarding from "./components/Onboarding";
function App() {
  return (
    // <div className="App">
    //   <button className="m-auto p-4 font-bold">CLick me</button>
    // </div>
    <Routes>
      <Route path="/onboarding" element={<Onboarding />}></Route>
      <Route path="/" element={<Home />}></Route>
      <Route path="/report" element={<Report />}></Route>
    </Routes>
  );
}

export default App;
