// src/app/under-development/page.tsx
import Link from "next/link";

export default function UnderDevelopment() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 p-4 text-center">
      <h1 className="text-5xl font-bold text-gray-900 mb-6">
        🚧 در حال توسعه
      </h1>
      <p className="mb-6 text-lg text-gray-700">
        این بخش از وبسایت هنوز در حال توسعه است. لطفاً بعداً دوباره سر بزنید!
      </p>
      <Link
        href="/"
        className="rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}
