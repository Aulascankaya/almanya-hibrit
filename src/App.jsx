import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Salary from "./pages/Salary.jsx";
import Calculator from "./pages/Calculator.jsx";
import SalaryList from "./pages/SalaryList.jsx";


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/maas" element={<SalaryList />} />
        <Route path="/maas/:role" element={<Salary />} />
        <Route path="/hesaplayici" element={<Calculator />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
