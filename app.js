// ============================================================
// МИС — Медицинская информационная система
// app.js
// ============================================================

import { DATA, LABELS } from './data.js';

/* ============================================================
   1. УТИЛИТЫ
   ============================================================ */

const el = (tag, attrs = {}, children = []) => {
  const node = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    if (value === null || value === undefined || value === false) return;

    if (key === 'class') {
      node.className = value;
    } else if (key === 'text') {
      node.textContent = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([k, v]) => { node.dataset[k] = v; });
    } else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value === true) {
      node.setAttribute(key, '');
    } else {
      node.setAttribute(key, value);
    }
  });

  const append = (child) => {
    if (child === null || child === undefined || child === false) return;
    if (Array.isArray(child)) child.forEach(append);
    else if (typeof child === 'string' || typeof child === 'number') {
      node.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      node.appendChild(child);
    }
  };
  append(children);
  return node;
};

const svgEl = (tag, attrs = {}, children = []) => {
  const NS = 'http://www.w3.org/2000/svg';
  const node = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c instanceof Node) node.appendChild(c);
  });
  return node;
};

const clear = (node) => { while (node.firstChild) node.removeChild(node.firstChild); };

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
};

const formatDateTime = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '—';
  return `${formatDate(iso)}, ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
};

const debounce = (fn, delay = 300) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
};

/* ============================================================
   2. ТЕМА
   ============================================================ */

const ThemeManager = {
  STORAGE_KEY: 'mis-theme',
  ACCENT_KEY: 'mis-accent',

  init() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    this.updateButtons(current);

    const savedAccent = localStorage.getItem(this.ACCENT_KEY);
    if (savedAccent) {
      this.applyAccent(savedAccent);
      const input = document.getElementById('accent-color');
      if (input) input.value = savedAccent;
    }

    this.bindEvents();
    this.watchSystem();
  },

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(this.STORAGE_KEY, theme); } catch (e) {}
    this.updateButtons(theme);
  },

  updateButtons(theme) {
    document.querySelectorAll('[data-theme-value]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeValue === theme));
    });
  },

  applyAccent(hex) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return;
    document.documentElement.style.setProperty('--accent', hex);
    document.documentElement.style.setProperty('--accent-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    document.documentElement.style.setProperty('--accent-hover', this.darken(hex, 0.15));
  },

  hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) } : null;
  },

  darken(hex, amount) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    const f = 1 - amount;
    const c = (v) => Math.max(0, Math.min(255, Math.round(v * f))).toString(16).padStart(2,'0');
    return '#' + c(rgb.r) + c(rgb.g) + c(rgb.b);
  },

  bindEvents() {
    document.querySelectorAll('[data-theme-value]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.setTheme(btn.dataset.themeValue);
        Toast.show('Тема изменена', 'success');
      });
    });

    const accentInput = document.getElementById('accent-color');
    if (accentInput) {
      const handler = debounce((value) => {
        this.applyAccent(value);
        try { localStorage.setItem(this.ACCENT_KEY, value); } catch (e) {}
      }, 100);

      accentInput.addEventListener('input', (e) => handler(e.target.value));
      accentInput.addEventListener('change', (e) => {
        this.applyAccent(e.target.value);
        try { localStorage.setItem(this.ACCENT_KEY, e.target.value); } catch (e) {}
        Toast.show('Акцентный цвет обновлён', 'success');
      });
    }
  },

  watchSystem() {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      if (localStorage.getItem(this.STORAGE_KEY)) return;
      this.setTheme(e.matches ? 'dark' : 'light');
    });
  }
};

/* ============================================================
   3. TOAST
   ============================================================ */

const Toast = {
  container: null,
  counter: 0,

  init() {
    this.container = document.getElementById('toast-container');
  },

  show(message, type = 'info', duration = 3500) {
    if (!this.container) return;
    const id = `toast-${++this.counter}`;

    const iconSvg = this.makeIcon(type);
    const icon = el('span', { class: 'toast__icon', 'aria-hidden': 'true' }, [iconSvg]);

    const msg = el('span', { class: 'toast__message', text: message });

    const closeBtn = el('button', {
      type: 'button',
      class: 'toast__close',
      'aria-label': 'Закрыть уведомление'
    }, [this.makeCloseIcon()]);

    const toast = el('div', {
      id,
      class: `toast toast--${type}`,
      role: type === 'error' ? 'alert' : 'status'
    }, [icon, msg, closeBtn]);

    closeBtn.addEventListener('click', () => this.remove(toast));

    this.container.appendChild(toast);

    if (duration > 0) setTimeout(() => this.remove(toast), duration);
  },

  makeIcon(type) {
    const svg = svgEl('svg', { width: '18', height: '18', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' });
    const path = svgEl('path', {
      stroke: 'currentColor', 'stroke-width': '2', fill: 'none', 'stroke-linecap': 'round'
    });
    let color = 'var(--info)';
    let d = 'M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z';
    if (type === 'success') { color = 'var(--success)'; d = 'M5 13l4 4L19 7'; }
    else if (type === 'error') { color = 'var(--error)'; d = 'M6 6l12 12M18 6L6 18'; }
    else if (type === 'warning') { color = 'var(--warning)'; d = 'M12 8v5M12 17h.01M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z'; }
    path.setAttribute('d', d);
    svg.style.color = color;
    svg.appendChild(path);
    return svg;
  },

  makeCloseIcon() {
    const svg = svgEl('svg', { width: '14', height: '14', viewBox: '0 0 24 24', 'aria-hidden': 'true', focusable: 'false' });
    const path = svgEl('path', {
      d: 'M6 6l12 12M18 6L6 18',
      stroke: 'currentColor', 'stroke-width': '2', fill: 'none', 'stroke-linecap': 'round'
    });
    svg.appendChild(path);
    return svg;
  },

  remove(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('toast--removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }
};

/* ============================================================
   4. МОДАЛЬНОЕ ОКНО + FOCUS TRAP
   ============================================================ */

const Modal = {
  root: null, dialog: null, titleEl: null, bodyEl: null, footerEl: null,
  lastFocused: null,
  FOCUSABLE: 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',

  init() {
    this.root = document.getElementById('modal');
    if (!this.root) return;
    this.dialog = this.root.querySelector('.modal__dialog');
    this.titleEl = document.getElementById('modal-title');
    this.bodyEl = document.getElementById('modal-body');
    this.footerEl = document.getElementById('modal-footer');

    this.root.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (this.root.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
      if (e.key === 'Tab') this.trapFocus(e);
    });
  },

  open({ title, body, footer }) {
    this.lastFocused = document.activeElement;
    this.titleEl.textContent = title || '';

    clear(this.bodyEl);
    clear(this.footerEl);

    if (body) {
      if (Array.isArray(body)) body.forEach((n) => this.bodyEl.appendChild(n));
      else this.bodyEl.appendChild(body);
    }
    if (footer) {
      if (Array.isArray(footer)) footer.forEach((n) => this.footerEl.appendChild(n));
      else this.footerEl.appendChild(footer);
    }

    this.root.hidden = false;
    document.body.classList.add('modal-open');

    requestAnimationFrame(() => {
      const first = this.dialog.querySelector(this.FOCUSABLE);
      if (first) first.focus();
    });
  },

  close() {
    if (this.root.hidden) return;
    this.root.hidden = true;
    document.body.classList.remove('modal-open');
    if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
      this.lastFocused.focus();
    }
  },

  trapFocus(e) {
    const focusable = Array.from(this.dialog.querySelectorAll(this.FOCUSABLE))
      .filter((n) => !n.hasAttribute('disabled') && n.offsetParent !== null);
    if (focusable.length === 0) { e.preventDefault(); return; }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }
};

/* ============================================================
   5. ТАБЫ
   ============================================================ */

const Tabs = {
  init() {
    document.querySelectorAll('[data-tabs]').forEach((root) => {
      const tablist = root.querySelector('[role="tablist"]');
      if (!tablist) return;
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls')));

      const activate = (index, focus = true) => {
        tabs.forEach((tab, i) => {
          const sel = i === index;
          tab.setAttribute('aria-selected', String(sel));
          tab.setAttribute('tabindex', sel ? '0' : '-1');
          if (panels[i]) panels[i].hidden = !sel;
        });
        if (focus) tabs[index].focus();
      };

      tabs.forEach((tab, i) => tab.addEventListener('click', () => activate(i, false)));

      tablist.addEventListener('keydown', (e) => {
        const cur = tabs.indexOf(document.activeElement);
        if (cur === -1) return;
        let next = cur;
        if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (cur - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else return;
        e.preventDefault();
        activate(next);
      });

      activate(0, false);
    });
  }
};

/* ============================================================
   6. АККОРДЕОН
   ============================================================ */

const Accordion = {
  init() {
    document.querySelectorAll('[data-accordion]').forEach((root) => {
      root.addEventListener('click', (e) => {
        const trigger = e.target.closest('.accordion__trigger');
        if (!trigger) return;
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        const panel = document.getElementById(trigger.getAttribute('aria-controls'));
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }
};

/* ============================================================
   7. DROPDOWN
   ============================================================ */

const Dropdown = {
  init() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');

    dropdowns.forEach((root) => {
      const toggle = root.querySelector('.dropdown__toggle');
      const menu = root.querySelector('.dropdown__menu');
      if (!toggle || !menu) return;

      const items = () => Array.from(menu.querySelectorAll('[role="menuitem"]'));

      const open = () => {
        // Закрыть другие
        dropdowns.forEach((d) => {
          if (d !== root) {
            const m = d.querySelector('.dropdown__menu');
            const t = d.querySelector('.dropdown__toggle');
            if (m) m.hidden = true;
            if (t) t.setAttribute('aria-expanded', 'false');
          }
        });
        menu.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        const first = items()[0];
        if (first) first.focus();
      };

      const close = (returnFocus = true) => {
        menu.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        if (returnFocus) toggle.focus();
      };

      toggle.addEventListener('click', () => (menu.hidden ? open() : close()));

      menu.addEventListener('keydown', (e) => {
        const list = items();
        const idx = list.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); list[(idx+1)%list.length]?.focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); list[(idx-1+list.length)%list.length]?.focus(); }
        else if (e.key === 'Home') { e.preventDefault(); list[0]?.focus(); }
        else if (e.key === 'End') { e.preventDefault(); list[list.length-1]?.focus(); }
        else if (e.key === 'Escape') { e.preventDefault(); close(); }
      });

      document.addEventListener('click', (e) => {
        if (!menu.hidden && !root.contains(e.target)) close(false);
      });

      menu.addEventListener('click', (e) => {
        if (e.target.closest('[role="menuitem"]')) close();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      dropdowns.forEach((root) => {
        const menu = root.querySelector('.dropdown__menu');
        const toggle = root.querySelector('.dropdown__toggle');
        if (menu && !menu.hidden) {
          menu.hidden = true;
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
};

/* ============================================================
   8. ПАГИНАЦИЯ
   ============================================================ */

const Pagination = {
  ITEMS_PER_PAGE: 6,

  render(container, totalItems, currentPage, onChange) {
    clear(container);
    const totalPages = Math.max(1, Math.ceil(totalItems / this.ITEMS_PER_PAGE));
    if (totalPages <= 1) return;

    const makeBtn = (label, page, opts = {}) => {
      const btn = el('button', {
        type: 'button',
        class: 'pagination__btn',
        'aria-label': opts.ariaLabel || `Страница ${page}`,
        text: label,
        disabled: !!opts.disabled
      });
      if (opts.current) btn.setAttribute('aria-current', 'page');
      btn.addEventListener('click', () => onChange(page));
      return btn;
    };

    container.appendChild(makeBtn('‹', currentPage - 1, {
      ariaLabel: 'Предыдущая страница', disabled: currentPage === 1
    }));

    this.getPages(currentPage, totalPages).forEach((p) => {
      if (p === '…') container.appendChild(el('span', { class: 'pagination__ellipsis', text: '…' }));
      else container.appendChild(makeBtn(String(p), p, { current: p === currentPage }));
    });

    container.appendChild(makeBtn('›', currentPage + 1, {
      ariaLabel: 'Следующая страница', disabled: currentPage === totalPages
    }));
  },

  getPages(current, total) {
    const pages = [];
    const delta = 1;
    const range = [];
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) range.push(i);
    if (current - delta > 2) range.unshift('…');
    if (current + delta < total - 1) range.push('…');
    pages.push(1, ...range, total);
    return pages;
  }
};

/* ============================================================
   9. ВАЛИДАЦИЯ
   ============================================================ */

const Validator = {
  rules: {
    required: (v) => (v && v.trim().length > 0) || 'Поле обязательно для заполнения',
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Введите корректный email',
    phone: (v) => !v || /^\+?[\d\s\-()]{10,}$/.test(v) || 'Введите корректный номер телефона',
    minLength: (n) => (v) => !v || v.trim().length >= n || `Минимум ${n} символов`,
    maxLength: (n) => (v) => !v || v.trim().length <= n || `Максимум ${n} символов`
  },

  validateField(input) {
    const rules = (input.dataset.validate || '').split('|').filter(Boolean);
    const value = input.value;
    for (const rule of rules) {
      const [name, param] = rule.split(':');
      let fn = this.rules[name];
      if (!fn) continue;
      if (param !== undefined) fn = fn(Number(param));
      const result = fn(value);
      if (result !== true) return result;
    }
    return '';
  },

  setFieldError(input, message) {
    const errorId = `${input.id}-error`;
    let errorEl = document.getElementById(errorId);
    if (!errorEl) {
      errorEl = el('span', { id: errorId, class: 'field__error', role: 'alert' });
      input.parentNode.appendChild(errorEl);
    }
    if (message) {
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorId);
    } else {
      errorEl.textContent = '';
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedby');
    }
  },

  attach(form) {
    form.querySelectorAll('[data-validate]').forEach((input) => {
      input.addEventListener('blur', () => {
        this.setFieldError(input, this.validateField(input));
      });
      const debounced = debounce(() => {
        if (input.value.length > 0 || input.getAttribute('aria-invalid') === 'true') {
          this.setFieldError(input, this.validateField(input));
        }
      }, 400);
      input.addEventListener('input', debounced);
    });
  },

  validateForm(form) {
    let valid = true;
    let firstInvalid = null;
    form.querySelectorAll('[data-validate]').forEach((input) => {
      const msg = this.validateField(input);
      this.setFieldError(input, msg);
      if (msg) { valid = false; if (!firstInvalid) firstInvalid = input; }
    });
    if (firstInvalid) firstInvalid.focus();
    return valid;
  }
};

/* ============================================================
   10. РЕНДЕР
   ============================================================ */

const Renderer = {
  patientCard(p) {
    const card = el('article', { class: 'card', dataset: { id: p.id } });

    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: p.fullName }),
        el('p', { class: 'card__subtitle', text: `ID: ${p.id}` })
      ]),
      el('span', { class: `badge badge--${p.status}`, text: LABELS.patientStatus[p.status] || p.status })
    ]));

    card.appendChild(el('div', { class: 'card__body' }, [
      el('p', {}, [el('strong', { text: 'Пол: ' }), p.gender === 'male' ? 'Мужской' : 'Женский']),
      el('p', {}, [el('strong', { text: 'Телефон: ' }), p.phone]),
      el('p', {}, [el('strong', { text: 'Email: ' }), p.email]),
      el('p', {}, [el('strong', { text: 'Полис: ' }), p.insurance]),
      el('p', {}, [el('strong', { text: 'Кровь: ' }), p.bloodType])
    ]));

    const meta = el('div', { class: 'card__meta' });
    meta.appendChild(el('span', {}, ['Д.р.: ', el('time', { datetime: p.birthDate, text: formatDate(p.birthDate) })]));
    if (Array.isArray(p.allergies)) {
      p.allergies.forEach((a) => meta.appendChild(el('span', { class: 'tag', text: `⚠ ${a}` })));
    }
    card.appendChild(meta);

    card.appendChild(el('div', { class: 'card__actions' }, [
      el('button', {
        type: 'button',
        class: 'btn btn--outline',
        'aria-label': `Подробнее о пациенте ${p.fullName}`,
        text: 'Подробнее',
        'data-action': 'open-patient',
        'data-id': p.id
      })
    ]));

    return card;
  },

  appointmentCard(a) {
    const card = el('article', { class: 'card', dataset: { id: a.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: `${a.doctorName} — ${a.specialty}` }),
        el('p', { class: 'card__subtitle', text: `Пациент: ${a.patientName}` })
      ]),
      el('span', { class: `badge badge--${a.status}`, text: LABELS.appointmentStatus[a.status] || a.status })
    ]));

    card.appendChild(el('div', { class: 'card__body' }, [
      el('p', {}, [el('strong', { text: 'Дата: ' }), el('time', { datetime: a.date, text: formatDateTime(a.date) })]),
      el('p', {}, [el('strong', { text: 'Кабинет: ' }), a.room]),
      el('p', {}, [el('strong', { text: 'Длительность: ' }), `${a.duration} мин`]),
      el('p', {}, [el('strong', { text: 'Причина: ' }), a.reason])
    ]));

    return card;
  },

  diagnosisCard(d) {
    const card = el('article', { class: 'card', dataset: { id: d.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: d.title }),
        el('p', { class: 'card__subtitle', text: `МКБ-10: ${d.code}` })
      ]),
      el('span', {
        class: `badge badge--${d.status === 'active' ? 'error' : 'completed'}`,
        text: LABELS.diagnosisStatus[d.status] || d.status
      })
    ]));

    const body = el('div', { class: 'card__body' }, [
      el('p', { text: d.description }),
      el('p', {}, [el('strong', { text: 'Пациент: ' }), d.patientName]),
      el('p', {}, [el('strong', { text: 'Врач: ' }), d.doctorName]),
      el('p', {}, [el('strong', { text: 'Дата: ' }), el('time', { datetime: d.diagnosedAt, text: formatDate(d.diagnosedAt) })])
    ]);

    if (Array.isArray(d.symptoms) && d.symptoms.length > 0) {
      const sym = el('p', {}, [el('strong', { text: 'Симптомы: ' })]);
      d.symptoms.forEach((s, i) => {
        if (i > 0) sym.appendChild(document.createTextNode(', '));
        sym.appendChild(el('span', { class: 'tag', text: s }));
      });
      body.appendChild(sym);
    }
    card.appendChild(body);

    const priorityClass = d.severity === 'severe' ? 'priority--high'
      : d.severity === 'moderate' ? 'priority--medium' : 'priority--low';

    card.appendChild(el('div', { class: 'card__meta' }, [
      el('span', { class: `priority ${priorityClass}`, text: `Тяжесть: ${LABELS.diagnosisSeverity[d.severity]}` })
    ]));

    return card;
  },

  prescriptionCard(r) {
    const card = el('article', { class: 'card', dataset: { id: r.id } });
    card.appendChild(el('header', { class: 'card__header' }, [
      el('div', {}, [
        el('h3', { class: 'card__title', text: r.title }),
        el('p', { class: 'card__subtitle', text: `${LABELS.prescriptionType[r.type]} · ${r.patientName}` })
      ]),
      el('span', { class: `badge badge--${r.status}`, text: LABELS.prescriptionStatus[r.status] || r.status })
    ]));

    const body = el('div', { class: 'card__body' }, [
      el('p', { text: r.description }),
      el('p', {}, [el('strong', { text: 'Врач: ' }), r.doctorName])
    ]);

    if (Array.isArray(r.medications) && r.medications.length > 0) {
      r.medications.forEach((m) => {
        body.appendChild(el('p', {}, [
          el('strong', { text: `${m.name}: ` }),
          `${m.dose}, ${m.frequency}, ${m.duration}`
        ]));
      });
    }
    if (r.instructions) body.appendChild(el('p', { text: r.instructions }));
    card.appendChild(body);

    const priorityClass = 'priority--' + (r.priority === 'high' ? 'high' : r.priority === 'medium' ? 'medium' : 'low');

    card.appendChild(el('div', { class: 'card__meta' }, [
      el('time', { datetime: r.prescribedAt, text: `Назначено: ${formatDate(r.prescribedAt)}` }),
      el('span', { class: `priority ${priorityClass}`, text: `Приоритет: ${LABELS.prescriptionPriority[r.priority]}` })
    ]));

    return card;
  },

  patientsTable(items) {
    const wrap = el('div', { class: 'table-wrap' });
    const table = el('table');
    table.appendChild(el('caption', { text: 'Список пациентов' }));

    const thead = el('thead');
    const headRow = el('tr');
    const columns = [
      { key: 'fullName', label: 'Пациент' },
      { key: 'id', label: 'ID' },
      { key: 'status', label: 'Статус' },
      { key: 'gender', label: 'Пол' },
      { key: 'phone', label: 'Телефон' },
      { key: 'bloodType', label: 'Кровь' }
    ];
    columns.forEach((col) => headRow.appendChild(el('th', { scope: 'col', 'data-key': col.key, text: col.label })));
    thead.appendChild(headRow);

    const tbody = el('tbody');
    items.forEach((p) => {
      const tr = el('tr');
      tr.appendChild(el('th', { scope: 'row', 'data-label': 'Пациент', text: p.fullName }));
      tr.appendChild(el('td', { 'data-label': 'ID', text: p.id }));
      tr.appendChild(el('td', { 'data-label': 'Статус' }, [
        el('span', { class: `badge badge--${p.status}`, text: LABELS.patientStatus[p.status] || p.status })
      ]));
      tr.appendChild(el('td', { 'data-label': 'Пол', text: p.gender === 'male' ? 'Мужской' : 'Женский' }));
      tr.appendChild(el('td', { 'data-label': 'Телефон', text: p.phone }));
      tr.appendChild(el('td', { 'data-label': 'Кровь', text: p.bloodType }));
      tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table     table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
  },

  skeleton(rows = 6) {
    const grid = el('div', { class: 'cards-grid' });
    for (let i = 0; i < rows; i++) {
      const card = el('div', { class: 'card' });
      const header = el('div', { class: 'card__header' }, [
        el('div', { style: 'flex: 1;' }, [
          el('div', { class: 'skeleton skeleton-line skeleton-line--title' }),
          el('div', { class: 'skeleton skeleton-line skeleton-line--short' })
        ]),
        el('div', { class: 'skeleton', style: 'width: 80px; height: 24px; border-radius: 9999px;' })
      ]);
      card.appendChild(header);

      const body = el('div', { class: 'card__body' });
      for (let j = 0; j < 3; j++) {
        body.appendChild(el('div', { class: 'skeleton skeleton-line skeleton-line--medium' }));
      }
      card.appendChild(body);

      const meta = el('div', { class: 'card__meta' });
      meta.appendChild(el('div', { class: 'skeleton skeleton-line skeleton-line--short', style: 'width: 30%;' }));
      card.appendChild(meta);

      grid.appendChild(card);
    }
    return grid;
  },

  emptyState({ title, text, actionLabel, onAction }) {
    const wrap = el('div', { class: 'empty-state' });

    const svg = svgEl('svg', {
      width: '64', height: '64', viewBox: '0 0 24 24',
      'aria-hidden': 'true', focusable: 'false'
    });
    const path = svgEl('path', {
      d: 'M9 12h6M9 16h6M9 8h6M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z',
      stroke: 'currentColor',
      'stroke-width': '1.5',
      fill: 'none',
      'stroke-linecap': 'round'
    });
    svg.appendChild(path);
    wrap.appendChild(svg);

    wrap.appendChild(el('h3', { class: 'empty-state__title', text: title || 'Ничего не найдено' }));
    if (text) wrap.appendChild(el('p', { class: 'empty-state__text', text }));

    if (actionLabel && typeof onAction === 'function') {
      const btn = el('button', {
        type: 'button',
        class: 'btn btn--primary',
        text: actionLabel
      });
      btn.addEventListener('click', onAction);
      wrap.appendChild(btn);
    }

    return wrap;
  },

  spinner(text) {
    return el('div', { class: 'spinner-wrap' }, [
      el('div', { class: 'spinner', 'aria-hidden': 'true' }),
      el('p', { text: text || 'Загрузка...' })
    ]);
  }
};

/* ============================================================
   11. МОБИЛЬНОЕ МЕНЮ
   ============================================================ */

const MobileMenu = {
  init() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    if (!hamburger || !sidebar || !overlay) return;

    const open = () => {
      sidebar.classList.add('is-open');
      overlay.hidden = false;
      void overlay.offsetWidth;
      overlay.classList.add('is-visible');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Закрыть меню');
      document.body.classList.add('modal-open');
    };

    const close = () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Открыть меню');
      document.body.classList.remove('modal-open');
      overlay.addEventListener('transitionend', () => {
        if (!overlay.classList.contains('is-visible')) overlay.hidden = true;
      }, { once: true });
    };

    hamburger.addEventListener('click', () => {
      if (hamburger.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    overlay.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('is-open')) close();
    });

    sidebar.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');
      if (link && window.innerWidth < 1024) close();
    });
  }
};

/* ============================================================
   12. СЧЁТЧИКИ
   ============================================================ */

const Counters = {
  init() {
    document.querySelectorAll('[data-counter]').forEach((node) => {
      const target = Number(node.dataset.counter) || 0;
      this.animate(node, target);
    });
  },

  animate(node, target) {
    const duration = 1000;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};

/* ============================================================
   13. МОДУЛЬ ПАЦИЕНТОВ
   ============================================================ */

const PatientsModule = {
  state: {
    search: '',
    status: '',
    genders: [],
    view: 'cards',
    sort: 'name-asc',
    page: 1
  },

  elements: {},

  init() {
    this.elements.form = document.getElementById('filters-patients');
    this.elements.search = document.getElementById('search-patients');
    this.elements.status = document.getElementById('status-patients');
    this.elements.content = document.getElementById('patients-content');
    this.elements.pagination = document.getElementById('patients-pagination');

    if (!this.elements.content) return;

    this.bindForm();
    this.bindSort();
    this.bindDelegatedActions();
    this.bindReset();

    this.loadWithSkeleton();
  },

  bindForm() {
    const { form, search, status } = this.elements;
    if (!form) return;

    const onSearch = debounce((value) => {
      this.state.search = value.trim().toLowerCase();
      this.state.page = 1;
      this.render();
    }, 300);

    search.addEventListener('input', (e) => onSearch(e.target.value));

    status.addEventListener('change', (e) => {
      this.state.status = e.target.value;
      this.state.page = 1;
      this.render();
    });

    form.addEventListener('change', (e) => {
      if (e.target.name === 'gender') {
        this.state.genders = Array.from(
          form.querySelectorAll('input[name="gender"]:checked')
        ).map((cb) => cb.value);
        this.state.page = 1;
        this.render();
      }
      if (e.target.name === 'view') {
        this.state.view = e.target.value;
        this.state.page = 1;
        this.render();
      }
    });
  },

  bindReset() {
    const { form } = this.elements;
    if (!form) return;

    form.addEventListener('reset', () => {
      setTimeout(() => {
        this.state.search = '';
        this.state.status = '';
        this.state.genders = [];
        this.state.view = 'cards';
        this.state.sort = 'name-asc';
        this.state.page = 1;
        this.render();
        Toast.show('Фильтры сброшены', 'info');
      }, 0);
    });
  },

  bindSort() {
    const menu = document.querySelector('[data-dropdown] .dropdown__menu');
    if (!menu) return;

    menu.addEventListener('click', (e) => {
      const item = e.target.closest('[data-sort]');
      if (!item) return;
      this.state.sort = item.dataset.sort;
      this.state.page = 1;
      this.render();
      Toast.show('Сортировка применена', 'success', 2000);
    });
  },

  bindDelegatedActions() {
    this.elements.content.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action="open-patient"]');
      if (!btn) return;
      this.openPatientModal(btn.dataset.id);
    });
  },

  loadWithSkeleton() {
    const content = this.elements.content;
    clear(content);
    content.appendChild(Renderer.skeleton(6));
    setTimeout(() => this.render(), 700);
  },

  getFiltered() {
    const { search, status, genders, sort } = this.state;
    let items = DATA.patients.slice();

    if (search) {
      items = items.filter((p) =>
        p.fullName.toLowerCase().includes(search) ||
        p.id.toLowerCase().includes(search) ||
        p.email.toLowerCase().includes(search) ||
        p.phone.includes(search)
      );
    }
    if (status) items = items.filter((p) => p.status === status);
    if (genders.length > 0) items = items.filter((p) => genders.includes(p.gender));

    const [key, dir] = sort.split('-');
    items.sort((a, b) => {
      let av, bv;
      if (key === 'name') { av = a.fullName; bv = b.fullName; }
      else if (key === 'date') { av = a.createdAt; bv = b.createdAt; }
      else { av = a[key]; bv = b[key]; }

      if (typeof av === 'string') {
        return dir === 'asc' ? av.localeCompare(bv, 'ru') : bv.localeCompare(av, 'ru');
      }
      return dir === 'asc' ? av - bv : bv - av;
    });

    return items;
  },

  render() {
    const content = this.elements.content;
    const pagination = this.elements.pagination;

    clear(content);

    const items = this.getFiltered();

    if (items.length === 0) {
      content.appendChild(Renderer.emptyState({
        title: 'Пациенты не найдены',
        text: 'Попробуйте изменить параметры фильтрации или сбросить их.',
        actionLabel: 'Сбросить фильтры',
        onAction: () => {
          const resetBtn = document.getElementById('reset-patients');
          if (resetBtn) resetBtn.click();
        }
      }));
      clear(pagination);
      return;
    }

    const perPage = Pagination.ITEMS_PER_PAGE;
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    if (this.state.page > totalPages) this.state.page = totalPages;

    const start = (this.state.page - 1) * perPage;
    const pageItems = items.slice(start, start + perPage);

    if (this.state.view === 'table') {
      content.appendChild(Renderer.patientsTable(pageItems));
    } else {
      const grid = el('div', { class: 'cards-grid' });
      pageItems.forEach((p) => grid.appendChild(Renderer.patientCard(p)));
      content.appendChild(grid);
    }

    Pagination.render(pagination, items.length, this.state.page, (page) => {
      this.state.page = page;
      this.render();
      content.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  },

  openPatientModal(id) {
    const p = DATA.patients.find((x) => x.id === id);
    if (!p) return;

    const body = el('div', { class: 'form' }, [
      el('p', {}, [el('strong', { text: 'ФИО: ' }), p.fullName]),
      el('p', {}, [el('strong', { text: 'ID: ' }), p.id]),
      el('p', {}, [el('strong', { text: 'Дата рождения: ' }), el('time', { datetime: p.birthDate, text: formatDate(p.birthDate) })]),
      el('p', {}, [el('strong', { text: 'Пол: ' }), p.gender === 'male' ? 'Мужской' : 'Женский']),
      el('p', {}, [el('strong', { text: 'Телефон: ' }), p.phone]),
      el('p', {}, [el('strong', { text: 'Email: ' }), p.email]),
      el('p', {}, [el('strong', { text: 'Адрес: ' }), p.address]),
      el('p', {}, [el('strong', { text: 'Полис: ' }), p.insurance]),
      el('p', {}, [el('strong', { text: 'Группа крови: ' }), p.bloodType]),
      el('p', {}, [el('strong', { text: 'Аллергии: ' }), p.allergies.length > 0 ? p.allergies.join(', ') : 'Нет']),
      el('p', {}, [el('strong', { text: 'Экстренный контакт: ' }), `${p.emergencyContact.name} (${p.emergencyContact.relation}), ${p.emergencyContact.phone}`]),
      el('p', {}, [el('strong', { text: 'Заметки: ' }), p.notes || '—']),
      el('p', {}, [el('strong', { text: 'Создан: ' }), el('time', { datetime: p.createdAt, text: formatDateTime(p.createdAt) })])
    ]);

    const closeBtn = el('button', {
      type: 'button',
      class: 'btn btn--outline',
      text: 'Закрыть'
    });
    closeBtn.addEventListener('click', () => Modal.close());

    Modal.open({
      title: `Пациент ${p.fullName}`,
      body,
      footer: closeBtn
    });
  }
};

/* ============================================================
   14. РЕНДЕР ОСТАЛЬНЫХ РАЗДЕЛОВ
   ============================================================ */

const renderAppointments = () => {
  const container = document.getElementById('appointments-content');
  if (!container || container.dataset.rendered === 'true') return;

  clear(container);
  container.appendChild(Renderer.spinner('Загрузка приёмов...'));

  setTimeout(() => {
    clear(container);
    container.dataset.rendered = 'true';

    if (DATA.appointments.length === 0) {
      container.appendChild(Renderer.emptyState({
        title: 'Приёмов нет',
        text: 'Список приёмов пуст.'
      }));
      return;
    }

    const grid = el('div', { class: 'cards-grid' });
    DATA.appointments.forEach((a) => grid.appendChild(Renderer.appointmentCard(a)));
    container.appendChild(grid);
  }, 500);
};

const renderDiagnoses = () => {
  const container = document.getElementById('diagnoses-content');
  if (!container || container.dataset.rendered === 'true') return;

  clear(container);
  container.appendChild(Renderer.spinner('Загрузка диагнозов...'));

  setTimeout(() => {
    clear(container);
    container.dataset.rendered = 'true';

    if (DATA.diagnoses.length === 0) {
      container.appendChild(Renderer.emptyState({
        title: 'Диагнозов нет',
        text: 'Список диагнозов пуст.'
      }));
      return;
    }

    const grid = el('div', { class: 'cards-grid' });
    DATA.diagnoses.forEach((d) => grid.appendChild(Renderer.diagnosisCard(d)));
    container.appendChild(grid);
  }, 500);
};

const renderPrescriptions = () => {
  const container = document.getElementById('prescriptions-content');
  if (!container || container.dataset.rendered === 'true') return;

  clear(container);
  container.appendChild(Renderer.spinner('Загрузка назначений...'));

  setTimeout(() => {
    clear(container);
    container.dataset.rendered = 'true';

    if (DATA.prescriptions.length === 0) {
      container.appendChild(Renderer.emptyState({
        title: 'Назначений нет',
        text: 'Список назначений пуст.'
      }));
      return;
    }

    const grid = el('div', { class: 'cards-grid' });
    DATA.prescriptions.forEach((r) => grid.appendChild(Renderer.prescriptionCard(r)));
    container.appendChild(grid);
  }, 500);
};

/* ============================================================
   15. ФОРМА "ДОБАВИТЬ ПАЦИЕНТА"
   ============================================================ */

const AddPatientForm = {
  init() {
    const btn = document.getElementById('add-patient');
    if (!btn) return;
    btn.addEventListener('click', () => this.open());
  },

  open() {
    const form = el('form', {
      class: 'form',
      id: 'add-patient-form',
      novalidate: true,
      'aria-label': 'Форма добавления пациента'
    });

    const fields = [
      { id: 'f-fullname', label: 'ФИО', type: 'text', validate: 'required|minLength:2|maxLength:100', placeholder: 'Иванов Иван Иванович' },
      { id: 'f-birthdate', label: 'Дата рождения', type: 'date', validate: 'required' },
      { id: 'f-phone', label: 'Телефон', type: 'tel', validate: 'required|phone', placeholder: '+7-900-000-00-00' },
      { id: 'f-email', label: 'Email', type: 'email', validate: 'required|email', placeholder: 'patient@example.com' },
      { id: 'f-address', label: 'Адрес', type: 'text', validate: 'required|minLength:5', placeholder: 'г. Москва, ул. Примерная, 1' }
    ];

    fields.forEach((f) => {
      const input = el('input', {
        id: f.id,
        name: f.id,
        type: f.type,
        class: 'field__input',
        placeholder: f.placeholder || '',
        'data-validate': f.validate,
        autocomplete: 'off'
      });

      form.appendChild(el('div', { class: 'form__row' }, [
        el('label', { for: f.id, class: 'field__label' }, [
          f.label,
          el('span', { class: 'form__required', 'aria-hidden': 'true', text: '*' })
        ]),
        input
      ]));
    });

    // Пол — радио
    form.appendChild(el('div', { class: 'form__row' }, [
      el('span', { class: 'field__label', text: 'Пол *' }),
      el('div', { class: 'radio-group' }, [
        el('label', { class: 'radio' }, [
          el('input', { type: 'radio', name: 'gender', value: 'male', checked: true }),
          el('span', { class: 'radio__box', 'aria-hidden': 'true' }),
          el('span', { text: 'Мужской' })
        ]),
        el('label', { class: 'radio' }, [
          el('input', { type: 'radio', name: 'gender', value: 'female' }),
          el('span', { class: 'radio__box', 'aria-hidden': 'true' }),
          el('span', { text: 'Женский' })
        ])
      ])
    ]));

    Validator.attach(form);

    const cancelBtn = el('button', {
      type: 'button',
      class: 'btn btn--outline',
      text: 'Отмена'
    });
    cancelBtn.addEventListener('click', () => Modal.close());

    const submitBtn = el('button', {
      type: 'submit',
      class: 'btn btn--primary',
      text: 'Сохранить'
    });

    const footer = el('div', { class: 'flex-row' }, [cancelBtn, submitBtn]);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!Validator.validateForm(form)) {
        Toast.show('Исправьте ошибки в форме', 'error');
        return;
      }
      Modal.close();
      Toast.show('Пациент успешно добавлен', 'success');
    });

    Modal.open({
      title: 'Добавление пациента',
      body: form,
      footer
    });

    requestAnimationFrame(() => {
      const first = form.querySelector('input');
      if (first) first.focus();
    });
  }
};

/* ============================================================
   16. ИНИЦИАЛИЗАЦИЯ
   ============================================================ */

const App = {
  init() {
    try {
      Toast.init();
      ThemeManager.init();
      Modal.init();
      Tabs.init();
      Accordion.init();
      Dropdown.init();
      MobileMenu.init();
      Counters.init();
      PatientsModule.init();
      AddPatientForm.init();

      // Ленивый рендер остальных разделов при первом открытии таба
      const tabAppointments = document.getElementById('tab-appointments');
      const tabDiagnoses = document.getElementById('tab-diagnoses');
      const tabPrescriptions = document.getElementById('tab-prescriptions');

      tabAppointments?.addEventListener('click', renderAppointments);
      tabDiagnoses?.addEventListener('click', renderDiagnoses);
      tabPrescriptions?.addEventListener('click', renderPrescriptions);

      // Приветствие
      setTimeout(() => {
        Toast.show('Добро пожаловать в МИС!', 'info', 3000);
      }, 800);
    } catch (err) {
      console.error('Ошибка инициализации приложения:', err);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.init());
} else {
  App.init();
}