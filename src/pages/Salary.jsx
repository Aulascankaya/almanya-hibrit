import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { salaries } from "../data/salaries";
import { posts } from "../data/posts";

function Breadcrumb({ items }) {
  return (
    <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {it.to ? (
              <Link className="underline hover:text-gray-900" to={it.to}>
                {it.label}
              </Link>
            ) : (
              <span className="text-gray-800">{it.label}</span>
            )}
            {idx < items.length - 1 ? <span className="text-gray-400">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 rounded-2xl border bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-50"
      aria-label="Yukarı çık"
      title="Yukarı çık"
    >
      ↑ Yukarı
    </button>
  );
}

export default function Salary() {
  const { role } = useParams();
  const data = salaries.find((s) => s.slug === role);

  if (!data) {
    return (
      <div className="space-y-3">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", to: "/" },
            { label: "Maaşlar", to: "/maas" },
            { label: "Bulunamadı" },
          ]}
        />
        <h1 className="text-2xl font-bold">Maaş bulunamadı</h1>
        <Link className="underline" to="/maas">
          Maaş listesine dön
        </Link>
      </div>
    );
  }

  const relatedPosts = posts
    .filter((p) => (p.relatedSalaries || []).includes(data.slug))
    .slice(0, 3);

  const similar = salaries.filter((s) => s.slug !== data.slug).slice(0, 6);

  return (
    <>
      <Seo
        title={`${data.title} | Almanya Yaşam Rehberi`}
        description={data.description}
        canonicalPath={`/maas/${data.slug}`}
      />

      <div className="space-y-6">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", to: "/" },
            { label: "Maaşlar", to: "/maas" },
            { label: data.title },
          ]}
        />

        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="mt-2 text-gray-700">{data.description}</p>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50">
          <div className="text-sm text-gray-600">Ortalama / Aralık</div>
          <div className="mt-1 text-xl font-semibold">{data.avg}</div>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Benzer Maaşlar</div>
              <div className="text-sm text-gray-600">
                Kıyaslamak için birkaç mesleğe daha bak.
              </div>
            </div>
            <Link className="text-sm underline" to="/maas">
              Tüm maaşlar →
            </Link>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {similar.map((s) => (
              <Link
                key={s.slug}
                to={`/maas/${s.slug}`}
                className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
              >
                <div className="font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-gray-600">{s.avg}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5">
          <div className="font-semibold">Detaylar</div>
          <div className="mt-3 space-y-3 text-gray-800">
            {(data.paragraphs || []).map((txt, i) => (
              <p key={i}>{txt}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50">
          <div className="font-semibold">Sık Sorulan Sorular</div>
          <div className="mt-3 space-y-3">
            {(data.faqs || []).length === 0 ? (
              <div className="text-sm text-gray-600">
                Bu sayfa için SSS henüz eklenmedi.
              </div>
            ) : (
              data.faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border bg-white p-4">
                  <div className="font-semibold">{f.q}</div>
                  <div className="mt-1 text-sm text-gray-700">{f.a}</div>
                </div>
              ))
            )}
          </div>
        </div>

        <AdSlot label="Maaş Sayfası Reklam Alanı" />

        <div className="rounded-2xl border p-5">
          <div className="font-semibold">Hızlı hesap yapmak ister misin?</div>
          <p className="mt-2 text-sm text-gray-700">
            Saatlik ücret, aylık saat ve kira oranını hesaplayıcıda görebilirsin.
          </p>
          <Link
            className="mt-3 inline-block px-4 py-2 rounded-xl bg-black text-white"
            to="/hesaplayici"
          >
            Hesaplayıcıya git →
          </Link>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">İlgili Blog Yazıları</div>
              <div className="text-sm text-gray-600">
                Bu konuyla bağlantılı 3 yazı.
              </div>
            </div>
            <Link className="text-sm underline" to="/blog">
              Tüm blog →
            </Link>
          </div>

          <div className="mt-4 grid gap-3">
            {relatedPosts.length === 0 ? (
              <div className="text-sm text-gray-600">
                Henüz ilgili blog yazısı yok.
              </div>
            ) : (
              relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
                >
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{p.description}</div>
                </Link>
              ))
            )}
          </div>
        </div>

        <AdSlot label="Maaş Sayfası Alt Reklam Alanı" />
      </div>

      <ScrollToTopButton />
    </>
  );
}
