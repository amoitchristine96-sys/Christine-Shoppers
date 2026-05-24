/** Page-specific behaviour: cart, checkout, forms */
document.addEventListener('DOMContentLoaded', () => {
  const formatPrice = (n) => `UGX ${n.toLocaleString('en-UG')}`;

  const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

  /* ── Shopping cart page ── */
  if (document.getElementById('cartItems')) {
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const cart = getCart();

    const renderCart = () => {
      const items = getCart();
      if (!items.length) {
        cartItemsEl.innerHTML = `
          <div class="empty-state text-center py-5">
            <i class="fa-solid fa-cart-shopping fa-3x text-muted mb-3"></i>
            <h4>Your cart is empty</h4>
            <p class="text-muted">Browse our electronics, fashion and beauty deals.</p>
            <a href="products.html" class="btn btn-primary mt-2">Start Shopping</a>
          </div>`;
        cartTotalEl.textContent = 'Total: UGX 0';
        return;
      }

      const total = items.reduce((sum, i) => sum + (i.price || 0), 0);
      const grouped = items.reduce((acc, item, idx) => {
        const key = item.title;
        if (!acc[key]) acc[key] = { ...item, qty: 0, indices: [] };
        acc[key].qty += 1;
        acc[key].indices.push(idx);
        return acc;
      }, {});

      cartItemsEl.innerHTML = Object.values(grouped).map((item) => `
        <div class="cart-item content-card mb-3">
          <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
              <h5 class="mb-1">${item.title}</h5>
              <p class="text-muted mb-0 small">Qty: ${item.qty} × ${formatPrice(item.price)}</p>
            </div>
            <div class="text-end">
              <p class="card-price mb-2">${formatPrice(item.price * item.qty)}</p>
              <button type="button" class="btn btn-sm btn-outline-danger remove-cart-item" data-title="${item.title.replace(/"/g, '&quot;')}">
                <i class="fa-solid fa-trash-can"></i> Remove
              </button>
            </div>
          </div>
        </div>`).join('');

      cartTotalEl.textContent = `Total: ${formatPrice(total)}`;

      cartItemsEl.querySelectorAll('.remove-cart-item').forEach((btn) => {
        btn.addEventListener('click', () => {
          const title = btn.dataset.title;
          const updated = getCart().filter((i) => i.title !== title);
          localStorage.setItem('cart', JSON.stringify(updated));
          const countEl = document.getElementById('cartCount');
          if (countEl) countEl.textContent = updated.length;
          renderCart();
        });
      });
    };

    renderCart();
  }

  /* ── Checkout page ── */
  if (document.getElementById('orderItems')) {
    const orderItemsEl = document.getElementById('orderItems');
    const orderTotalEl = document.getElementById('orderTotal');
    const cart = getCart();

    if (!cart.length) {
      orderItemsEl.innerHTML = '<li class="list-group-item text-muted">No items in cart. <a href="products.html">Shop now</a></li>';
      orderTotalEl.textContent = 'Total: UGX 0';
    } else {
      const total = cart.reduce((s, i) => s + (i.price || 0), 0);
      orderItemsEl.innerHTML = cart.map((item) =>
        `<li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${item.title}</span>
          <strong class="text-success">${formatPrice(item.price)}</strong>
        </li>`
      ).join('');
      orderTotalEl.textContent = `Total: ${formatPrice(total)}`;
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
      paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!getCart().length) {
          alert('Your cart is empty. Add products before checkout.');
          return;
        }
        localStorage.setItem('cart', '[]');
        const countEl = document.getElementById('cartCount');
        if (countEl) countEl.textContent = '0';
        paymentForm.innerHTML = `
          <div class="alert alert-success">
            <i class="fa-solid fa-circle-check me-2"></i>
            <strong>Order placed successfully!</strong> Thank you for shopping with Christine Shoppers.
          </div>
          <a href="products.html" class="btn btn-primary">Continue Shopping</a>`;
      });
    }
  }

  /* ── Contact form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.innerHTML = `
        <div class="alert alert-success text-center py-4">
          <i class="fa-solid fa-paper-plane fa-2x mb-3"></i>
          <h5>Message sent!</h5>
          <p class="mb-0">We'll get back to you within 24 hours.</p>
        </div>`;
    });
  }

  /* ── Login form ── */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'user.html';
    });
  }
});
