import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import AdSlot from "../components/AdSlot.jsx";
import { salaries } from "../data/salaries";

export default function Calculator() {
  const [tab, setTab] = useState("rent"); // "rent" | "target" | "netto"
  const popular = salaries.slice(0, 6);

  return (
    <>
      <Seo
        title="Hesaplayıcılar | Almanya Yaşam Rehberi"
        description="Gelir, kira oranı, hedef gelire göre saatlik ücret ve Steuerklasse’a göre net maaş tahmini hesaplayıcıları."
        canonicalPath="/hesaplayici"
      />

      <div className="space-y-6">
        {/* Başlık */}
        <div className="rounded-2xl border p-6 bg-gray-50">
          <h1 className="text-2xl font-bold">Hesaplayıcılar</h1>
          <p className="mt-2 text-gray-700 max-w-2xl">
            Değer gir → sonucu gör. Bu sayfa etkileşimli olduğu için kullanıcıyı daha uzun tutar
            (SEO + AdSense için iyi).
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <TabButton active={tab === "rent"} onClick={() => setTab("rent")}>
              Gelir & Kira Oranı
            </TabButton>
            <TabButton active={tab === "target"} onClick={() => setTab("target")}>
              Hedef Gelire Göre Saatlik Ücret
            </TabButton>
            <TabButton active={tab === "netto"} onClick={() => setTab("netto")}>
              Net Maaş (Steuerklasse)
            </TabButton>
          </div>
        </div>

        {/* Popüler maaşlar */}
        <div className="rounded-2xl border p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Popüler Maaşlar</div>
              <div className="text-sm text-gray-600">
                Hesap yaptın mı? Şimdi maaş aralıklarıyla kıyasla.
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
        {tab === "rent" ? <RentCalculator /> : null}
        {tab === "target" ? <TargetHourlyCalculator /> : null}
        {tab === "netto" ? <NetSalaryCalculator /> : null}

        {/* İç link CTA */}
        <div className="rounded-2xl border p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-gray-50">
          <div>
            <div className="font-semibold">Sonraki adım</div>
            <div className="text-sm text-gray-600">
              Maaş rehberlerine göz at veya blogda ilgili yazıları oku.
            </div>
          </div>
          <div className="flex gap-3">
            <Link className="px-4 py-2 rounded-xl bg-black text-white" to="/maas">
              Maaş Rehberleri
            </Link>
            <Link className="px-4 py-2 rounded-xl border bg-white" to="/blog">
              Blog
            </Link>
          </div>
        </div>

        <AdSlot label="Hesaplayıcı Sayfası Alt Reklam Alanı" />
      </div>
    </>
  );
}

/* ---------------- UI parçaları ---------------- */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-4 py-2 rounded-xl text-sm font-medium border ${
        active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, hint }) {
  return (
    <label className="block">
      <div className="text-sm font-medium">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <div className="mt-1 text-xs text-gray-500">{hint}</div> : null}
    </label>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="rounded-2xl border p-4 bg-gray-50 text-sm text-gray-700">
      <div className="font-semibold">{title}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}

/* ---------------- 1) Gelir & Kira Oranı ---------------- */

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

    const grossSimple = h * m;
    const total = grossSimple + t;
    const rentRatio = total > 0 ? (r / total) * 100 : 0;

    return { grossSimple, total, rentRatio };
  }, [hourly, hours, tips, rent]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border p-5 space-y-4">
        <div className="font-semibold">Gelir & Kira Oranı</div>

        <Field label="Saatlik ücret (€)" value={hourly} onChange={setHourly} />
        <Field label="Aylık çalışma saati" value={hours} onChange={setHours} />
        <Field label="Bahşiş (tahmini, €)" value={tips} onChange={setTips} />
        <Field label="Kira (€)" value={rent} onChange={setRent} hint="Warmmiete yazmak daha gerçekçi." />

        <div className="text-xs text-gray-500">
          Not: Bu basit modeldir. Vergi ve sigorta kesintileri dahil değildir.
        </div>
      </div>

      <div className="rounded-2xl border p-5 bg-gray-50 space-y-4">
        <div>
          <div className="text-sm text-gray-600">Sonuç</div>
          <div className="mt-2 text-lg">
            <div>
              <span className="font-semibold">Brüt (basit): </span>
              {result.grossSimple.toFixed(2)} €
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

function Insight({ rentRatio }) {
  let text = "Kira oranını görmek için değer gir.";
  if (rentRatio > 0 && rentRatio <= 25) text = "Kira oranı düşük/sağlıklı görünüyor (genel yorum).";
  if (rentRatio > 25 && rentRatio <= 40) text = "Kira oranı orta seviyede. Bütçe takibi önemli.";
  if (rentRatio > 40) text = "Kira oranı yüksek. Daha düşük kira veya gelir artışı gerekebilir.";

  return (
    <div className="rounded-2xl border p-4 bg-white text-sm text-gray-700">
      <span className="font-semibold">Yorum: </span>
      {text}
    </div>
  );
}

