import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Hero/About Section */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          {/* About Image */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 overflow-hidden">
            <img
              src="/src/assets/Arqtek-about.png"
              alt="About ArqTel"
              className="w-full h-full object-cover"
            />
          </div>

          {/* About Text */}
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Section
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              About ArqTek: Engineering Meets Innovation
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              ArqTek is a hybrid construction and technology firm dedicated to building smarter, greener, and more connected infrastructure. We merge engineering excellence with digital innovation to deliver sustainable solutions for the future.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">Open Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Overview */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Profile Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            Quick Summary Blocks
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <img src="/src/assets/years-icon.png" alt="Years of Experience Icon" className="mx-auto w-10 h-10" />
            <p className="text-2xl font-bold text-zinc-900">15</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Years Experience</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <img src="/src/assets/project-icon.png" alt="Projects Icon" className="mx-auto w-10 h-10" />
            <p className="text-2xl font-bold text-zinc-900">25+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Projects</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <img src="/src/assets/client-icon.png" alt="Clients Icon" className="mx-auto w-10 h-10" />
            <p className="text-2xl font-bold text-zinc-900">12</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Clients</p>
          </div>
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <img src="/src/assets/focus-icon.png" alt="Focus Icon" className="mx-auto w-10 h-10" />
            <p className="text-2xl font-bold text-zinc-900">4</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Focus Areas</p>
          </div>
        </div>
      </section>

      {/* Section Flow */}
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Section Flow</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Our Journey</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  <img src="/src/assets/project-icon.png" alt="Intro Icon" className="inline-block w-6 h-6 mr-2" /> Intro
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  ArqTek was founded with a vision to merge construction expertise with cutting-edge technology, creating infrastructure that adapts to modern needs.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  <img src="/src/assets/years-icon.png" alt="Experience Icon" className="inline-block w-6 h-6 mr-2" /> Experience
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Over 15 years, we’ve delivered projects across commercial, residential, and industrial sectors, integrating smart systems into traditional builds.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  <img src="/src/assets/focus-icon.png" alt="Skills Icon" className="inline-block w-6 h-6 mr-2" /> Skills
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Our team specializes in digital engineering, sustainable materials, IoT integration, and AI-driven project management.
                </p>
              </article>
            </div>
          </div>

          {/* Visual Grid with Icons */}
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">Visual Grid</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 text-4xl">
              <div className="flex items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img src="/src/assets/project-icon.png" alt="Smart Construction Icon" className="w-10 h-10" />
              </div>
              <div className="flex items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img src="/src/assets/focus-icon.png" alt="Sustainable Solutions Icon" className="w-10 h-10" />
              </div>
              <div className="flex items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img src="/src/assets/years-icon.png" alt="Digital Engineering Icon" className="w-10 h-10" />
              </div>
              <div className="flex items-center justify-center rounded-[1.25rem] bg-zinc-200">
                <img src="/src/assets/client-icon.png" alt="Innovation Icon" className="w-10 h-10" />
              </div>
            </div>
            <Button className="mt-5">View Section</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
