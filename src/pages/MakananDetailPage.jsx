import { Heart } from "lucide-react";

export default function MakananDetailPage({ makanan, onBack, favorites, onToggleFavorite }) {
  if (!makanan) {
    return (
      <p className="text-center mt-10 text-red-500">
        Resep tidak ditemukan
      </p>
    );
  }

  const isFavorite = favorites.some(
    (fav) => fav.id === makanan.id && fav.type === makanan.type
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-6 relative">
        {/* Tombol kembali */}
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ← Kembali
        </button>

        {/* Gambar utama */}
        <div className="relative">
          <img
            src={makanan.image_url}
            alt={makanan.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Tombol Favorite */}
          <button
            onClick={() => onToggleFavorite(makanan)}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition"
          >
            <Heart
              size={28}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
            />
          </button>
        </div>

        {/* Judul */}
        <h1 className="text-3xl font-bold text-slate-800 mb-4">{makanan.name}</h1>

        {/* Bahan */}
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Bahan-bahan</h2>
        <ul className="list-disc pl-5 mb-6">
          {makanan.ingredients.map((bahan, i) => (
            <li key={i} className="text-slate-600">
              {bahan}
            </li>
          ))}
        </ul>

        {/* Langkah */}
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Langkah-langkah</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {makanan.steps.map((step, i) => (
            <li key={i} className="text-slate-600">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
