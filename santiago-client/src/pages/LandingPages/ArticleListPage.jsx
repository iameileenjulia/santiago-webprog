import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList.jsx';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then(({ data }) => {
        // Map backend shape to what ArticleList expects
        const active = data.articles
          .filter((a) => a.isActive)
          .map((a) => ({ name: a.slug, title: a.title, content: [a.content] }));
        setArticles(active);
      })
      .catch((err) => console.error('Error loading articles:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = articles;

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
        
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-600 bg-zinc-800/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-400">Knowledge Hub</span>
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Insights &{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Innovation</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            Explore the latest trends in smart construction, digital engineering, 
            and sustainable solutions from the ArqTek team.
          </p>
          <div className="mt-8">
            <Button to="/" variant="secondary" className="!bg-transparent !text-white !border-white hover:!bg-white/10">
              Back Home
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-600">Featured Content</p>
              <h2 className="text-2xl font-semibold text-zinc-900">Latest Articles</h2>
            </div>
            <p className="text-sm text-zinc-500">{filteredArticles.length} articles</p>
          </div>

          {loading ? (
            <p className="text-center text-zinc-500">Loading articles...</p>
          ) : filteredArticles.length === 0 ? (
            <p className="text-center text-zinc-500">No articles published yet.</p>
          ) : (
            <ArticleList articles={filteredArticles} />
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-4xl">📧</div>
          <h3 className="text-2xl font-bold text-zinc-900">Stay Updated</h3>
          <p className="mt-2 text-zinc-600">Get the latest insights delivered straight to your inbox.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <Button variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleListPage;