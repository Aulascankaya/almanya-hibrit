import Seo from "../components/Seo.jsx";

export default function Contact() {
  return (
    <>
      <Seo
        title="İletişim | Almanya Yaşam Rehberi"
        description="Geri bildirim ve iletişim bilgileri."
        canonicalPath="/iletisim"
      />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">İletişim</h1>

        <div className="rounded-2xl border p-5">
          <div className="font-semibold">E-posta</div>
          <p className="mt-2 text-gray-700">
            Geri bildirim için e-posta:{" "}
            <span className="font-semibold">info@almanyayasam.de</span>
          </p>
          <p className="mt-2 text-sm text-gray-500">
            (Şimdilik örnek yazdım. Eğer henüz bu e-postayı kurmadıysan, geçici olarak
            kendi Gmail adresini yazabilirsin.)
          </p>
        </div>

        <div className="rounded-2xl border p-5 bg-gray-50 text-sm text-gray-700">
          <div className="font-semibold">Not</div>
          <p className="mt-2">
            Bu sayfa bir iletişim formu değildir; ileride istersen basit bir form da ekleyebiliriz.
          </p>
        </div>
      </div>
    </>
  );
}
