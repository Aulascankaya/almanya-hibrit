import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { posts } from "../data/posts";

export default function BlogList() {
  const [q, setQ] = useState("");
  const normalizedQuery = q.trim().toLowerCase();

  const featured = useMemo(() => posts.slice(0, 3), []);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return posts;

    const scored = posts
      .map((p) => {
        const title = (p.title || "").toLowerCase();
        const slug = (p.slug || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        const content = (p.content || "").toLowerCase();

        const haystack = `${title} ${slug} ${desc} ${content}`;
        if (!haystack.includes(normalizedQuery)) return null;

        let score = 0;
        if (title.includes(normalizedQuery)) score += 60;
        if (desc.includes(normalizedQuery)) score += 35;
        if (slug.includes(normalizedQuery)) score += 20;
        if (content.includes(normalizedQuery)) score += 10;

        const idxTitle = title.indexOf(normalizedQuery);
        if (idxTitle === 0) score += 15;
        else if (idxTitle > 0) score += 5;

        return { p, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.p);
  }, [normalizedQuery]);

  return (
    <>
      <Seo
        title="Almanya Blog | Almanya Yaşam Rehberi"
        description="Almanya’da yaşam, iş, Ausbildung, Steuerklasse ve bütçe üzerine pratik yazılar. Arama yaparak hızlıca bul."
        canonicalPath="/blog"
      />

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="mt-2 text-gray-700">
            En çok sorulan sorulara net cevaplar. Arama yaparak istediğin konuyu
            hızlıca bul.
          </p>
        </div>

        {/* Arama + temizleme */}
        <div className="rounded-2xl border p-5 bg-gray-50">
          <label className="block">
            <div className="text-sm font-medium">Blogda ara</div>

            <div className="mt-2 relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Örn: anmeldung, steuerklasse, mini-job, kira..."
                className="w-full rounded-xl border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-black bg-white"
              />

              {q ? (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg border bg-white hover:bg-gray-50 text-sm"
                  aria-label="Aramayı temizle"
                  title="Temizle"
                >
                  ×
                </button>
              ) : null}
            </div>
          </label>

          <div className="mt-3 text-xs text-gray-500">
            İpucu: “net maaş”, “Steuerklasse”, “Anmeldung”, “kira” gibi kelimeler
            dene.
          </div>
        </div>

        {/* Öne Çıkanlar (arama yokken) */}
        {!normalizedQuery ? (
          <div className="rounded-2xl border p-5 bg-gray-50">
            <div className="font-semibold">Öne Çıkanlar</div>
            <div className="mt-3 grid md:grid-cols-3 gap-3">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
                >
                  <div className="font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-gray-600">
                    {p.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="text-sm text-gray-600">
          {normalizedQuery ? (
            <>
              “<span className="font-semibold">{q}</span>” için{" "}
              <span className="font-semibold">{filtered.length}</span> sonuç
            </>
          ) : (
            <>
              Toplam <span className="font-semibold">{posts.length}</span> yazı
            </>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                to={`/blog/${p.slug}`}
                className="rounded-2xl border p-5 hover:bg-gray-50"
              >
                <div className="text-sm text-gray-500">{p.date}</div>

                <div className="mt-1 text-lg font-semibold">
                  <Highlight text={p.title} query={normalizedQuery} />
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  <Highlight text={p.description} query={normalizedQuery} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border p-6 bg-gray-50 space-y-4">
            <div className="text-lg font-semibold">Sonuç bulunamadı</div>
            <p className="text-sm text-gray-700">
              Daha genel bir kelime dene. Örn: “kira”, “net”, “vergi”, “job”.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setQ("")}
                className="px-4 py-2 rounded-xl border bg-white"
              >
                Aramayı temizle
              </button>
              <Link
                to="/hesaplayici"
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                Hesaplayıcıya git →
              </Link>
              <Link to="/maas" className="px-4 py-2 rounded-xl border bg-white">
                Maaşlara git
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Highlight({ text, query }) {
  if (!query) return text;

  const lower = text.toLowerCase();
  const idx = lower.indexOf(query);
  if (idx === -1) return text;

  const before = text.slice(0, idx);
  const match = text.slice(idx, idx + query.length);
  const after = text.slice(idx + query.length);

  return (
    <>
      {before}
      <mark className="rounded px-1 bg-yellow-200">{match}</mark>
      {after}
    </>
  );
}
