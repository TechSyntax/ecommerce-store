

## Plan: Navbar Redesign, Footer Rebrand, and Sticky Fix

### What Changes

**1. Navbar (`src/components/Navbar.tsx`)**
- Remove the entire category bar (lines 153-168) — the `lg:block` section with Electronics, Fashion, etc.
- Upgrade the logo from plain "EM" text-in-box to a more premium SVG-style logo with an orange shopping bag icon and stylized "E-Mart" wordmark with orange accent on the dot
- Change scroll behavior from binary (scrolled true/false) to a smooth opacity interpolation using `Math.min(1, scrollY / 100)` so the navbar gradually becomes more opaque as the user scrolls
- The navbar uses `fixed top-0` which is correct for sticky, but the hero section has no top padding to account for navbar height — add a spacer or `pt-16` to the hero/main content area

**2. Hero Section Spacing (`src/pages/Index.tsx` or `src/components/HeroSection.tsx`)**
- Add `pt-16` (64px, matching navbar h-16) to the hero section so content starts below the fixed navbar and doesn't get clipped

**3. Footer (`src/components/Footer.tsx`)**
- Replace "LX" logo icon with matching E-Mart logo (same as navbar)
- Replace "LUXEMART" text with "E-Mart"
- Update copyright from "LuxeMart" to "E-Mart"
- Update tagline to match the new brand voice

### Technical Details

**Smooth scroll opacity** (Navbar):
```ts
const [scrollProgress, setScrollProgress] = useState(0);
useEffect(() => {
  const handleScroll = () => {
    setScrollProgress(Math.min(1, window.scrollY / 100));
  };
  // ...
}, []);
```
Then use inline style for dynamic opacity: `style={{ backgroundColor: \`rgba(18,18,18,${0.5 + scrollProgress * 0.45})\` }}` combined with the backdrop-blur and border classes. Shadow intensity also increases with scroll.

**Logo upgrade**: Replace the plain orange square with a more distinctive icon — a rounded-xl container with an SVG shopping bag silhouette or a bold stylized "e" mark with orange gradient glow. The wordmark "E-Mart" gets a subtle orange color on the hyphen or "E" for brand distinction.

**Files modified**:
- `src/components/Navbar.tsx` — remove category bar, new logo, smooth scroll opacity
- `src/components/HeroSection.tsx` — add `pt-16` to account for fixed navbar
- `src/components/Footer.tsx` — rebrand to E-Mart with matching logo

