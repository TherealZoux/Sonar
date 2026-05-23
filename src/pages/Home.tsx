import CategorySection from "@/components/CategorySection";
export default function Home() {
  
  return (
    <>
      <div className="mb-8">
        <img src="/bannar.png" className="rounded-xl min-h-[15rem]" loading="lazy"
          decoding="async"
        />
      </div>
      { /*top 10 podcasts ion egypt */}
      <section className="flex flex-col gap-8 mb-8">
        <CategorySection category="top" isCharts title="Top 10 in Egypt"  />
        <CategorySection category="tech" isCharts={false} title=" tech"  />
        <CategorySection category="Business" isCharts={false} title=" Business"  />
        <CategorySection category="comedy" isCharts={false} title=" Comedy"  />
      </section>
    </>
  )
}
