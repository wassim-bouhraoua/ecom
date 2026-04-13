import Link from "next/link";//Next.js navigation

export default function Home() { //React component
  return (//what user sees on screen
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10 items-center">

  {/* LEFT */}
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl font-bold">
      🛍️ My Store
    </h1>

    <p className="text-gray-400 text-lg">
      Discover amazing products at unbeatable prices.
    </p>

    <Link
      href="/product"
      className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
    >
      Shop Now
    </Link>
  </div>

  {/* RIGHT (IMAGE) */}
  <img
    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    className="rounded-xl shadow-lg"
  />

</div>
  );
}