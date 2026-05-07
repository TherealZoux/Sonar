import { useRandomPodcasts, useTopCharts } from "@/hooks/usePodcasts.ts";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  const { podcasts } = useRandomPodcasts('tech', 10);
  const { charts, chartLoading } = useTopCharts();

  return (
    <>
      <div className="mb-8">
        <img src="/bannar.png" className="rounded-xl" loading="lazy"
          decoding="async"
        />
      </div>
      { /*top 10 podcasts ion egypt */}
      <section className="flex flex-col gap-8">
        <CategorySection podcasts={charts} title="Top 10 in Egypt" loading={chartLoading} />
        <CategorySection podcasts={podcasts} title="Popular globaly" loading={chartLoading} />
      </section>
    </>
  )
}
