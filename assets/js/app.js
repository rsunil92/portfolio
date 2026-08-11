/**
 * Renders the portfolio from window.PORTFOLIO (assets/js/data.js).
 * No dependencies, no build step — the page works straight off the filesystem.
 */
(function () {
  "use strict";

  var data = window.PORTFOLIO;
  if (!data) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /** Resolve "profile.name" against the data object. */
  function lookup(path) {
    return path.split(".").reduce(function (acc, key) {
      return acc == null ? acc : acc[key];
    }, data);
  }

  var ICONS = {
    mail: '<path d="M4 5h16v14H4z"/><path d="M4 6l8 6 8-6"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10.5V17M7.5 7.5v.01M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>',
    pin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>'
  };

  function icon(name) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML = ICONS[name] || ICONS.globe;
    return svg;
  }

  /* ---------------------------------------------------------------- bindings */

  function renderBindings() {
    $$("[data-bind]").forEach(function (node) {
      var value = lookup(node.getAttribute("data-bind"));
      if (value != null) node.textContent = value;
    });
    document.title = data.profile.name + " — " + data.profile.headline.split("·")[0].trim();
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function renderProfile() {
    var list = $("#profileCompanies");
    (data.profile.companies || []).forEach(function (item) {
      var li = el("li", "profile__company");
      li.appendChild(el("span", "profile__company-role", item.role));
      li.appendChild(el("span", "profile__company-name", item.label));
      list.appendChild(li);
    });

    var email = (data.contact || []).find(function (c) { return c.icon === "mail"; });
    if (email && email.href) $("#primaryCta").setAttribute("href", email.href);

    if (!data.openTo) $("#openTo").remove();

    $("#printCv").addEventListener("click", function () { window.print(); });
  }

  function renderAbout() {
    var body = $("#aboutBody");
    (data.about || []).forEach(function (paragraph) {
      body.appendChild(el("p", null, paragraph));
    });

    var metrics = $("#metrics");
    (data.metrics || []).forEach(function (item) {
      var li = el("li", "metric");
      li.appendChild(el("span", "metric__value", item.value));
      li.appendChild(el("span", "metric__label", item.label));
      metrics.appendChild(li);
    });
  }

  function renderExperience() {
    var root = $("#timeline");

    (data.experience || []).forEach(function (job) {
      var li = el("li", "job reveal");

      var logo = el("div", "job__logo");
      logo.setAttribute("aria-hidden", "true");
      logo.textContent = job.company.charAt(0);
      li.appendChild(logo);

      var main = el("div", "job__main");

      main.appendChild(el("h3", "job__role", job.role));

      var company = el("p", "job__company");
      company.appendChild(el("span", null, job.company));
      if (job.type) {
        company.appendChild(el("span", "dot", "·"));
        company.appendChild(el("span", null, job.type));
      }
      main.appendChild(company);

      if (job.companyType) main.appendChild(el("p", "job__note", job.companyType));

      var period = el("p", "job__period");
      period.appendChild(el("span", null, job.start + " — " + job.end));
      if (job.duration) {
        period.appendChild(el("span", "dot", "·"));
        period.appendChild(el("span", null, job.duration));
      }
      main.appendChild(period);

      if (job.location) main.appendChild(el("p", "job__location", job.location));
      if (job.summary) main.appendChild(el("p", "job__summary", job.summary));

      if (job.bullets && job.bullets.length) {
        var ul = el("ul", "job__bullets");
        job.bullets.forEach(function (text) { ul.appendChild(el("li", null, text)); });
        main.appendChild(ul);
      }

      if (job.skills && job.skills.length) {
        var chips = el("ul", "chips chips--sm");
        job.skills.forEach(function (skill) { chips.appendChild(el("li", "chip", skill)); });
        main.appendChild(chips);
      }

      li.appendChild(main);
      root.appendChild(li);
    });
  }

  function renderProjects() {
    var root = $("#projects");

    (data.projects || []).forEach(function (project) {
      var card = el("article", "project reveal");
      card.setAttribute("data-accent", project.accent || "blue");

      var thumb = el("div", "project__thumb");
      thumb.setAttribute("aria-hidden", "true");
      thumb.appendChild(el("span", "project__initials", initials(project.title)));
      card.appendChild(thumb);

      var body = el("div", "project__body");

      var meta = el("p", "project__meta");
      meta.appendChild(el("span", "project__tag", project.tag || "Project"));
      meta.appendChild(el("span", null, project.client + " · " + project.year));
      body.appendChild(meta);

      var heading = el("h3", "project__title");
      var link = el("a", "project__link", project.title);
      link.setAttribute("href", project.url || "#");
      heading.appendChild(link);
      body.appendChild(heading);

      body.appendChild(el("p", "project__summary", project.summary));

      if (project.tags && project.tags.length) {
        var chips = el("ul", "chips chips--sm");
        project.tags.forEach(function (tag) { chips.appendChild(el("li", "chip", tag)); });
        body.appendChild(chips);
      }

      card.appendChild(body);
      root.appendChild(card);
    });
  }

  function initials(text) {
    return text
      .split(/\s+/)
      .filter(function (word) { return /[a-zA-Z0-9]/.test(word.charAt(0)); })
      .slice(0, 2)
      .map(function (word) { return word.charAt(0).toUpperCase(); })
      .join("");
  }

  function renderEntries(rootSelector, items) {
    var root = $(rootSelector);
    if (!root) return;
    (items || []).forEach(function (item) {
      var li = el("li", "entry");
      li.appendChild(el("p", "entry__title", item.title));
      if (item.subtitle) li.appendChild(el("p", "entry__subtitle", item.subtitle));
      if (item.period) li.appendChild(el("p", "entry__period", item.period));
      if (item.note) li.appendChild(el("p", "entry__note", item.note));
      root.appendChild(li);
    });
  }

  function renderChips(rootSelector, items) {
    var root = $(rootSelector);
    if (!root) return;
    (items || []).forEach(function (label) { root.appendChild(el("li", "chip", label)); });
  }

  function renderSkills() {
    var root = $("#skills-list");
    (data.skills || []).forEach(function (skill) {
      var li = el("li", "skill");

      var head = el("div", "skill__head");
      head.appendChild(el("span", "skill__name", skill.name));
      li.appendChild(head);

      var bar = el("div", "skill__bar");
      bar.setAttribute("role", "img");
      bar.setAttribute("aria-label", skill.name + ": " + skill.level + " out of 100");
      var fill = el("span", "skill__fill");
      fill.style.setProperty("--level", skill.level + "%");
      bar.appendChild(fill);
      li.appendChild(bar);

      root.appendChild(li);
    });
  }

  function renderQuotes() {
    var root = $("#quotes");
    (data.quotes || []).forEach(function (quote) {
      var figure = el("figure", "quote reveal");
      figure.appendChild(el("blockquote", "quote__text", quote.text));
      var caption = el("figcaption", "quote__author");
      caption.appendChild(el("span", "quote__avatar", initials(quote.author)));
      var who = el("span", "quote__who");
      who.appendChild(el("strong", null, quote.author));
      who.appendChild(el("span", "quote__role", quote.role));
      caption.appendChild(who);
      figure.appendChild(caption);
      root.appendChild(figure);
    });
  }

  function renderContact() {
    var root = $("#contact-list");
    (data.contact || []).forEach(function (item) {
      var li = el("li", "contact__item");
      li.appendChild(icon(item.icon));

      var body = el("div");
      body.appendChild(el("span", "contact__label", item.label));
      if (item.href) {
        var link = el("a", "contact__value link", item.value);
        link.setAttribute("href", item.href);
        if (item.href.indexOf("http") === 0) {
          link.setAttribute("target", "_blank");
          link.setAttribute("rel", "noopener noreferrer");
        }
        body.appendChild(link);
      } else {
        body.appendChild(el("span", "contact__value", item.value));
      }

      li.appendChild(body);
      root.appendChild(li);
    });
  }

  /* ------------------------------------------------------------- behaviours */

  var THEME_KEY = "portfolio-theme";

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) { /* private mode */ }

    if (stored === "dark" || stored === "light") {
      document.documentElement.setAttribute("data-theme", stored);
    }

    $("#themeToggle").addEventListener("click", function () {
      var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var current = document.documentElement.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    });
  }

  function initNav() {
    var toggle = $("#navToggle");
    var bar = $("#topbar");

    toggle.addEventListener("click", function () {
      var open = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    $$(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        bar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    // Highlight the section currently in view.
    var sections = $$(".nav__link")
      .map(function (link) { return document.querySelector(link.getAttribute("href")); })
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || !sections.length) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        $$(".nav__link").forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { spy.observe(section); });
  }

  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (item) { item.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    items.forEach(function (item) { observer.observe(item); });
  }

  /* ------------------------------------------------------------------- boot */

  renderBindings();
  renderProfile();
  renderAbout();
  renderExperience();
  renderProjects();
  renderEntries("#education-list", data.education);
  renderEntries("#languages", data.languages);
  renderChips("#certifications", data.certifications);
  renderChips("#tools", data.tools);
  renderSkills();
  renderQuotes();
  renderContact();
  initTheme();
  initNav();
  initReveal();
})();
