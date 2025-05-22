
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MenuCategory {
  id: string;
  name: string;
}

interface MenuNavProps {
  categories: MenuCategory[];
}

const MenuNav: React.FC<MenuNavProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0]?.id || null);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    
    // Make nav sticky after hero section
    setIsSticky(scrollPosition > window.innerHeight * 0.6);
    
    // Update active category based on scroll position
    categories.forEach(category => {
      const element = document.getElementById(category.id);
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top <= 200 && position.bottom >= 200) {
          setActiveCategory(category.id);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveCategory(id);
    }
  };

  return (
    <nav className={cn(
      "w-full bg-white z-10 transition-all duration-300 border-b border-gray-200",
      isSticky ? "sticky top-0 shadow-md" : ""
    )}>
      <div className="container mx-auto px-4 py-4">
        <ul className="flex flex-nowrap items-center justify-start space-x-2 md:space-x-8 overflow-x-auto scrollbar-none">
          {categories.map((category) => (
            <li key={category.id} className="flex-shrink-0">
              <button
                onClick={() => scrollToSection(category.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category.id 
                    ? "text-menu-accent border-b-2 border-menu-accent" 
                    : "text-gray-600 hover:text-menu-accent"
                )}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default MenuNav;
