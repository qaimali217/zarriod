// App Data for Dynamic Modals
const APP_DETAILS = {
  aetherflow: {
    title: "AetherFlow",
    tagline: "Immersive ambient focus spaces",
    icon: "🌀",
    bg: "linear-gradient(135deg, hsl(174, 90%, 50%), hsl(220, 80%, 40%))",
    techStack: ["iOS", "SwiftUI", "CoreAudio", "Web Audio API", "HTML5"],
    description: "AetherFlow helps you carve out personal bubbles of productivity in loud environments. By utilizing binaural beats, procedurally generated white noise, and immersive graphical weather landscapes, it creates a custom-tailored environment suited to deep coding sessions, writing marathons, or meditative resets.",
    features: [
      "Procedurally generated ambient noise engines (Rain, Cosmic hum, Deep ocean)",
      "Binaural beats frequency selector (Alpha, Beta, Theta waves)",
      "Minimalist HUD interface that stays out of your way",
      "Custom integrated Pomodoro and timer scripts",
      "Interactive fluid simulation that reacts to your mouse/touch movements"
    ],
    ctaText: "Open Web Player (Beta)",
    version: "v2.4.0 (Latest)"
  },
  novalist: {
    title: "NovaList",
    tagline: "Blazing-fast, keyboard-first task planning",
    icon: "⚡",
    bg: "linear-gradient(135deg, hsl(263, 90%, 60%), hsl(328, 100%, 60%))",
    techStack: ["React", "Electron", "LocalForage", "TailwindCSS", "Vite"],
    description: "NovaList redefines your checklist experience. Designed specifically for developers and power users, NovaList removes all mouse dependency. Fire commands, navigate project logs, re-order queues, and log micro-notes using an intuitive fuzzy-search command panel.",
    features: [
      "Instant launch and global shortcut activation",
      "Command bar launcher (Cmd/Ctrl + K) for lighting fast sorting",
      "Full offline functionality with automatic local syncing",
      "Vim-inspired hotkeys for advanced keyboard wizards",
      "Clean export options supporting markdown, JSON, and CSV tables"
    ],
    ctaText: "Download for Desktop",
    version: "v1.1.2 (Beta)"
  },
  zenithreader: {
    title: "Zenith Reader",
    tagline: "Distraction-free news reading",
    icon: "📖",
    bg: "linear-gradient(135deg, hsl(328, 100%, 60%), hsl(174, 90%, 50%))",
    techStack: ["Flutter", "Dart", "SQLite", "Python Summary API"],
    description: "Zenith Reader compiles all your informational inputs into a unified, clean feed. Rather than tracking clicks and optimizing algorithms to waste your time, Zenith focuses on calmness. Subscribed newsletter items and RSS streams are reformatted into pure typographic layouts with locally cached text summarizations.",
    features: [
      "Intelligent text extraction that bypasses page paywalls and trackers",
      "Local AI-driven brief summarization (No API keys or cloud transfers required)",
      "Highly customizable typography, font sizing, and line heights",
      "Offline sync to pre-fetch reading lists for offline trips",
      "Zero telemetry, zero user identification, zero tracking cookies"
    ],
    ctaText: "Get App Store Build",
    version: "v3.0.5 (Staging)"
  },
  pickvault: {
    title: "PickVault",
    tagline: "Manage planned purchases and wishlists",
    icon: "📦",
    bg: "linear-gradient(135deg, hsl(174, 90%, 50%), hsl(263, 90%, 60%))",
    techStack: ["Android", "Java/Kotlin", "SQLite", "Offline-First"],
    description: "PickVault is a simple, clean, and free Android utility designed to take the impulse out of shopping. By providing a dedicated, permission-free sandbox to document, budget, and evaluate planned purchases, PickVault helps you make intentional acquisitions at your own pace without sharing your data.",
    features: [
      "Create custom collections ('Picks') with targets, categories, budgets, and icons",
      "Track brands, price ranges, URLs, notes, and research summaries per item",
      "Set preferred selections within a collection to track top purchase contenders",
      "100% offline local database with zero permissions or internet connection needed",
      "Completely free, with zero ads, third-party analytics, or hidden charges"
    ],
    ctaText: "Get PickVault on Uptodown",
    ctaLink: "https://pickvault.en.uptodown.com/android",
    version: "v1.0.3 (Latest)"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Ambient Mouse Glow Tracking
  const cursorGlow = document.getElementById("cursorGlow");
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.opacity = "1";
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mouseleave", () => {
      cursorGlow.style.opacity = "0";
    });
  }

  // 2. Navigation Header Scroll Effect
  const header = document.getElementById("mainHeader");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // 4. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Dynamic Modal Dialog Handling
  const modalOverlay = document.getElementById("appModal");
  const modalClose = document.getElementById("modalClose");
  const modalBody = document.getElementById("modalBody");
  const detailsButtons = document.querySelectorAll(".btn-details");

  const openAppModal = (appKey) => {
    const data = APP_DETAILS[appKey];
    if (!data) return;

    // Inject content
    modalBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.5rem;">
        <div class="app-icon" style="background: ${data.bg}; width: 64px; height: 64px; font-size: 2rem;">${data.icon}</div>
        <div>
          <h3 class="modal-title">${data.title}</h3>
          <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-top: -0.25rem;">${data.tagline}</p>
        </div>
      </div>

      <div class="modal-tech-stack">
        ${data.techStack.map(tech => `<span class="app-tag" style="background: rgba(0, 242, 254, 0.05); border-color: rgba(0, 242, 254, 0.15); color: var(--primary);">${tech}</span>`).join('')}
        <span class="app-tag" style="margin-left: auto; color: var(--text-muted); font-size: 0.8rem;">${data.version}</span>
      </div>

      <p class="modal-desc">${data.description}</p>

      <div class="modal-features">
        <h4>Key Features</h4>
        <ul class="modal-features-list">
          ${data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        ${data.ctaLink ? 
          `<a class="btn btn-primary" href="${data.ctaLink}" target="_blank" rel="noopener" onclick="window.closeAppModal()">${data.ctaText}</a>` :
          `<button class="btn btn-primary" onclick="window.triggerMockToast('Downloading ${data.title}... Launching build installer.')">${data.ctaText}</button>`
        }
        <button class="btn btn-secondary" onclick="window.closeAppModal()">Close details</button>
      </div>
    `;

    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  };

  const closeAppModal = () => {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable scroll
  };

  // Expose global triggers for buttons generated inside modal HTML
  window.closeAppModal = closeAppModal;
  window.triggerMockToast = (msg) => {
    closeAppModal();
    showToast(msg);
  };

  detailsButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const appKey = btn.getAttribute("data-app");
      openAppModal(appKey);
    });
  });

  // Allow clicking outer overlay to close modal
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeAppModal();
  });

  modalClose.addEventListener("click", closeAppModal);

  // Esc key closure
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
      closeAppModal();
    }
  });

  // 6. Contact Form Validation and Mock Submission
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");

  const showToast = (message) => {
    toastText.textContent = message;
    toast.classList.add("active");
    setTimeout(() => {
      toast.classList.remove("active");
    }, 4000);
  };

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    // Simple validation feedback
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showToast("Please fill in all details before submitting.");
      return;
    }

    if (!validateEmail(emailInput.value)) {
      showToast("Please supply a valid email address.");
      return;
    }

    // Submit state change
    const btnSpan = submitBtn.querySelector("span");
    const originalText = btnSpan.textContent;
    btnSpan.textContent = "Sending Message...";
    submitBtn.disabled = true;

    // Simulate network delay
    setTimeout(() => {
      showToast(`Thank you, ${nameInput.value}! Message received successfully.`);
      contactForm.reset();
      btnSpan.textContent = originalText;
      submitBtn.disabled = false;
    }, 1200);
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
