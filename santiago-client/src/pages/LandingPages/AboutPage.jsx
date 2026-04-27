// AboutPage.jsx
import Button from '../../components/Button';

const AboutPage = () => {
  const stats = [
    { icon: '/src/assets/years-icon.png', value: '15', label: 'Years Experience', color: 'from-emerald-500 to-teal-500' },
    { icon: '/src/assets/project-icon.png', value: '25+', label: 'Projects Completed', color: 'from-blue-500 to-cyan-500' },
    { icon: '/src/assets/client-icon.png', value: '12', label: 'Trusted Clients', color: 'from-purple-500 to-pink-500' },
    { icon: '/src/assets/focus-icon.png', value: '4', label: 'Core Focus Areas', color: 'from-orange-500 to-red-500' },
  ];

  const journeySteps = [
    { icon: '/src/assets/project-icon.png', title: 'Our Beginning', description: 'ArqTek was founded with a vision to merge construction expertise with cutting-edge technology, creating infrastructure that adapts to modern needs.' },
    { icon: '/src/assets/years-icon.png', title: 'Growth & Experience', description: 'Over 15 years, we\'ve delivered projects across commercial, residential, and industrial sectors, integrating smart systems into traditional builds.' },
    { icon: '/src/assets/focus-icon.png', title: 'Core Expertise', description: 'Our team specializes in digital engineering, sustainable materials, IoT integration, and AI-driven project management.' },
    { icon: '/src/assets/client-icon.png', title: 'Future Vision', description: 'We continue pushing boundaries, developing innovative solutions for smart cities, sustainable housing, and wildlife conservation.' },
  ];

  const values = [
    { title: 'Innovation First', description: 'Embracing cutting-edge technology to solve complex challenges.', icon: '💡' },
    { title: 'Sustainability Core', description: 'Committed to eco-friendly practices in every project.', icon: '🌱' },
    { title: 'Human-Centered', description: 'Designing spaces that prioritize people and nature.', icon: '🤝' },
    { title: 'Excellence Always', description: 'Delivering quality and precision in every detail.', icon: '⭐' },
  ];

  return (
    <div className="flex w-full flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center rounded-full border border-zinc-600 bg-zinc-800/50 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">About ArqTek</span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Engineering Meets{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Innovation</span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
                ArqTek is a hybrid construction and technology firm dedicated to building smarter, greener, 
                and more connected infrastructure. We merge engineering excellence with digital innovation to 
                deliver sustainable solutions for the future.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button to="/" variant="secondary" className="!bg-transparent !text-white !border-white hover:!bg-white/10">Back Home</Button>
                <Button to="/articles" variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">View Articles</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm">
                <img src="/src/assets/ArqTek-about.png" alt="About ArqTek" className="w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">Company Snapshot</p>
            <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Our Journey by the Numbers</h2>
            <div className="mt-3 h-0.5 w-12 bg-emerald-500 mx-auto" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-center transition-all hover:shadow-xl hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`} />
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100 group-hover:scale-110 transition-transform">
                    <img src={stat.icon} alt={stat.label} className="h-8 w-8 object-contain" />
                  </div>
                  <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">Our Story</p>
            <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">The ArqTek Journey</h2>
            <div className="mt-3 h-0.5 w-12 bg-emerald-500 mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, idx) => (
              <div key={idx} className="group relative rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                  {idx + 1}
                </div>
                <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                  <img src={step.icon} alt={step.title} className="h-6 w-6 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{step.title}</h3>
                <div className="mt-2 h-0.5 w-8 bg-emerald-500 rounded-full" />
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">What We Believe</p>
            <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Our Core Values</h2>
            <div className="mt-3 h-0.5 w-12 bg-emerald-500 mx-auto" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, idx) => (
              <div key={idx} className="rounded-2xl border border-zinc-200 bg-white p-6 text-center transition-all hover:shadow-md">
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="text-lg font-bold text-zinc-900">{value.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Join Us in Building Tomorrow</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
            Be part of our mission to create smarter, more sustainable infrastructure for generations to come.
          </p>
          <div className="mt-8">
            <Button to="/" variant="secondary" className="!bg-white !text-emerald-600 !border-white hover:!bg-emerald-50">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;