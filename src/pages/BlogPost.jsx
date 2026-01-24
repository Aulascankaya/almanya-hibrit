import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Seo from "../components/Seo.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { posts } from "../data/posts";
import { salaries } from "../data/salaries";

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
            {idx < items.length - 1 ? (
              <span className="text-gray-400">/</span>
            ) : null}
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

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  const featuredPosts = posts.slice(0, 3);
  const popularSalaries = salaries.slice(0, 6);

  // NOT FOUND
  if (!post) {
    return (
      <>
        <Seo
          title="Yazı bulunamadı | Almanya Yaşam Rehberi"
          description="Aradığın yazı bulunamadı. Popüler yazılar, maaş rehberleri ve hesaplayıcılara göz at."
          canonicalPath="/blog"
        />

        <div className="space-y-8">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: "Bulunamadı" },
            ]}
          />

          <section className="rounded-2xl border p-6 bg-gray-50">
            <h1 className="text-2xl font-bold">Aradığın yazı bulunamadı</h1>
            <p className="mt-2 text-gray-700 max-w-2xl">
              Link eski olabilir ya da yazı kaldırılmış olabilir. Aşağıdan popüler içeriklere göz atabilirsin.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/blog" className="px-4 py-2 rounded-xl bg-black text-white">
                Blog’a dön →
              </Link>
              <Link to="/hesaplayici" className="px-4 py-2 rounded-xl border bg-white">
                Hesaplayıcılar
              </Link>
              <Link to="/maas" className="px-4 py-2 rounded-xl border bg-white">
                Maaş Rehberleri
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xl font-bold">Öne Çıkan Yazılar</div>
                <div className="mt-1 text-sm text-gray-600">En çok aranan konulardan.</div>
              </div>
              <Link className="text-sm underline" to="/blog">
                Tüm blog →
              </Link>
            </div>

            <div className="mt-4 grid md:grid-cols-3 gap-3">
              {featuredPosts.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-2xl border p-4 hover:bg-gray-50"
                >
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{p.description}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border p-5 bg-gray-50">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xl font-bold">Popüler Maaşlar</div>
                <div className="mt-1 text-sm text-gray-600">Kıyaslamak için birkaç meslek.</div>
              </div>
              <Link className="text-sm underline" to="/maas">
                Tüm maaşlar →
              </Link>
            </div>

            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popularSalaries.map((s) => (
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
          </section>

          <AdSlot label="Blog 404 Reklam Alanı" />
        </div>
      </>
    );
  }

  const relatedSalaries = (post.relatedSalaries || [])
    .map((id) => salaries.find((s) => s.slug === id))
    .filter(Boolean);

  return (
    <>
      <Seo
        title={`${post.title} | Almanya Yaşam Rehberi`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
      />

      <div className="space-y-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
          <div className="text-sm text-gray-500">{post.date}</div>
        </header>

        {/* OKUMA MODU: içerik kutusu */}
        <section className="rounded-2xl border p-5 bg-white">
          <article className="prose prose-gray max-w-none leading-relaxed">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </section>

        {/* Hesaplayıcı CTA */}
        <section className="rounded-2xl border p-5 bg-gray-50">
          <h2 className="font-semibold text-lg">Kendi durumunu merak ediyor musun?</h2>
          <p className="mt-2 text-sm text-gray-700">
            Brüt maaş, çalışma saati ve kira oranına göre bütçeni hızlıca hesapla.
          </p>

          <Link
            to="/hesaplayici"
            className="mt-3 inline-block px-4 py-2 rounded-xl bg-black text-white"
          >
            Hesaplayıcıyı aç →
          </Link>
        </section>

        <AdSlot label="Blog İçi Reklam" />

        {/* İlgili maaşlar */}
        <section className="rounded-2xl border p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">İlgili Maaş Rehberleri</div>
              <div className="text-sm text-gray-600">Bu yazıyla bağlantılı meslekler</div>
            </div>
            <Link className="text-sm underline" to="/maas">
              Tüm maaşlar →
            </Link>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedSalaries.length === 0 ? (
              <div className="text-sm text-gray-600">Bu yazı için ilgili maaş bulunamadı.</div>
            ) : (
              relatedSalaries.map((s) => (
                <Link
                  key={s.slug}
                  to={`/maas/${s.slug}`}
                  className="rounded-2xl border p-4 hover:bg-gray-50"
                >
                  <div className="font-semibold">{s.title}</div>
                  <div className="mt-1 text-sm text-gray-600">{s.avg}</div>
                </Link>
              ))
            )}
          </div>
        </section>

        <AdSlot label="Blog Altı Reklam" />
      </div>

      <ScrollToTopButton />
    </>
  );
}
