/**
 * ====================================================================
 * سكربت التشغيل الرئيسي — Makhlouf Pharmacy
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. تطبيق الإعدادات المركزية من config.js إن وجدت
  applySiteConfig();

  // 2. تحديث سنة حقوق الملكية تلقائياً
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. تفعيل التحميل الكسول للصور للمتصفحات المدعومة
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.loading = 'lazy';
    });
  }

  // 4. تسجيل الـ Service Worker (PWA)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(err => {
        console.warn('Service Worker registration skipped:', err);
      });
    });
  }

  // 5. تفعيل تفاعلية الرسم التخطيطي لمعالم الصيدلية
  initSchematicMap();
});

/* ====================================================================
   تطبيق البيانات من ملف config.js على عناصر الصفحة
   ==================================================================== */
function applySiteConfig() {
  if (typeof SITE_CONFIG === 'undefined') return;

  // تحديث روابط الاتصال المباشر (tel:)
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.href = getPhoneUrl();
  });

  // تحديث روابط الواتساب حسب نوع الرسالة
  document.querySelectorAll('[data-config-whatsapp]').forEach(el => {
    const msgType = el.getAttribute('data-config-whatsapp') || 'general';
    el.href = getWhatsAppUrl(msgType);
  });

  // تحديث روابط السوشيال ميديا والخرائط
  document.querySelectorAll('[data-config-link]').forEach(el => {
    const linkKey = el.getAttribute('data-config-link');
    if (SITE_CONFIG.links && SITE_CONFIG.links[linkKey]) {
      el.href = SITE_CONFIG.links[linkKey];
    }
  });

  // تحديث نصوص العناوين
  document.querySelectorAll('[data-config-text]').forEach(el => {
    const textKey = el.getAttribute('data-config-text');
    if (textKey === 'address' && SITE_CONFIG.location?.address) {
      el.textContent = SITE_CONFIG.location.address;
    } else if (textKey === 'city' && SITE_CONFIG.location?.city) {
      el.textContent = SITE_CONFIG.location.city;
    }
  });
}

/* ====================================================================
   شريط التنقل العلوي (Topbar) والتأثير عند التمرير
   ==================================================================== */
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (topbar) {
    topbar.classList.toggle('scrolled', window.scrollY > 18);
  }
}, { passive: true });

/* ====================================================================
   زر المشاركة وإشعار Toast
   ==================================================================== */
const shareBtn = document.getElementById('shareBtn');
const toast = document.getElementById('toast');

shareBtn?.addEventListener('click', async () => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: 'Makhlouf Pharmacy',
        text: 'صيدلية د. أحمد عمر مخلوف',
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط الصفحة');
    }
  } catch (error) {
    // تجاهل الإلغاء من قبل المستخدم
    if (error.name !== 'AbortError') {
      console.warn('Share error:', error);
    }
  }
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* ====================================================================
   الوضع الليلي / النهاري (Dark Mode)
   ==================================================================== */
const themeBtn = document.getElementById('themeBtn');

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  if (themeBtn) {
    themeBtn.textContent = isDark ? '☀' : '☾';
    themeBtn.setAttribute('aria-label', isDark ? 'الوضع النهاري' : 'الوضع الليلي');
  }
}

// استرجاع تفضيل المستخدم المحفوظ (الافتراضي هو الوضع النهاري)
const savedTheme = localStorage.getItem('makhlouf-theme');
setTheme(savedTheme === 'dark');

themeBtn?.addEventListener('click', () => {
  const isDark = !document.documentElement.classList.contains('dark');
  setTheme(isDark);
  localStorage.setItem('makhlouf-theme', isDark ? 'dark' : 'light');
});

/* ====================================================================
   تفعيل التفاعل مع معالم الرسم التخطيطي (Schematic Interactive Map)
   ==================================================================== */
function initSchematicMap() {
  const mapNodes = document.querySelectorAll('.map-node.node-clickable');
  const landmarkCards = document.querySelectorAll('.landmark-card');
  if (!landmarkCards.length) return;

  function setActiveLandmark(landmarkId) {
    if (!landmarkId) return;

    landmarkCards.forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-target') === landmarkId);
    });

    mapNodes.forEach(node => {
      node.classList.toggle('active-node', node.getAttribute('data-landmark') === landmarkId);
    });
  }

  landmarkCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-target');
      setActiveLandmark(targetId);
    });
  });

  mapNodes.forEach(node => {
    node.addEventListener('click', () => {
      const landmarkId = node.getAttribute('data-landmark');
      setActiveLandmark(landmarkId);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const landmarkId = node.getAttribute('data-landmark');
        setActiveLandmark(landmarkId);
      }
    });
  });
}
