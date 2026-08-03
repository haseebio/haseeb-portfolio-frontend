let container = null;
const getContainer = () => {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
};
const show = (message, type = 'info', duration = 3500) => {
  const c = getContainer();
  const el = document.createElement('div');
  const icons = { success:'<span style="color:#22c55e;font-size:16px">✓</span>', error:'<span style="color:#ef4444;font-size:16px">✕</span>', info:'<span style="color:#2563ff;font-size:16px">ℹ</span>' };
  el.className = `toast toast-${type}`;
  el.innerHTML = `${icons[type]}<span>${message}</span>`;
  c.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(20px)'; el.style.transition='all 0.3s ease'; setTimeout(() => el.remove(), 300); }, duration);
};
export const toast = { success:(msg)=>show(msg,'success'), error:(msg)=>show(msg,'error'), info:(msg)=>show(msg,'info') };
