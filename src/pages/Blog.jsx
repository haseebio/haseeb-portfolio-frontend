// src/pages/Blog.jsx
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { profile } from '../data/portfolio';
import { useSEO } from '../hooks/useSEO';
import { useReveal } from '../hooks/useReveal';
import PostCover from '../components/PostCover';
import './Blog.css';

function PostCard({ post, index }) {
  const ref = useReveal();
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="post-card reveal hover-lift"
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 4) * 90}ms` }}
    >
      <div className="post-card-cover">
        <PostCover label={post.tags[0]} />
      </div>
      <div className="post-card-body">
        <span className="eyebrow post-card-eyebrow">Article</span>
        <div className="post-meta">
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="tag-row">
          {post.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
        <span className="read-article">
          Read Article
          <span className="read-article-arrow">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  useSEO(`Writing — ${profile.name}`, profile.bio);

  return (
    <>
      <header className="blog-hero">
        <div className="wrap">
          <div className="eyebrow">Writing</div>
          <h1>Notes from actually building things</h1>
          <p className="lead">
            Case studies from real projects — what broke, what the hard part actually was,
            not the highlight-reel version.
          </p>
        </div>
      </header>

      <section>
        <div className="wrap">
          {blogPosts.length === 0 ? (
            <p className="empty-state">Nothing published yet — first post coming soon.</p>
          ) : (
            <div className="post-grid">
              {blogPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}