(() => {
  'use strict';

  /* ==========================================================================
     RABAR Storefront Application Logic
     Pure Vanilla ES6+ | Zero external dependencies | Relative paths only
     ========================================================================== */

  const STORAGE_KEYS = {
    CART: 'rabar_cart_v1',
    WISHLIST: 'rabar_wishlist_v1',
    PREFS: 'rabar_prefs_v1',
    NEWSLETTER: 'rabar_newsletter_v1'
  };

  const FREE_SHIPPING_THRESHOLD = 150;
  const STANDARD_SHIPPING_FEE = 15;

  const CATEGORY_NAV_NAMES = new Set([
    'T-Shirts',
    'Polo Shirts',
    'Shirts',
    'Pants',
    'Jeans',
    'Sneakers',
    'Sportswear',
    'Accessories'
  ]);

  const MODAL_CONTENT = {
    contact: {
      title: 'Contact RABAR Concierge',
      body: `
        <div class="modal-copy">
          <p>Our client concierge team is available Monday through Saturday, 09:00–19:00 EST, for sizing advice, styling inquiries, and order assistance.</p>
          <div class="modal-info-grid">
            <div><strong>Client Care</strong><p>concierge@rabar-atelier.example</p></div>
            <div><strong>Press &amp; Showroom</strong><p>press@rabar-atelier.example</p></div>
            <div><strong>Flagship Studio</strong><p>412 Mercer Street, Suite 3B, New York</p></div>
            <div><strong>Response Time</strong><p>Within 1 business day</p></div>
          </div>
          <p class="modal-note">Note: RABAR is a static frontend storefront demonstration. Contact addresses above are illustrative demo details.</p>
        </div>
      `
    },
    shipping: {
      title: 'Shipping Information',
      body: `
        <div class="modal-copy">
          <p>Every RABAR order is carefully pressed, folded in acid-free tissue, and dispatched in recyclable matte packaging.</p>
          <ul class="modal-list">
            <li><strong>Complimentary Express Delivery:</strong> Automatically unlocked on orders of $150.00 or more (2–3 business days).</li>
            <li><strong>Standard Tracked Courier:</strong> Flat $15.00 rate on orders under $150.00 (3–5 business days).</li>
            <li><strong>Dispatch Window:</strong> Orders placed before 14:00 EST ship the same business day.</li>
          </ul>
        </div>
      `
    },
    returns: {
      title: 'Returns & Exchanges',
      body: `
        <div class="modal-copy">
          <p>We offer a 30-day return and complimentary size exchange window on all unworn garments with original tags and packaging intact.</p>
          <ul class="modal-list">
            <li><strong>Instant Size Exchanges:</strong> Replacement sizes dispatch as soon as your return parcel is scanned by the carrier.</li>
            <li><strong>Refund Processing:</strong> Refunds are issued to the original payment method within 5 business days of studio inspection.</li>
            <li><strong>Footwear Care:</strong> Please try sneakers on clean indoor surfaces before removing protective sole films.</li>
          </ul>
        </div>
      `
    },
    faq: {
      title: 'Frequently Asked Questions',
      body: `
        <div class="modal-copy">
          <div class="faq-item">
            <h4>How do RABAR garments fit?</h4>
            <p>Our silhouettes are tailored with modern proportion—structured at the shoulder with clean drape. Use the Size Guide on any product page or save your fit preference in your Account drawer.</p>
          </div>
          <div class="faq-item">
            <h4>How should I care for heavyweight jersey and knit polos?</h4>
            <p>Machine wash cold on a gentle cycle inside-out, or hand wash, and dry flat to preserve natural fiber structure and color depth.</p>
          </div>
          <div class="faq-item">
            <h4>Are online payments live on this site?</h4>
            <p>No. This storefront is a frontend demonstration; cart, wishlist, and checkout previews run locally in your browser without processing real transactions.</p>
          </div>
        </div>
      `
    },
    privacy: {
      title: 'Privacy Policy',
      body: `
        <div class="modal-copy">
          <p>RABAR respects your digital privacy. In this static frontend demonstration, your shopping bag, saved wishlist items, fit preferences, and newsletter opt-in are stored solely inside your own browser via <code>localStorage</code>.</p>
          <p>No personal data is transmitted to external servers, third-party trackers, or payment processors.</p>
        </div>
      `
    },
    terms: {
      title: 'Terms & Conditions',
      body: `
        <div class="modal-copy">
          <p>All product names, pricing, imagery, and editorial descriptions presented on RABAR are part of a portfolio storefront experience.</p>
          <p>Orders submitted through the demo checkout modal do not create binding commercial transactions or trigger fulfillment.</p>
        </div>
      `
    },
    instagram: {
      title: 'RABAR on Instagram',
      body: `
        <div class="modal-copy">
          <p>Explore seasonal lookbooks, architectural fabric studies, and studio previews at <strong>@rabar.menswear</strong>.</p>
          <p class="modal-note">External social account linking is disabled in this offline-ready demo storefront.</p>
        </div>
      `
    },
    facebook: {
      title: 'RABAR on Facebook',
      body: `
        <div class="modal-copy">
          <p>Follow collection releases and capsule archive notes on the official <strong>RABAR Studio</strong> community page.</p>
          <p class="modal-note">External social account linking is disabled in this offline-ready demo storefront.</p>
        </div>
      `
    },
    tiktok: {
      title: 'RABAR on TikTok',
      body: `
        <div class="modal-copy">
          <p>Watch fit checks, tailoring breakdowns, and monochrome styling edits via <strong>@rabar.studio</strong>.</p>
          <p class="modal-note">External social account linking is disabled in this offline-ready demo storefront.</p>
        </div>
      `
    },
    'size-guide': {
      title: 'RABAR Size Guide',
      body: `
        <div class="modal-copy">
          <p>All measurements are in inches/centimeters and reflect body measurements for a refined modern fit.</p>
          <h4 class="modal-subheading">Tops &amp; Outerwear (T-Shirts, Polos, Shirts, Sportswear)</h4>
          <div class="size-table-wrap">
            <table class="size-table">
              <thead>
                <tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th><th>Shoulder (in)</th></tr>
              </thead>
              <tbody>
                <tr><td>S</td><td>36 – 38</td><td>29 – 31</td><td>17.5</td></tr>
                <tr><td>M</td><td>38 – 40</td><td>31 – 33</td><td>18.3</td></tr>
                <tr><td>L</td><td>40 – 42</td><td>33 – 35</td><td>19.1</td></tr>
                <tr><td>XL</td><td>42 – 45</td><td>35 – 38</td><td>20.0</td></tr>
              </tbody>
            </table>
          </div>
          <h4 class="modal-subheading">Trousers &amp; Denim</h4>
          <div class="size-table-wrap">
            <table class="size-table">
              <thead>
                <tr><th>Size</th><th>Waist (in)</th><th>Hip (in)</th><th>Inseam (in)</th></tr>
              </thead>
              <tbody>
                <tr><td>30</td><td>30.5</td><td>37.5</td><td>31.0</td></tr>
                <tr><td>32</td><td>32.5</td><td>39.5</td><td>31.5</td></tr>
                <tr><td>34</td><td>34.5</td><td>41.5</td><td>32.0</td></tr>
                <tr><td>36</td><td>36.5</td><td>43.5</td><td>32.5</td></tr>
              </tbody>
            </table>
          </div>
          <h4 class="modal-subheading">Footwear (EU / US / CM)</h4>
          <div class="size-table-wrap">
            <table class="size-table">
              <thead>
                <tr><th>EU</th><th>US Men</th><th>Foot Length (cm)</th></tr>
              </thead>
              <tbody>
                <tr><td>40</td><td>7</td><td>25.4</td></tr>
                <tr><td>41</td><td>8</td><td>26.0</td></tr>
                <tr><td>42</td><td>9</td><td>26.7</td></tr>
                <tr><td>43</td><td>10</td><td>27.3</td></tr>
                <tr><td>44</td><td>11</td><td>28.0</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    }
  };

  /* --------------------------------------------------------------------------
     State & Persistence
     -------------------------------------------------------------------------- */
  const state = {
    cart: [],
    wishlist: [],
    prefs: { size: '', fit: 'Regular' },
    newsletterEmail: '',
    filters: {
      search: '',
      category: 'All',
      price: 'all',
      size: 'all',
      color: 'all',
      availability: 'all',
      sort: 'newest'
    },
    pdp: {
      productId: null,
      color: null,
      size: null,
      qty: 1
    },
    cardColors: new Map(),
    lastHash: ''
  };

  const dom = {};
  let revealObserver = null;

  function safeStorageGet(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return fallback;
      return JSON.parse(raw);
    } catch (_err) {
      return fallback;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_err) {
      // Ignore storage quota / privacy mode errors gracefully
    }
  }

  function loadPersistedState() {
    const savedCart = safeStorageGet(STORAGE_KEYS.CART, []);
    state.cart = Array.isArray(savedCart)
      ? savedCart.filter(
          (item) =>
            item &&
            typeof item.id === 'string' &&
            typeof item.color === 'string' &&
            typeof item.size === 'string' &&
            Number.isFinite(Number(item.qty)) &&
            Number(item.qty) > 0
        )
      : [];

    const savedWishlist = safeStorageGet(STORAGE_KEYS.WISHLIST, []);
    state.wishlist = Array.isArray(savedWishlist)
      ? savedWishlist.filter((id) => typeof id === 'string')
      : [];

    const savedPrefs = safeStorageGet(STORAGE_KEYS.PREFS, null);
    if (savedPrefs && typeof savedPrefs === 'object') {
      state.prefs = {
        size: typeof savedPrefs.size === 'string' ? savedPrefs.size : '',
        fit: typeof savedPrefs.fit === 'string' && savedPrefs.fit ? savedPrefs.fit : 'Regular'
      };
    }

    try {
      const savedEmail = window.localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
      if (savedEmail) {
        try {
          const parsed = JSON.parse(savedEmail);
          state.newsletterEmail = typeof parsed === 'string' ? parsed : savedEmail;
        } catch (_e) {
          state.newsletterEmail = savedEmail;
        }
      }
    } catch (_err) {
      state.newsletterEmail = '';
    }
  }

  /* --------------------------------------------------------------------------
     Utilities
     -------------------------------------------------------------------------- */
  function getProducts() {
    return Array.isArray(window.RABAR_PRODUCTS) ? window.RABAR_PRODUCTS : [];
  }

  function getCategories() {
    return Array.isArray(window.RABAR_CATEGORIES) ? window.RABAR_CATEGORIES : [];
  }

  function getProductById(id) {
    return getProducts().find((p) => p.id === id) || null;
  }

  function formatMoney(amount) {
    return `$${Number(amount).toFixed(2)}`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function smoothScrollToElement(el) {
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  function smoothScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth'
    });
  }

  function heartSvg(filled = false) {
    return `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="${
      filled ? 'currentColor' : 'none'
    }" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  }

  /* --------------------------------------------------------------------------
     DOM Caching
     -------------------------------------------------------------------------- */
  function cacheDom() {
    const ids = [
      'page-loader',
      'site-header',
      'mobile-menu-btn',
      'search-open-btn',
      'account-open-btn',
      'cart-open-btn',
      'wishlist-badge',
      'cart-badge',
      'home-view',
      'pdp-view',
      'hero-section',
      'hero-img',
      'hero-shop-btn',
      'categories-section',
      'categories-grid',
      'new-arrivals',
      'new-arrivals-grid',
      'best-sellers',
      'best-sellers-grid',
      'view-all-bestsellers-btn',
      'catalog',
      'catalog-heading',
      'catalog-results-count',
      'catalog-search',
      'mobile-filter-open-btn',
      'mobile-filter-close-btn',
      'mobile-filter-apply-btn',
      'sort-select',
      'catalog-filters',
      'filter-category',
      'filter-price',
      'filter-size',
      'filter-color',
      'filter-availability',
      'filter-reset-btn',
      'active-filter-chips',
      'catalog-grid',
      'catalog-empty',
      'empty-reset-btn',
      'about',
      'newsletter',
      'newsletter-form',
      'newsletter-email',
      'newsletter-msg',
      'pdp-back-btn',
      'pdp-breadcrumb',
      'pdp-thumbs',
      'pdp-main-img',
      'pdp-category',
      'pdp-title',
      'pdp-price',
      'pdp-stock',
      'pdp-description',
      'pdp-selected-color',
      'pdp-colors',
      'pdp-selected-size',
      'pdp-size-guide-btn',
      'pdp-sizes',
      'pdp-error',
      'pdp-qty-minus',
      'pdp-qty-val',
      'pdp-qty-plus',
      'pdp-add-btn',
      'pdp-wishlist-btn',
      'pdp-details-list',
      'pdp-related-grid',
      'overlay-backdrop',
      'mobile-menu-drawer',
      'mobile-menu-close-btn',
      'search-drawer',
      'search-input',
      'search-close-btn',
      'search-live-results',
      'search-view-all-btn',
      'cart-drawer',
      'cart-drawer-count',
      'cart-close-btn',
      'cart-shipping-note',
      'cart-shipping-fill',
      'cart-items-list',
      'cart-empty-state',
      'cart-continue-btn',
      'cart-footer',
      'cart-subtotal',
      'cart-shipping',
      'cart-total',
      'cart-checkout-btn',
      'account-drawer',
      'account-close-btn',
      'wishlist-list',
      'wishlist-empty',
      'prefs-size',
      'prefs-fit',
      'site-modal',
      'modal-title',
      'modal-close-btn',
      'modal-body'
    ];
    ids.forEach((id) => {
      dom[id] = document.getElementById(id);
    });
  }

  /* --------------------------------------------------------------------------
     Loader & Sticky Header
     -------------------------------------------------------------------------- */
  function initLoader() {
    const loader = dom['page-loader'];
    if (!loader) return;
    loader.classList.add('is-loaded');
    window.setTimeout(() => {
      loader.hidden = true;
    }, 380);
  }

  function updateHeaderScroll() {
    if (!dom['site-header']) return;
    dom['site-header'].classList.toggle('is-scrolled', window.scrollY > 20);
  }

  /* --------------------------------------------------------------------------
     Overlays, Drawers, Search Sheet & Modal
     -------------------------------------------------------------------------- */
  function closeAllOverlays() {
    const drawers = [
      dom['mobile-menu-drawer'],
      dom['search-drawer'],
      dom['cart-drawer'],
      dom['account-drawer']
    ];
    drawers.forEach((el) => {
      if (!el) return;
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
    });

    if (dom['mobile-menu-btn']) {
      dom['mobile-menu-btn'].setAttribute('aria-expanded', 'false');
    }

    if (dom['catalog-filters']) {
      dom['catalog-filters'].classList.remove('is-open');
    }

    if (dom['site-modal']) {
      dom['site-modal'].classList.remove('is-open');
      dom['site-modal'].hidden = true;
    }

    if (dom['overlay-backdrop']) {
      dom['overlay-backdrop'].classList.remove('is-visible');
      dom['overlay-backdrop'].hidden = true;
    }

    document.body.classList.remove('no-scroll');
  }

  function showBackdrop() {
    if (dom['overlay-backdrop']) {
      dom['overlay-backdrop'].hidden = false;
      dom['overlay-backdrop'].classList.add('is-visible');
    }
    document.body.classList.add('no-scroll');
  }

  function openDrawer(drawerEl, triggerBtn = null) {
    if (!drawerEl) return;
    closeAllOverlays();
    drawerEl.classList.add('is-open');
    drawerEl.setAttribute('aria-hidden', 'false');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    showBackdrop();
  }

  function openMobileFilters() {
    if (!dom['catalog-filters']) return;
    closeAllOverlays();
    dom['catalog-filters'].classList.add('is-open');
    showBackdrop();
  }

  function openModal(title, htmlContent) {
    if (!dom['site-modal'] || !dom['modal-title'] || !dom['modal-body']) return;
    closeAllOverlays();
    dom['modal-title'].textContent = title;
    dom['modal-body'].innerHTML = htmlContent;
    dom['site-modal'].hidden = false;
    dom['site-modal'].classList.add('is-open');
    showBackdrop();
    if (dom['modal-close-btn']) {
      dom['modal-close-btn'].focus();
    }
  }

  function openInfoModal(modalKey, triggerEl = null) {
    let resolvedKey = modalKey;
    if (modalKey === 'social' && triggerEl) {
      const socialName = (triggerEl.getAttribute('data-social') || '').toLowerCase();
      if (socialName && MODAL_CONTENT[socialName]) {
        resolvedKey = socialName;
      }
    }
    const entry = MODAL_CONTENT[resolvedKey];
    if (!entry) return;
    openModal(entry.title, entry.body);
  }

  /* --------------------------------------------------------------------------
     Product Card Rendering
     -------------------------------------------------------------------------- */
  function getCardActiveColor(product) {
    if (!product || !Array.isArray(product.colors) || product.colors.length === 0) {
      return '';
    }
    const stored = state.cardColors.get(product.id);
    if (stored && product.colors.some((c) => c.name === stored)) {
      return stored;
    }
    const defaultName = product.colors[0].name;
    state.cardColors.set(product.id, defaultName);
    return defaultName;
  }

  function createProductCardHtml(product, { immediateReveal = false } = {}) {
    const isWished = state.wishlist.includes(product.id);
    const activeColor = getCardActiveColor(product);
    const mainImg = (product.images && product.images[0]) || '';
    const hoverImg = (product.images && (product.images[1] || product.images[0])) || mainImg;

    let badgeHtml = '';
    if (!product.inStock) {
      badgeHtml = '<span class="product-card__badge product-card__badge--sold">SOLD OUT</span>';
    } else if (product.isNewArrival) {
      badgeHtml = '<span class="product-card__badge">NEW</span>';
    }

    let quickHtml = '';
    if (product.inStock) {
      const sizeButtons = (product.sizes || [])
        .map(
          (s) =>
            `<button type="button" class="quick-size-btn" data-quick-add-id="${escapeHtml(
              product.id
            )}" data-quick-add-size="${escapeHtml(s)}">${escapeHtml(s)}</button>`
        )
        .join('');
      quickHtml = `
        <div class="product-card__quick">
          <button type="button" class="product-card__quick-btn" data-quick-toggle="${escapeHtml(
            product.id
          )}" aria-expanded="false">Quick Add</button>
          <div class="product-card__quick-sizes" data-quick-panel="${escapeHtml(
            product.id
          )}" hidden>${sizeButtons}</div>
        </div>
      `;
    } else {
      quickHtml = `
        <div class="product-card__quick">
          <button type="button" class="product-card__quick-btn" disabled>Sold Out</button>
        </div>
      `;
    }

    const swatchesHtml = (product.colors || [])
      .map((c) => {
        const isActive = c.name === activeColor;
        const isLight =
          c.hex.toUpperCase() === '#FFFFFF' || c.hex.toUpperCase() === '#F7F5F1';
        return `<button type="button" class="swatch-dot${isActive ? ' is-active' : ''}${
          isLight ? ' swatch-dot--light' : ''
        }" data-card-swatch="${escapeHtml(product.id)}" data-color-name="${escapeHtml(
          c.name
        )}" style="--swatch-color:${escapeHtml(c.hex)}" aria-label="Select color ${escapeHtml(
          c.name
        )}" aria-pressed="${isActive ? 'true' : 'false'}" title="${escapeHtml(c.name)}"></button>`;
      })
      .join('');

    const revealClass = immediateReveal ? 'reveal is-visible' : 'reveal';

    return `
      <article class="product-card ${revealClass}" data-product-id="${escapeHtml(product.id)}">
        <div class="product-card__media">
          <a href="#product/${escapeHtml(product.id)}" class="product-card__link" aria-label="${escapeHtml(
      product.name
    )}">
            <img class="product-card__img product-card__img--main" src="${escapeHtml(
              mainImg
            )}" alt="${escapeHtml(product.name)}" loading="lazy">
            <img class="product-card__img product-card__img--hover" src="${escapeHtml(
              hoverImg
            )}" alt="${escapeHtml(product.name)} alternate view" loading="lazy">
          </a>
          ${badgeHtml}
          <button type="button" class="product-card__wish${
            isWished ? ' is-active' : ''
          }" data-wish-id="${escapeHtml(product.id)}" aria-label="${
      isWished ? 'Remove from wishlist' : 'Add to wishlist'
    }" aria-pressed="${isWished ? 'true' : 'false'}">
            ${heartSvg(isWished)}
          </button>
          ${quickHtml}
        </div>
        <div class="product-card__body">
          <p class="product-card__meta">${escapeHtml(product.category)}</p>
          <h3 class="product-card__title"><a href="#product/${escapeHtml(
            product.id
          )}">${escapeHtml(product.name)}</a></h3>
          <p class="product-card__price">${formatMoney(product.price)}</p>
          <div class="product-card__swatches" role="group" aria-label="Available colors">
            ${swatchesHtml}
          </div>
          <p class="product-card__sizes">${escapeHtml((product.sizes || []).join(' · '))}</p>
        </div>
      </article>
    `;
  }

  function renderCategories() {
    if (!dom['categories-grid']) return;
    const categories = getCategories();
    dom['categories-grid'].innerHTML = categories
      .map(
        (cat) => `
        <article class="category-card reveal">
          <a href="#catalog" class="category-card__link" data-nav="${escapeHtml(cat.name)}">
            <div class="category-card__media">
              <img src="${escapeHtml(cat.image)}" alt="${escapeHtml(cat.name)}" loading="lazy">
            </div>
            <div class="category-card__body">
              <h3 class="category-card__title">${escapeHtml(cat.name)}</h3>
              <p class="category-card__subtitle">${escapeHtml(cat.subtitle)}</p>
            </div>
          </a>
        </article>
      `
      )
      .join('');
    observeReveals(dom['categories-grid']);
  }

  function renderNewArrivals() {
    if (!dom['new-arrivals-grid']) return;
    const items = getProducts()
      .filter((p) => p.isNewArrival === true)
      .sort((a, b) => (b.createdOrder || 0) - (a.createdOrder || 0));
    dom['new-arrivals-grid'].innerHTML = items.map((p) => createProductCardHtml(p)).join('');
    observeReveals(dom['new-arrivals-grid']);
  }

  function renderBestSellers() {
    if (!dom['best-sellers-grid']) return;
    const items = getProducts()
      .filter((p) => p.isBestSeller === true)
      .sort((a, b) => (a.bestSellerRank || 99) - (b.bestSellerRank || 99));
    dom['best-sellers-grid'].innerHTML = items.map((p) => createProductCardHtml(p)).join('');
    observeReveals(dom['best-sellers-grid']);
  }

  /* --------------------------------------------------------------------------
     Catalog Filtering, Sorting & Chips
     -------------------------------------------------------------------------- */
  function syncFilterInputsFromState() {
    if (dom['catalog-search']) dom['catalog-search'].value = state.filters.search;
    if (dom['filter-category']) dom['filter-category'].value = state.filters.category;
    if (dom['filter-price']) dom['filter-price'].value = state.filters.price;
    if (dom['filter-size']) dom['filter-size'].value = state.filters.size;
    if (dom['filter-color']) dom['filter-color'].value = state.filters.color;
    if (dom['filter-availability']) dom['filter-availability'].value = state.filters.availability;
    if (dom['sort-select']) dom['sort-select'].value = state.filters.sort;
  }

  function syncStateFromFilterInputs() {
    if (dom['catalog-search']) state.filters.search = dom['catalog-search'].value.trim();
    if (dom['filter-category']) state.filters.category = dom['filter-category'].value;
    if (dom['filter-price']) state.filters.price = dom['filter-price'].value;
    if (dom['filter-size']) state.filters.size = dom['filter-size'].value;
    if (dom['filter-color']) state.filters.color = dom['filter-color'].value;
    if (dom['filter-availability']) {
      state.filters.availability = dom['filter-availability'].value;
    }
    if (dom['sort-select']) state.filters.sort = dom['sort-select'].value;
  }

  function matchesPriceFilter(price, rangeKey) {
    if (rangeKey === 'all') return true;
    if (rangeKey === '0-75') return price < 75;
    if (rangeKey === '75-150') return price >= 75 && price <= 150;
    if (rangeKey === '150+') return price > 150;
    return true;
  }

  function getFilteredProducts() {
    const f = state.filters;
    const q = f.search.toLowerCase();

    const filtered = getProducts().filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.category} ${p.productType} ${p.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (f.category !== 'All' && f.category !== 'all' && p.category !== f.category) {
        return false;
      }

      if (!matchesPriceFilter(p.price, f.price)) {
        return false;
      }

      if (f.size !== 'all' && !(p.sizes || []).includes(f.size)) {
        return false;
      }

      if (f.color !== 'all' && !(p.colors || []).some((c) => c.name === f.color)) {
        return false;
      }

      if (f.availability === 'in-stock' && !p.inStock) {
        return false;
      }

      return true;
    });

    filtered.sort((a, b) => {
      switch (f.sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'bestsellers':
          return (a.bestSellerRank || 99) - (b.bestSellerRank || 99);
        case 'newest':
        default:
          return (b.createdOrder || 0) - (a.createdOrder || 0);
      }
    });

    return filtered;
  }

  function renderFilterChips() {
    if (!dom['active-filter-chips']) return;
    const f = state.filters;
    const chips = [];

    if (f.search) {
      chips.push({ key: 'search', label: `Search: "${f.search}"` });
    }
    if (f.category !== 'All' && f.category !== 'all') {
      chips.push({ key: 'category', label: `Category: ${f.category}` });
    }
    if (f.price !== 'all') {
      const priceLabels = {
        '0-75': 'Under $75',
        '75-150': '$75 – $150',
        '150+': '$150+'
      };
      chips.push({ key: 'price', label: `Price: ${priceLabels[f.price] || f.price}` });
    }
    if (f.size !== 'all') {
      chips.push({ key: 'size', label: `Size: ${f.size}` });
    }
    if (f.color !== 'all') {
      chips.push({ key: 'color', label: `Color: ${f.color}` });
    }
    if (f.availability !== 'all') {
      chips.push({ key: 'availability', label: 'In Stock Only' });
    }

    dom['active-filter-chips'].innerHTML = chips
      .map(
        (chip) =>
          `<button type="button" class="filter-chip" data-clear-filter="${escapeHtml(
            chip.key
          )}" aria-label="Remove ${escapeHtml(chip.label)} filter">${escapeHtml(
            chip.label
          )} <span aria-hidden="true">&times;</span></button>`
      )
      .join('');
  }

  function renderCatalog() {
    if (!dom['catalog-grid']) return;
    const results = getFilteredProducts();

    if (dom['catalog-results-count']) {
      const count = results.length;
      dom['catalog-results-count'].textContent = `${count} ${
        count === 1 ? 'product' : 'products'
      }`;
    }

    renderFilterChips();

    if (results.length === 0) {
      dom['catalog-grid'].innerHTML = '';
      if (dom['catalog-empty']) dom['catalog-empty'].hidden = false;
    } else {
      if (dom['catalog-empty']) dom['catalog-empty'].hidden = true;
      dom['catalog-grid'].innerHTML = results
        .map((p) => createProductCardHtml(p, { immediateReveal: true }))
        .join('');
    }
  }

  function resetAllFilters({ keepSort = false } = {}) {
    state.filters.search = '';
    state.filters.category = 'All';
    state.filters.price = 'all';
    state.filters.size = 'all';
    state.filters.color = 'all';
    state.filters.availability = 'all';
    if (!keepSort) {
      state.filters.sort = 'newest';
    }
    syncFilterInputsFromState();
    renderCatalog();
  }

  /* --------------------------------------------------------------------------
     Product Details Page (PDP)
     -------------------------------------------------------------------------- */
  function renderPDP(productId) {
    const product = getProductById(productId);
    if (!product) {
      navigateToHomeSection('#home');
      return;
    }

    state.pdp = {
      productId: product.id,
      color: null,
      size: null,
      qty: 1
    };

    if (dom['pdp-breadcrumb']) {
      dom['pdp-breadcrumb'].innerHTML = `
        <a href="#home" data-nav="home">Home</a>
        <span aria-hidden="true">/</span>
        <a href="#catalog" data-nav="${escapeHtml(product.category)}">${escapeHtml(
        product.category
      )}</a>
        <span aria-hidden="true">/</span>
        <span aria-current="page">${escapeHtml(product.name)}</span>
      `;
    }

    const images = Array.isArray(product.images) ? product.images : [];
    if (dom['pdp-main-img']) {
      dom['pdp-main-img'].src = images[0] || '';
      dom['pdp-main-img'].alt = product.name;
    }

    if (dom['pdp-thumbs']) {
      dom['pdp-thumbs'].innerHTML = images
        .map(
          (src, idx) => `
          <button type="button" class="pdp-thumb${idx === 0 ? ' is-active' : ''}" data-pdp-img="${escapeHtml(
            src
          )}" aria-label="View image ${idx + 1} of ${escapeHtml(product.name)}">
            <img src="${escapeHtml(src)}" alt="${escapeHtml(product.name)} view ${idx + 1}">
          </button>
        `
        )
        .join('');
    }

    if (dom['pdp-category']) dom['pdp-category'].textContent = product.category;
    if (dom['pdp-title']) dom['pdp-title'].textContent = product.name;
    if (dom['pdp-price']) dom['pdp-price'].textContent = formatMoney(product.price);

    if (dom['pdp-stock']) {
      dom['pdp-stock'].textContent =
        product.stockStatus || (product.inStock ? 'In Stock — Ready to Ship' : 'Sold Out');
      dom['pdp-stock'].classList.toggle('pdp-stock--sold', !product.inStock);
    }

    if (dom['pdp-description']) dom['pdp-description'].textContent = product.description;

    if (dom['pdp-selected-color']) dom['pdp-selected-color'].textContent = 'Select a color';
    if (dom['pdp-selected-size']) dom['pdp-selected-size'].textContent = 'Select a size';

    if (dom['pdp-colors']) {
      dom['pdp-colors'].innerHTML = (product.colors || [])
        .map((c) => {
          const isLight =
            c.hex.toUpperCase() === '#FFFFFF' || c.hex.toUpperCase() === '#F7F5F1';
          return `<button type="button" class="swatch-btn${
            isLight ? ' swatch-btn--light' : ''
          }" data-pdp-color="${escapeHtml(c.name)}" style="--swatch-color:${escapeHtml(
            c.hex
          )}" aria-label="Select color ${escapeHtml(c.name)}" aria-pressed="false" title="${escapeHtml(
            c.name
          )}"></button>`;
        })
        .join('');
    }

    if (dom['pdp-sizes']) {
      dom['pdp-sizes'].innerHTML = (product.sizes || [])
        .map(
          (s) =>
            `<button type="button" class="size-btn${
              !product.inStock ? ' is-disabled' : ''
            }" data-pdp-size="${escapeHtml(s)}" aria-pressed="false"${
              !product.inStock ? ' disabled' : ''
            }>${escapeHtml(s)}</button>`
        )
        .join('');
    }

    if (dom['pdp-qty-val']) dom['pdp-qty-val'].textContent = '1';

    if (dom['pdp-error']) {
      dom['pdp-error'].textContent = '';
      dom['pdp-error'].hidden = true;
    }

    if (dom['pdp-add-btn']) {
      dom['pdp-add-btn'].disabled = !product.inStock;
      dom['pdp-add-btn'].textContent = product.inStock ? 'Add to Cart' : 'Sold Out';
    }

    syncPdpWishlistButton();

    if (dom['pdp-details-list']) {
      dom['pdp-details-list'].innerHTML = (product.details || [])
        .map((line) => `<li>${escapeHtml(line)}</li>`)
        .join('');
    }

    if (dom['pdp-related-grid']) {
      const allOthers = getProducts().filter((p) => p.id !== product.id);
      const sameCategory = allOthers.filter((p) => p.category === product.category);
      const differentCategory = allOthers.filter((p) => p.category !== product.category);
      const related = [...sameCategory, ...differentCategory].slice(0, 4);
      dom['pdp-related-grid'].innerHTML = related
        .map((p) => createProductCardHtml(p, { immediateReveal: true }))
        .join('');
    }
  }

  function showPdpError(message) {
    if (!dom['pdp-error']) return;
    dom['pdp-error'].textContent = message;
    dom['pdp-error'].hidden = false;
  }

  function clearPdpError() {
    if (!dom['pdp-error']) return;
    dom['pdp-error'].textContent = '';
    dom['pdp-error'].hidden = true;
  }

  function syncPdpWishlistButton() {
    if (!dom['pdp-wishlist-btn'] || !state.pdp.productId) return;
    const isWished = state.wishlist.includes(state.pdp.productId);
    dom['pdp-wishlist-btn'].classList.toggle('is-active', isWished);
    dom['pdp-wishlist-btn'].setAttribute(
      'aria-label',
      isWished ? 'Remove from wishlist' : 'Add to wishlist'
    );
    dom['pdp-wishlist-btn'].setAttribute('aria-pressed', isWished ? 'true' : 'false');
    dom['pdp-wishlist-btn'].innerHTML = heartSvg(isWished);
  }

  /* --------------------------------------------------------------------------
     Shopping Cart
     -------------------------------------------------------------------------- */
  function saveCart() {
    safeStorageSet(STORAGE_KEYS.CART, state.cart);
  }

  function addToCart(productId, color, size, qty = 1) {
    const product = getProductById(productId);
    if (!product || !product.inStock) return false;

    const chosenColor = color || (product.colors && product.colors[0] && product.colors[0].name) || 'Black';
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'One Size';
    const addQty = Math.max(1, Math.min(10, Number(qty) || 1));

    const existing = state.cart.find(
      (item) => item.id === productId && item.color === chosenColor && item.size === chosenSize
    );

    if (existing) {
      existing.qty = Math.min(99, existing.qty + addQty);
    } else {
      state.cart.push({
        id: productId,
        color: chosenColor,
        size: chosenSize,
        qty: addQty
      });
    }

    saveCart();
    renderCart();
    return true;
  }

  function updateCartItemQty(index, delta) {
    const item = state.cart[index];
    if (!item) return;
    const nextQty = item.qty + delta;
    if (nextQty <= 0) {
      state.cart.splice(index, 1);
    } else {
      item.qty = Math.min(99, nextQty);
    }
    saveCart();
    renderCart();
  }

  function removeCartItem(index) {
    if (index < 0 || index >= state.cart.length) return;
    state.cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function calculateCartTotals() {
    let totalCount = 0;
    let subtotal = 0;

    state.cart.forEach((item) => {
      const product = getProductById(item.id);
      if (!product) return;
      totalCount += item.qty;
      subtotal += product.price * item.qty;
    });

    const shipping =
      state.cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING_FEE;
    const total = subtotal + shipping;

    return { totalCount, subtotal, shipping, total };
  }

  function renderCart() {
    const { totalCount, subtotal, shipping, total } = calculateCartTotals();

    if (dom['cart-badge']) {
      dom['cart-badge'].textContent = String(totalCount);
      dom['cart-badge'].hidden = totalCount === 0;
    }

    if (dom['cart-drawer-count']) {
      dom['cart-drawer-count'].textContent = String(totalCount);
    }

    if (dom['cart-shipping-note']) {
      if (state.cart.length === 0) {
        dom['cart-shipping-note'].textContent = `Complimentary express shipping on orders over ${formatMoney(
          FREE_SHIPPING_THRESHOLD
        )}.`;
      } else if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        dom['cart-shipping-note'].textContent =
          "You've unlocked complimentary express shipping.";
      } else {
        const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
        dom['cart-shipping-note'].textContent = `Add ${formatMoney(
          remaining
        )} more for complimentary express shipping.`;
      }
    }

    if (dom['cart-shipping-fill']) {
      const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      dom['cart-shipping-fill'].style.width = `${pct}%`;
    }

    const isEmpty = state.cart.length === 0;
    if (dom['cart-empty-state']) dom['cart-empty-state'].hidden = !isEmpty;
    if (dom['cart-footer']) dom['cart-footer'].hidden = isEmpty;

    if (dom['cart-items-list']) {
      if (isEmpty) {
        dom['cart-items-list'].innerHTML = '';
      } else {
        dom['cart-items-list'].innerHTML = state.cart
          .map((item, idx) => {
            const product = getProductById(item.id);
            if (!product) return '';
            const lineTotal = product.price * item.qty;
            const thumb = (product.images && product.images[0]) || '';
            return `
              <article class="cart-item" data-cart-index="${idx}">
                <a href="#product/${escapeHtml(product.id)}" class="cart-item__img-link" data-cart-product-link>
                  <img src="${escapeHtml(thumb)}" alt="${escapeHtml(product.name)}" class="cart-item__img">
                </a>
                <div class="cart-item__info">
                  <div class="cart-item__top">
                    <a href="#product/${escapeHtml(product.id)}" class="cart-item__title" data-cart-product-link>${escapeHtml(
              product.name
            )}</a>
                    <button type="button" class="icon-btn cart-item__remove" data-cart-remove="${idx}" aria-label="Remove ${escapeHtml(
              product.name
            )}">&times;</button>
                  </div>
                  <p class="cart-item__meta">${escapeHtml(item.color)} · Size ${escapeHtml(
              item.size
            )}</p>
                  <div class="cart-item__bottom">
                    <div class="qty-stepper qty-stepper--sm">
                      <button type="button" data-cart-dec="${idx}" aria-label="Decrease quantity">&minus;</button>
                      <span>${item.qty}</span>
                      <button type="button" data-cart-inc="${idx}" aria-label="Increase quantity">+</button>
                    </div>
                    <div class="cart-item__price">
                      <span class="cart-item__unit">${formatMoney(product.price)} ea</span>
                      <strong class="cart-item__line">${formatMoney(lineTotal)}</strong>
                    </div>
                  </div>
                </div>
              </article>
            `;
          })
          .join('');
      }
    }

    if (dom['cart-subtotal']) dom['cart-subtotal'].textContent = formatMoney(subtotal);
    if (dom['cart-shipping']) {
      dom['cart-shipping'].textContent = shipping === 0 ? 'Complimentary' : formatMoney(shipping);
    }
    if (dom['cart-total']) dom['cart-total'].textContent = formatMoney(total);
  }

  function openCheckoutModal() {
    if (state.cart.length === 0) return;
    const { subtotal, shipping, total } = calculateCartTotals();
    const linesHtml = state.cart
      .map((item) => {
        const product = getProductById(item.id);
        if (!product) return '';
        return `
          <li class="checkout-summary__item">
            <span>${escapeHtml(product.name)} (${escapeHtml(item.color)}, ${escapeHtml(
          item.size
        )}) &times; ${item.qty}</span>
            <strong>${formatMoney(product.price * item.qty)}</strong>
          </li>
        `;
      })
      .join('');

    const html = `
      <div class="modal-copy">
        <p class="checkout-demo-banner"><strong>Frontend Storefront Demo:</strong> RABAR is a static frontend showcase. Real payment processing, inventory reservation, and order management require a backend integration.</p>
        <ul class="checkout-summary__list">${linesHtml}</ul>
        <div class="checkout-summary__totals">
          <div><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div>
          <div><span>Shipping</span><span>${
            shipping === 0 ? 'Complimentary' : formatMoney(shipping)
          }</span></div>
          <div class="checkout-summary__grand"><strong>Total</strong><strong>${formatMoney(
            total
          )}</strong></div>
        </div>
        <div class="checkout-summary__actions">
          <button type="button" class="btn btn--primary" id="modal-demo-confirm-btn">Simulate Order Preview</button>
        </div>
      </div>
    `;

    openModal('Order Summary (Demo)', html);
  }

  /* --------------------------------------------------------------------------
     Wishlist & Account Preferences
     -------------------------------------------------------------------------- */
  function saveWishlist() {
    safeStorageSet(STORAGE_KEYS.WISHLIST, state.wishlist);
  }

  function toggleWishlist(productId) {
    const idx = state.wishlist.indexOf(productId);
    if (idx >= 0) {
      state.wishlist.splice(idx, 1);
    } else {
      state.wishlist.push(productId);
    }
    saveWishlist();
    syncWishlistUI();
  }

  function syncWishlistUI() {
    const count = state.wishlist.length;
    if (dom['wishlist-badge']) {
      dom['wishlist-badge'].textContent = String(count);
      dom['wishlist-badge'].hidden = count === 0;
    }

    document.querySelectorAll('[data-wish-id]').forEach((btn) => {
      const id = btn.getAttribute('data-wish-id');
      const active = state.wishlist.includes(id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      btn.setAttribute('aria-label', active ? 'Remove from wishlist' : 'Add to wishlist');
      btn.innerHTML = heartSvg(active);
    });

    syncPdpWishlistButton();
    renderAccountWishlist();
  }

  function renderAccountWishlist() {
    if (!dom['wishlist-list'] || !dom['wishlist-empty']) return;
    const validProducts = state.wishlist.map(getProductById).filter(Boolean);
    const isEmpty = validProducts.length === 0;
    dom['wishlist-empty'].hidden = !isEmpty;

    if (isEmpty) {
      dom['wishlist-list'].innerHTML = '';
      return;
    }

    dom['wishlist-list'].innerHTML = validProducts
      .map((p) => {
        const thumb = (p.images && p.images[0]) || '';
        return `
          <article class="wishlist-item">
            <a href="#product/${escapeHtml(p.id)}" class="wishlist-item__img-link" data-wishlist-view>
              <img src="${escapeHtml(thumb)}" alt="${escapeHtml(p.name)}" class="wishlist-item__img">
            </a>
            <div class="wishlist-item__info">
              <a href="#product/${escapeHtml(p.id)}" class="wishlist-item__title" data-wishlist-view>${escapeHtml(
          p.name
        )}</a>
              <p class="wishlist-item__price">${formatMoney(p.price)}</p>
              <div class="wishlist-item__actions">
                <a href="#product/${escapeHtml(p.id)}" class="text-link" data-wishlist-view>View</a>
                <button type="button" class="text-link" data-wish-remove="${escapeHtml(
                  p.id
                )}">Remove</button>
              </div>
            </div>
          </article>
        `;
      })
      .join('');
  }

  function syncPrefsInputs() {
    if (dom['prefs-size']) dom['prefs-size'].value = state.prefs.size || '';
    if (dom['prefs-fit']) dom['prefs-fit'].value = state.prefs.fit || 'Regular';
  }

  function savePrefsFromInputs() {
    state.prefs = {
      size: dom['prefs-size'] ? dom['prefs-size'].value : state.prefs.size,
      fit: dom['prefs-fit'] ? dom['prefs-fit'].value : state.prefs.fit
    };
    safeStorageSet(STORAGE_KEYS.PREFS, state.prefs);
  }

  /* --------------------------------------------------------------------------
     Search Overlay
     -------------------------------------------------------------------------- */
  function renderSearchLiveResults(query) {
    if (!dom['search-live-results']) return;
    const q = (query || '').trim().toLowerCase();
    const products = getProducts();
    const matches = q
      ? products.filter((p) => {
          const hay = `${p.name} ${p.category} ${p.productType} ${p.description}`.toLowerCase();
          return hay.includes(q);
        })
      : products.slice(0, 4);

    if (matches.length === 0) {
      dom['search-live-results'].innerHTML =
        '<p class="search-empty">No matching pieces found. Try "linen", "sneakers", or "polo".</p>';
      return;
    }

    dom['search-live-results'].innerHTML = matches
      .slice(0, 6)
      .map((p) => {
        const thumb = (p.images && p.images[0]) || '';
        return `
          <a href="#product/${escapeHtml(p.id)}" class="search-result-card" data-search-result-link>
            <img src="${escapeHtml(thumb)}" alt="${escapeHtml(p.name)}" loading="lazy">
            <div class="search-result-card__info">
              <span class="search-result-card__cat">${escapeHtml(p.category)}</span>
              <strong class="search-result-card__name">${escapeHtml(p.name)}</strong>
              <span class="search-result-card__price">${formatMoney(p.price)}</span>
            </div>
          </a>
        `;
      })
      .join('');
  }

  /* --------------------------------------------------------------------------
     Newsletter
     -------------------------------------------------------------------------- */
  function handleNewsletterSubmit(event) {
    event.preventDefault();
    if (!dom['newsletter-email'] || !dom['newsletter-msg']) return;

    const email = dom['newsletter-email'].value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    dom['newsletter-msg'].classList.remove('form-msg--error', 'form-msg--success');

    if (!email || !emailRegex.test(email)) {
      dom['newsletter-msg'].textContent = 'Please enter a valid email address.';
      dom['newsletter-msg'].classList.add('form-msg--error');
      dom['newsletter-email'].focus();
      return;
    }

    state.newsletterEmail = email;
    safeStorageSet(STORAGE_KEYS.NEWSLETTER, email);
    dom['newsletter-msg'].textContent = `Thank you — ${email} is subscribed to RABAR updates.`;
    dom['newsletter-msg'].classList.add('form-msg--success');
    dom['newsletter-email'].value = '';
  }

  /* --------------------------------------------------------------------------
     Routing & Navigation
     -------------------------------------------------------------------------- */
  function navigateToHash(hash) {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      handleHashChange();
    }
  }

  function navigateToHomeSection(sectionHash) {
    if (dom['home-view']) dom['home-view'].hidden = false;
    if (dom['pdp-view']) dom['pdp-view'].hidden = true;

    if (!sectionHash || sectionHash === '#home' || sectionHash === '#') {
      smoothScrollToTop();
      return;
    }

    const targetId = sectionHash.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      window.requestAnimationFrame(() => smoothScrollToElement(targetEl));
    }
  }

  function handleHashChange() {
    const hash = window.location.hash || '#home';
    state.lastHash = hash;

    if (hash.startsWith('#product/')) {
      const productId = decodeURIComponent(hash.slice('#product/'.length));
      if (dom['home-view']) dom['home-view'].hidden = true;
      if (dom['pdp-view']) dom['pdp-view'].hidden = false;
      renderPDP(productId);
      smoothScrollToTop();
      return;
    }

    navigateToHomeSection(hash);
  }

  function handleDataNav(navValue) {
    closeAllOverlays();

    if (navValue === 'home') {
      resetAllFilters();
      navigateToHash('#home');
      return;
    }

    if (navValue === 'new-arrivals') {
      navigateToHash('#new-arrivals');
      return;
    }

    if (navValue === 'about') {
      navigateToHash('#about');
      return;
    }

    if (CATEGORY_NAV_NAMES.has(navValue)) {
      state.filters.category = navValue;
      syncFilterInputsFromState();
      renderCatalog();
      navigateToHash('#catalog');
      return;
    }

    navigateToHash('#catalog');
  }

  /* --------------------------------------------------------------------------
     Scroll Reveal & Subtle Desktop Parallax / Tilt
     -------------------------------------------------------------------------- */
  function observeReveals(root = document) {
    const elements = Array.from(root.querySelectorAll('.reveal:not(.is-visible)'));
    if (elements.length === 0) return;

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
      );
    }

    elements.forEach((el) => revealObserver.observe(el));
  }

  function initDesktopMotion() {
    const supportsFinePointer =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: fine)').matches &&
      !prefersReducedMotion();

    if (!supportsFinePointer) return;

    if (dom['hero-section'] && dom['hero-img']) {
      let heroRaf = 0;
      let targetX = 0;
      let targetY = 0;

      dom['hero-section'].addEventListener(
        'mousemove',
        (e) => {
          const rect = dom['hero-section'].getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;
          targetX = Math.round(normX * -14 * 100) / 100;
          targetY = Math.round(normY * -10 * 100) / 100;

          if (!heroRaf) {
            heroRaf = window.requestAnimationFrame(() => {
              dom['hero-img'].style.setProperty('--px', `${targetX}px`);
              dom['hero-img'].style.setProperty('--py', `${targetY}px`);
              heroRaf = 0;
            });
          }
        },
        { passive: true }
      );

      dom['hero-section'].addEventListener(
        'mouseleave',
        () => {
          dom['hero-img'].style.setProperty('--px', '0px');
          dom['hero-img'].style.setProperty('--py', '0px');
        },
        { passive: true }
      );
    }

    let cardRaf = 0;
    let activeCard = null;
    let cardX = 0;
    let cardY = 0;

    document.addEventListener(
      'mousemove',
      (e) => {
        const card = e.target.closest('.product-card');
        if (activeCard && activeCard !== card) {
          activeCard.style.setProperty('--mx', '0px');
          activeCard.style.setProperty('--my', '0px');
          activeCard = null;
        }
        if (!card) return;
        activeCard = card;
        const rect = card.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        cardX = Math.round(nx * -6 * 100) / 100;
        cardY = Math.round(ny * -6 * 100) / 100;

        if (!cardRaf) {
          cardRaf = window.requestAnimationFrame(() => {
            if (activeCard) {
              activeCard.style.setProperty('--mx', `${cardX}px`);
              activeCard.style.setProperty('--my', `${cardY}px`);
            }
            cardRaf = 0;
          });
        }
      },
      { passive: true }
    );
  }

  /* --------------------------------------------------------------------------
     Event Binding
     -------------------------------------------------------------------------- */
  function bindEvents() {
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);

    // Header & drawer triggers
    if (dom['mobile-menu-btn']) {
      dom['mobile-menu-btn'].addEventListener('click', () =>
        openDrawer(dom['mobile-menu-drawer'], dom['mobile-menu-btn'])
      );
    }
    if (dom['mobile-menu-close-btn']) {
      dom['mobile-menu-close-btn'].addEventListener('click', closeAllOverlays);
    }

    if (dom['search-open-btn']) {
      dom['search-open-btn'].addEventListener('click', () => {
        openDrawer(dom['search-drawer']);
        renderSearchLiveResults(dom['search-input'] ? dom['search-input'].value : '');
        if (dom['search-input']) {
          window.setTimeout(() => dom['search-input'].focus(), 60);
        }
      });
    }
    if (dom['search-close-btn']) {
      dom['search-close-btn'].addEventListener('click', closeAllOverlays);
    }

    if (dom['cart-open-btn']) {
      dom['cart-open-btn'].addEventListener('click', () => openDrawer(dom['cart-drawer']));
    }
    if (dom['cart-close-btn']) {
      dom['cart-close-btn'].addEventListener('click', closeAllOverlays);
    }

    if (dom['account-open-btn']) {
      dom['account-open-btn'].addEventListener('click', () => {
        renderAccountWishlist();
        openDrawer(dom['account-drawer']);
      });
    }
    if (dom['account-close-btn']) {
      dom['account-close-btn'].addEventListener('click', closeAllOverlays);
    }

    if (dom['modal-close-btn']) {
      dom['modal-close-btn'].addEventListener('click', closeAllOverlays);
    }
    if (dom['overlay-backdrop']) {
      dom['overlay-backdrop'].addEventListener('click', closeAllOverlays);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllOverlays();
      }
    });

    // Search live input & View All
    if (dom['search-input']) {
      dom['search-input'].addEventListener('input', (e) => {
        renderSearchLiveResults(e.target.value);
      });
    }

    if (dom['search-view-all-btn']) {
      dom['search-view-all-btn'].addEventListener('click', () => {
        const q = dom['search-input'] ? dom['search-input'].value.trim() : '';
        state.filters.search = q;
        syncFilterInputsFromState();
        renderCatalog();
        closeAllOverlays();
        navigateToHash('#catalog');
      });
    }

    // Best Sellers View All button
    if (dom['view-all-bestsellers-btn']) {
      dom['view-all-bestsellers-btn'].addEventListener('click', () => {
        state.filters.category = 'All';
        state.filters.sort = 'bestsellers';
        syncFilterInputsFromState();
        renderCatalog();
        navigateToHash('#catalog');
      });
    }

    // Hero Shop Now
    if (dom['hero-shop-btn']) {
      dom['hero-shop-btn'].addEventListener('click', (e) => {
        e.preventDefault();
        navigateToHash('#catalog');
      });
    }

    // Catalog filters & sorting
    const filterInputs = [
      dom['catalog-search'],
      dom['filter-category'],
      dom['filter-price'],
      dom['filter-size'],
      dom['filter-color'],
      dom['filter-availability'],
      dom['sort-select']
    ];
    filterInputs.forEach((inputEl) => {
      if (!inputEl) return;
      const evt = inputEl.tagName === 'INPUT' ? 'input' : 'change';
      inputEl.addEventListener(evt, () => {
        syncStateFromFilterInputs();
        renderCatalog();
      });
    });

    if (dom['filter-reset-btn']) {
      dom['filter-reset-btn'].addEventListener('click', () => resetAllFilters());
    }
    if (dom['empty-reset-btn']) {
      dom['empty-reset-btn'].addEventListener('click', () => resetAllFilters());
    }

    // Mobile filter drawer controls
    if (dom['mobile-filter-open-btn']) {
      dom['mobile-filter-open-btn'].addEventListener('click', openMobileFilters);
    }
    if (dom['mobile-filter-close-btn']) {
      dom['mobile-filter-close-btn'].addEventListener('click', closeAllOverlays);
    }
    if (dom['mobile-filter-apply-btn']) {
      dom['mobile-filter-apply-btn'].addEventListener('click', closeAllOverlays);
    }

    // PDP actions
    if (dom['pdp-back-btn']) {
      dom['pdp-back-btn'].addEventListener('click', () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          navigateToHash('#catalog');
        }
      });
    }

    if (dom['pdp-qty-minus']) {
      dom['pdp-qty-minus'].addEventListener('click', () => {
        state.pdp.qty = Math.max(1, state.pdp.qty - 1);
        if (dom['pdp-qty-val']) dom['pdp-qty-val'].textContent = String(state.pdp.qty);
      });
    }

    if (dom['pdp-qty-plus']) {
      dom['pdp-qty-plus'].addEventListener('click', () => {
        state.pdp.qty = Math.min(10, state.pdp.qty + 1);
        if (dom['pdp-qty-val']) dom['pdp-qty-val'].textContent = String(state.pdp.qty);
      });
    }

    if (dom['pdp-size-guide-btn']) {
      dom['pdp-size-guide-btn'].addEventListener('click', () => openInfoModal('size-guide'));
    }

    if (dom['pdp-wishlist-btn']) {
      dom['pdp-wishlist-btn'].addEventListener('click', () => {
        if (state.pdp.productId) {
          toggleWishlist(state.pdp.productId);
        }
      });
    }

    if (dom['pdp-add-btn']) {
      dom['pdp-add-btn'].addEventListener('click', () => {
        const product = getProductById(state.pdp.productId);
        if (!product) return;
        if (!product.inStock) {
          showPdpError('This item is currently sold out.');
          return;
        }
        if (!state.pdp.color && !state.pdp.size) {
          showPdpError('Please select a color and size before adding to bag.');
          return;
        }
        if (!state.pdp.color) {
          showPdpError('Please select a color before adding to bag.');
          return;
        }
        if (!state.pdp.size) {
          showPdpError('Please select a size before adding to bag.');
          return;
        }

        clearPdpError();
        if (addToCart(product.id, state.pdp.color, state.pdp.size, state.pdp.qty)) {
          openDrawer(dom['cart-drawer']);
        }
      });
    }

    // Cart continue & checkout
    if (dom['cart-continue-btn']) {
      dom['cart-continue-btn'].addEventListener('click', () => {
        closeAllOverlays();
        navigateToHash('#catalog');
      });
    }

    if (dom['cart-checkout-btn']) {
      dom['cart-checkout-btn'].addEventListener('click', openCheckoutModal);
    }

    // Newsletter & Preferences
    if (dom['newsletter-form']) {
      dom['newsletter-form'].addEventListener('submit', handleNewsletterSubmit);
    }

    if (dom['prefs-size']) {
      dom['prefs-size'].addEventListener('change', savePrefsFromInputs);
    }
    if (dom['prefs-fit']) {
      dom['prefs-fit'].addEventListener('change', savePrefsFromInputs);
    }

    // Delegated document clicks
    document.addEventListener('click', (e) => {
      // [data-nav] links
      const navTrigger = e.target.closest('[data-nav]');
      if (navTrigger) {
        e.preventDefault();
        handleDataNav(navTrigger.getAttribute('data-nav'));
        return;
      }

      // Mobile menu auxiliary drawer triggers
      const openDrawerTrigger = e.target.closest('[data-open-drawer]');
      if (openDrawerTrigger) {
        e.preventDefault();
        const target = openDrawerTrigger.getAttribute('data-open-drawer');
        if (target === 'search' && dom['search-open-btn']) {
          dom['search-open-btn'].click();
        } else if (target === 'account' && dom['account-open-btn']) {
          dom['account-open-btn'].click();
        } else if (target === 'cart' && dom['cart-open-btn']) {
          dom['cart-open-btn'].click();
        }
        return;
      }

      // Universal modal triggers
      const modalTrigger = e.target.closest('[data-modal]');
      if (modalTrigger) {
        e.preventDefault();
        openInfoModal(modalTrigger.getAttribute('data-modal'), modalTrigger);
        return;
      }

      // Demo checkout confirm button inside modal
      if (e.target.id === 'modal-demo-confirm-btn') {
        const body = dom['modal-body'];
        if (body) {
          body.innerHTML = `
            <div class="modal-copy">
              <p><strong>Demo Order Preview Recorded</strong></p>
              <p>Thank you for exploring the RABAR storefront. Because this is a static frontend demo without a backend server, no payment was charged and no real order was placed.</p>
              <button type="button" class="btn btn--primary" id="modal-demo-done-btn">Return to Storefront</button>
            </div>
          `;
        }
        return;
      }

      if (e.target.id === 'modal-demo-done-btn') {
        closeAllOverlays();
        return;
      }

      // Search suggestion chips
      const searchChip = e.target.closest('[data-search-term]');
      if (searchChip && dom['search-input']) {
        const term = searchChip.getAttribute('data-search-term') || '';
        dom['search-input'].value = term;
        renderSearchLiveResults(term);
        dom['search-input'].focus();
        return;
      }

      // Search result click closes overlay
      if (e.target.closest('[data-search-result-link]')) {
        closeAllOverlays();
        return;
      }

      // Wishlist card button
      const wishBtn = e.target.closest('[data-wish-id]');
      if (wishBtn) {
        e.preventDefault();
        toggleWishlist(wishBtn.getAttribute('data-wish-id'));
        return;
      }

      // Wishlist drawer remove or view
      const wishRemove = e.target.closest('[data-wish-remove]');
      if (wishRemove) {
        toggleWishlist(wishRemove.getAttribute('data-wish-remove'));
        return;
      }

      if (e.target.closest('[data-wishlist-view]')) {
        closeAllOverlays();
        return;
      }

      // Product card swatch selection
      const cardSwatch = e.target.closest('[data-card-swatch]');
      if (cardSwatch) {
        e.preventDefault();
        const pid = cardSwatch.getAttribute('data-card-swatch');
        const colorName = cardSwatch.getAttribute('data-color-name');
        state.cardColors.set(pid, colorName);
        const group = cardSwatch.closest('.product-card__swatches');
        if (group) {
          group.querySelectorAll('.swatch-dot').forEach((dot) => {
            const active = dot === cardSwatch;
            dot.classList.toggle('is-active', active);
            dot.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
        }
        return;
      }

      // Product card Quick Add toggle
      const quickToggle = e.target.closest('[data-quick-toggle]');
      if (quickToggle) {
        e.preventDefault();
        const pid = quickToggle.getAttribute('data-quick-toggle');
        const card = quickToggle.closest('.product-card');
        const quickBox = quickToggle.closest('.product-card__quick');
        const panel = card ? card.querySelector(`[data-quick-panel="${pid}"]`) : null;
        if (!panel) return;
        const willOpen = panel.hidden;

        // Close any other open quick panels
        document.querySelectorAll('[data-quick-panel]').forEach((otherPanel) => {
          if (otherPanel !== panel) {
            otherPanel.hidden = true;
            const otherCard = otherPanel.closest('.product-card');
            const otherBox = otherPanel.closest('.product-card__quick');
            if (otherCard) otherCard.classList.remove('is-quick-open');
            if (otherBox) otherBox.classList.remove('is-open');
            const otherBtn = otherCard
              ? otherCard.querySelector('[data-quick-toggle]')
              : null;
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        panel.hidden = !willOpen;
        quickToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (card) card.classList.toggle('is-quick-open', willOpen);
        if (quickBox) quickBox.classList.toggle('is-open', willOpen);
        return;
      }

      // Product card Quick Add size selection
      const quickSizeBtn = e.target.closest('[data-quick-add-id]');
      if (quickSizeBtn) {
        e.preventDefault();
        const pid = quickSizeBtn.getAttribute('data-quick-add-id');
        const size = quickSizeBtn.getAttribute('data-quick-add-size');
        const product = getProductById(pid);
        if (!product) return;
        const color = getCardActiveColor(product);
        const panel = quickSizeBtn.closest('[data-quick-panel]');
        const quickBox = quickSizeBtn.closest('.product-card__quick');
        const card = quickSizeBtn.closest('.product-card');
        if (panel) panel.hidden = true;
        if (quickBox) quickBox.classList.remove('is-open');
        if (card) {
          card.classList.remove('is-quick-open');
          const toggleBtn = card.querySelector('[data-quick-toggle]');
          if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        }
        if (addToCart(pid, color, size, 1)) {
          openDrawer(dom['cart-drawer']);
        }
        return;
      }

      // Filter chip removal
      const clearChip = e.target.closest('[data-clear-filter]');
      if (clearChip) {
        const key = clearChip.getAttribute('data-clear-filter');
        if (key === 'search') state.filters.search = '';
        if (key === 'category') state.filters.category = 'All';
        if (key === 'price') state.filters.price = 'all';
        if (key === 'size') state.filters.size = 'all';
        if (key === 'color') state.filters.color = 'all';
        if (key === 'availability') state.filters.availability = 'all';
        syncFilterInputsFromState();
        renderCatalog();
        return;
      }

      // PDP thumbnail click
      const thumbBtn = e.target.closest('[data-pdp-img]');
      if (thumbBtn) {
        const src = thumbBtn.getAttribute('data-pdp-img');
        if (dom['pdp-main-img'] && src) {
          dom['pdp-main-img'].src = src;
        }
        if (dom['pdp-thumbs']) {
          dom['pdp-thumbs'].querySelectorAll('.pdp-thumb').forEach((btn) => {
            btn.classList.toggle('is-active', btn === thumbBtn);
          });
        }
        return;
      }

      // PDP color selection
      const pdpColorBtn = e.target.closest('[data-pdp-color]');
      if (pdpColorBtn) {
        const color = pdpColorBtn.getAttribute('data-pdp-color');
        state.pdp.color = color;
        if (dom['pdp-selected-color']) dom['pdp-selected-color'].textContent = color;
        if (dom['pdp-colors']) {
          dom['pdp-colors'].querySelectorAll('.swatch-btn').forEach((btn) => {
            const active = btn === pdpColorBtn;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
        }
        clearPdpError();
        return;
      }

      // PDP size selection
      const pdpSizeBtn = e.target.closest('[data-pdp-size]');
      if (pdpSizeBtn && !pdpSizeBtn.disabled) {
        const size = pdpSizeBtn.getAttribute('data-pdp-size');
        state.pdp.size = size;
        if (dom['pdp-selected-size']) dom['pdp-selected-size'].textContent = size;
        if (dom['pdp-sizes']) {
          dom['pdp-sizes'].querySelectorAll('.size-btn').forEach((btn) => {
            const active = btn === pdpSizeBtn;
            btn.classList.toggle('is-active', active);
            btn.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
        }
        clearPdpError();
        return;
      }

      // Cart item controls
      const cartDec = e.target.closest('[data-cart-dec]');
      if (cartDec) {
        updateCartItemQty(Number(cartDec.getAttribute('data-cart-dec')), -1);
        return;
      }

      const cartInc = e.target.closest('[data-cart-inc]');
      if (cartInc) {
        updateCartItemQty(Number(cartInc.getAttribute('data-cart-inc')), 1);
        return;
      }

      const cartRemove = e.target.closest('[data-cart-remove]');
      if (cartRemove) {
        removeCartItem(Number(cartRemove.getAttribute('data-cart-remove')));
        return;
      }

      if (e.target.closest('[data-cart-product-link]')) {
        closeAllOverlays();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Bootstrap
     -------------------------------------------------------------------------- */
  function init() {
    cacheDom();
    initLoader();
    loadPersistedState();
    updateHeaderScroll();

    renderCategories();
    renderNewArrivals();
    renderBestSellers();
    syncFilterInputsFromState();
    renderCatalog();
    renderCart();
    syncPrefsInputs();
    syncWishlistUI();

    observeReveals(document);
    bindEvents();
    initDesktopMotion();
    handleHashChange();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
