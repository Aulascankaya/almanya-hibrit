import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { salaries } from "../data/salaries.js";

export default function Maas() {
  return (
    <>
      <Seo
        title="Almanya Maaş Rehberi | Mesleklere Göre Net & Brüt Maaşlar"
        description="Almanya’da mesleklere göre güncel maaşlar. Saatlik ve aylık kazançlar, sektör farkları ve pratik bilgiler."
        canonicalPath="/maas"
      />

      <div className="space-y-8">
        {/* Başlık */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Almanya Maaş Rehberi
          </h1>
          <p className="text-gray-700 max-w-2xl">
            Almanya’da farklı meslekler için saatlik ve aylık maaşları,
            sektör farklarını ve pratik açıklamaları burada bulabilirsin.
          </p>
        </header>

        {/* Liste */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {salaries.map((job) => (
            <Link
              key={job.slug}
              to={`/maas/${job.slug}`}
              className="rounded-2xl border p-5 hover:bg-gray-50 transition"
            >
              <div className="text-sm text-gray-500">{job.avg}</div>
              <div className="mt-1 text-lg font-semibold">
                {job.title}
              </div>
              <div className="mt-2 text-sm text-gray-700">
                {job.description}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
