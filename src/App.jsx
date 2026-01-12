import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

import BlogList from "./pages/BlogList.jsx";
import BlogPost from "./pages/BlogPost.jsx";

import SalaryList from "./pages/SalaryList.jsx";
import Salary from "./pages/Salary.jsx";

import Calculator from "./pages/Calculator.jsx";

import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function App() {
  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="r0jMAn-olnOqAHDooxCyaIpm6cVmGv9B0NMP19BKAOc"
        />
      </Helmet>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/maas" element={<SalaryList />} />
          <Route path="/maas/:role" element={<Salary />} />

          <Route path="/hesaplayici" element={<Calculator />} />

          <Route path="/hakkinda" element={<About />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/gizlilik" element={<Privacy />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
