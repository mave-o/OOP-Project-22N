/* ============================================================
   PORTFOLIO MAIN SCRIPT
   Handles: custom cursor, scroll reveals, tab switching,
            counter animation, card rendering
   ============================================================ */

"use strict";

/* ─── DATA STORE ───────────────────────────────────────────── */
const WORKS = {
  seatwork: [
    {
      id: "sw-1",
      title: "Seatwork 1 — Operators on Paper",
      file: "No PDF provided",
      reflection: "The first ever seatwork we had face-to-face, was us solving the output of the different operators applied on numbers. It made us think more carefully on how the different operators function in Java."
    },
    {
      id: "sw-2",
      title: "Seatwork 2 — Student Scholarship System on Paper",
      file: "No PDF provided",
      reflection: "The first time we wrote our program on paper. We were instructed to build our own student scholarship system on Java, on paper. We used our knowledge about scanner and the structure of Java to successfully hand write a program that achieves our goal. It was a tedious and challenging task, yet we managed to survive it."
    },
  ],
  quiz: [
    {
      id: "qz-1",
      title: "Quiz 1 — Midterm Quiz 1",
      file: "No PDF provided",
      reflection: "The first quiz we ever had in the subject was an assessment about our knowledge on the topic so far--mostly about the history and concepts tied to Java. It tested my knowledge about the topic and made me recall and reimagine the concepts within Java. Despite the difficulty, I managed to get a subpar score."
    },
    {
      id: "qz-2",
      title: "Quiz 2 — Midterm Quiz 2",
      file: "No PDF provided",
      reflection: "The second quiz focused primarily on the syntax of Java, and the different input methods to acquire user input from the terminal. This quiz was more challenging than the first one, as it focused more on the technical details of Java. However, I still got a satisfactory score despite the increased in difficulty."
    },
  ],
  activity: [
    {
      id: "ac-1",
      title: "Activity 1 — About me",
      file: "Sumayang_OOP2N_Asynch1.pdf",
      reflection: "The first activity we ever had in OOP made me ponder about the topics and lessons that we will discuss in the future, and the nature of the teacher that we will be teaching us. It unintentionally helped me create a road map for myself, as it further emphasized my interest on the subject."
    },
    {
      id: "ac-2",
      title: "Activity 2 — Introduction to Java",
      file: "Sumayang_OOP2N_Asynch2.pdf",
      reflection: "The second activity was more of an assignment conducted online. It made us think about the inner architecture of Java, and how they work together to achieve its platform independent and object oriented nature. It made me appreciate more the complexity, the design, and the engineering behind Java, while also helping me build a fundamental understanding of its inner structures."
    },
    {
      id: "ac-3",
      title: "Activity 3 — Code Analysis Activity",
      file: "2N_Sumayang_Kiel_CodeAnalysisActivity#1.pdf",
      reflection: "The third online activity we had in Java was about the different memory regions inside the JVM. We were instructed to identify and determine the different nature of the data and meta data within memory. It was a challenging task, as I had no clear understanding on how each memory work, or how Java handles the different types of variables. With a little bit of research and recall of the previous lessons, I managed to answer all the questions."
    },
    {
      id: "ac-4",
      title: "Activity 4 — Operators Activity",
      file: "2N_Sumayang_Kiel_OperatorsActivity#2.pdf",
      reflection: "This fourth activity was fairly simple as we were just instructed to observe the different nature of operators—such as the prefix and post fix. It was done with relative haste and ease."
    },
    {
      id: "ac-5",
      title: "Activity 5 — ATM Program Activity",
      file: "2N_Sumayang_Kiel_MidtermAct3.pdf",
      reflection: "The fifth activity was our second introduction to a more complex development of a system in Java. Luckily, the first complex system we had was enough to equip me for the second, making this activity fairly simple to do. Despite its simplicity, it still enforced my prior understanding about Java."
    }
    ,
    {
      id: "ac-6",
      title: "Activity 6 — Scholarship Program Activity",
      file: "2N_Sumayang_Kiel_MidtermAct4.pdf",
      reflection: "We were instructed to develop a system that determined the scholarship eligibility of an inputted student. I explored more about the different access modifier of the program: private, public, etc., and learned how helpful they can be when managing the different methods and variables of your code. It was medium in difficulty."
    }
    ,
    {
      id: "ac-7",
      title: "Activity 7 — Studnet Age Analyzer Program",
      file: "2N_Sumayang_Kiel_StudentAgeAnalyzer.pdf",
      reflection: "This was a fairly simple program—a big break from the usual complexity of the system we develop—as it mainly focused on if-else conditions."
    }
    ,
    {
      id: "ac-8",
      title: "Activity 8 — Expense Tracker Program",
      file: "ExpenseTrackerSumayang.pdf",
      reflection: "The final activity that we had for our midterm in OOP, was the expense tracker program. There wasn't so much of a difference in structure with this activity compared to our other activities. It was relatively easy, as by this point, I was already well versed in using the different operators and the Scanner method in Java."
    }
  ],
  exam: [
    {
      id: "ex-1",
      title: "Midterm Examination",
      file: "No PDF provided",
      reflection: "The Midterm examination was nerve wracking, as we didn't know the possible complexity of the programs that we will be instructed to write on the examination paper, nor the scope of the concepts included in the exam. Luckily, it was fairly simple than we expect, letting us finish the exam with ease."
    },
  ]
};

