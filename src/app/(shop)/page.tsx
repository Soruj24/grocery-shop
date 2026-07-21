import HomepageRedesign from "@/features/home/components/redesign/HomepageRedesign";
import HomeErrorState from "@/features/home/components/sections/HomeErrorState";
import { getHomeData } from "@/features/home/services/home-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const data = await getHomeData({});

  if (data.error) return <HomeErrorState />;

  return <HomepageRedesign categories={data.categories} />;
}
