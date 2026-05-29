import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';
import { FiStar, FiShoppingCart } from 'react-icons/fi';

function HomePage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);
  const [category, setCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({ category }));
  }, [dispatch, category]);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Kairos</h1>
        <p className="text-xl mb-6">Discover amazing products at unbeatable prices</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded font-semibold hover:bg-gray-100">
          Shop Now
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded ${category === '' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {['Electronics', 'Fashion', 'Home', 'Sports'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {/* Product Image */}
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <img
                  src={product.image || 'https://via.placeholder.com/200'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg font-semibold hover:text-blue-600 truncate"
                >
                  {product.name}
                </Link>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center text-yellow-400">
                    <FiStar size={16} />
                    <span className="ml-1 text-sm">{product.rating || 0}</span>
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({product.reviews || 0})</span>
                </div>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                  >
                    <FiShoppingCart size={20} />
                  </button>
                </div>

                {product.stock === 0 && (
                  <p className="text-red-500 text-sm mt-2">Out of Stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
