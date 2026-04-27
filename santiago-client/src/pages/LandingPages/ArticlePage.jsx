import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/Button.jsx';
import articles from '../../assets/article-content.js';
// import { useAuth } from '../../context/AuthContext';
const useAuth = () => ({ user: null });

// Import all images
import smartConstructionImg from '../../assets/smart-construction.jpg';
import digitalEngineerImg from '../../assets/digital-engineer.jpg';
import sustainableSolutionImg from '../../assets/sustainable-solution.jpg';
import communityImpactImg from '../../assets/community-impact.jpg';
import visionTomImg from '../../assets/vision-tom.jpg';
import ejsLogo from '../../assets/EJS-logo.png';

const getArticleImage = (articleName) => {
  const imageMap = {
    'smart-construction': smartConstructionImg,
    'digital-engineering': digitalEngineerImg,
    'sustainable-solutions': sustainableSolutionImg,
    'community-impact': communityImpactImg,
    'future-vision': visionTomImg,
  };
  return imageMap[articleName] || null;
};

function ArticlePage() {
  const { name } = useParams();
  const { user } = useAuth();
  const article = articles.find(article => article.name === name);
  const articleIndex = articles.findIndex(article => article.name === name);
  const nextArticle = articles[articleIndex + 1];
  const prevArticle = articles[articleIndex - 1];

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showTagModal, setShowTagModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');
  const [tagInfo, setTagInfo] = useState({ title: '', description: '' });

  const tagDetails = {
    Innovation: { title: 'Innovation at ArqTek', description: 'ArqTek embraces cutting‑edge technologies like IoT, AI, and modular systems to revolutionize construction. We continuously research and implement smart solutions that make buildings more adaptive, efficient, and future‑ready.' },
    Technology: { title: 'Technology Driven Approach', description: 'From digital twins to AI‑powered project management, our technology stack ensures precision, safety, and cost‑effectiveness. We leverage real‑time data analytics to optimize every phase of construction.' },
    Sustainability: { title: 'Sustainable Building Practices', description: 'We prioritize eco‑friendly materials, energy‑efficient designs, and renewable energy integration. Our goal is to achieve net‑zero carbon footprints while creating healthy living environments.' },
    Engineering: { title: 'Engineering Excellence', description: 'Our engineering team uses advanced simulation and structural analysis to deliver resilient infrastructure. We combine traditional craftsmanship with modern techniques to ensure long‑lasting quality.' },
    Construction: { title: 'Modern Construction Methods', description: 'We combine modular construction, 3D printing, and smart materials to reduce waste, speed up timelines, and improve structural integrity.' }
  };

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    setTagInfo(tagDetails[tag] || { title: tag, description: 'More information coming soon.' });
    setShowTagModal(true);
  };

  useEffect(() => {
    if (!article) return;
    const storedLikes = JSON.parse(localStorage.getItem('articleLikes') || '{}');
    setLikeCount(storedLikes[name]?.count || 0);
    if (user) {
      const userLiked = storedLikes[name]?.users?.includes(user.email) || false;
      setLiked(userLiked);
    }
    const storedComments = JSON.parse(localStorage.getItem('articleComments') || '{}');
    setComments(storedComments[name] || []);
  }, [article, user, name]);

  const handleLike = () => {
    if (!user) {
      alert('Please sign in to like articles');
      return;
    }
    const storedLikes = JSON.parse(localStorage.getItem('articleLikes') || '{}');
    const articleData = storedLikes[name] || { count: 0, users: [] };
    if (liked) {
      articleData.count -= 1;
      articleData.users = articleData.users.filter(email => email !== user.email);
      setLiked(false);
      setLikeCount(articleData.count);
    } else {
      articleData.count += 1;
      articleData.users.push(user.email);
      setLiked(true);
      setLikeCount(articleData.count);
    }
    storedLikes[name] = articleData;
    localStorage.setItem('articleLikes', JSON.stringify(storedLikes));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) { alert('Please sign in to comment'); return; }
    if (!newComment.trim()) return;
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      author: user.name,
      email: user.email,
      date: new Date().toISOString(),
    };
    const storedComments = JSON.parse(localStorage.getItem('articleComments') || '{}');
    const updatedComments = [...(storedComments[name] || []), newCommentObj];
    storedComments[name] = updatedComments;
    localStorage.setItem('articleComments', JSON.stringify(storedComments));
    setComments(updatedComments);
    setNewComment('');
  };

  const handleDeleteComment = (commentId) => {
    if (!user) return;
    const storedComments = JSON.parse(localStorage.getItem('articleComments') || '{}');
    const articleComments = storedComments[name] || [];
    const commentToDelete = articleComments.find(c => c.id === commentId);
    if (commentToDelete && commentToDelete.email !== user.email) {
      alert('You can only delete your own comments');
      return;
    }
    const filtered = articleComments.filter(c => c.id !== commentId);
    storedComments[name] = filtered;
    localStorage.setItem('articleComments', JSON.stringify(storedComments));
    setComments(filtered);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Article link copied to clipboard!');
  };

  if (!article) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="text-center">
          <div className="mb-4 text-6xl">📄</div>
          <h1 className="text-3xl font-bold text-zinc-900">Article Not Found</h1>
          <p className="mt-2 text-zinc-600">The article you're looking for doesn't exist.</p>
          <Button to="/articles" className="mt-6">Back to Articles</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }} />
        </div>
        <div className="relative mx-auto max-w-4xl">
          <Button to="/articles" className="mb-6 !bg-transparent !text-white !border-white hover:!bg-white/10">
            ← Back to Articles
          </Button>
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
              Featured Article
            </span>
            <span className="text-sm text-zinc-400">
              {article.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <img src={ejsLogo} alt="ArqTek" className="h-6 w-6 rounded-full object-contain" />
              <span>ArqTek Team</span>
            </div>
            <span>•</span>
            <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-12 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200">
            <img
              src={getArticleImage(article.name)}
              alt={article.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <div key={index} className="mb-6">
                {index === 0 && (
                  <div className="mb-8 border-l-4 border-emerald-500 pl-4">
                    <p className="text-xl italic text-zinc-600 leading-relaxed">{paragraph}</p>
                  </div>
                )}
                {index > 0 && (
                  <p className="text-base leading-relaxed text-zinc-700 mb-4">{paragraph}</p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-zinc-200 pt-8">
            <button onClick={handleLike} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${liked ? 'bg-red-100 text-red-600' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'}`}>
              <span>{liked ? '❤️' : '🤍'}</span>
              <span>{likeCount}</span>
            </button>
            <button onClick={handleShare} className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200">
              🔗 Share
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-2 border-t border-zinc-200 pt-8">
            <span className="text-sm font-medium text-zinc-500">Tags:</span>
            {['Innovation', 'Technology', 'Construction', 'Sustainability', 'Engineering'].map(tag => (
              <button key={tag} onClick={() => handleTagClick(tag)} className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 transition hover:bg-emerald-100 hover:text-emerald-700">
                {tag}
              </button>
            ))}
          </div>

          {showTagModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="relative max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <button onClick={() => setShowTagModal(false)} className="absolute right-4 top-4 text-2xl text-zinc-400 hover:text-zinc-900">×</button>
                <h3 className="text-xl font-bold text-zinc-900">{tagInfo.title}</h3>
                <div className="mt-2 h-0.5 w-12 bg-emerald-500 rounded-full" />
                <p className="mt-4 text-zinc-600 leading-relaxed">{tagInfo.description}</p>
                <button onClick={() => setShowTagModal(false)} className="mt-6 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500">Close</button>
              </div>
            </div>
          )}

          <div className="mt-12 border-t border-zinc-200 pt-8">
            <h3 className="text-xl font-bold text-zinc-900">Comments ({comments.length})</h3>
            <form onSubmit={handleAddComment} className="mt-4">
              <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} rows="3" placeholder="Share your thoughts..." className="w-full rounded-xl border border-zinc-300 bg-zinc-50 p-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
              <div className="mt-2 flex justify-end">
                <button type="submit" className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-500">Post Comment</button>
              </div>
            </form>
            <div className="mt-6 space-y-4">
              {comments.length === 0 && <p className="text-sm text-zinc-500">No comments yet. Be the first to comment!</p>}
              {comments.map((comment) => (
                <div key={comment.id} className="rounded-lg border border-zinc-200 bg-white p-4">
                  <div className="flex items-start justify-between">
                    <div><p className="font-semibold text-zinc-900">{comment.author}</p><p className="text-xs text-zinc-500">{new Date(comment.date).toLocaleDateString()}</p></div>
                    {user && comment.email === user.email && <button onClick={() => handleDeleteComment(comment.id)} className="text-xs text-red-500 hover:text-red-700">Delete</button>}
                  </div>
                  <p className="mt-2 text-zinc-700">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2">
            {prevArticle && <Link to={`/articles/${prevArticle.name}`} className="group rounded-xl border border-zinc-200 p-4 transition-all hover:shadow-md"><p className="text-xs text-zinc-500">Previous Article</p><p className="font-semibold text-zinc-900 group-hover:text-emerald-600">← {prevArticle.title}</p></Link>}
            {nextArticle && <Link to={`/articles/${nextArticle.name}`} className="group rounded-xl border border-zinc-200 p-4 text-right transition-all hover:shadow-md sm:text-right"><p className="text-xs text-zinc-500">Next Article</p><p className="font-semibold text-zinc-900 group-hover:text-emerald-600">{nextArticle.title} →</p></Link>}
          </div>
          <div className="mt-8 text-center">
            <Button to="/articles" variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">Browse All Articles</Button>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="text-2xl font-bold text-zinc-900">Continue Learning</h3>
          <p className="mt-2 text-zinc-600">Explore more insights from ArqTek</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button to="/articles" variant="secondary">View All Articles</Button>
            <Button to="/about" variant="primary" className="!bg-emerald-600 !border-emerald-600 hover:!bg-emerald-500">Learn About Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;