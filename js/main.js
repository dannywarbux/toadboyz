/* FRÖGY · TOADBOYZ — site interactions */
(function () {
  'use strict';

  /* ---------- Age gate (21+) ---------- */
  var KEY = 'frogy_age_ok';
  var gate = document.getElementById('agegate');
  if (gate) {
    var ok = false;
    try { ok = localStorage.getItem(KEY) === '1'; } catch (e) {}
    if (ok) {
      gate.classList.add('hidden');
    } else {
      document.body.style.overflow = 'hidden';
      var yes = document.getElementById('age-yes');
      var no = document.getElementById('age-no');
      if (yes) yes.addEventListener('click', function () {
        try { localStorage.setItem(KEY, '1'); } catch (e) {}
        gate.classList.add('hidden');
        document.body.style.overflow = '';
      });
      if (no) no.addEventListener('click', function () {
        window.location.href = 'https://www.google.com';
      });
    }
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Header background on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.style.background = 'color-mix(in srgb, #0A0A0A 92%, transparent)';
      else header.style.background = 'color-mix(in srgb, #0A0A0A 72%, transparent)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Year in footer ---------- */
  var yr = document.querySelectorAll('[data-year]');
  yr.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
