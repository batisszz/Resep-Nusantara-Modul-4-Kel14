import { useState, useMemo } from 'react';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function FavoritePage({ favorites, onNavigate, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // ✅ Filter berdasarkan pencarian
  const filteredFavorites = useMemo(() => {
    if (!searchQuery.trim()) return favorites;
    const lowerQuery = searchQuery.toLowerCase();
    return favorites.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowerQuery)
    );
  }, [favorites, searchQuery]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredFavorites.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* 🔍 Search Bar */}
        {favorites.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Cari resep favoritmu..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset halaman tiap kali search berubah
              }}
              className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
        )}

        {/* 💖 Daftar Favorit */}
        {currentRecipes.length > 0 ? (
          <RecipeGrid
            recipes={currentRecipes}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            onNavigate={onNavigate}
            hideHeader // ✅ supaya tidak tampilkan "Jelajahi Resep..."
          />
        ) : (
          <p className="text-gray-500 text-center mt-10">
            {favorites.length === 0
              ? 'Belum ada favorit. Klik ikon hati di kartu untuk menambahkannya!'
              : 'Tidak ada hasil pencarian untuk favorit ini.'}
          </p>
        )}

        {/* 🔢 Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
