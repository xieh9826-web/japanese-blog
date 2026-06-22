// ============================================================
// AISlime — Main JavaScript
// ============================================================

// --- State ---
let activeFilter = 'all';

// --- Tag translation helper ---
function tagI18n(tag) {
  const map = {
    zh: { model: '模型', product: '产品', industry: '行业', paper: '论文', tutorial: '教程', agent: '智能体' },
    ja: { model: 'モデル', product: 'プロダクト', industry: '業界', paper: '論文', tutorial: 'チュートリアル', agent: 'エージェント' },
    en: { model: 'Model', product: 'Product', industry: 'Industry', paper: 'Paper', tutorial: 'Tutorial', agent: 'Agent' }
  };
  return map[currentLang]?.[tag] || tag;
}

// --- Render Timeline ---
function renderNews() {
  const timeline = document.getElementById('timeline');
  if (!timeline) return;

  let html = '';
  let totalItems = 0;
  let todayCount = 0;
  const today = new Date().toISOString().split('T')[0];
  const hotItems = [];

  NEWS_DATA.forEach((dayData) => {
    const dayStr = dayData.day;
    const items = dayData.items.filter(item => {
      if (activeFilter === 'all') return true;
      return item.tags.includes(activeFilter);
    });
    if (items.length === 0) return;
    totalItems += items.length;
    if (dayStr === today) todayCount += items.length;

    const dateLabel = DATE_FORMAT[currentLang](dayStr);
    const isToday = dayStr === today;
    const dayLabel = isToday
      ? (currentLang === 'en' ? 'Today' : currentLang === 'ja' ? '今日' : '今天')
      : dateLabel;

    html += `<div class="timeline-day">
      <div class="day-header" onclick="toggleDay(this)">
        <h2>${isToday ? '📌 ' : '📅 '} ${dayLabel}</h2>
        <span class="day-count">${items.length} ${currentLang === 'en' ? 'items' : '件'}</span>
        <span class="collapse-icon">▼</span>
      </div>
      <div class="day-body">`;

    items.forEach(item => {
      const content = item[currentLang] || item.zh;
      const heatColor = item.heat >= 90 ? '#ef4444' : item.heat >= 80 ? '#f59e0b' : '#22c55e';

      html += `<div class="news-card" onclick="window.open('${item.url}','_blank')">
        <div class="card-main">
          <div class="card-title">${content.title}</div>
          <div class="card-desc">${content.desc}</div>
          <div class="card-meta">
            <span class="card-source">${item.source}</span>
            <span class="card-time">${item.time}</span>
            <span class="card-tags">
              ${item.tags.map(t => `<span class="card-tag ${t}">${tagI18n(t)}</span>`).join('')}
            </span>
          </div>
        </div>
        <div class="card-side">
          <span class="card-heat" style="color:${heatColor}">${item.heat}</span>
          <span class="card-heat-label">${currentLang === 'en' ? 'heat' : '热度'}</span>
        </div>
      </div>`;

      if (hotItems.length < 5) {
        hotItems.push({ title: content.title, source: item.source });
      }
    });
    html += `</div></div>`;
  });

  timeline.innerHTML = html;
  document.getElementById('todayCount').textContent = todayCount;
  document.getElementById('totalArticles').textContent = totalItems;
  renderHotItems(hotItems);
}

function renderHotItems(items) {
  const container = document.getElementById('hotItems');
  if (!container) return;
  if (items.length === 0) {
    container.innerHTML = `<span class="hot-item">暂无热点</span>`;
    return;
  }
  container.innerHTML = items.map(item =>
    `<span class="hot-item">🔥 ${item.title} <span class="hot-source">· ${item.source}</span></span>`
  ).join('');
}

function toggleDay(header) {
  header.classList.toggle('collapsed');
  const body = header.nextElementSibling;
  if (body) body.classList.toggle('collapsed');
}

// --- Language ---
function initLanguage() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

// --- Theme ---
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;
  const saved = localStorage.getItem('aislime-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aislime-theme', next);
  });
}

// --- Filter ---
function initFilters() {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeFilter = tab.dataset.filter;
      renderNews();
    });
  });
}

// --- Search ---
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.news-card').forEach(card => {
      card.style.display = q === '' || card.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.day-body').forEach(body => {
      const visible = [...body.querySelectorAll('.news-card')].some(c => c.style.display !== 'none');
      const header = body.previousElementSibling;
      if (header) header.style.display = visible ? '' : 'none';
    });
  });
}

// --- Mobile Nav ---
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// --- Scroll Top ---
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initFilters();
  initMobileNav();
  initScrollTop();
  renderNews();
  setTimeout(initSearch, 100);
});
