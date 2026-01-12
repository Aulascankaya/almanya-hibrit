export default function Privacy() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Gizlilik Politikası</h1>
      <p className="text-gray-700">
        Bu sayfa bilgilendirme amaçlıdır. Reklam (Google AdSense) ve analiz araçları
        kullanıldığında çerez (cookie) ve benzeri teknolojiler devreye girebilir.
      </p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Site kullanımında bazı teknik veriler (IP, tarayıcı vb.) işlenebilir.</li>
        <li>Reklamlar çerez kullanabilir.</li>
        <li>Kullanıcı tarayıcı ayarlarından çerezleri yönetebilir.</li>
      </ul>
    </div>
  );
}
