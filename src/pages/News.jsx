import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Search,
  ArrowRight,
  ArrowLeft,
  FileText,
  Tag,
  Share2,
  Check,
  Download,
  ExternalLink,
  ChevronRight,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Reveal from "../components/Reveal";
import { NEWS_POSTS, NEWS_CATEGORIES } from "../data/news";
import { PUBLICATIONS } from "../data/publications";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [copied, setCopied] = useState(false);

  // Active selected post (if viewing full post)
  const currentPost = useMemo(() => {
    return NEWS_POSTS.find((p) => p.id === selectedPostId) || null;
  }, [selectedPostId]);

  // Filtered post list for main stream
  const filteredPosts = useMemo(() => {
    return NEWS_POSTS.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags?.some((t) => t.toLowerCase().includes(query)) ||
        post.author?.name.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: NEWS_POSTS.length };
    NEWS_CATEGORIES.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = NEWS_POSTS.filter((p) => p.category === cat).length;
      }
    });
    return counts;
  }, []);

  // All unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    NEWS_POSTS.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, []);

  // Recent 4 posts
  const recentPosts = useMemo(() => {
    return NEWS_POSTS.slice(0, 4);
  }, []);

  // PDF Publications for widget
  const downloadablePublications = useMemo(() => {
    return PUBLICATIONS.filter((p) => p.type === "pdf").slice(0, 4);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
    window.scrollTo({ top: 220, behavior: "smooth" });
  };

  return (
    <>
      <PageHeader
        title="Blog"
        copy="Dispatches from the forest, community milestones, advocacy campaigns, and research reports."
        crumb="Blog"
      />

      <div style={{ background: "var(--paper)", minHeight: "100vh", padding: "48px 0 88px" }}>
        <div className="container">
          <div className="blog-layout-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }}>
            {/* =========================================================================
                LEFT / MAIN COLUMN: BLOG POST STREAM OR SINGLE ARTICLE VIEW
               ========================================================================= */}
            <main style={{ minWidth: 0 }}>
              <AnimatePresence mode="wait">
                {currentPost ? (
                  /* -------------------------------------------------------------
                     SINGLE POST VIEW (Full Article)
                     ------------------------------------------------------------- */
                  <motion.article
                    key={currentPost.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: "#fff",
                      borderRadius: 16,
                      border: "1px solid var(--paper-dim)",
                      padding: "36px 32px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedPostId(null)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: "var(--paper)",
                        border: "1px solid var(--paper-dim)",
                        padding: "8px 16px",
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--canopy)",
                        cursor: "pointer",
                        marginBottom: 24,
                      }}
                    >
                      <ArrowLeft size={14} /> Back to all posts
                    </button>

                    {/* Category & Read Time */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "var(--marigold-deep)",
                          background: "rgba(224, 159, 62, 0.12)",
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {currentPost.category}
                      </span>
                      <span style={{ fontSize: 12.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 4 }}>
                        <Clock size={13} /> {currentPost.readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h1
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(24px, 3.2vw, 34px)",
                        fontWeight: 600,
                        lineHeight: 1.25,
                        color: "var(--canopy-deep)",
                        marginBottom: 18,
                      }}
                    >
                      {currentPost.title}
                    </h1>

                    {/* Author & Date Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: 20,
                        borderBottom: "1px solid var(--paper-dim)",
                        marginBottom: 28,
                        flexWrap: "wrap",
                        gap: 12,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <img
                          src={currentPost.author?.avatar || "/assets/img/ekuri-logo-circle.png"}
                          alt={currentPost.author?.name}
                          style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1px solid var(--paper-dim)" }}
                        />
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{currentPost.author?.name}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>{currentPost.author?.role}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ fontSize: 12.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 5 }}>
                          <Calendar size={13} /> {currentPost.date}
                        </span>
                        <button
                          onClick={handleShare}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "6px 12px",
                            borderRadius: 6,
                            border: "1px solid var(--paper-dim)",
                            background: "var(--paper)",
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: "pointer",
                            color: "var(--ink)",
                          }}
                        >
                          {copied ? <Check size={13} color="#16a34a" /> : <Share2 size={13} />}
                          {copied ? "Copied" : "Share"}
                        </button>
                      </div>
                    </div>

                    {/* Optional Top Image (only if genuine photo/map exists) */}
                    {currentPost.image && (
                      <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 28, border: "1px solid var(--paper-dim)" }}>
                        <img
                          src={currentPost.image}
                          alt={currentPost.title}
                          style={{ width: "100%", maxHeight: 420, objectFit: "cover", display: "block" }}
                        />
                      </div>
                    )}

                    {/* Excerpt Lead Box */}
                    <div
                      style={{
                        padding: "18px 22px",
                        background: "rgba(224, 159, 62, 0.08)",
                        borderLeft: "4px solid var(--marigold-deep)",
                        borderRadius: 6,
                        fontSize: 15.5,
                        lineHeight: 1.7,
                        fontWeight: 500,
                        color: "var(--canopy-deep)",
                        marginBottom: 28,
                      }}
                    >
                      {currentPost.excerpt}
                    </div>

                    {/* Article Paragraphs */}
                    <div style={{ fontSize: 16, lineHeight: 1.85, color: "var(--ink)" }}>
                      {currentPost.content?.map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: 20 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Official Document Reference Box */}
                    {currentPost.publicationDoc && (
                      <div
                        style={{
                          marginTop: 36,
                          padding: "22px 24px",
                          background: "var(--canopy)",
                          borderRadius: 12,
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 16,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: 8,
                              background: "rgba(255,255,255,0.14)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <FileText size={20} color="var(--marigold)" />
                          </div>
                          <div>
                            <div style={{ fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--marigold)" }}>
                              Primary Document
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{currentPost.publicationTitle}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <a
                            href={currentPost.publicationDoc}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              padding: "8px 16px",
                              background: "var(--marigold)",
                              color: "var(--canopy-deep)",
                              borderRadius: 6,
                              fontSize: 12.5,
                              fontWeight: 700,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <ExternalLink size={13} /> Open PDF
                          </a>
                          <a
                            href={currentPost.publicationDoc}
                            download
                            style={{
                              padding: "8px 14px",
                              background: "rgba(255,255,255,0.12)",
                              border: "1px solid rgba(255,255,255,0.25)",
                              color: "#fff",
                              borderRadius: 6,
                              fontSize: 12.5,
                              fontWeight: 600,
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            <Download size={13} /> Download
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Tag list */}
                    {currentPost.tags && currentPost.tags.length > 0 && (
                      <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--paper-dim)", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tags:</span>
                        {currentPost.tags.map((t) => (
                          <span
                            key={t}
                            onClick={() => {
                              setSelectedPostId(null);
                              setSearchQuery(t);
                            }}
                            style={{
                              padding: "4px 12px",
                              borderRadius: 999,
                              background: "var(--paper)",
                              border: "1px solid var(--paper-dim)",
                              fontSize: 12,
                              fontWeight: 500,
                              color: "var(--canopy)",
                              cursor: "pointer",
                            }}
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.article>
                ) : (
                  /* -------------------------------------------------------------
                     MAIN BLOG STREAM (PADIC-Africa Inspired Vertical Feed)
                     ------------------------------------------------------------- */
                  <motion.div
                    key="stream"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "flex", flexDirection: "column", gap: 32 }}
                  >
                    {/* Active Filter indicator */}
                    {(activeCategory !== "All" || searchQuery) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 18px",
                          background: "#fff",
                          borderRadius: 10,
                          border: "1px solid var(--paper-dim)",
                          fontSize: 13.5,
                          color: "var(--ink)",
                        }}
                      >
                        <div>
                          Filtering by:{" "}
                          {activeCategory !== "All" && (
                            <strong>Category: {activeCategory}</strong>
                          )}
                          {searchQuery && (
                            <span>
                              {activeCategory !== "All" ? " & " : ""}
                              Keyword: <strong>"{searchQuery}"</strong>
                            </span>
                          )}
                          {" "}({filteredPosts.length} results)
                        </div>
                        <button
                          onClick={() => {
                            setActiveCategory("All");
                            setSearchQuery("");
                          }}
                          style={{
                            background: "none",
                            border: "none",
                            color: "var(--marigold-deep)",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: 13,
                          }}
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}

                    {filteredPosts.length === 0 ? (
                      <div
                        style={{
                          background: "#fff",
                          borderRadius: 16,
                          padding: "60px 24px",
                          textAlign: "center",
                          border: "1px dashed var(--paper-dim)",
                        }}
                      >
                        <FolderOpen size={40} color="var(--marigold-deep)" style={{ marginBottom: 12 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>No articles found</h3>
                        <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 20 }}>
                          No posts match your current search or category filter.
                        </p>
                        <button
                          onClick={() => {
                            setActiveCategory("All");
                            setSearchQuery("");
                          }}
                          className="btn-lift"
                          style={{
                            padding: "9px 22px",
                            background: "var(--canopy)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          View All Articles
                        </button>
                      </div>
                    ) : (
                      filteredPosts.map((post) => (
                        <article
                          key={post.id}
                          className="card-lift"
                          style={{
                            background: "#fff",
                            borderRadius: 16,
                            border: "1px solid var(--paper-dim)",
                            overflow: "hidden",
                            boxShadow: "0 4px 20px -8px rgba(11,50,11,0.05)",
                            transition: "transform .25s ease, box-shadow .25s ease",
                          }}
                        >
                          {/* Image Banner (ONLY if authentic photo or map exists) */}
                          {post.image && (
                            <div
                              onClick={() => handleSelectPost(post.id)}
                              style={{
                                cursor: "pointer",
                                maxHeight: 320,
                                overflow: "hidden",
                                borderBottom: "1px solid var(--paper-dim)",
                              }}
                            >
                              <img
                                src={post.image}
                                alt={post.title}
                                style={{
                                  width: "100%",
                                  height: 280,
                                  objectFit: "cover",
                                  display: "block",
                                  transition: "transform 0.4s ease",
                                }}
                                className="blog-thumb-img"
                              />
                            </div>
                          )}

                          {/* Post Card Content */}
                          <div style={{ padding: "28px 30px" }}>
                            {/* Meta row */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                                fontSize: 12.5,
                                color: "var(--ink-soft)",
                                marginBottom: 12,
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 11.5,
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.04em",
                                  color: "var(--marigold-deep)",
                                  background: "rgba(224, 159, 62, 0.12)",
                                  padding: "3px 9px",
                                  borderRadius: 4,
                                }}
                              >
                                {post.category}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Calendar size={13} /> {post.date}
                              </span>
                              <span>•</span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <User size={13} /> {post.author?.name}
                              </span>
                              <span>•</span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Clock size={13} /> {post.readTime}
                              </span>
                            </div>

                            {/* Title */}
                            <h2
                              onClick={() => handleSelectPost(post.id)}
                              style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "clamp(20px, 2.5vw, 24px)",
                                fontWeight: 600,
                                lineHeight: 1.3,
                                color: "var(--canopy-deep)",
                                marginBottom: 12,
                                cursor: "pointer",
                                transition: "color .2s ease",
                              }}
                              className="blog-title-link"
                            >
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p
                              style={{
                                fontSize: 14.5,
                                lineHeight: 1.7,
                                color: "var(--ink-soft)",
                                marginBottom: 20,
                              }}
                            >
                              {post.excerpt}
                            </p>

                            {/* Card Footer: Read More & Document pill */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingTop: 16,
                                borderTop: "1px solid var(--paper-dim)",
                                flexWrap: "wrap",
                                gap: 12,
                              }}
                            >
                              <button
                                onClick={() => handleSelectPost(post.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  padding: 0,
                                  color: "var(--canopy)",
                                  fontWeight: 700,
                                  fontSize: 13.5,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 6,
                                  cursor: "pointer",
                                }}
                              >
                                Continue Reading <ArrowRight size={14} />
                              </button>

                              {post.publicationDoc && (
                                <a
                                  href={post.publicationDoc}
                                  target="_blank"
                                  rel="noreferrer"
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 5,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "var(--marigold-deep)",
                                    background: "rgba(224, 159, 62, 0.1)",
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    textDecoration: "none",
                                  }}
                                >
                                  <FileText size={12} /> Official PDF Document
                                </a>
                              )}
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* =========================================================================
                RIGHT SIDEBAR (Classic PADIC Africa Style Widgets)
               ========================================================================= */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Widget 1: Search Bar */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "24px",
                  border: "1px solid var(--paper-dim)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--canopy)", marginBottom: 14 }}>
                  Search Blog
                </h3>
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type keyword & search..."
                    style={{
                      width: "100%",
                      padding: "11px 40px 11px 14px",
                      borderRadius: 8,
                      border: "1px solid var(--paper-dim)",
                      background: "var(--paper)",
                      fontSize: 13.5,
                      color: "var(--ink)",
                      outline: "none",
                    }}
                  />
                  <Search
                    size={16}
                    color="var(--ink-soft)"
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}
                  />
                </div>
              </div>

              {/* Widget 2: Recent Posts */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "24px",
                  border: "1px solid var(--paper-dim)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--canopy)", marginBottom: 16 }}>
                  Recent Posts
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleSelectPost(post.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        cursor: "pointer",
                        paddingBottom: 12,
                        borderBottom: "1px solid var(--paper-dim)",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 8,
                          background: "var(--paper)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: "var(--canopy)",
                        }}
                      >
                        <BookOpen size={16} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h4
                          style={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            lineHeight: 1.35,
                            color: "var(--ink)",
                            margin: 0,
                          }}
                          className="recent-post-link"
                        >
                          {post.title}
                        </h4>
                        <span style={{ fontSize: 11.5, color: "var(--ink-soft)", marginTop: 4, display: "block" }}>
                          {post.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Categories with Count */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "24px",
                  border: "1px solid var(--paper-dim)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--canopy)", marginBottom: 14 }}>
                  Categories
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {NEWS_CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedPostId(null);
                          setActiveCategory(cat);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          borderRadius: 6,
                          background: isSelected ? "var(--canopy)" : "var(--paper)",
                          color: isSelected ? "#fff" : "var(--ink)",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 13,
                          fontWeight: isSelected ? 600 : 500,
                          textAlign: "left",
                          transition: "all .15s ease",
                        }}
                      >
                        <span>{cat}</span>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 999,
                            background: isSelected ? "rgba(255,255,255,0.25)" : "var(--paper-dim)",
                            color: isSelected ? "#fff" : "var(--ink-soft)",
                          }}
                        >
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget 4: Official Publications & Reports */}
              <div
                style={{
                  background: "var(--canopy-deep)",
                  borderRadius: 14,
                  padding: "24px",
                  color: "#fff",
                }}
              >
                <h3 style={{ fontSize: 14.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--marigold)", marginBottom: 14 }}>
                  Official Reports
                </h3>
                <p style={{ fontSize: 12.5, color: "rgba(246,244,236,0.8)", marginBottom: 16, lineHeight: 1.5 }}>
                  Download certified survey maps, legislation, and UNDP case studies on the Ekuri model.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {downloadablePublications.map((pub, idx) => (
                    <a
                      key={idx}
                      href={pub.file}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.08)",
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: 12.5,
                        fontWeight: 500,
                      }}
                    >
                      <FileText size={14} color="var(--marigold)" style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {pub.title}
                      </span>
                    </a>
                  ))}
                </div>
                <Link
                  to="/publications"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "var(--marigold)",
                    fontSize: 12.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    marginTop: 16,
                  }}
                >
                  View All Publications <ArrowRight size={13} />
                </Link>
              </div>

              {/* Widget 5: Tags Cloud */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "24px",
                  border: "1px solid var(--paper-dim)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                }}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--canopy)", marginBottom: 14 }}>
                  Popular Tags
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedPostId(null);
                        setSearchQuery(tag);
                      }}
                      style={{
                        padding: "5px 12px",
                        borderRadius: 999,
                        background: "var(--paper)",
                        border: "1px solid var(--paper-dim)",
                        fontSize: 12,
                        fontWeight: 500,
                        color: "var(--ink)",
                        cursor: "pointer",
                      }}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .blog-layout-grid {
            grid-template-columns: 2.3fr 1fr !important;
          }
        }
        .blog-title-link:hover {
          color: var(--marigold-deep) !important;
        }
        .recent-post-link:hover {
          color: var(--marigold-deep) !important;
        }
        .blog-thumb-img:hover {
          transform: scale(1.03);
        }
      `}</style>
    </>
  );
}