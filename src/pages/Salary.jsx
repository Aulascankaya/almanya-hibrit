import { useParams, Link } from "react-router-dom";
import { salaries } from "../data/salaries";
import { posts } from "../data/posts";
import AdSlot from "../components/AdSlot";

export default function Salary() {
  const { role } = useParams();
  const data = salaries.find((s) => s.slug === role);

  if (!data) {
    return (
      <div className="space-y-3">
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

  return (
    <div className="space-y-6">
      <div>
        <Link className="text-sm underline text-gray-700" to="/maas">
          ← Maaş listesi
        </Link>
        <h1 className="mt-3 text-3xl font-bold">{data.title}</h1>
        <p className="mt-2 text-gray-700">{data.description}</p>
      </div>

      <div className="rounded-2xl border p-5 bg-gray-50">
        <div className="text-sm text-gray-600">Ortalama / Aralık</div>
        <div className="mt-1 text-xl font-semibold">{data.avg}</div>
      </div>

      {/* 2–3 paragraf içerik */}
      <div className="rounded-2xl border p-5">
        <div className="font-semibold">Detaylar</div>
        <div className="mt-3 space-y-3 text-gray-800">
          {(data.paragraphs || []).map((txt, i) => (
            <p key={i}>{txt}</p>
          ))}
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="rounded-2xl border p-5 bg-gray-50">
        <div className="font-semibold">Sık Sorulan Sorular</div>
        <div className="mt-3 space-y-3">
          {(data.faqs || []).length === 0 ? (
            <div className="text-sm text-gray-600">Bu sayfa için SSS henüz eklenmedi.</div>
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
        <Link className="mt-3 inline-block underline" to="/hesaplayici">
          Hesaplayıcıya git →
        </Link>
      </div>

      {/* İlgili blog yazıları */}
      <div className="rounded-2xl border p-5 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">İlgili Blog Yazıları</div>
            <div className="text-sm text-gray-600">Bu konuyla bağlantılı 3 yazı.</div>
          </div>
          <Link className="text-sm underline" to="/blog">
            Tüm blog →
          </Link>
        </div>

        <div className="mt-4 grid gap-3">
          {relatedPosts.length === 0 ? (
            <div className="text-sm text-gray-600">
              Henüz ilgili blog yazısı yok. (Sonra ekleyeceğiz.)
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
  );
}
