/**
 * ====================================================================
 * إعدادات وبيانات صيدلية د. أحمد عمر مخلوف — Makhlouf Pharmacy
 * ====================================================================
 * يمكنك تعديل أرقام الهواتف، روابط السوشيال ميديا، العنوان ورسائل الواتساب
 * من هذا الملف بكل سهولة دون الحاجة لتعديل كود الـ HTML مباشرة.
 */

const SITE_CONFIG = {
  // بيانات الاتصال الأساسية
  contact: {
    phone: '+201555155173',        // رقم الاتصال المباشر (tel)
    whatsappNumber: '201555155173' // رقم الواتساب بدون علامة +
  },

  // رسائل الواتساب التلقائية
  whatsappMessages: {
    general: 'مرحباً صيدلية مخلوف، عايز استفسر عن منتج',
    childCare: 'مرحباً صيدلية مخلوف، عايز استفسر عن رعاية الأطفال',
    delivery: 'مرحباً صيدلية مخلوف، عايز استفسر عن التوصيل المنزلي',
    beautyCare: 'مرحباً صيدلية مخلوف، عايز استفسر عن العناية بالبشرة والتجميل',
    inBody: 'مرحباً صيدلية مخلوف، عايز استفسر عن InBody',
    askPharmacist: 'مرحباً صيدلية مخلوف، عندي سؤال للصيدلي'
  },

  // روابط التواصل الاجتماعي والخرائط
  links: {
    facebook: 'https://www.facebook.com/Makhloufpharmacy/',
    instagram: 'https://www.instagram.com/makhloufpharmacy',
    tiktok: 'https://www.tiktok.com/@makhlofpharmacy',
    whatsappCommunity: 'https://chat.whatsapp.com/G1oddWAzjpGKH4lfrB7msT',
    googleMaps: 'https://maps.app.goo.gl/4dxanYQV42MQB4uR9',
    googleReview: 'https://g.page/r/CZd6vZFEy431EBE/review'
  },

  // معلومات العنوان
  location: {
    address: 'مول الفرسان - الحي الربع - خلف العشر عماير',
    city: 'المنيا الجديدة'
  }
};

// دالة مساعدة لإنشاء رابط واتساب مع رسالة
function getWhatsAppUrl(messageKey = 'general') {
  const number = SITE_CONFIG.contact.whatsappNumber;
  const msg = SITE_CONFIG.whatsappMessages[messageKey] || SITE_CONFIG.whatsappMessages.general;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

// دالة مساعدة لإنشاء رابط اتصال هاتفي
function getPhoneUrl() {
  return `tel:${SITE_CONFIG.contact.phone}`;
}
