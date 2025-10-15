import { useState, useEffect, useMemo } from 'react';
import { ResepMinuman } from '../data/minuman';
import RecipeGrid from '../components/minuman/RecipeGrid';

export default function MinumanPage({ onNavigate, favorites = [], onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;

  // ✅ gunakan useMemo agar data tidak dibuat ulang setiap render
  const allMinuman = useMemo(() => Object.values(ResepMinuman.resep), []);

  // ✅ Filter resep sesuai query pencarian
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(allMinuman);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = allMinuman.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRecipes(filtered);
    }
    setCurrentPage(1); // reset halaman setiap kali pencarian berubah
  }, [searchQuery, allMinuman]);

  // ✅ Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* 🔍 Search bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari resep minuman..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300"
          />
        </div>

        {/* 🍹 Grid resep */}
        {currentRecipes.length > 0 ? (
         <RecipeGrid
          recipes={currentRecipes.map(r => ({ ...r, type: 'minuman' }))}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onNavigate={onNavigate}
        />

        ) : (
          <p className="text-gray-500">Tidak ada resep ditemukan.</p>
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
                    ? 'bg-green-500 text-white border-green-600'
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
