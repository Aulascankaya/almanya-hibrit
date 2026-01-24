import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { posts } from "../data/posts";
import { salaries } from "../data/salaries";

export default function Home() {
  const featuredPosts = posts.slice(0, 3);
  const popularSalaries = salaries.slice(0, 6);

  return (
    <>
      <Seo
        title="Almanya Yaşam Rehberi | Maaşlar, Blog ve Hesaplayıcılar"
        description="Almanya’da yaşam ve çalışma için maaş rehberleri, blog yazıları ve pratik hesaplayıcılar."
        canonicalPath="/"
      />

      <div className="space-y-10">
        {/* Hero */}
        <section className="rounded-2xl border p-6 bg-gray-50">
          <h1 className="text-3xl font-bold tracking-tight">
            Almanya Yaşam Rehberi
          </h1>

          <p className="mt-3 text-gray-700 max-w-2xl">
            Almanya’da yaşam, iş, maaş ve bütçe konularını tek yerde toplayan pratik bir rehber.
            Hızlıca oku, hesapla, kıyasla.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/hesaplayici"
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              Hesaplayıcılar →
            </Link>
            <Link to="/maas" className="px-4 py-2 rounded-xl border bg-white">
              Maaş Rehberleri
            </Link>
            <Link to="/blog" className="px-4 py-2 rounded-xl border bg-white">
              Blog
            </Link>
          </div>
        </section>

        {/* 3 rota kartı */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card
            title="Hesaplayıcılar"
            text="Kira oranı, hedef gelire göre saatlik ücret ve Steuerklasse net tahmini."
            cta="Hesapla"
            to="/hesaplayici"
          />
          <Card
            title="Maaş Rehberleri"
            text="Mesleklere göre maaş aralıkları + detaylar + sık sorulan sorular."
            cta="Maaşlara bak"
            to="/maas"
          />
          <Card
            title="Blog"
            text="Anmeldung, Steuerklasse, mini-job, kira gibi sorulara net cevaplar."
            cta="Oku"
            to="/blog"
          />
        </section>

        {/* Popüler maaşlar */}
        <section className="rounded-2xl border p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xl font-bold">Popüler Maaşlar</div>
              <div className="mt-1 text-sm text-gray-600">
                Hızlı kıyas için birkaç meslek.
              </div>
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
                className="rounded-2xl border p-4 hover:bg-gray-50"
              >
                <div className="font-semibold">{s.title}</div>
                <div className="mt-1 text-sm text-gray-600">{s.avg}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Öne çıkan bloglar */}
        <section className="rounded-2xl border p-5 bg-gray-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xl font-bold">Öne Çıkan Yazılar</div>
              <div className="mt-1 text-sm text-gray-600">
                En çok aranan konulardan.
              </div>
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
                className="rounded-2xl border bg-white p-4 hover:bg-gray-50"
              >
                <div className="font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-gray-600">
                  {p.description}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust / uyarı */}
        <section className="rounded-2xl border p-5">
          <div className="font-semibold">Not</div>
          <p className="mt-2 text-sm text-gray-700">
            Hesaplayıcılar ve maaş aralıkları bilgilendirme amaçlıdır; net sonuçlar kişisel koşullara göre değişebilir.
          </p>
        </section>
      </div>
    </>
  );
}

function Card({ title, text, cta, to }) {
  return (
    <div className="rounded-2xl border p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-gray-700">{text}</p>
      <Link className="mt-4 inline-block underline" to={to}>
        {cta} →
      </Link>
    </div>
  );
}
