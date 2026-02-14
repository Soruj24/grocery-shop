import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductBreadcrumb from "@/components/shop/product-details/ProductBreadcrumb";
import ProductImage from "@/components/shop/product-details/ProductImage";
import ProductInfo from "@/components/shop/product-details/ProductInfo";
import ProductDetailsTabs from "@/components/shop/product-details/ProductDetailsTabs";
import RelatedProducts from "@/components/shop/product-details/RelatedProducts";
import PageBackground from "@/components/ui/PageBackground";
import { Product as ProductType } from "@/types/product";

async function getProductData(id: string) {
  await dbConnect();
  const product = await Product.findById(id).populate("category").lean();

  if (!product) return null;

  const relatedProducts = await Product.find({
    category: (product.category as { _id: string })._id,
    _id: { $ne: id },
    isActive: true,
  })
    .limit(4)
    .populate("category")
    .lean();

  return {
    product: JSON.parse(JSON.stringify(product)) as ProductType,
    relatedProducts: JSON.parse(JSON.stringify(relatedProducts)) as ProductType[],
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

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
      <PageBackground
        color1="bg-green-500/5"
        color2="bg-blue-500/5"
        color3="bg-yellow-500/5"
      />

      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 relative z-10 space-y-16">
        {/* Breadcrumb */}
        <ProductBreadcrumb productName={product.name} />

        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <ProductImage image={product.image} name={product.name} id={product._id} />
          <ProductInfo product={product} />
        </div>

        {/* Product Details Tabs */}
        <ProductDetailsTabs productName={product.name} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
