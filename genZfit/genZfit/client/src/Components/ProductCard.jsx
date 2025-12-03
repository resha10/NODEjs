import React from 'react';

// You can replace this URL with any placeholder image URL you prefer
const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/200x250?text=No+Image';

const ProductCard = ({ product }) => {
  // Defensive check for images array
  const imageUrl = product.images && product.images.length > 0
    ? product.images[0]
    : DEFAULT_IMAGE_URL;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      width: '200px',
      padding: '10px',
      textAlign: 'center',
      boxShadow: '0 0 10px #ccc',
      margin: '10px'
    }}>
      <img
        src={imageUrl}
        alt={product.name}
        style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '6px' }}
        onError={(e) => { e.target.src = DEFAULT_IMAGE_URL }} // fallback if image fails to load
      />
      <h3 style={{ fontWeight: 'bold', margin: '10px 0 5px' }}>{product.name}</h3>
      <p>RS.{product.price}</p>
      <button style={{
        backgroundColor: '#ff6600',
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
      }}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
