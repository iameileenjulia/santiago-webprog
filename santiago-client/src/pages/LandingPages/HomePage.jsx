// HomePage.jsx
import Button from '../../components/Button.jsx';

const HomePage = () => {
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
                <img 
                  src="/src/assets/EJS-logo.png" 
                  alt="EJS Logo" 
                  className="mr-2 h-5 w-5 object-contain"
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Building The Future
                </span>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Where Engineering Meets{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
                ArqTek is a technology‑driven corporation dedicated to transforming the construction industry. 
                We design and build advanced homes, shelters, and smart structures that redefine modern living.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                <Button to="/about" variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">
                  Explore Our Work
                </Button>
                <Button to="/articles" variant="secondary" className="!bg-transparent !text-white !border-white hover:!bg-white/10">
                  Read Articles
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-zinc-700 pt-8">
                <div>
                  <p className="text-2xl font-bold text-emerald-400">15+</p>
                  <p className="text-xs text-zinc-400">Years of Excellence</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">50+</p>
                  <p className="text-xs text-zinc-400">Projects Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-400">100%</p>
                  <p className="text-xs text-zinc-400">Client Satisfaction</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-30 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-800/50 backdrop-blur-sm">
                <img
                  src="/src/assets/ArqTek-hero.png"
                  alt="Arqtek Hero"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="border-y border-zinc-200 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 flex justify-center">
            <img 
              src="/src/assets/EJS-logo.png" 
              alt="EJS Logo" 
              className="h-16 w-16 object-contain opacity-80"
            />
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">
            Our Mission
          </p>
          <h2 className="text-3xl font-bold text-zinc-900 sm:text-4xl">
            Technology Serving Both People and Nature
          </h2>
          <div className="mt-6 h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
          <p className="mt-8 text-lg leading-relaxed text-zinc-600">
            Our mission is to make construction smarter, faster, and more sustainable, 
            while creating environments that are safe, humane, and future‑ready. 
            Beyond human spaces, ArqTek develops innovative devices for animal shelters and zoos.
          </p>
        </div>
      </section>

      {/* KPI Section */}
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Key Performance Indicators
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
              Our Impact in Numbers
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-emerald-500 mx-auto" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '/src/assets/project-icon.png', value: '25+', label: 'Projects Completed', color: 'from-emerald-500 to-teal-500' },
              { icon: '/src/assets/client-icon.png', value: '19', label: 'Happy Clients', color: 'from-blue-500 to-cyan-500' },
              { icon: '/src/assets/focus-icon.png', value: '4', label: 'Focus Areas', color: 'from-purple-500 to-pink-500' },
              { icon: '/src/assets/years-icon.png', value: '15', label: 'Years Experience', color: 'from-orange-500 to-red-500' },
            ].map((stat, idx) => (
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

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">
              Core Capabilities
            </p>
            <h2 className="text-2xl font-semibold text-zinc-900 sm:text-3xl">
              What Sets ArqTek Apart
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-emerald-500 mx-auto" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: '/src/assets/project-icon.png', title: 'Smart Construction', description: 'Integrating modular systems and IoT into building processes for efficiency and sustainability.', gradient: 'from-emerald-500 to-teal-500', link: '/articles/smart-construction', bg: 'emerald' },
              { icon: '/src/assets/focus-icon.png', title: 'Digital Engineering', description: 'Advanced modeling and simulation tools to design smarter infrastructure with precision.', gradient: 'from-blue-500 to-cyan-500', link: '/articles/digital-engineering', bg: 'blue' },
              { icon: '/src/assets/years-icon.png', title: 'Sustainable Solutions', description: 'Eco‑friendly materials and green technologies for a better, greener future.', gradient: 'from-green-500 to-emerald-500', link: '/articles/sustainable-solutions', bg: 'green' },
            ].map((feature, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 transition-opacity group-hover:opacity-20`} />
                <div className="relative">
                  <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-${feature.bg}-50 group-hover:scale-110 transition-transform`}>
                    <img src={feature.icon} alt={feature.title} className="h-10 w-10 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{feature.title}</h3>
                  <div className={`mt-2 h-1 w-12 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                  <p className="mt-4 leading-relaxed text-zinc-600">{feature.description}</p>
                  <Button to={feature.link} variant="secondary" className="mt-6 !border-zinc-200 !bg-transparent !text-zinc-700 hover:!border-zinc-300 hover:!bg-zinc-50">
                    Learn More →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-zinc-900 to-zinc-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <img src="/src/assets/EJS-logo.png" alt="EJS Logo" className="h-20 w-20 object-contain brightness-0 invert opacity-80" />
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Build the Future Together?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-300">Let's discuss how ArqTek can bring innovation to your next project.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button to="/about" variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">Get in Touch</Button>
            <Button to="/articles" variant="secondary" className="!bg-transparent !text-white !border-white hover:!bg-white/10">Explore Our Work</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;