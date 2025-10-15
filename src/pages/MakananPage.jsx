import { useState, useEffect, useMemo } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage({ onNavigate, favorites, onToggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const allMakanan = useMemo(() => Object.values(ResepMakanan.resep), []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(allMakanan);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = allMakanan.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRecipes(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, allMakanan]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Cari resep makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        {currentRecipes.length > 0 ? (
         <RecipeGrid
          recipes={currentRecipes.map(r => ({ ...r, type: 'makanan' }))}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onNavigate={onNavigate}
        />

        ) : (
          <p className="text-gray-500">Tidak ada resep ditemukan.</p>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
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
