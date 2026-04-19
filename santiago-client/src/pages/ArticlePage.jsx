import Button from '../components/Button';

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
          Articles
        </p>
        <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
          Exploring Windframe Technology
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
          Learn how Windframe is shaping the future of construction and technology with modular design, sustainability, and innovation.
        </p>
        <div className="mt-6">
          <Button to="/" variant="primary">Back Home</Button>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Windframe Knowledge Hub
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Article 1 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 text-center">
            <div className="text-4xl">🏗️</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Modular Design with Windframe
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Discover how Windframe’s modular system accelerates construction timelines while maintaining flexibility and durability.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 2 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 text-center">
            <div className="text-4xl">🌱</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Sustainability Through Windframe
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Learn how Windframe integrates eco‑friendly materials and energy‑efficient designs to support sustainable infrastructure.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 3 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 text-center">
            <div className="text-4xl">💻</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              Digital Innovation in Windframe
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Explore how Windframe leverages digital tools like BIM and IoT for smarter project management and monitoring.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>

          {/* Article 4 */}
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4 text-center">
            <div className="text-4xl">🔮</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">
              The Future of Windframe
            </h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              A look ahead at how Windframe technology will continue to transform construction and infrastructure worldwide.
            </p>
            <Button className="mt-4">Read More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;
