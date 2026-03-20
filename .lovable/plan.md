

## Plan: Account Page + Product Card Fixes

### 1. Create Account Page (`src/pages/AccountPage.tsx`)

A tabbed page at `/account` with three sections:

**Profile Tab**
- Default avatar (User icon in a circle), static name ("Guest User"), email ("guest@emart.com")
- Edit Profile button (UI only, shows toast)
- Logout button (UI only, shows toast)

**Orders Tab** (also reachable via `/account/orders`)
- Pulls `lastOrder` from Zustand store
- If order exists: renders order card with ID, date, products (image, name, qty, subtotal), total, status badge ("Delivered"), payment method
- If no orders: empty state with shopping bag icon and "Continue Shopping" link
- Future-proof: store will be updated to keep `orders` array (not just `lastOrder`)

**Settings Tab**
- Notification preferences (toggle switches, UI only)
- Theme preference (placeholder)

Design: Dark theme consistent with existing pages (Navbar + Footer layout), uses existing UI components (Card, Badge, Button, Tabs), framer-motion entrance animations.

### 2. Update Store for Order History (`src/store/useStore.ts`)

- Add `orders: Order[]` array to state
- Add `status: string` field to `Order` interface (default "Processing")
- Modify `placeOrder` to push into `orders` array AND set `lastOrder`
- Persist via existing zustand persist middleware

### 3. Add Routes (`src/App.tsx`)

- `/account` → AccountPage
- `/account/orders` → AccountPage (with orders tab active)

### 4. Fix Product Images

Review all products in `src/data/products.ts` and replace any potentially broken Unsplash URLs. The Samsung earbuds image was previously fixed; will verify all others load correctly. The `onError` fallback already exists on ProductCard.

### 5. Product Card Hover (Already Working)

The current ProductCard already has:
- `group-hover:scale-105` on image (zoom)
- `hover:surface-premium` shadow elevation on card
- Quick action buttons with opacity/translate transition on hover

These are all present and functional. No changes needed unless the CSS classes `surface-elevated` / `surface-premium` are missing from the stylesheet.

### 6. Product Data Accuracy

Scan products for brand/name mismatches. Current data looks correct (Sony headphones, Apple MacBook, Samsung earbuds, etc.). Will verify and fix any inconsistencies.

### Files to Create/Modify

| File | Action |
|------|--------|
| `src/pages/AccountPage.tsx` | Create - full account page with tabs |
| `src/store/useStore.ts` | Modify - add `orders` array, update `Order` interface |
| `src/App.tsx` | Modify - add `/account` and `/account/orders` routes |
| `src/data/products.ts` | Verify/fix any broken image URLs or brand mismatches |
| `src/index.css` | Verify `surface-elevated`/`surface-premium` classes exist |

