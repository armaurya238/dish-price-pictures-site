
import React from 'react';

interface FooterProps {
  restaurantName: string;
  address: string;
  phone: string;
  hours: string;
}

const Footer: React.FC<FooterProps> = ({ restaurantName, address, phone, hours }) => {
  return (
    <footer className="bg-menu-DEFAULT text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4">{restaurantName}</h3>
            <p className="text-gray-300">{address}</p>
            <p className="text-gray-300">{phone}</p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-4">Hours</h4>
            <p className="text-gray-300 whitespace-pre-line">{hours}</p>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-bold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-menu-accent">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-menu-accent">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-menu-accent">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {restaurantName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
