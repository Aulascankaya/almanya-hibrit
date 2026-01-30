import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { salaries } from "../data/salaries";

export default function SalaryList() {
  const [q, setQ] = useState("");
  const normalizedQuery = q.trim().toLowerCase();

  const popular = useMemo(() => salaries.slice(0, 6), []);

  const filtered = useMemo(() => {
    if (!normalizedQuery) return salaries;

    const scored = salaries
      .map((s) => {
        const title = (s.title || "").toLowerCase();
        const slug = (s.slug || "").toLowerCase();
        const desc = (s.description || "").toLowerCase();
        const avg = (s.avg || "").toLowerCase();

        const haystack = `${title} ${slug} ${desc} ${avg}`;
        if (!haystack.includes(normalizedQuery)) return null;

        // Skor: başlık > slug > açıklama > avg
        let score = 0;
        if (title.includes(normalizedQuery)) score += 50;
        if (slug.includes(normalizedQuery)) score += 35;
        if (desc.includes(normalizedQuery)) score += 20;
        if (avg.includes(normalizedQuery)) score += 10;

        // Eşleşme baştaysa daha iyi
        const idxTitle = title.indexOf(normalizedQuery);
        if (idxTitle === 0) score += 15;
        else if (idxTitle > 0) score += 5;

        return { s, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score);

    return scored.map((x) => x.s);
  }, [normalizedQuery]);

  return (
    <>
      <Seo
        title="Almanya Maaş Rehberleri | Almanya Yaşam Rehberi"
        description="Almanya’da mesleklere göre maaş aralıkları, detaylar ve sık sorulan sorular. Meslek adıyla arama yap."
        canonicalPath="/maas"
      />

      <div className="space-y-6">
        {/* Başlık */}
        <div>
          <h1 className="text-2xl font-bold">Maaş Rehberleri</h1>
          <p className="mt-2 text-gray-700">
            Meslek adına göre arama yap. (Örn:{" "}
            <span className="font-semibold">IT Support</span>,{" "}
            <span className="font-semibold">Elektriker</span>,{" "}
            <span className="font-semibold">Garson</span>)
          </p>
        </div>

        {/* Arama + X */}
        <div className="rounded-2xl border p-5 bg-gray-50">
          <label className="block">
            <div className="text-sm font-medium">Meslek ara</div>

            <div className="mt-2 relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Örn: fachinformatiker, büro, pflege, lager..."
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
            İpucu: Almanca veya Türkçe yazabilirsin. Örn:{" "}
            <span className="font-semibold">Elektriker</span> /{" "}
            <span className="font-semibold">Elektrikçi</span> gibi.
          </div>
        </div>

        {/* Sonuç sayısı */}
        <div className="text-sm text-gray-600">
          {normalizedQuery ? (
            <>
              “<span className="font-semibold">{q}</span>” için{" "}
              <span className="font-semibold">{filtered.length}</span> sonuç
            </>
          ) : (
            <>
              Toplam <span className="font-semibold">{salaries.length}</span>{" "}
              meslek
            </>
          )}
        </div>

        {/* Sonuçlar */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <Link
                key={s.slug}
                to={`/maas/${s.slug}`}
                className="rounded-2xl border p-5 hover:bg-gray-50"
              >
                <div className="text-lg font-semibold">
                  <Highlight text={s.title} query={normalizedQuery} />
                </div>

                <div className="mt-1 text-sm text-gray-600">
                  <Highlight text={s.avg} query={normalizedQuery} />
                </div>

                <div className="mt-2 text-sm text-gray-700">
                  <Highlight text={s.description} query={normalizedQuery} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border p-6 bg-gray-50 space-y-4">
            <div className="text-lg font-semibold">Sonuç bulunamadı</div>
            <p className="text-sm text-gray-700">
              Yazımını kontrol et veya daha genel bir kelime dene. Örn: “it”,
              “lager”, “pflege”, “hotel”.
            </p>

            <div className="rounded-2xl border p-5 bg-white">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">Popüler Maaşlar</div>
                  <div className="text-sm text-gray-600">
                    Belki bunlardan biri işine yarar:
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="text-sm underline"
                >
                  Aramayı temizle
                </button>
              </div>

              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {popular.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/maas/${s.slug}`}
                    className="rounded-2xl border p-4 hover:bg-gray-50"
                  >
                    <div className="font-semibold">{s.title}</div>
                    <div className="mt-1 text-sm text-gray-600">{s.avg}</div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/hesaplayici"
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                Hesaplayıcıya git →
              </Link>
              <Link to="/blog" className="px-4 py-2 rounded-xl border bg-white">
                Blog’a git
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
