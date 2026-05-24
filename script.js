document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.replace('.html', '').replace('/', '') || 'home';
  document.body.id = page;

  const cartCountEl = document.getElementById('cartCount');
  const themeToggle = document.getElementById('themeToggle');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileNav = document.getElementById('mobileNav');

  let count = JSON.parse(localStorage.getItem('cart') || '[]').length;
  if (cartCountEl) cartCountEl.textContent = count;

  /* ── Product rendering ── */
  const formatPrice = (n) => `UGX ${n.toLocaleString('en-UG')}`;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
    if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
    for (let i = full + (half ? 1 : 0); i < 5; i++) html += '<i class="fa-regular fa-star"></i>';
    return html;
  };

  const buildProductCard = (p) => {
    const badgeClass = p.badge === 'New' ? 'badge-new' : 'badge badge-deal';
    const badgeHtml = p.badge ? `<span class="${badgeClass}">${p.badge}</span>` : '';
    const oldPriceHtml = p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice).replace('UGX ', '')}</span>` : '';

    return `
      <div class="col-6 col-lg-4 col-xl-3" data-category="${p.category}">
        <div class="product-card card">
          <div class="card-img-wrap">
            ${badgeHtml}
            <img src="${p.image}" class="card-img-top" alt="${p.name}" loading="lazy" />
          </div>
          <div class="card-body">
            <span class="card-category">${p.category === 'Home' ? 'Home & Kitchen' : p.category}</span>
            <h5 class="card-title">${p.name}</h5>
            <p class="card-price">${formatPrice(p.price)} ${oldPriceHtml}</p>
            <div class="rating">${renderStars(p.rating)} <small>(${p.reviews})</small></div>
            <button class="btn btn-primary add-to-cart" type="button"><i class="fa-solid fa-cart-plus me-1"></i> Add to Cart</button>
          </div>
        </div>
      </div>`;
  };

  const renderProductGrid = () => {
    const grid = document.getElementById('productGrid');
    if (!grid || typeof SHOP_PRODUCTS === 'undefined') return;

    let list = SHOP_PRODUCTS.slice();
    const featuredOnly = grid.dataset.featured === 'true';
    if (featuredOnly) list = list.filter((p) => p.featured);

    const urlCat = new URLSearchParams(location.search).get('category');
    if (urlCat) list = list.filter((p) => p.category === urlCat);

    grid.innerHTML = list.map(buildProductCard).join('');
  };

  renderProductGrid();

  /* ── Cart ── */
  const addToCart = (title, price, btn) => {
    count++;
    if (cartCountEl) cartCountEl.textContent = count;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    if (btn) {
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 600);
    }
    updateStickyBar(count);
  };

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const card = btn.closest('.product-card, .card');
    const titleEl = card?.querySelector('.card-title');
    const priceEl = card?.querySelector('.card-price');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const priceText = priceEl ? priceEl.textContent.replace(/[^0-9]/g, '') : '0';
    const price = parseInt(priceText, 10) || 0;
    addToCart(title, price, btn);
  });

  /* ── Category filters ── */
  const filterInputs = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');

  const applyFilters = () => {
    const active = [...filterInputs].filter((i) => i.checked).map((i) => i.value);
    document.querySelectorAll('[data-category]').forEach((col) => {
      const show = active.length === 0 || active.includes(col.dataset.category);
      col.classList.toggle('d-none', !show);
    });
  };

  filterInputs.forEach((input) => input.addEventListener('change', applyFilters));

  const urlCat = new URLSearchParams(location.search).get('category');
  if (urlCat && filterInputs.length) {
    filterInputs.forEach((input) => {
      input.checked = input.value === urlCat;
    });
    applyFilters();
  }

  /* ── Theme ── */
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    const saved = localStorage.getItem('eshop-theme');
    if (saved === 'dark') {
      document.body.classList.add('theme-dark');
      if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-dark');
      const dark = document.body.classList.contains('theme-dark');
      localStorage.setItem('eshop-theme', dark ? 'dark' : 'light');
      if (icon) {
        icon.classList.toggle('fa-moon', !dark);
        icon.classList.toggle('fa-sun', dark);
      }
    });
  }

  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener('click', () => mobileNav.classList.toggle('open'));
  }

  const searchForm = document.querySelector('.search-wrap, header form[role="search"]');
  if (searchForm) searchForm.addEventListener('submit', (e) => e.preventDefault());

  /* ── Quick view ── */
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.product-grid .product-card, .product-grid .card');
    if (!card || e.target.closest('.add-to-cart')) return;

    const modalEl = document.getElementById('quickViewModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    const titleEl = card.querySelector('.card-title');
    const priceEl = card.querySelector('.card-price, .card-text.text-success');
    const imgEl = card.querySelector('.card-img-top');

    document.getElementById('quickViewTitle').textContent = titleEl?.textContent ?? '';
    document.getElementById('quickViewPrice').textContent = priceEl?.textContent ?? '';
    const modalImg = document.getElementById('quickViewImg');
    modalImg.src = imgEl?.src ?? '';
    modalImg.alt = titleEl?.textContent ?? '';

    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();

    const modalAddBtn = document.getElementById('quickViewAddBtn');
    const addBtn = card.querySelector('.add-to-cart');
    if (modalAddBtn && addBtn) {
      modalAddBtn.onclick = () => { addBtn.click(); modal.hide(); };
    }
  });

  /* ── Search autocomplete ── */
  const searchInput = document.querySelector('.search-wrap input[type="search"], header input[type="search"]');
  if (searchInput && typeof SHOP_PRODUCTS !== 'undefined') {
    const productTitles = SHOP_PRODUCTS.map((p) => p.name);
    const autocompleteBox = document.createElement('div');
    autocompleteBox.className = 'autocomplete-box position-absolute bg-white border rounded w-100';
    autocompleteBox.style.maxHeight = '200px';
    autocompleteBox.style.overflowY = 'auto';
    autocompleteBox.style.display = 'none';
    searchInput.parentElement.style.position = 'relative';
    searchInput.parentElement.appendChild(autocompleteBox);

    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      autocompleteBox.innerHTML = '';
      if (!term) { autocompleteBox.style.display = 'none'; return; }
      const matches = productTitles.filter((t) => t.toLowerCase().includes(term)).slice(0, 5);
      matches.forEach((m) => {
        const item = document.createElement('div');
        item.textContent = m;
        item.className = 'p-2 suggestion-item';
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
          searchInput.value = m;
          autocompleteBox.style.display = 'none';
          document.querySelectorAll('[data-category]').forEach((col) => {
            const title = col.querySelector('.card-title')?.textContent.trim();
            col.classList.toggle('d-none', title !== m);
          });
        });
        autocompleteBox.appendChild(item);
      });
      autocompleteBox.style.display = matches.length ? 'block' : 'none';
    });
    searchInput.addEventListener('blur', () => setTimeout(() => { autocompleteBox.style.display = 'none'; }, 200));
  }

  /* ── Sticky cart bar ── */
  const stickyBar = document.createElement('div');
  stickyBar.id = 'stickyCartBar';
  stickyBar.className = 'position-fixed bottom-0 end-0 m-4 p-3 bg-primary text-white rounded shadow';
  stickyBar.style.display = 'none';
  stickyBar.innerHTML = '<i class="fa-solid fa-cart-shopping me-2"></i>Cart: <span id="stickyCartCount">0</span>';
  stickyBar.addEventListener('click', () => { window.location.href = 'cart.html'; });
  document.body.appendChild(stickyBar);

  function updateStickyBar(n) {
    const el = document.getElementById('stickyCartCount');
    if (el) el.textContent = n;
    stickyBar.style.display = n > 0 ? 'flex' : 'none';
  }
  updateStickyBar(count);

  if (cartCountEl) {
    const observer = new MutationObserver(() => {
      updateStickyBar(parseInt(cartCountEl.textContent, 10) || 0);
    });
    observer.observe(cartCountEl, { childList: true, characterData: true, subtree: true });
  }
});
