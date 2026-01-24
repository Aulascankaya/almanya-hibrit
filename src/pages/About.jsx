import Seo from "../components/Seo.jsx";

export default function About() {
  return (
    <>
      <Seo
        title="Hakkında | Almanya Yaşam Rehberi"
        description="Almanya Yaşam Rehberi’nin amacı ve kapsamı."
        canonicalPath="/hakkinda"
      />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Hakkında</h1>

        <div className="space-y-3 text-gray-800">
          <p>
            Almanya Yaşam Rehberi; Almanya’da yaşam, çalışma, maaşlar ve günlük hayatta
            en çok sorulan sorulara pratik cevaplar vermek için hazırlanmıştır.
          </p>
          <p>
            Sitedeki maaş aralıkları ve hesaplayıcı sonuçları <span className="font-semibold">tahmini</span> değerlerdir.
            Kişisel durum (vergi sınıfı, sigorta, eyalet vb.) sonucu değiştirebilir.
          </p>
          <p>
            Amaç, hızlı bir çerçeve sunmak: “Nereden başlamalıyım?”, “Ne kadar kazanırım?”,
            “Kira oranım sağlıklı mı?” gibi sorulara yol göstermek.
          </p>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50 text-sm text-gray-700">
          <div className="font-semibold">Geri bildirim</div>
          <p className="mt-2">
            Hata gördüğün bir yer olursa veya eklenmesini istediğin bir konu varsa İletişim sayfasından yazabilirsin.
          </p>
        </div>
      </div>
    </>
  );
}
