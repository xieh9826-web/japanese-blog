/* ============================================================
   日系ブログ — JavaScript
   Japanese Blog — Main JavaScript
   ============================================================ */

// --- Blog posts data ---
const blogPosts = [
  {
    id: 'sakura',
    title: '桜と静寂 — 春の訪れを待つ京都の小さな寺で',
    excerpt: '三月のある朝、まだ冷え込む空気の中、北山の小さな寺を訪れた。静まり返った境内で感じた、春の息吹と安らぎのひととき。',
    category: '文化・エッセイ',
    date: '2026年3月15日',
    readTime: '5分',
    url: 'posts/桜と静寂.html',
    color: 'linear-gradient(135deg, #2d4a22, #6b7b3a, #8fa35a)',
    emoji: '🎋',
    tags: ['#エッセイ', '#京都', '#春']
  },
  {
    id: 'cafe',
    title: '喫茶店とエンジニア — コードを書くのに最適な場所',
    excerpt: 'エンジニアにとって作業環境は命。東京の老舗喫茶店で見つけた、最高の集中空間と「カフェ効果」について。',
    category: 'テクノロジー',
    date: '2026年2月28日',
    readTime: '4分',
    url: 'posts/喫茶店とエンジニア.html',
    color: 'linear-gradient(135deg, #4a3520, #6b4c2e, #8b6914)',
    emoji: '☕',
    tags: ['#エッセイ', '#テクノロジー']
  },
  {
    id: 'books',
    title: '本と旅 — 移動中に読む一冊の贅沢',
    excerpt: '新幹線の中での読書時間は、旅の最大の楽しみの一つ。旅に合う本の選び方と、紙 vs 電子書籍の話。',
    category: '読書録',
    date: '2026年2月10日',
    readTime: '4分',
    url: 'posts/本と旅.html',
    color: 'linear-gradient(135deg, #1e3a5f, #3b5a7e, #5a7a9e)',
    emoji: '📚',
    tags: ['#読書録', '#旅']
  },
  {
    id: 'zen',
    title: '禅の思考とプログラミング — 無駄を削ぎ落とす美学',
    excerpt: '禅の「引き算の美学」は、コードのリファクタリングと驚くほど似ている。シンプルさを追求する心構え。',
    category: 'テクノロジー',
    date: '2026年1月20日',
    readTime: '6分',
    url: '#',
    color: 'linear-gradient(135deg, #1a1a2e, #2d2d44, #444466)',
    emoji: '🧘',
    tags: ['#テクノロジー', '#エッセイ']
  },
  {
    id: 'moon',
    title: '月を見るたびに — 十五夜と暦の話',
    excerpt: '日本の暦に刻まれた月のリズム。都会の夜空に見える月は、古人が見たものと同じなのだろうか。',
    category: '文化・エッセイ',
    date: '2026年1月5日',
    readTime: '3分',
    url: '#',
    color: 'linear-gradient(135deg, #1a1a3e, #3a3a6e, #5a5a8e)',
    emoji: '🌙',
    tags: ['#エッセイ', '#日本文化']
  }
];

// --- Render blog cards ---
function renderBlogCards() {
  const grid = document.getElementById('blogGrid');
  if (!grid) return;

  grid.innerHTML = blogPosts.map((post, index) => `
    <article class="blog-card fade-in" style="transition-delay: ${index * 0.1}s;" onclick="window.location.href='${post.url}'">
      <div class="blog-card-image" style="background: ${post.color}; display:flex; align-items:center; justify-content:center; font-size:3.5rem; color:rgba(255,255,255,0.3);">
        ${post.emoji}
      </div>
      <div class="blog-card-body">
        <span class="card-category">${post.category}</span>
        <h3>${post.title}</h3>
        <p class="card-excerpt">${post.excerpt}</p>
        <div class="card-meta">
          <span class="date">📅 ${post.date}</span>
          <span>☕ ${post.readTime}</span>
        </div>
      </div>
    </article>
  `).join('');
}

// --- Intersection Observer for fade-in animations ---
function initFadeInObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });
}

// --- Mobile nav toggle ---
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav when clicking a link (for single-page feel)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

// --- Scroll to top button ---
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Header scroll effect ---
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    // Add shadow after scrolling
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
  });
}

// --- Footer current year ---
function initFooterYear() {
  const yearEls = document.querySelectorAll('.footer-bottom span');
  if (yearEls.length) {
    // Year is hardcoded in HTML, could be dynamic but keeping static for consistency
  }
}

// --- Initialize everything ---
document.addEventListener('DOMContentLoaded', () => {
  renderBlogCards();
  initFadeInObserver();
  initNavToggle();
  initScrollTop();
  initHeaderScroll();
  initFooterYear();

  // Trigger fade-in for already visible elements after a tiny delay
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});
