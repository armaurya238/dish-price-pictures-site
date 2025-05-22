
import React from 'react';

interface HeroProps {
  restaurantName: string;
  tagline: string;
}

const Hero: React.FC<HeroProps> = ({ restaurantName, tagline }) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format')" }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-bold mb-4 animate-fade-in font-serif tracking-tight">
          {restaurantName}
        </h1>
        <p className="text-white text-xl md:text-2xl max-w-2xl animate-fade-in font-light mt-4">{tagline}</p>
      </div>
    </section>
  );
};

export default Hero;
