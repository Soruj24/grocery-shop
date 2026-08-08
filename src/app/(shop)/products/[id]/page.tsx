import dbConnect from "@/config/mongodb";
import Product from "@/schemas/Product";
import "@/schemas/Category";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductBreadcrumb from "@/features/products/components/details/ProductBreadcrumb";
import ProductImage from "@/features/products/components/details/ProductImage";
import ProductInfo from "@/features/products/components/details/ProductInfo";
import ProductDetailsTabs from "@/features/products/components/details/ProductDetailsTabs";
import RelatedProducts from "@/features/products/components/details/RelatedProducts";
import FrequentlyBoughtTogether from "@/features/products/components/details/FrequentlyBoughtTogether";
import CustomerReviews from "@/features/products/components/details/CustomerReviews";
import RecentlyViewed from "@/features/products/components/details/RecentlyViewed";
import PageBackground from "@/components/ui/PageBackground";
import { Product as ProductType } from "@/types/product";
import StickyCheckoutBar from "@/features/products/components/details/StickyCheckoutBar";
import RecentlyViewedTracker from "@/features/products/components/details/RecentlyViewedTracker";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  const product = await Product.findById(id).lean();

  if (!product) {
    return {
      title: "Product Not Found | EMRAN SHOP",
    };
  }

  return {
    title: `${product.name} | EMRAN SHOP`,
    description: `${product.name} কিনুন সবচেয়ে কম দামে EMRAN SHOP থেকে। ${product.description?.slice(0, 100)}...`,
    openGraph: {
      title: `${product.name} | EMRAN SHOP`,
      description: product.description,
      images: [product.image],
    },
  };
}

async function getProductData(id: string) {
  await dbConnect();
  const product = await Product.findById(id)
    .populate("category")
    .lean();

  if (!product) return null;

  const relatedProducts = await Product.find({
    category: (product.category as { _id: string })
      ._id,
    _id: { $ne: id },
    isActive: true,
  })
    .limit(4)
    .populate("category")
    .lean();

  return {
    product: JSON.parse(
      JSON.stringify(product)
    ) as ProductType,
    relatedProducts: JSON.parse(
      JSON.stringify(relatedProducts)
    ) as ProductType[],
  };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProductData(id);

  if (!data) notFound();

  const { product, relatedProducts } = data;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "EMRAN SHOP",
    },
    offers: {
      "@type": "Offer",
      url: `https://emranshop.com/products/${product._id}`,
      priceCurrency: "BDT",
      price: product.discount
        ? product.price -
          (product.price * product.discount) / 100
        : product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <PageBackground
        color1="bg-green-500/[0.03]"
        color2="bg-blue-500/[0.03]"
        color3="bg-yellow-500/[0.03]"
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12 relative z-10">
        {/* Breadcrumb */}
        <ProductBreadcrumb product={product} />

        {/* Main Product Section */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <ProductImage
            image={product.image}
            name={product.name}
            id={product._id}
            product={product}
          />
          <ProductInfo product={product} />
        </div>

        {/* Frequently Bought Together */}
        <div className="mt-20 lg:mt-28">
          <FrequentlyBoughtTogether
            currentProduct={product}
            relatedProducts={relatedProducts}
          />
        </div>

        {/* Recently Viewed */}
        <div className="mt-20 lg:mt-28">
          <RecentlyViewed />
        </div>

        {/* Product Details Tabs & Reviews */}
        <div className="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-16">
            <ProductDetailsTabs product={product} />
            <CustomerReviews productId={product._id} />
          </div>

          <div className="space-y-12 pb-28 md:pb-0">
            <RelatedProducts products={relatedProducts} />
          </div>
        </div>
      </div>

      <StickyCheckoutBar product={product} />
      <RecentlyViewedTracker product={product} />
    </div>
  );
}
