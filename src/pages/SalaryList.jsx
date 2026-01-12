import { Link } from "react-router-dom";
import { salaries } from "../data/salaries";

export default function SalaryList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Maaş Rehberleri</h1>
        <p className="mt-2 text-gray-700">
          Meslek seç, detay sayfasına git. (SEO + AdSense için giriş sayfası)
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {salaries.map((s) => (
          <Link
            key={s.slug}
            to={`/maas/${s.slug}`}
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <div className="text-lg font-semibold">{s.title}</div>
            <div className="mt-1 text-sm text-gray-600">{s.avg}</div>
            <div className="mt-2 text-sm text-gray-700">{s.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
