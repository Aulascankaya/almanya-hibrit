export default function AdSlot({ label = "Reklam Alanı" }) {
  return (
    <div className="rounded-2xl border p-6 text-sm text-gray-500 bg-white">
      {label} (AdSense onayı sonrası burada gerçek reklam gösterilecek)
    </div>
  );
}
