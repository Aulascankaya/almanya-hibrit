import Seo from "../components/Seo.jsx";

export default function Privacy() {
  return (
    <>
      <Seo
        title="Gizlilik Politikası | Almanya Yaşam Rehberi"
        description="Gizlilik politikası ve çerez kullanımı hakkında bilgilendirme."
        canonicalPath="/gizlilik"
      />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gizlilik Politikası</h1>

        <div className="space-y-3 text-gray-800">
          <p>
            Bu sayfa, siteyi ziyaret eden kullanıcıların gizliliği hakkında genel bilgilendirme sağlar.
            Site geliştikçe içerik güncellenebilir.
          </p>

          <h2 className="text-lg font-semibold">Toplanan bilgiler</h2>
          <p>
            Siteyi ziyaret ettiğinizde tarayıcı, cihaz türü, yaklaşık konum (şehir düzeyinde),
            sayfa görüntüleme gibi teknik veriler servis sağlayıcılar tarafından işlenebilir.
          </p>

          <h2 className="text-lg font-semibold">Çerezler (Cookies)</h2>
          <p>
            Site, işlevsellik ve ölçümleme için çerez kullanabilir. Google AdSense gibi reklam servisleri
            de reklam göstermek için çerez kullanabilir.
          </p>

          <h2 className="text-lg font-semibold">Üçüncü taraf hizmetler</h2>
          <p>
            Reklam veya analiz hizmetleri kullanıldığında, bu servislerin kendi gizlilik politikaları geçerlidir.
          </p>

          <h2 className="text-lg font-semibold">Çerez yönetimi</h2>
          <p>
            Çerezleri tarayıcı ayarlarından silebilir veya engelleyebilirsiniz. Ancak bazı özellikler etkilenebilir.
          </p>

          <h2 className="text-lg font-semibold">İletişim</h2>
          <p>
            Gizlilikle ilgili sorular için İletişim sayfasındaki e-posta adresini kullanabilirsiniz.
          </p>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50 text-sm text-gray-700">
          <div className="font-semibold">AdSense notu</div>
          <p className="mt-2">
            Google AdSense etkinleştirildiğinde bu sayfa, reklam ve çerez kullanımı hakkında daha detaylı
            bilgilendirme ile güncellenmelidir.
          </p>
        </div>
      </div>
    </>
  );
}
