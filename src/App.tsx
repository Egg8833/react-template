import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Greeting from "./pages/Greeting";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="greeting" element={<Greeting userName="John" />} />
        </Route>
      </Routes>
    </Router>
  );
}
