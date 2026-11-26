# RABAR — Modern Luxury Menswear Storefront

> **RABAR — Simple Style. Strong Identity.**

A minimalist, responsive, static e-commerce storefront for **RABAR**, a contemporary men's fashion house built with semantic HTML5, modular CSS3, and zero-dependency Vanilla JavaScript. Designed for instant static hosting (including GitHub Pages) with a calm editorial aesthetic inspired by modern luxury menswear.

---

## Key Features

- **Editorial Landing & Brand Identity**: Full-bleed hero section (`./assets/hero.jpg`), custom brand wordmarks (`./assets/logo.svg`, `./assets/logo-white.svg`), About RABAR editorial story, and newsletter signup with validation.
- **Interactive Catalog & Multi-Faceted Filtering**:
  - Live search across product names, categories, styles, and descriptions.
  - Five combinable filters: **Category**, **Price Range** (`Under $75`, `$75 – $150`, `$150+`), **Size**, **Color**, and **Availability** (`In Stock Only`).
  - Four sort modes: **Newest**, **Price: Low to High**, **Price: High to Low**, and **Best Sellers**.
  - Removable active filter chips and responsive mobile filter drawer.
- **Product Cards & Quick Add**:
  - Secondary studio image reveal on hover, interactive color swatch selection, wishlist toggle, and size-aware Quick Add bar.
- **Dedicated Product Details View (`#product/<id>`)**:
  - Multi-image thumbnail gallery, stock status indicator, required color and size selection validation, quantity stepper, Size Guide modal, wishlist toggle, and related product recommendations.
- **Persistent Shopping Bag & Wishlist (`localStorage`)**:
  - Slide-out cart drawer with complimentary express shipping progress bar (`$150` threshold), quantity adjustments, subtotal/shipping/total calculation, and checkout summary modal.
  - Account & Wishlist drawer with saved items and fit preferences persisted in `localStorage`.
- **Responsive & Accessible**:
  - Mobile-first breakpoints across mobile (`320px+`), tablet (`768px+`), and desktop (`1024px+`), keyboard-accessible drawers/modals (`Escape` and backdrop dismissal), and `prefers-reduced-motion` support.

---

## Project Structure

```text
RABAR/
├── index.html          # Semantic HTML5 storefront shell, PDP view, drawers & modals
├── style.css           # Minimalist design tokens, responsive grids, drawers & animations
├── products.js         # Centralized category & product catalog data (window.RABAR_*)
├── script.js           # Client-side routing, filtering, cart, wishlist & UI interactions
├── README.md           # Documentation & deployment guide
└── assets/
    ├── logo.svg        # Primary dark RABAR SVG wordmark
    ├── logo-white.svg  # White RABAR SVG wordmark for dark footer
    ├── logo.png        # High-resolution brand wordmark PNG
    ├── favicon.svg     # Vector browser favicon
    ├── favicon.png     # 64x64 raster fallback favicon
    ├── hero.jpg        # Editorial hero banner
    ├── banners/
    │   └── about.jpg   # About RABAR editorial portrait
    ├── categories/     # 7 category studio images (3:4 portrait JPEGs)
    └── products/       # 24 product studio images (2 angles per product)
```

All asset references use relative paths (`./style.css`, `./products.js`, `./script.js`, `./assets/...`) so the site runs cleanly both at root domains and under subpaths such as `https://<username>.github.io/<repo-name>/`.

---

## Important Note: Frontend-Only Demo Scope

This repository is a **static frontend storefront**. The following capabilities operate strictly as client-side demonstrations using browser `localStorage` and static modal flows:

- **Payment Processing & Checkout**: Clicking **Checkout** in the shopping bag presents a frontend order summary modal. Real payment processing (e.g., Stripe, Shopify Checkout, PayPal) requires a server-side integration.
- **Order Management**: Order placement, inventory decrementing, fulfillment tracking, and email receipts require a backend API and database.
- **Account Authentication**: The **Account & Wishlist** drawer stores wishlist items and fit preferences locally in the browser (`rabar_wishlist_v1`, `rabar_prefs_v1`). Real user sign-up, login, session security, and cross-device order history require an authentication and backend service.
- **Newsletter Subscription**: Email submissions are validated on the client and saved to `localStorage` (`rabar_newsletter_v1`) rather than transmitted to an ESP backend.

---

## Local Preview

Because all paths are relative and no build step or package manager is required, you can preview the site by opening `index.html` directly or serving the folder over HTTP:

- **VS Code Live Server**: Open the `RABAR` folder in VS Code and click **Go Live**.
- **Any static HTTP server**: Point your preferred static server at the `RABAR` directory and open `index.html`.

---

## Deploying to GitHub Pages

1. **Create a GitHub repository** (for example, `rabar-storefront`) and push all files in the `RABAR/` folder (`index.html`, `style.css`, `products.js`, `script.js`, `README.md`, and `assets/`) to the `main` branch.
2. In your GitHub repository, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait 1–2 minutes for GitHub Pages to publish the site. Your live storefront will be available at:
   `https://<your-username>.github.io/<your-repo-name>/`

Because every asset and script in `index.html` uses relative `./` paths and hash-based routing (`#catalog`, `#product/rbr-001`), no extra base-path configuration is needed for GitHub Pages project URLs.
