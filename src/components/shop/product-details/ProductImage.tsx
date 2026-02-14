import Image from "next/image";

interface ProductImageProps {
  image?: string;
  name: string;
  id: string;
}

export default function ProductImage({ image, name, id }: ProductImageProps) {
  return (
    <div className="w-full lg:w-1/2 sticky top-24">
      <div className="relative bg-white dark:bg-gray-900 rounded-[48px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none aspect-square group">
        <Image
          src={image || `https://picsum.photos/seed/${id}/800/800`}
          alt={name}
          fill
          priority
          className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
