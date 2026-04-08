"use client";

import Link from "next/link";

export default function Page() {//Create the homepage
  const products = [
    {
      id: "phone",
      name: "Phone",
      price: 300,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      id: "laptop",
      name: "Laptop",
      price: 1000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      id: "headphones",
      name: "Headphones",
      price: 100,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    }
  ];

  return ( //whats the user see 
    <div className="max-w-6xl mx-auto p-8">

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => ( //Loop for products
          <Link key={product.id} href={`/product/${product.id}`}>
            
            <div className="bg-white text-black rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
              
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <p className="font-semibold text-lg">{product.name}</p>
                <p className="text-gray-500">${product.price}</p>
              </div>

            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}