import PageBackground from "@/components/ui/PageBackground";
import SectionRenderer from "@/components/shop/SectionRenderer";
import HomeErrorState from "@/components/shop/HomeErrorState";
import HomeEmptyState from "@/components/shop/HomeEmptyState";
import HomeFallbackSections from "@/components/shop/HomeFallbackSections";
import { getHomeData } from "@/lib/services/home-data";
import { SearchParams } from "@/types/home";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const data = await getHomeData(resolvedSearchParams);

  if (data.error) return <HomeErrorState />;

  if (!data.categories || data.categories.length === 0)
    return <HomeEmptyState />;

  return (
    <div className="space-y-12 pb-20 relative overflow-hidden">
      <PageBackground />
      {data.sections.length > 0 ? (
        data.sections.map((section) => (
          <SectionRenderer
            key={section._id}
            section={section}
            categories={data.categories}
            products={data.products}
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            totalCount={data.totalCount}
          />
        ))
      ) : (
        <HomeFallbackSections
          categories={data.categories}
          products={data.products}
          totalPages={data.totalPages}
          currentPage={data.currentPage}
          totalCount={data.totalCount}
        />
      )}
    </div>
  );
}
