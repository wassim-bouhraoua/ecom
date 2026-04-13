import Link from "next/link";//Next.js navigation

export default function Home() { //React component
  return (//what user sees on screen
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">🛍️ My Store</h1>
      <p className="text-gray-500 mb-8">Browse our collection of products.</p>

      <Link href="/product" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition inline-block">
        Go to Products (testing)
      </Link>
    </div>
  );
}