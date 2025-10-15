import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen'
import HomePage from './pages/HomePage'
import MakananPage from './pages/MakananPage'
import MinumanPage from './pages/MinumanPage'
import ProfilePage from './pages/ProfilePage'
import FavoritePage from './pages/FavoritePage'
import MakananDetailPage from './pages/MakananDetailPage'
import DesktopNavbar from './components/navbar/DesktopNavbar'
import MobileNavbar from './components/navbar/MobileNavbar'
import './index.css'
import PWABadge from './PWABadge'

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentPage, setCurrentPage] = useState('home')
  const [previousPage, setPreviousPage] = useState(null)
  const [selectedMakanan, setSelectedMakanan] = useState(null)

  // ✅ daftar favorit
  const [favorites, setFavorites] = useState([])

  // global search
  const [searchQuery, setSearchQuery] = useState('')

  const handleSplashComplete = () => setShowSplash(false)

  const handleNavigation = (page, data = null) => {
    if (page === 'detail') {
      setPreviousPage(currentPage)
      setSelectedMakanan(data)
    }
    setCurrentPage(page)
  }

  // contoh di AppRoot
const toggleFavorite = (recipe) => {
  // pastikan recipe punya .id dan .type (kita sudah menambahkan type saat passing)
  const key = `${recipe.type}:${recipe.id}`;

  setFavorites((prev) => {
    const exists = prev.some(item => `${item.type}:${item.id}` === key);

    if (exists) {
      // hapus hanya item yang sama type+id
      return prev.filter(item => `${item.type}:${item.id}` !== key);
    } else {
      return [...prev, recipe];
    }
  });
}


  const handleBack = () => {
    setCurrentPage(previousPage || 'home')
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
  return (
    <HomePage
      onNavigate={handleNavigation}
      favorites={favorites}            
      onToggleFavorite={toggleFavorite} 
    />
  );

      case 'makanan':
        return (
          <MakananPage
            onNavigate={handleNavigation}
            searchQuery={searchQuery}
            favorites={favorites}            // ✅ kirim data favorit
            onToggleFavorite={toggleFavorite} // ✅ kirim fungsi toggle
          />
        )
      case 'minuman':
        return (
          <MinumanPage
            onNavigate={handleNavigation}
            searchQuery={searchQuery}
            favorites={favorites}            
            onToggleFavorite={toggleFavorite}
          />
        )
      case 'favorite':
        return (
          <FavoritePage
            favorites={favorites}
            searchQuery={searchQuery}
            onNavigate={handleNavigation}
            onToggleFavorite={toggleFavorite}
          />
        )
      case 'profile':
        return <ProfilePage onNavigate={handleNavigation} />
      case "detail":
  return (
    <MakananDetailPage
      makanan={selectedMakanan}
      onBack={handleBack}
      favorites={favorites}           // ✅ kirim daftar favorit global
      onToggleFavorite={toggleFavorite} // ✅ kirim fungsi toggle global
    />
        )
      default:
        return <HomePage onNavigate={handleNavigation} />
    }
  }

  if (showSplash) return <SplashScreen onComplete={handleSplashComplete} />

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNavbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main className="min-h-screen">{renderCurrentPage()}</main>
      <MobileNavbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />
      <PWABadge />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>
)
