import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
    <div>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
        Hero Section
      </p>
      <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
        Welcome to Windframe
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
        Windframe combines construction expertise with digital innovation to deliver smarter, sustainable solutions.
      </p>
      <div className="mt-6">
        <Button to="/about" variant="primary">Learn More</Button>
      </div>
    </div>

    {/* Hero Image */}
    <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 overflow-hidden">
      <img
        src="/src/assets/windframe-hero.png"
        alt="Windframe Hero"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</section>


      {/* KPI Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            KPI Section
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Our Impact in Numbers
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <div className="text-3xl">📂</div>
            <p className="text-2xl font-bold text-zinc-900">25+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Projects</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <div className="text-3xl">🤝</div>
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Clients</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <div className="text-3xl">⚙️</div>
            <p className="text-2xl font-bold text-zinc-900">4</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Focus Areas</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <div className="text-3xl">⏳</div>
            <p className="text-2xl font-bold text-zinc-900">15</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Years Experience</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Feature Cards
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            What Sets Windframe Apart
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3 text-center">
          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="text-4xl">🏗️</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Smart Construction</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Integrating modular systems and IoT into building processes for efficiency and sustainability.
            </p>
            <Button className="mt-4 mx-auto block" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="text-4xl">💻</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Digital Engineering</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Advanced modeling and simulation tools to design smarter infrastructure.
            </p>
            <Button className="mt-4 mx-auto block" variant="primary">View More</Button>
          </article>

          <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4">
            <div className="text-4xl">🌱</div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Sustainable Solutions</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Eco‑friendly materials and green technologies for a better future.
            </p>
            <Button className="mt-4 mx-auto block" variant="primary">View More</Button>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
