import { useRandomPodcasts, useTopCharts } from "@/hooks/usePodcasts.ts";
import { useNavigate } from "react-router-dom";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  const { podcasts, randomloading } = useRandomPodcasts('tech', 10);
  const { charts, chartLoading } = useTopCharts();
  console.log(charts);

  const navigateTo = useNavigate();

  return (
    <>
      <div className="mb-8">
        <img src="/bannar.png" className="rounded-xl" />
      </div>
      { /*top 10 podcasts ion egypt */}
      <section className="flex flex-col gap-8">
        <CategorySection podcasts={charts} title="Top 10 in Egypt" loading={chartLoading} />
        <CategorySection podcasts={podcasts} title="Popular" loading={chartLoading} />
      </section>
    </>
  )
}
