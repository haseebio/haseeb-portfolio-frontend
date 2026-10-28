// src/pages/BlogPost.jsx
import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { profile } from '../data/portfolio';
import { useSEO } from '../hooks/useSEO';
import { useJsonLd } from '../hooks/useJsonLd';
import CodeBlock from '../components/CodeBlock';
import PostCover from '../components/PostCover';
import RichText, { stripRichText } from '../components/RichText';
import { CalendarIcon, ClockIcon, ShareIcon } from '../components/Icons';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [shared, setShared] = useState(false);

  useSEO(
    post ? `${post.title} — ${profile.name}` : `Not found — ${profile.name}`,
    post ? post.excerpt : profile.bio
  );

  useJsonLd(
    post
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              keywords: [post.primaryKeyword, ...post.secondaryKeywords].join(', '),
              url: `${profile.siteUrl}/blog/${post.slug}`,
              mainEntityOfPage: `${profile.siteUrl}/blog/${post.slug}`,
              author: {
                '@type': 'Person',
                name: profile.name,
                url: `${profile.siteUrl}/about`,
              },
            },
            post.faq && post.faq.length > 0
              ? {
                  '@type': 'FAQPage',
                  mainEntity: post.faq.map((item) => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: stripRichText(item.a),
                    },
                  })),
                }
              : null,
          ].filter(Boolean),
        }
      : null
  );

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: post.excerpt, url });
      } catch {
        // user cancelled — no-op
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  };

  return (
    <article className="blog-post">
      <header className="post-hero">
        <div className="wrap post-hero-inner">
          <Link to="/blog" className="back-link">← All writing</Link>
          <div className="eyebrow post-eyebrow">Article</div>
          <h1>{post.title}</h1>

          <div className="post-meta-row">
            <span className="meta-item">
              <CalendarIcon width="15" height="15" />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="meta-item">
              <ClockIcon width="15" height="15" />
              {post.readTime}
            </span>
            <button type="button" className="share-btn" onClick={handleShare}>
              <ShareIcon width="14" height="14" />
              {shared ? 'Link copied' : 'Share'}
            </button>
          </div>

          <div className="tag-row post-tag-row">
            {post.tags.map((tag) => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="wrap">
        <PostCover label={post.tags[0]} />
      </div>

      <div className="wrap post-body">
        {post.body.map((block, i) => {
          if (block.type === 'h') return <h2 key={i}><RichText text={block.text} /></h2>;
          if (block.type === 'h3') return <h3 key={i}><RichText text={block.text} /></h3>;
          if (block.type === 'code') return <CodeBlock key={i} code={block.code} language={block.language} />;
          if (block.type === 'list') {
            return (
              <ul className="post-list" key={i}>
                {block.items.map((item, j) => (
                  <li key={j}><RichText text={item} /></li>
                ))}
              </ul>
            );
          }
          return <p key={i}><RichText text={block.text} /></p>;
        })}

        {post.faq && post.faq.length > 0 && (
          <div className="post-faq">
            <h2>FAQ</h2>
            {post.faq.map((item, i) => (
              <div className="faq-item" key={i}>
                <h3>{item.q}</h3>
                <p><RichText text={item.a} /></p>
              </div>
            ))}
          </div>
        )}

        <div className="post-closing">
          <div className="post-byline">
            Written by <Link to="/about" className="link-sweep">{profile.name}</Link> — {profile.role}, {profile.location}.
          </div>
          <p className="post-thanks">Thank you for reading.</p>
        </div>
      </div>
    </article>
  );
}