import Seo from "../components/Seo.jsx";

<Seo
  title="Almanya Yaşam Rehberi | Maaşlar, Blog ve Hesaplayıcılar"
  description="Almanya’da yaşam ve çalışma için maaş rehberleri, blog yazıları ve pratik hesaplayıcılar."
  canonicalPath="/"
/>

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Almanya Rehberi (MVP)
      </h1>
      <p className="text-gray-700">
        Blog + Maaş + Hesaplayıcı hibrit yapıyı kuruyoruz.
      </p>
      <div className="rounded-2xl border p-5 bg-gray-50">
        Eğer bu sayfayı görüyorsan, Layout + Router tamam ✅
      </div>
    </div>
  );
}
