import React from 'react';

const Homepageone = () => {
  // Categories data
  const categories = [
    { id: 1, name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: 'Jeans', image: 'https://images.unsplash.com/photo-1542271021-7eecb9035b95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 6, name: 'Pants', image: 'https://images.unsplash.com/photo-1624378439574-d8552fc705a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 7, name: 'Shorts', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 8, name: 'Track Pants', image: 'https://images.unsplash.com/photo-1548169915-6561f6925cd5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  // Brands data
  const brands = [
    { id: 1, name: 'Nike', image: 'https://images.unsplash.com/photo-1542291026-7eec26402768?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Adidas', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Puma', image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Levi\'s', image: 'https://images.unsplash.com/photo-1594930319720-8d8a0f7d9d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 5, name: 'H&M', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 6, name: 'Zara', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  // Seasonal offers data
  const seasonalOffers = [
    { id: 1, name: 'Winter Collection', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 2, name: 'Summer Special', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
    { id: 3, name: 'Monsoon Wear', image: 'https://images.unsplash.com/photo-1544571764-46a013bb70d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' },
  ];

  // Formal wear data
  const formalWear = [
    { id: 1, name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹799' },
    { id: 2, name: 'Formal Pants', image: 'https://images.unsplash.com/photo-1624378439574-d8552fc705a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹999' },
    { id: 3, name: 'Blazers', image: 'https://images.unsplash.com/photo-1594930319720-8d8a0f7d9d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹1999' },
    { id: 4, name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', price: '₹1299' },
  ];

  // Occasion based clothes data
  const occasionWear = [
    { id: 1, name: 'Party Wear', image: 'https://images.unsplash.com/photo-1475180098004-3d4a582a3293?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: 'Casual Outfits', image: 'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: 'Wedding Collection', image: 'https://images.unsplash.com/photo-1515372039744-b8f04921d502?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Festive Wear', image: 'https://images.unsplash.com/photo-1564564267028-f0e28c3b42d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  // Effective price section data
  const effectivePrice = [
    { id: 1, name: 'Under ₹499', image: 'https://images.unsplash.com/photo-1523381210438-281e77126844?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 2, name: '₹500 - ₹999', image: 'https://images.unsplash.com/photo-1576566588028-4147f2846f4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 3, name: '₹1000 - ₹1999', image: 'https://images.unsplash.com/photo-1542272601-3a0b753062b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    { id: 4, name: 'Above ₹2000', image: 'https://images.unsplash.com/photo-1542271021-7eecb9035b95?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
  ];

  return (
    <div className="bg-gray-50">
      {/* Men/Women Selection Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/2 h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Men's Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">MEN</h2>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Women's Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-4xl font-bold text-white">WOMEN</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">SHOP BY CATEGORY</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-24 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-sm font-medium">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Specific Banners */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="T-Shirt Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white">T-SHIRTS</h3>
            </div>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Shirt Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white">SHIRTS</h3>
            </div>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Hoodies Banner" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
              <h3 className="text-2xl font-bold text-white">HOODIES</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">SHOP BY BRANDS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <div key={brand.id} className="bg-white rounded-lg overflow-hidden shadow-md p-4 flex items-center justify-center h-32 cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-2 rounded-full overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-sm font-medium">{brand.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seasonal Offers Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">SEASONAL OFFERS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalOffers.map((offer) => (
            <div key={offer.id} className="relative h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
              <img 
                src={offer.image} 
                alt={offer.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{offer.name}</h3>
                <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Formal Shirts and Pants Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">FORMAL WEAR</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {formalWear.map((item) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transform transition duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                <p className="text-gray-700 font-semibold">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Occasion Based Clothes Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">OCCASION WEAR</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasionWear.map((item) => (
            <div key={item.id} className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Effective Price Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">SHOP BY PRICE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {effectivePrice.map((item) => (
            <div key={item.id} className="relative h-64 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition duration-500 hover:scale-105">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepageone;