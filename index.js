const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const authForm = document.querySelector("#authForm");
const demoForms = document.querySelectorAll("[data-demo-form]");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (authForm) {
  const storageKey = "helphub-demo-session";
  const demoUser = document.querySelector("#demoUser");
  const role = document.querySelector("#role");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");

  const restoreSession = () => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      const session = JSON.parse(saved);
      demoUser.value = session.demoUser || demoUser.value;
      role.value = session.role || role.value;
      email.value = session.email || email.value;
      password.value = session.password || password.value;
    } catch (error) {
      localStorage.removeItem(storageKey);
    }
  };

  restoreSession();

  authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const session = {
      demoUser: demoUser.value,
      role: role.value,
      email: email.value,
      password: password.value
    };

    localStorage.setItem(storageKey, JSON.stringify(session));
    window.location.href = "home.html";
  });
}

if (demoForms.length) {
  demoForms.forEach((form, index) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      localStorage.setItem(`helphub-demo-form-${index}`, JSON.stringify(payload));

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = "Saved";
        submitButton.disabled = true;

        window.setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;
        }, 1200);
      }
    });
  });
}
