import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { posts } from "../data/posts";
import { salaries } from "../data/salaries";
import AdSlot from "../components/AdSlot";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="space-y-3">
        <div className="text-xl font-bold">Yazı bulunamadı</div>
        <Link className="underline" to="/blog">
          Blog’a dön
        </Link>
      </div>
    );
  }

  const related = (post.relatedSalaries || [])
    .map((id) => salaries.find((s) => s.slug === id))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <Link className="text-sm underline text-gray-700" to="/blog">
        ← Blog
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="mt-2 text-sm text-gray-500">{post.date}</div>
      </div>

      <article className="prose prose-gray max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>

      <AdSlot label="Blog İçi Reklam Alanı" />

      {/* İlgili maaşlar: iç linkleme */}
      <div className="rounded-2xl border p-5 bg-gray-50">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold">İlgili Maaş Rehberleri</div>
            <div className="text-sm text-gray-600">
              Yazıyla bağlantılı maaş sayfalarına göz at.
            </div>
          </div>
          <Link className="text-sm underline" to="/maas">
            Tüm maaşlar →
          </Link>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {related.map((s) => (
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

      <AdSlot label="Blog Altı Reklam Alanı" />
    </div>
  );
}
