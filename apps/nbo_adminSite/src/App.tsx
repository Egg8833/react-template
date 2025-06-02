import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "@/layout/Layout";
import AccountManagement from "@/pages/AccountManagement";
import ProductList from "@/pages/ProductList";

import Permissions from "@/pages/Permissions";
import Test from "@/pages/Test";
import Login from "@/pages/Login";




export default function App() {
  console.log(import.meta.env.VITE_APP_ENV)
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        
          <Route path="test" element={<Test />} />
          <Route path="login" element={<Login />} />
        
          <Route path="accountManagement" element={<AccountManagement />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="permissions" element={<Permissions />} />
       

        </Route>
      </Routes>
    </Router>
  );
}
