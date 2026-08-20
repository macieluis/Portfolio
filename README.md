# Personal Portfolio

A Twitter/X-profile inspired portfolio built with **Next.js, TypeScript and Tailwind
CSS**: pure-black theme, pastel cover banner, overlapping avatar, pink accent, evenly
distributed profile tabs and a tweet-style feed (pinned intro post + project posts).
Fully driven by data files — you never need to touch a React component to update
your information.

## Stack

- [Next.js](https://nextjs.org) (App Router, static generation)
- TypeScript (strict mode)
- Tailwind CSS v4
- Lucide icons (+ inline GitHub/LinkedIn brand SVGs)
- No other runtime dependencies

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

## Where to edit YOUR data

All personal content lives in `data/` — search for `[PLACEHOLDER]` to find
everything that still needs your real information:

| File | Contains |
| --- | --- |
| `data/profile.ts` | Name, headline, bio, about paragraphs, location, links (GitHub/LinkedIn/email), CV path, avatar initials |
| `data/projects.ts` | All projects (cards, featured project and detail pages) |
| `data/skills.ts` | Skill badges grouped by category |
| `data/education.ts` | Degrees, dates, coursework |
| `data/experience.ts` | Internships/freelance/research — leave empty to hide the section entirely |
| `data/site.ts` | Production URL (for SEO/sitemap) + meta description |

### Adding a project

Add an object to the array in `data/projects.ts`. Each project automatically gets a
post in the feed and a case-study page at `/projects/<slug>`. Set `featured: true` on
exactly one project to pin it at the top, and `wip: true` while it is still in active
development (shows a "🚧 In development" chip). The optional `detail` block
(architecture, decisions, challenges, results, improvements, lessons) powers the
case-study page — fill in what you have, omit the rest. Projects with no `github` or
`demo` link show an honest "repository not public yet" note.

### CV

Your CV is at **`public/cv.pdf`** (the "Download CV" and "View CV" buttons point
there). Replace that file whenever you update it — ideally with an English version,
since the site targets international recruiters.

### Images

| Path | Used for |
| --- | --- |
| `public/images/avatar.jpg` | Your photo (circular). Until it exists, your initials are shown. |
| `public/images/cover.jpg` | Header banner. Until it exists, a clean pastel band (`--cover` in `app/globals.css`) is shown. |
| `public/images/projects/<slug>.png` | Project screenshots. Until they exist, a styled placeholder tile is shown. |

The site works and looks finished before any image is added.

### Accent & cover colors

Two variables in `app/globals.css` control the theme: `--accent` (pink — links,
buttons, active tab underline; plus `--accent-strong` / `--accent-soft`) and
`--cover` (the pastel banner color shown until you add a cover image).

## Project structure

```
app/
  layout.tsx            # Fonts, <html>, SEO metadata (reads data/site.ts)
  page.tsx              # Home: header → tabs → projects → about → contact
  globals.css           # Design tokens (colors, accent), reveal animation
  projects/[slug]/      # Case-study page per project (static, from data)
  not-found.tsx         # 404
  robots.ts, sitemap.ts # SEO (read data/site.ts)
  icon.svg              # Favicon
components/
  ProfileHeader.tsx     # Banner + avatar + name + meta rows + pill CTA
  TabNav.tsx            # Sticky Twitter-style tabs with scroll-spy
  FeedPost.tsx          # Tweet-style post (avatar, author row, chip, content)
  FeaturedProject.tsx   # Pinned featured-project post
  ProjectCard.tsx       # Project rendered as a feed post
  ProjectImage.tsx      # Screenshot with graceful placeholder fallback
  Avatar.tsx, Cover.tsx # Images with fallbacks (initials / pastel band)
  Section.tsx, TechBadge.tsx, Reveal.tsx, Footer.tsx, icons.tsx
data/                   # ← everything you edit lives here
public/                 # cv.pdf + images (see above)
```

## Notes

- **Experience section** — hidden (including its nav tab) while
  `data/experience.ts` is empty. Never list experience you don't have.
- **GitHub repos** — the GitHub block is a static link by design; the site never
  depends on the GitHub API. If you later want live pinned repos, fetch them in a
  server component and render them inside the GitHub card.
- **Animations** — subtle fade/slide reveals only; disabled for users with
  `prefers-reduced-motion`, and content stays visible without JavaScript.

## Deploy

The site is fully static — any Node host or static-friendly platform works:

1. Set your real domain in `data/site.ts` (`url`).
2. **Vercel** (simplest): push the repo to GitHub → import at vercel.com → deploy.
   Every push redeploys automatically.
3. Alternatives: Netlify, Cloudflare Pages, or `npm run build && npm start` on any
   server.

## Still to do before publishing

- [ ] Add your LinkedIn URL in `data/profile.ts` (currently `[PLACEHOLDER]`).
- [ ] Set your real domain in `data/site.ts` (currently `[PLACEHOLDER]`).
- [ ] Add repository URLs in `data/projects.ts` for any project you make public
      (see the `// TODO` comments on E2EE Chat, TrustYBet and SpotifUM).
- [ ] Add screenshots for E2EE Chat, TrustYBet and SpotifUM in
      `public/images/projects/` (FlowBnB already has one).
- [ ] Optional: add `public/images/cover.jpg` — a pastel banner shows until then.
- [ ] Replace `public/cv.pdf` with an English version (the current one is the
      Portuguese Europass CV).
- [ ] Fill in the remaining detail on FlowBnB/E2EE Chat/TrustYBet write-ups as
      those projects progress — every project is currently marked `wip: true`.

Already done: your name, bio, links, education, both internships, skills, the
four projects, your avatar (`public/images/avatar.jpg`) and your CV.

Search the repo for `[PLACEHOLDER]` and `TODO` to confirm nothing is left.
