import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdSlot from "../components/AdSlot.jsx";
import { salaries } from "../data/salaries";

export default function Calculator() {
  const [tab, setTab] = useState("rent"); // "rent" | "target"
  const popular = salaries.slice(0, 6);

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold">Hesaplayıcılar</h1>
        <p className="mt-2 text-gray-700">
          Gelirini hesapla, maaş aralıklarıyla karşılaştır. (AdSense için ideal sayfa)
        </p>
      </div>

      {/* Sekmeler */}
      <div className="flex flex-wrap gap-2">
        <TabButton active={tab === "rent"} onClick={() => setTab("rent")}>
          Gelir & Kira Oranı
        </TabButton>
        <TabButton active={tab === "target"} onClick={() => setTab("target")}>
          Hedef Gelire Göre Saatlik Ücret
        </TabButton>
      </div>

      {/* Popüler maaşlar */}
      <div className="rounded-2xl border p-5 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">Popüler Maaşlar</div>
            <div className="text-sm text-gray-600">
              Hesapladın mı? Şimdi maaş aralıklarını gör.
            </div>
          </div>
          <Link className="text-sm underline" to="/maas">
            Tüm maaşlar →
          </Link>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {popular.map((s) => (
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
      </div>

      {/* Aktif hesaplayıcı */}
      {tab === "rent" ? <RentCalculator /> : <TargetHourlyCalculator />}

      {/* İç linkleme */}
      <div className="rounded-2xl border p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>
          <div className="font-semibold">Maaş sayfalarıyla kıyasla</div>
          <div className="text-sm text-gray-600">
            Genel aralıkları gör, sonra tekrar hesapla.
          </div>
        </div>
        <div className="flex gap-3">
          <Link className="px-4 py-2 rounded-xl bg-black text-white" to="/maas/garson">
            Garson Maaşı
          </Link>
          <Link className="px-4 py-2 rounded-xl border" to="/blog">
            Blog
          </Link>
        </div>
      </div>

      <AdSlot label="Sayfa Altı Reklam Alanı" />
    </div>
  );
}

/* ------------------ UI Bileşenleri ------------------ */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-4 py-2 rounded-xl text-sm font-medium border ${
        active
          ? "bg-black text-white border-black"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/* ------------------ 1) Gelir & Kira Oranı ------------------ */

function RentCalculator() {
  const [hourly, setHourly] = useState(15);
  const [hours, setHours] = useState(160);
  const [tips, setTips] = useState(0);
  const [rent, setRent] = useState(900);

  const result = useMemo(() => {
    const h = Number(hourly) || 0;
    const m = Number(hours) || 0;
    const t = Number(tips) || 0;
    const r = Number(rent) || 0;

    const gross = h * m;
    const total = gross + t;
    const rentRatio = total > 0 ? (r / total) * 100 : 0;

    return { gross, total, rentRatio };
  }, [hourly, hours, tips, rent]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border p-5 space-y-4">
        <Field label="Saatlik ücret (€)" value={hourly} onChange={setHourly} />
        <Field label="Aylık çalışma saati" value={hours} onChange={setHours} />
        <Field label="Bahşiş (tahmini, €)" value={tips} onChange={setTips} />
        <Field label="Kira (€)" value={rent} onChange={setRent} />

        <div className="text-xs text-gray-500">
          Not: Bu basit bir modeldir. Vergi ve sigorta dahil değildir.
        </div>
      </div>

      <div className="rounded-2xl border p-5 bg-gray-50 space-y-4">
        <div>
          <div className="text-sm text-gray-600">Sonuç</div>
          <div className="mt-2 text-lg">
            <div>
              <span className="font-semibold">Brüt (basit): </span>
              {result.gross.toFixed(2)} €
            </div>
            <div className="mt-2">
              <span className="font-semibold">Bahşiş dahil: </span>
              {result.total.toFixed(2)} €
            </div>
            <div className="mt-2">
              <span className="font-semibold">Kira oranı: </span>
              {result.rentRatio.toFixed(1)}%
            </div>
          </div>
        </div>

        <Insight rentRatio={result.rentRatio} />
        <AdSlot label="Hesaplayıcı Reklam Alanı" />
      </div>
    </div>
  );
}

/* ------------------ 2) Hedef Gelire Göre Saatlik ------------------ */

function TargetHourlyCalculator() {
  const [target, setTarget] = useState(2500);
  const [hours, setHours] = useState(160);
  const [tips, setTips] = useState(0);

  const result = useMemo(() => {
    const T = Number(target) || 0;
    const H = Number(hours) || 0;
    const P = Number(tips) || 0;

    const neededHourly = H > 0 ? (T - P) / H : 0;
    const feasible = neededHourly > 0 && neededHourly < 200;

    return { neededHourly, feasible };
  }, [target, hours, tips]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border p-5 space-y-4">
        <Field label="Hedef gelir (€)" value={target} onChange={setTarget} />
        <Field label="Aylık çalışma saati" value={hours} onChange={setHours} />
        <Field label="Bahşiş (tahmini, €)" value={tips} onChange={setTips} />
      </div>

      <div className="rounded-2xl border p-5 bg-gray-50 space-y-4">
        <div>
          <div className="text-sm text-gray-600">Sonuç</div>
          <div className="mt-2 text-lg">
            <span className="font-semibold">Gereken saatlik ücret: </span>
            {result.neededHourly.toFixed(2)} €
          </div>
        </div>

        <div className="rounded-2xl border p-4 bg-white text-sm text-gray-700">
          <span className="font-semibold">Yorum: </span>
          {result.feasible
            ? "Bu hedef için saatlik ücret makul aralıkta görünüyor."
            : "Değerleri kontrol et. Saat 0 olamaz veya hedef/bahşiş uyumsuz."}
        </div>

        <AdSlot label="Hedef Hesaplayıcı Reklam Alanı" />
      </div>
    </div>
  );
}

/* ------------------ Yorum ------------------ */

function Insight({ rentRatio }) {
  let text = "Kira oranını görmek için değer gir.";
  if (rentRatio > 0 && rentRatio <= 25)
    text = "Kira oranı düşük/sağlıklı görünüyor.";
  if (rentRatio > 25 && rentRatio <= 40)
    text = "Kira oranı orta seviyede. Bütçe takibi önemli.";
  if (rentRatio > 40)
    text = "Kira oranı yüksek. Daha düşük kira veya gelir artışı gerekebilir.";

  return (
    <div className="rounded-2xl border p-4 bg-white text-sm text-gray-700">
      <span className="font-semibold">Yorum: </span>
      {text}
    </div>
  );
}
