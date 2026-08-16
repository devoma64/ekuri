# The Ekuri Initiative — Website

A multi-page React site for the Ekuri Initiative, the community-based conservation
organization protecting the 33,600-hectare Ekuri Community rainforest in Cross River
State, Nigeria. Built with **Vite + React**, **react-router-dom**, and **framer-motion**.

## Structure

```
src/
  data/
    content.js          # everything from the website plan doc — history, vision,
                          # mission, programs, communities, trustees, management, partners
    publications.js       # each real publication matched to its actual file
  components/
    Navbar.jsx              # topbar contact + main nav, hides topbar on scroll
    Footer.jsx
    HeroVideo.jsx             # the video/sound hero — see below
    CanopyScene.jsx            # illustrated animated fallback for the hero
    ImagePlaceholder.jsx        # labeled photo placeholder — see "About the images" below
    PdfPreviewModal.jsx          # in-browser PDF/image preview used on Publications
    Timeline.jsx                  # sourced history timeline, used on About
    Reveal.jsx, SectionTitle.jsx, PageHeader.jsx, PageTransition.jsx, ScrollToTop.jsx
  pages/
    Home.jsx, About.jsx, Programs.jsx, WhereWeWork.jsx, People.jsx, Gallery.jsx,
    Partners.jsx, Publications.jsx, News.jsx, Contact.jsx, Donate.jsx
```

## About the images — read this before adding photos

The client's planning doc had 16 images embedded in it. I opened and checked every one
before using any of them: **at least two are provably unlicensed stock photography** —
one has a visible stock-site watermark tiled across it, another has a photographer's
copyright credit burned into the corner. None of the 16 are used anywhere on this site,
because I can't verify the origin of the rest either, and using them would be a real
legal risk to the client, not a theoretical one.

Instead, every spot that needs a photo uses **`ImagePlaceholder.jsx`** — a labeled
placeholder block (canopy-green background, an icon, and a text label saying exactly
what photo belongs there). You'll see these on:

- **Programs** (`/programs`) — one per program/activity card, labeled with the program name
- **People** (`/people`) — one per trustee and management team member, labeled with their name
- **Gallery** (`/gallery`, new page) — one per event/activity slot, labeled with a description
- **News** (`/news`) — one per placeholder post card
- **About** (`/about`) — one for a forest/wildlife photo in the history section

Swap a placeholder for a real photo by replacing the `<ImagePlaceholder label="..." />`
call with a normal `<img src="..." />` once you have a photo you actually own the
rights to (your own photography, or something properly licensed) — the `label` text
tells you exactly what to look for or shoot.

**Partner logos** (`/partners` and the homepage strip) are shown as text wordmarks for
the same reason, not real logo image files — I can't fetch and safely verify official
logo files for UNDP, WWF, WCS, etc. from within this environment, and pulling a random
copy from a search result risks using an outdated mark or violating that partner's
brand guidelines without asking them. Get official logo files directly from each
partner (their press/brand page, or just ask them) and drop them in
`public/assets/img/partners/` to swap in.

## The hero video + sound — action needed

`HeroVideo.jsx` is built to play a looping background video with an optional ambient
soundtrack, but **no video/audio files are included** — I don't have footage or field
recordings of the Ekuri forest to supply, and I don't have the ability to generate
video or audio at all (that's outside what I can do — writing code, not synthesizing
footage). Drop your files in:

```
public/assets/video/forest-hero.mp4     (+ forest-hero.webm optional, better compression)
public/assets/img/hero-poster.jpg        (a still frame, shown while the video loads)
public/assets/audio/forest-ambience.mp3   (stream + birdsong, looped)
```

Until those exist, the hero shows **`CanopyScene.jsx`** — a hand-built, illustrated
animated rainforest scene (layered SVG canopy silhouettes with parallax drift, soft
light shafts, fireflies, a small flight of birds) instead of a static gradient or,
worse, generic stock footage. It's deliberately stylized rather than photorealistic
so nobody mistakes it for real footage of this specific forest — using unrelated
stock video would misrepresent the actual Ekuri forest, which the project brief
explicitly rules out. Swap it for the real `<video>` the moment you have footage;
`CanopyScene` is only ever shown as a fallback, never layered underneath real video.

The "Forest sound" toggle button already works and will play whatever you put at
`forest-ambience.mp3` once you add it; sound is opt-in (never autoplays with audio) to
respect browser autoplay rules and your visitors' ears.

**Tips for the source video:** keep it under ~15–20MB for web performance, at least
1920×1080, no audio track needed in the video file itself (muted on load regardless) —
15–30 seconds looping cleanly reads better than a long clip.

## Publications — what's real vs. pending

Every file in `public/assets/docs/` and `public/assets/img/` is one of your actual
uploaded documents, renamed to match its publication:

| Listed in the plan | File used |
|---|---|
| Perimeter/Boundary Survey | `ekuri-perimeter-survey.jpg` |
| 2010 CRS Forestry Commission Law | `2010_CRS_Forestry_Commission_Law.pdf` |
| UNDP 2004 Equator Initiative case study | `UNDP-2004-Ekuri-Initiative-Case-Study.pdf` |
| UNDP 2016 Climate Solutions from Community Forests | `UNDP-2016-Climate-Solutions-from-Community-Forests.pdf` |
| UNDP 2012 Power of Local Action | `UNDP-2012-Power-of-Local-Action.pdf` |
| Ekuri Traditional Rulers Council protest letter | `Ekuri-Traditional-Rulers-Council-Protest-Letter-2016.pdf` |
| WCS Superhighway alignment map | `superhighway-map.jpg` |

I also added the **WWF-UK letter to President Buhari (2015)** as a bonus publication —
you uploaded it and it's directly relevant to the Superhighway story, even though it
wasn't in the original list.

Two items from your plan have **no file yet** and show an "Available on request" badge
instead of Preview/Download: the 1994 Forestry Department strategy document, and the
1999 Ford Foundation conference proceedings. Drop those PDFs into `public/assets/docs/`
and update their entry in `src/data/publications.js` (change `type: "unavailable"` to
`type: "pdf"` and add a `file:` path) whenever you have them.

## Run it locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Before this goes live

## Sourced history section

`About.jsx` now includes a "History of defending this forest" timeline
(`src/components/Timeline.jsx`, data in `src/data/content.js` as `TIMELINE`) covering
the 1982 road-for-logging-rights rejection, the 1989 secret concession, the 1996
imprisonment of six community leaders, the 2004 Equator Prize, and the 2015–2016
Superhighway fight — plus a real, sourced Chief Edwin Ogar quote. Every entry was
re-verified directly against the source PDF text (not just summarized) and carries
its own citation line. If you add to this timeline later, keep that same standard:
quote the source document directly rather than paraphrasing from memory.


1. **Hero video + sound** — add the files described above.
2. **Contact form** (`src/pages/Contact.jsx`) — front-end demo only; wire to a real backend.
3. **Donate page** — currently points people to email; hook up a real payment processor
   (Paystack, Flutterwave, or similar) when ready.
4. **Photos** — the plan doc referenced several photos (forest canopy, gorillas, elephants,
   drills, community members) that were embedded in the Word file as likely-copyrighted
   stock images, so I didn't pull them in. Replace the gradient placeholder blocks around
   the site with your own photography as you get it.
5. **Social links** — Facebook/LinkedIn icons on the Contact page currently link to `#`;
   add your real profile URLs.