const BADGE_MAP = {
  seatwork: "badge-seatwork",
  quiz:     "badge-quiz",
  activity: "badge-activity",
  exam:     "badge-exam"
};

const ICONS = {
  seatwork: "📋",
  quiz:     "📝",
  activity: "🗂️",
  exam:     "📄"
};

/* ─── CUSTOM CURSOR ────────────────────────────────────────── */
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    ring.style.left = mx + 'px';
    ring.style.top  = my + 'px';
  });

  document.querySelectorAll('a, button, .work-card, .tab-btn, .counter-cube').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

/* ─── SCROLL REVEAL ────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

/* ─── COUNTER ANIMATION ────────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter-num[data-target]');
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target, 10);
        animateCounter(e.target, target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

/* ─── TAB SYSTEM ───────────────────────────────────────────── */
function buildCard(work, category) {
  return `
    <article class="work-card" role="listitem" aria-label="${work.title}">
      <div class="card-pdf">
        <div class="pdf-icon-wrap">
          <div class="pdf-icon">
            <span class="pdf-ext">PDF</span>
          </div>
          <span class="pdf-filename">${work.file}</span>
        </div>
        <div class="pdf-overlay">
          <button class="pdf-view-btn" onclick="window.open('{css,js,assets/Works/${work.file}', '_blank')">View PDF ↗</button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <h3 class="card-title">${work.title}</h3>
          <span class="card-badge ${BADGE_MAP[category]}">${category}</span>
        </div>
        <div class="card-reflection">
          <p class="reflection-label">Reflection</p>
          <p class="reflection-text">${work.reflection}</p>
        </div>
      </div>
    </article>
  `;
}

function renderCategory(category) {
  const panel = document.querySelector(`.category-panel[data-category="${category}"]`);
  if (!panel || panel.dataset.rendered) return;

  const items = WORKS[category] || [];
  if (items.length === 0) {
    panel.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${ICONS[category]}</div>
        <p>No ${category}s added yet.</p>
      </div>`;
  } else {
    panel.innerHTML = items.map(w => buildCard(w, category)).join('');
  }
  panel.dataset.rendered = 'true';
}

function switchTab(tabName) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
    btn.setAttribute('aria-selected', btn.dataset.tab === tabName);
  });

  // Update panels
  document.querySelectorAll('.category-panel').forEach(panel => {
    const isActive = panel.dataset.category === tabName;
    panel.classList.toggle('active', isActive);
    if (isActive) panel.setAttribute('aria-hidden', 'false');
    else          panel.setAttribute('aria-hidden', 'true');
  });

  // Mark grid with active for CSS scoping
  const grid = document.getElementById('works-grid');
  if (grid) grid.dataset.active = tabName;

  // Render cards if not yet built
  renderCategory(tabName);
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });
  // Render first tab
  switchTab('seatwork');
}

/* ─── LOAD BAR ─────────────────────────────────────────────── */
function initLoadBar() {
  const bar = document.createElement('div');
  bar.className = 'load-bar';
  document.body.prepend(bar);
  setTimeout(() => bar.remove(), 1400);
}

/* ─── NAVBAR ───────────────────────────────────────────────── */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('nav-burger');
  const drawer  = document.getElementById('nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!navbar) return;

  // ── Scroll: add .scrolled class ──
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // ── Active link highlighting based on scroll position ──
  function updateActiveLink() {
    const sections = ['student-info', 'works', 'contact'];
    let current = 'student-info';

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });

    navLinks.forEach(link => {
      const section = link.dataset.section;
      link.classList.toggle('active', section === current);
    });
  }

  // ── Works tab links: scroll + switch tab ──
  [...navLinks, ...drawerLinks].forEach(link => {
    const tabTarget = link.dataset.tabTarget;
    if (!tabTarget) return;

    link.addEventListener('click', e => {
      e.preventDefault();
      const worksEl = document.getElementById('works');
      if (worksEl) {
        worksEl.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => switchTab(tabTarget), 300);
      }
      // close drawer if open
      closeDrawer();
    });
  });

  // ── Mobile burger ──
  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => {
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });

  // Close drawer when a non-tab drawer link is clicked
  drawerLinks.forEach(link => {
    if (!link.dataset.tabTarget) {
      link.addEventListener('click', closeDrawer);
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) closeDrawer();
  });
}

/* ─── BOOT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoadBar();
  initNavbar();
  initCursor();
  initReveal();
  initCounters();
  initTabs();
});
