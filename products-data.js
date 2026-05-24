/** Christine Shoppers – product catalog */
const SHOP_PRODUCTS = [
  // Electronics
  { id: 'fridge', category: 'Electronics', name: 'Samsung Double Door Fridge 350L', price: 2850000, oldPrice: 3200000, image: 'images/products/fridge.jpg', badge: '-11%', rating: 5, reviews: 84, featured: true },
  { id: 'tv', category: 'Electronics', name: '55" Smart LED TV – 4K UHD', price: 1650000, oldPrice: 1890000, image: 'images/products/tv.jpg', badge: '-13%', rating: 4.5, reviews: 156, featured: true },
  { id: 'blender', category: 'Electronics', name: 'Philips Blender 2L – 500W', price: 185000, image: 'images/products/blender.jpg', rating: 4, reviews: 203, featured: true },
  { id: 'iron', category: 'Electronics', name: 'Steam Flat Iron – Ceramic Plate', price: 95000, oldPrice: 120000, image: 'images/products/flat-iron.jpg', badge: '-21%', rating: 4, reviews: 312, featured: true },
  { id: 'microwave', category: 'Electronics', name: 'Digital Microwave Oven 20L', price: 420000, image: 'images/products/microwave.jpg', rating: 4.5, reviews: 67, featured: false },

  // Fashion
  { id: 'jeans-m', category: 'Fashion', name: "Men's Slim Fit Jeans", price: 89000, oldPrice: 110000, image: 'images/products/jeans-men.jpg', badge: '-19%', rating: 4, reviews: 190, featured: true },
  { id: 'jeans-w', category: 'Fashion', name: "Women's High Waist Jeans", price: 95000, image: 'images/products/jeans-women.jpg', rating: 4.5, reviews: 142, featured: true },
  { id: 'tshirt-m', category: 'Fashion', name: "Men's Cotton T-Shirt", price: 35000, image: 'images/products/tshirt-men.jpg', rating: 4, reviews: 428, featured: true },
  { id: 'tshirt-w', category: 'Fashion', name: "Women's Graphic Tee", price: 32000, image: 'images/products/tshirt-women.jpg', rating: 4, reviews: 265, featured: false },
  { id: 'suit', category: 'Fashion', name: "Men's Office Suit", price: 630000, image: 'images/products/suit.jpg', badge: 'New', rating: 5, reviews: 200, featured: true },
  { id: 'shoes', category: 'Fashion', name: "Women's Casual Shoes", price: 120000, oldPrice: 150000, image: 'images/products/shoes.jpg', badge: '-20%', rating: 4, reviews: 120, featured: true },
  { id: 'bag', category: 'Fashion', name: 'Ladies PU Shoulder Bag', price: 259000, image: 'images/products/bag.jpg', rating: 4, reviews: 85, featured: false },

  // Beauty
  { id: 'lipstick', category: 'Beauty', name: 'Matte Lipstick Set (6 Shades)', price: 45000, image: 'images/products/lipstick.jpg', rating: 4.5, reviews: 178, featured: true },
  { id: 'skincare', category: 'Beauty', name: 'Glow Skincare Bundle', price: 120000, oldPrice: 145000, image: 'images/products/skincare.jpg', badge: '-17%', rating: 5, reviews: 94, featured: true },
  { id: 'perfume', category: 'Beauty', name: 'Eau de Parfum 100ml', price: 180000, image: 'images/products/perfume.jpg', rating: 4, reviews: 56, featured: true },
  { id: 'haircare', category: 'Beauty', name: 'Hair Treatment Kit', price: 75000, image: 'images/products/haircare.jpg', rating: 4, reviews: 88, featured: false },

  // Home & Kitchen
  { id: 'kettle', category: 'Home', name: 'Electric Kettle 1.7L', price: 65000, image: 'images/products/kettle.jpg', rating: 4, reviews: 241, featured: true },
  { id: 'cookware', category: 'Home', name: 'Non-Stick Cookware Set (12pc)', price: 210000, image: 'images/products/cookware.jpg', rating: 4.5, reviews: 73, featured: false },
];
