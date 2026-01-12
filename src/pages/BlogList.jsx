import { Link } from "react-router-dom";
import { posts } from "../data/posts";

export default function BlogList() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Blog</h1>
        <p className="mt-2 text-gray-700">
          Uzun kuyruk sorulara net cevaplar → trafik buradan gelir.
        </p>
      </div>

      <div className="grid gap-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to={`/blog/${p.slug}`}
            className="rounded-2xl border p-5 hover:bg-gray-50"
          >
            <div className="text-sm text-gray-500">{p.date}</div>
            <div className="mt-1 text-lg font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-gray-700">{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
