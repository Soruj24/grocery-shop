import PageBackground from "@/components/ui/PageBackground";
import SectionRenderer from "@/features/home/components/sections/SectionRenderer";
import HomeErrorState from "@/features/home/components/sections/HomeErrorState";
import HomeEmptyState from "@/features/home/components/sections/HomeEmptyState";
import HomeFallbackSections from "@/features/home/components/sections/HomeFallbackSections";
import { getHomeData } from "@/features/home/services/home-data";
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
