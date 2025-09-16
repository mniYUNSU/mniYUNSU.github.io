(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById('mode');

  const toggleTheme = (state) => {
    if (state === 'dark') {
      localStorage.setItem('theme', 'light');
      body.removeAttribute('data-theme');
    } else if (state === 'light') {
      localStorage.setItem('theme', 'dark');
      body.setAttribute('data-theme', 'dark');
    } else {
      initTheme(state);
    }
  };

  lamp.addEventListener('click', () =>
    toggleTheme(localStorage.getItem('theme'))
  );

  // Blur the content when the menu is open
  const cbox = document.getElementById('menu-trigger');

  cbox.addEventListener('change', function () {
    const area = document.querySelector('.wrapper');
    this.checked
      ? area.classList.add('blurry')
      : area.classList.remove('blurry');
  });

  const navList = document.querySelector('[data-paragraph-nav]');
  const nav = document.getElementById('paragraph-nav');
  const navToggle = document.querySelector('.paragraph-nav__toggle');
  const articleBody = document.querySelector(
    '.page-content[itemprop="articleBody"]'
  );

  if (navList && articleBody && nav) {
    const headings = Array.from(
      articleBody.querySelectorAll('h1, h2, h3')
    ).filter((heading) => heading.textContent.trim().length > 0);

    if (headings.length === 0) {
      nav.remove();
      if (navToggle) {
        navToggle.remove();
      }
      return;
    }

    nav.classList.add('is-ready');

    const navbar = document.querySelector('.navbar');
    const headerOffset = navbar ? navbar.offsetHeight + 16 : 0;
    const mobileQuery = window.matchMedia('(max-width: 1299px)');
    let outsideClickHandler = null;

    const ensureId = (heading, index) => {
      if (!heading.id) {
        const base = heading.textContent
          .toLowerCase()
          .replace(/[^a-z0-9가-힣\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-');
        heading.id = base ? `${base}-${index + 1}` : `section-${index + 1}`;
      }
      return heading.id;
    };

    const attachOutsideClick = () => {
      if (outsideClickHandler || !mobileQuery.matches) return;

      outsideClickHandler = (event) => {
        if (
          !nav.contains(event.target) &&
          !(
            navToggle &&
            (event.target === navToggle || navToggle.contains(event.target))
          )
        ) {
          closeNav();
        }
      };

      document.addEventListener('pointerdown', outsideClickHandler);
    };

    const detachOutsideClick = () => {
      if (!outsideClickHandler) return;
      document.removeEventListener('pointerdown', outsideClickHandler);
      outsideClickHandler = null;
    };

    const openNav = () => {
      nav.classList.add('is-visible');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'true');
      }
      attachOutsideClick();
    };

    const closeNav = () => {
      nav.classList.remove('is-visible');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
      }
      detachOutsideClick();
    };

    const syncNavState = () => {
      if (mobileQuery.matches) {
        closeNav();
      } else {
        detachOutsideClick();
        nav.classList.add('is-visible');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'true');
        }
      }
    };

    headings.forEach((heading, index) => {
      const level = Math.min(
        Math.max(parseInt(heading.tagName.replace('H', ''), 10) || 1, 1),
        3
      );
      const id = ensureId(heading, index);
      const text = heading.textContent.replace(/\s+/g, ' ').trim();
      const label = text.length > 40 ? `${text.slice(0, 40)}…` : text;

      const item = document.createElement('span');
      item.className = `paragraph-nav__item paragraph-nav__item--level-${level}`;

      const link = document.createElement('a');
      link.className = 'paragraph-nav__link';
      link.href = `#${id}`;
      link.textContent = label || `섹션 ${index + 1}`;

      link.addEventListener('click', (event) => {
        event.preventDefault();

        const targetPosition =
          heading.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        window.history.replaceState(null, '', `#${id}`);

        if (mobileQuery.matches) {
          closeNav();
        }
      });

      item.appendChild(link);
      navList.appendChild(item);
    });

    if (navToggle) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        const next = !expanded;
        if (next) {
          openNav();
        } else {
          closeNav();
        }
      });
    }

    syncNavState();
    mobileQuery.addEventListener('change', syncNavState);
  }
})();
