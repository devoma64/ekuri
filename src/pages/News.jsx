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
  X,
  Sparkles,
  Shield,
  HeartHandshake,
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
                RIGHT SIDEBAR (Enhanced Museum & Editorial Grade)
               ========================================================================= */}
            <aside className="blog-sidebar-sticky" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {/* Widget 1: Search Bar */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: "26px 24px",
                  border: "1px solid rgba(17, 36, 17, 0.08)",
                  boxShadow: "0 10px 30px -10px rgba(11, 50, 11, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: "rgba(217, 154, 63, 0.14)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--marigold-deep)",
                      }}
                    >
                      <Search size={15} />
                    </div>
                    <h3
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "var(--canopy-deep)",
                        margin: 0,
                      }}
                    >
                      Search Archive
                    </h3>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--ink-soft)",
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        padding: 0,
                      }}
                    >
                      <X size={13} /> Clear
                    </button>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics, authors..."
                    style={{
                      width: "100%",
                      padding: "13px 42px 13px 16px",
                      borderRadius: 10,
                      border: "1.5px solid var(--paper-dim)",
                      background: "var(--paper)",
                      fontSize: 14,
                      color: "var(--ink)",
                      outline: "none",
                      transition: "border-color .2s ease, box-shadow .2s ease",
                    }}
                    className="blog-search-input"
                  />
                  <Search
                    size={18}
                    color="var(--ink-soft)"
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  />
                </div>

                {searchQuery && (
                  <div
                    style={{
                      marginTop: 12,
                      padding: "6px 12px",
                      borderRadius: 6,
                      background: "rgba(11, 50, 11, 0.05)",
                      fontSize: 12,
                      color: "var(--canopy-deep)",
                      fontWeight: 600,
                    }}
                  >
                    Found {filteredPosts.length} dispatch{filteredPosts.length === 1 ? "" : "es"}
                  </div>
                )}
              </div>

              {/* Widget 2: Recent Dispatches (Rich Cover Media) */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: "28px 24px",
                  border: "1px solid rgba(17, 36, 17, 0.08)",
                  boxShadow: "0 10px 30px -10px rgba(11, 50, 11, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(17, 36, 17, 0.06)" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(217, 154, 63, 0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--marigold-deep)",
                    }}
                  >
                    <BookOpen size={15} />
                  </div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--canopy-deep)",
                      margin: 0,
                    }}
                  >
                    Recent Dispatches
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleSelectPost(post.id)}
                      className="recent-post-card"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "72px 1fr",
                        gap: 14,
                        cursor: "pointer",
                        alignItems: "center",
                      }}
                    >
                      {/* Post Thumbnail */}
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 10,
                          overflow: "hidden",
                          background: "#0c1e0e",
                          border: "1px solid rgba(17, 36, 17, 0.1)",
                          flexShrink: 0,
                        }}
                      >
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                              transition: "transform .4s ease",
                            }}
                            className="recent-thumb-img"
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "var(--marigold)",
                              background: "linear-gradient(135deg, #1d6e30 0%, #0d3816 100%)",
                            }}
                          >
                            <BookOpen size={20} />
                          </div>
                        )}
                      </div>

                      {/* Post Title & Meta */}
                      <div style={{ minWidth: 0 }}>
                        <span
                          style={{
                            fontSize: 10.5,
                            fontWeight: 700,
                            color: "var(--marigold-deep)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            display: "block",
                            marginBottom: 4,
                          }}
                        >
                          {post.category}
                        </span>
                        <h4
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            lineHeight: 1.35,
                            color: "var(--canopy-deep)",
                            margin: 0,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            transition: "color .2s ease",
                          }}
                          className="recent-post-title"
                        >
                          {post.title}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            fontSize: 11.5,
                            color: "var(--ink-soft)",
                            marginTop: 5,
                          }}
                        >
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 3: Categories with Count */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: "28px 24px",
                  border: "1px solid rgba(17, 36, 17, 0.08)",
                  boxShadow: "0 10px 30px -10px rgba(11, 50, 11, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, paddingBottom: 12, borderBottom: "1px solid rgba(17, 36, 17, 0.06)" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(217, 154, 63, 0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--marigold-deep)",
                    }}
                  >
                    <FolderOpen size={15} />
                  </div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--canopy-deep)",
                      margin: 0,
                    }}
                  >
                    Topics & Themes
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {NEWS_CATEGORIES.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedPostId(null);
                          setActiveCategory(cat);
                        }}
                        className="category-sidebar-btn"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          borderRadius: 8,
                          background: isSelected ? "var(--canopy)" : "transparent",
                          color: isSelected ? "#ffffff" : "var(--ink)",
                          border: isSelected ? "1px solid var(--canopy-deep)" : "1px solid transparent",
                          cursor: "pointer",
                          fontSize: 13.5,
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: "left",
                          transition: "all .18s ease",
                          borderLeft: isSelected ? "3.5px solid var(--marigold)" : "3.5px solid transparent",
                        }}
                      >
                        <span>{cat}</span>
                        <span
                          style={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 999,
                            background: isSelected ? "rgba(255,255,255,0.24)" : "var(--paper-dim)",
                            color: isSelected ? "#ffffff" : "var(--ink-soft)",
                          }}
                        >
                          {categoryCounts[cat] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Widget 4: Official Case Studies & Archival Publications */}
              <div
                style={{
                  background: "linear-gradient(145deg, #0d3816 0%, #061c0b 100%)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  color: "#ffffff",
                  boxShadow: "0 14px 36px -10px rgba(3, 14, 5, 0.45)",
                  border: "1px solid rgba(217, 154, 63, 0.3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <Sparkles size={16} color="var(--marigold)" />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--marigold)",
                    }}
                  >
                    Verified Documentation
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 10px",
                    lineHeight: 1.3,
                  }}
                >
                  Official Archival Reports & Case Studies
                </h3>
                <p style={{ fontSize: 13, color: "rgba(246,244,236,0.85)", marginBottom: 18, lineHeight: 1.55 }}>
                  Access the official 1999 Pan-African Ford Foundation Photo Album, UNDP Equator case studies, and boundary survey plans.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                  {downloadablePublications.slice(0, 3).map((pub, idx) => (
                    <a
                      key={idx}
                      href={pub.file}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.08)",
                        color: "#ffffff",
                        textDecoration: "none",
                        fontSize: 12.5,
                        fontWeight: 600,
                        border: "1px solid rgba(255,255,255,0.12)",
                        transition: "all .2s ease",
                      }}
                      className="pub-download-card"
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, paddingRight: 8 }}>
                        <FileText size={15} color="var(--marigold)" style={{ flexShrink: 0 }} />
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {pub.title}
                        </span>
                      </div>
                      <Download size={14} color="rgba(255,255,255,0.7)" style={{ flexShrink: 0 }} />
                    </a>
                  ))}
                </div>

                <Link
                  to="/publications"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--canopy-deep)",
                    background: "var(--marigold)",
                    padding: "10px 20px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    width: "100%",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(217, 154, 63, 0.3)",
                  }}
                >
                  <span>Browse All Publications</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Widget 5: Rainforest Guardian Support Action Card */}
              <div
                style={{
                  background: "rgba(224, 159, 62, 0.08)",
                  borderRadius: 18,
                  padding: "24px",
                  border: "1.5px dashed rgba(217, 154, 63, 0.4)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--marigold)",
                    color: "var(--canopy-deep)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <HeartHandshake size={22} />
                </div>
                <h4
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--canopy-deep)",
                    margin: "0 0 8px",
                  }}
                >
                  Protect 33,600 Hectares
                </h4>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5, margin: "0 0 16px" }}>
                  Support local ranger patrols, community agroforestry, and ongoing rainforest defense.
                </p>
                <Link
                  to="/donate"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "9px 20px",
                    borderRadius: 999,
                    background: "var(--canopy)",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(11,50,11,0.2)",
                  }}
                >
                  <span>Support The Initiative</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Widget 6: Tags Cloud */}
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: "26px 24px",
                  border: "1px solid rgba(17, 36, 17, 0.08)",
                  boxShadow: "0 10px 30px -10px rgba(11, 50, 11, 0.06)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(17, 36, 17, 0.06)" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(217, 154, 63, 0.14)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--marigold-deep)",
                    }}
                  >
                    <Tag size={15} />
                  </div>
                  <h3
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--canopy-deep)",
                      margin: 0,
                    }}
                  >
                    Popular Tags
                  </h3>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedPostId(null);
                        setSearchQuery(tag);
                      }}
                      className="blog-tag-pill"
                      style={{
                        padding: "6px 14px",
                        borderRadius: 999,
                        background: "var(--paper)",
                        border: "1px solid rgba(17, 36, 17, 0.1)",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "var(--ink)",
                        cursor: "pointer",
                        transition: "all .18s ease",
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
        @media (min-width: 1040px) {
          .blog-layout-grid {
            grid-template-columns: minmax(0, 1fr) 380px !important;
            gap: 48px !important;
            align-items: start !important;
          }
          .blog-sidebar-sticky {
            position: sticky;
            top: 96px;
          }
        }
        @media (min-width: 1280px) {
          .blog-layout-grid {
            grid-template-columns: minmax(0, 1fr) 400px !important;
            gap: 56px !important;
          }
        }
        .blog-search-input:focus {
          border-color: var(--marigold) !important;
          box-shadow: 0 0 0 3px rgba(217, 154, 63, 0.18) !important;
          background: #ffffff !important;
        }
        .recent-post-card:hover .recent-thumb-img {
          transform: scale(1.08);
        }
        .recent-post-card:hover .recent-post-title {
          color: var(--marigold-deep) !important;
        }
        .category-sidebar-btn:hover {
          background: rgba(11, 50, 11, 0.05);
          transform: translateX(4px);
        }
        .pub-download-card:hover {
          background: rgba(255, 255, 255, 0.14) !important;
          border-color: var(--marigold) !important;
        }
        .blog-tag-pill:hover {
          background: var(--canopy) !important;
          color: #ffffff !important;
          border-color: var(--canopy) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(11,50,11,0.15);
        }
        .blog-title-link:hover {
          color: var(--marigold-deep) !important;
        }
        .blog-thumb-img:hover {
          transform: scale(1.03);
        }
      `}</style>
    </>
  );
}