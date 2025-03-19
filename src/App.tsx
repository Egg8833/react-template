import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import ProductList from "@/pages/ProductList";
import MemberStatus from "@/pages/MemberStatus";
import Permissions from "@/pages/Permissions";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="accountManagement" element={<About />} />
          <Route path="productList" element={<ProductList  />} />
          <Route path="permissions" element={<Permissions  />} />
          <Route path="admin/memberStatus" element={<MemberStatus  />} />
          <Route path="admin/hideFeatures" element={<MemberStatus  />} />
        </Route>
      </Routes>
    </Router>
  );
}
