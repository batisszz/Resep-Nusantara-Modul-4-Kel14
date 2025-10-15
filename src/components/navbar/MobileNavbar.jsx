import { Home, ChefHat, Coffee, Heart, User } from 'lucide-react';

export default function MobileNavbar({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'makanan', label: 'Makanan', icon: ChefHat },
    { id: 'minuman', label: 'Minuman', icon: Coffee },
    { id: 'favorite', label: 'Favorit', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-4 py-1 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around max-w-sm mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center py-2 px-3 transition-colors duration-200 ${
                isActive ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <IconComponent
                size={20}
                strokeWidth={isActive ? 2.3 : 1.7}
                className={`mb-1 ${isActive && item.id === 'favorite' ? 'fill-red-500 text-red-500' : ''}`}
              />
              <span className="text-[11px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
