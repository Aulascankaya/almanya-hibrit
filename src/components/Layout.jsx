import { Outlet, NavLink, Link } from "react-router-dom";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="font-bold tracking-tight hover:opacity-80 whitespace-nowrap"
          >
            Almanya Yaşam Rehberi
          </Link>

          <nav
            className="
              flex gap-2
              overflow-x-auto whitespace-nowrap
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            aria-label="Ana menü"
          >
            <NavItem to="/">Ana Sayfa</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/maas">Maaşlar</NavItem>
            <NavItem to="/hesaplayici">Hesaplayıcı</NavItem>
          </nav>
        </div>
      </header>

      {/* Content wrapper: okunabilirlik standardı */}
      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Bu div: tüm sayfalarda tutarlı “boşluk + okunabilirlik” hissi verir */}
        <div className="space-y-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Almanya Yaşam Rehberi — Bilgi amaçlıdır.
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <Link className="underline text-gray-700" to="/hakkinda">
                Hakkında
              </Link>
              <Link className="underline text-gray-700" to="/iletisim">
                İletişim
              </Link>
              <Link className="underline text-gray-700" to="/gizlilik">
                Gizlilik
              </Link>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Bu sitedeki bilgiler genel bilgilendirme amaçlıdır. Kesin sonuçlar; kişisel durum,
            mevzuat ve kurumlara göre değişebilir.
          </div>
        </div>
      </footer>
    </div>
  );
}
