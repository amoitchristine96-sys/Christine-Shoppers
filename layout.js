/** Shared header, top bar & footer for inner pages */
(function () {
  const page = document.body.dataset.nav || document.body.id || '';

  const isActive = (key) => (page === key ? ' active' : '');

  const topBar = `
  <div class="top-bar">
    <div class="container d-flex justify-content-between align-items-center flex-wrap gap-2">
      <div class="d-flex align-items-center gap-2">
        <i class="fa-solid fa-location-dot text-warning"></i>
        <span>Deliver to <strong>Uganda</strong></span>
        <select class="form-select form-select-sm" aria-label="Language" style="width:auto;">
          <option value="en" selected>EN</option>
          <option value="sw">SW</option>
        </select>
        <select class="form-select form-select-sm" aria-label="Currency" style="width:auto;">
          <option value="UGX" selected>UGX</option>
          <option value="USD">USD</option>
        </select>
      </div>
      <div class="d-flex align-items-center gap-3">
        <a href="login.html"><i class="fa-solid fa-user me-1"></i> Sign In</a>
        <a href="#"><i class="fa-solid fa-heart me-1"></i> Wishlist</a>
        <a href="contact.html"><i class="fa-solid fa-headset me-1"></i> Help</a>
      </div>
    </div>
  </div>`;

  const header = `
  <header class="site-header sticky-top">
    <div class="container d-flex align-items-center gap-3 flex-wrap">
      <a href="index.html" class="navbar-brand">Christine <span>Shoppers</span></a>
      <button class="btn-icon mobile-nav-toggle" id="mobileNavToggle" type="button" aria-label="Open menu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <nav class="d-none d-lg-block flex-shrink-0">
        <ul class="nav mb-0">
          <li class="nav-item"><a class="nav-link${isActive('home')}" href="index.html">Home</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle${isActive('products')}" href="#" data-bs-toggle="dropdown">Products</a>
            <ul class="dropdown-menu shadow border-0 rounded-3">
              <li><a class="dropdown-item" href="products.html?category=Electronics">Electronics</a></li>
              <li><a class="dropdown-item" href="products.html?category=Fashion">Fashion</a></li>
              <li><a class="dropdown-item" href="products.html?category=Home">Home &amp; Kitchen</a></li>
              <li><a class="dropdown-item" href="products.html?category=Beauty">Beauty</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link${isActive('about')}" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link${isActive('contact')}" href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <form class="search-wrap d-flex" role="search">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input class="form-control" type="search" placeholder="Search products…" aria-label="Search" />
        <button class="btn btn-primary btn-search" type="submit">Search</button>
      </form>
      <div class="header-actions ms-lg-auto">
        <a href="user.html" class="btn-icon d-none d-md-inline-flex" aria-label="My account"><i class="fa-solid fa-user"></i></a>
        <a href="cart.html" class="btn-icon" aria-label="Cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cartCount">0</span>
        </a>
        <button class="btn-icon" id="themeToggle" type="button" aria-label="Toggle dark mode"><i class="fa-solid fa-moon"></i></button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobileNav">
      <div class="container">
        <a class="nav-link" href="index.html">Home</a>
        <a class="nav-link" href="products.html">Products</a>
        <a class="nav-link" href="about.html">About</a>
        <a class="nav-link" href="contact.html">Contact</a>
        <a class="nav-link" href="user.html">My Account</a>
        <a class="nav-link" href="cart.html">Cart</a>
      </div>
    </nav>
  </header>`;

  const footer = `
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-md-4">
          <a href="index.html" class="footer-brand">Christine <span>Shoppers</span></a>
          <p class="small mb-3">Uganda's trusted online marketplace for electronics, fashion, beauty and home essentials.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
            <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="col-6 col-md-2">
          <h6>Shop</h6>
          <a href="products.html">All Products</a>
          <a href="products.html?category=Electronics">Electronics</a>
          <a href="products.html?category=Fashion">Fashion</a>
          <a href="products.html?category=Beauty">Beauty</a>
        </div>
        <div class="col-6 col-md-2">
          <h6>Account</h6>
          <a href="login.html">Sign In</a>
          <a href="user.html">My Account</a>
          <a href="cart.html">Cart</a>
          <a href="checkout.html">Checkout</a>
        </div>
        <div class="col-6 col-md-2">
          <h6>Company</h6>
          <a href="about.html">About Us</a>
          <a href="contact.html">Contact</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div class="col-6 col-md-2">
          <h6>Support</h6>
          <a href="contact.html">Help Center</a>
          <a href="#">Returns</a>
          <a href="#">Shipping Info</a>
          <a href="#">Track Order</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="mb-0">© 2026 Christine Shoppers – All rights reserved. Shop smart across Uganda.</p>
      </div>
    </div>
  </footer>`;

  const topEl = document.getElementById('site-topbar');
  const headerEl = document.getElementById('site-header');
  const footerEl = document.getElementById('site-footer');

  if (topEl) topEl.innerHTML = topBar;
  if (headerEl) headerEl.innerHTML = header;
  if (footerEl) footerEl.innerHTML = footer;
})();
