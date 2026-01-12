import { Outlet, NavLink } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm font-medium ${
          isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="font-bold tracking-tight">Almanya Rehberi</div>
          <nav className="flex gap-2">
            <NavItem to="/">Ana Sayfa</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/maas">Maaş</NavItem>
            <NavItem to="/hesaplayici">Hesaplayıcı</NavItem>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Almanya Rehberi — Bilgi amaçlıdır.
        </div>
      </footer>
    </div>
  );
}
