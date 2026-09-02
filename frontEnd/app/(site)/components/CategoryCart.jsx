import Link from "next/link";

export default function CategoryCard({ title, slug }) {
  return (
    <Link
    href={`/slug`}
     
      className="bg-white p-4 font-bold rounded shadow hover:shadow-md flex items-center justify-center"
    >
      <span className="text-gray-800 font-medium">{title}</span>
    </Link>
  );
}