/* ---------------- 2) Hedef gelire göre saatlik ücret ---------------- */

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
        <div className="font-semibold">Hedef Gelire Göre Saatlik Ücret</div>

        <Field label="Hedef gelir (€)" value={target} onChange={setTarget} />
        <Field label="Aylık çalışma saati" value={hours} onChange={setHours} />
        <Field label="Bahşiş (tahmini, €)" value={tips} onChange={setTips} />

        <div className="text-xs text-gray-500">
          Not: Bu basit modeldir. Vergi ve sigorta dahil değildir.
        </div>
      </div>

      <div className="rounded-2xl border p-5 bg-gray-50 space-y-4">
        <div>
          <div className="text-sm text-gray-600">Sonuç</div>
          <div className="mt-2 text-lg">
            <span className="font-semibold">Gereken saatlik ücret: </span>
            {result.neededHourly.toFixed(2)} €
          </div>
        </div>

        <InfoBox title="Yorum">
          {result.feasible
            ? "Bu hedef için saatlik ücret makul aralıkta görünüyor."
            : "Değerleri kontrol et. Saat 0 olamaz veya hedef/bahşiş uyumsuz."}
        </InfoBox>

        <AdSlot label="Hedef Hesaplayıcı Reklam Alanı" />
      </div>
    </div>
  );
}

/* ---------------- 3) Net Maaş (Steuerklasse) - BASİT TAHMİN ---------------- */

function NetSalaryCalculator() {
  const [grossMonthly, setGrossMonthly] = useState(3000);
  const [steuerklasse, setSteuerklasse] = useState("1");

  // Basit “kesinti aralığı” yaklaşımı (tahmini)
  const brackets = {
    "1": { min: 0.34, max: 0.42, label: "Standart (bekâr/tek iş) için yaygın" },
    "2": { min: 0.32, max: 0.40, label: "Tek ebeveyn durumu (genel çerçeve)" },
    "3": { min: 0.25, max: 0.35, label: "Bazı evli kombinasyonlarında daha avantajlı olabilir" },
    "4": { min: 0.33, max: 0.41, label: "Evli, gelirler benzerse sık tercih edilir" },
    "5": { min: 0.40, max: 0.50, label: "Evli kombinasyonunda diğer eş; kesinti yüksek görünebilir" },
    "6": { min: 0.42, max: 0.52, label: "İkinci iş (mini-job dışı) için sık görülür" },
  };

  const result = useMemo(() => {
    const g = Number(grossMonthly) || 0;
    const b = brackets[steuerklasse] || brackets["1"];

    const netMin = g * (1 - b.max);
    const netMax = g * (1 - b.min);

    return { netMin, netMax, b };
  }, [grossMonthly, steuerklasse]);

  const quickComment = useMemo(() => {
    if (result.netMax <= 0) return "Değerleri kontrol et: brüt maaş 0 olamaz.";
    if (result.netMax < 1800) return "Net aralık düşük görünüyor. Kira oranını mutlaka kontrol et.";
    if (result.netMax < 2800) return "Net aralık orta seviyede. Kira ve sabit giderleri planla.";
    return "Net aralık yüksek görünüyor. Yine de kira oranı ve birikim planı önemli.";
  }, [result.netMax]);

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Inputlar */}
      <div className="rounded-2xl border p-5 space-y-4">
        <div className="font-semibold">Net Maaş (Steuerklasse) — Tahmini</div>

        <Field
          label="Aylık brüt maaş (€)"
          value={grossMonthly}
          onChange={setGrossMonthly}
          hint="Bu araç yaklaşık bir aralık verir. Kesintiler kişiye göre değişir."
        />

        <label className="block">
          <div className="text-sm font-medium">Steuerklasse</div>
          <select
            className="mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
            value={steuerklasse}
            onChange={(e) => setSteuerklasse(e.target.value)}
          >
            <option value="1">Steuerklasse 1</option>
            <option value="2">Steuerklasse 2</option>
            <option value="3">Steuerklasse 3</option>
            <option value="4">Steuerklasse 4</option>
            <option value="5">Steuerklasse 5</option>
            <option value="6">Steuerklasse 6</option>
          </select>

          <div className="mt-1 text-xs text-gray-500">
            Seçim notu: {brackets[steuerklasse]?.label}
          </div>
        </label>

        <InfoBox title="Önemli uyarı">
          Bu hesaplama <span className="font-semibold">tahmini net aralık</span> verir. Gerçek net maaş;
          sağlık sigortası türü, çocuk, kilise vergisi, eyalet ve Krankenkasse ek payı gibi faktörlere göre değişir.
        </InfoBox>

        <div className="text-xs text-gray-500">
          Hızlı ipucu: Net aralığı gördükten sonra “Gelir & Kira Oranı” sekmesinde kira oranını kontrol et.
        </div>
      </div>

      {/* Sonuç */}
      <div className="rounded-2xl border p-5 bg-gray-50 space-y-4">
        <div>
          <div className="text-sm text-gray-600">Tahmini net aralık</div>
          <div className="mt-2 text-lg">
            <div>
              <span className="font-semibold">Net (min): </span>
              {result.netMin.toFixed(2)} €
            </div>
            <div className="mt-2">
              <span className="font-semibold">Net (max): </span>
              {result.netMax.toFixed(2)} €
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Kullanılan kesinti aralığı (yaklaşık): %{Math.round(result.b.min * 100)} – %{Math.round(result.b.max * 100)}
          </div>
        </div>

        <InfoBox title="Kısa yorum">{quickComment}</InfoBox>

        <div className="rounded-2xl border p-4 bg-white text-sm text-gray-700">
          <div className="font-semibold">Devam etmek ister misin?</div>
          <div className="mt-1">
            Şimdi kira oranını görmek için “Gelir & Kira Oranı” sekmesine geçebilirsin.
          </div>
        </div>

        <AdSlot label="Net Maaş Reklam Alanı" />
      </div>
    </div>
  );
}
