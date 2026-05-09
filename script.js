const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const navLinks = document.querySelectorAll(".right a");
const footerLinks = document.querySelectorAll(".footer-section a");
const backToTopButton = document.getElementById("back-to-top");
const toastContainer = document.getElementById("toast-container");

const openAuthModalButton = document.getElementById("open-auth-modal");
const closeAuthModalButton = document.getElementById("close-auth-modal");
const authModal = document.getElementById("auth-modal");
const switchAuthModeButton = document.getElementById("switch-auth-mode");
const authTitle = document.getElementById("auth-title");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const logoutButton = document.getElementById("logout-btn");
const welcomeUser = document.getElementById("welcome-user");

let isLoginMode = true;

function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

if (toggle && menu) {
    toggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

[...navLinks, ...footerLinks].forEach((link) => {
    link.addEventListener("click", () => {
        if (menu) menu.classList.remove("active");
    });
});

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    btn.addEventListener("click", () => {
        faqItems.forEach((faq) => {
            if (faq !== item) faq.classList.remove("active");
        });
        item.classList.toggle("active");
    });
});

const serviceCards = document.querySelectorAll(".service-card");
const doctorCards = document.querySelectorAll(".profile-card");
const serviceSelect = document.getElementById("service-type");
const notesInput = document.getElementById("notes");
const appointmentSection = document.getElementById("appointment");

function goToAppointment(serviceName, doctorName = "") {
    if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
    }
    if (notesInput && doctorName) {
        const existingText = notesInput.value.trim();
        const doctorNote = `Preferred vet: ${doctorName}`;
        notesInput.value = existingText ? `${existingText}. ${doctorNote}` : doctorNote;
    }
    if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: "smooth" });
    }
}

function addCardAction(card, callback) {
    card.addEventListener("click", callback);
    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            callback();
        }
    });
}

serviceCards.forEach((card) => {
    addCardAction(card, () => {
        const selectedService = card.getAttribute("data-service") || "";
        goToAppointment(selectedService);
        showToast(`${selectedService} selected. Complete booking details.`);
    });
});

doctorCards.forEach((card) => {
    addCardAction(card, () => {
        const selectedDoctor = card.getAttribute("data-doctor") || "";
        goToAppointment("", selectedDoctor);
        showToast(`${selectedDoctor} added as preferred vet.`);
    });
});

const testimonials = [
    {
        text: '"The doctor was kind and explained everything in detail. My dog recovered quickly."',
        author: "- Neha and Bruno"
    },
    {
        text: '"Excellent doorstep vaccination service. Very punctual and gentle with my cat."',
        author: "- Arjun and Miso"
    },
    {
        text: '"Online consultation helped us during late hours. Very helpful and professional team."',
        author: "- Priya and Coco"
    }
];

let currentTestimonial = 0;
const testimonialText = document.getElementById("testimonial-text");
const testimonialAuthor = document.getElementById("testimonial-author");
const prevButton = document.getElementById("prev-testimonial");
const nextButton = document.getElementById("next-testimonial");

function renderTestimonial(index) {
    if (!testimonialText || !testimonialAuthor) return;
    testimonialText.textContent = testimonials[index].text;
    testimonialAuthor.textContent = testimonials[index].author;
}

if (prevButton && nextButton) {
    prevButton.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    nextButton.addEventListener("click", () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
    });

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
    }, 5000);
}

const appointmentForm = document.getElementById("appointment-form");
const formMessage = document.getElementById("form-message");

function showFormMessage(message, type) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
}

if (appointmentForm) {
    appointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const ownerName = document.getElementById("owner-name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const petName = document.getElementById("pet-name").value.trim();
        const petType = document.getElementById("pet-type").value;
        const serviceType = document.getElementById("service-type").value;
        const visitDate = document.getElementById("visit-date").value;
        const visitTime = document.getElementById("visit-time").value;

        if (!ownerName || !phone || !email || !petName || !petType || !serviceType || !visitDate || !visitTime) {
            showFormMessage("Please fill all required fields before booking.", "error");
            showToast("Fill all booking details first.", "error");
            return;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            showFormMessage("Phone number must be exactly 10 digits.", "error");
            showToast("Phone number must be 10 digits.", "error");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormMessage("Please enter a valid email address.", "error");
            showToast("Enter a valid email address.", "error");
            return;
        }

        showFormMessage("Appointment request submitted successfully!", "success");
        showToast("Appointment booked successfully!");
        appointmentForm.reset();
    });
}

function openAuthModal() {
    if (authModal) authModal.classList.add("open");
}

function closeAuthModal() {
    if (authModal) authModal.classList.remove("open");
}

function switchAuthMode() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        authTitle.textContent = "Login";
        loginForm.classList.remove("hidden");
        registerForm.classList.add("hidden");
        switchAuthModeButton.textContent = "Create a new account";
    } else {
        authTitle.textContent = "Register";
        registerForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        switchAuthModeButton.textContent = "Already have an account? Login";
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem("pawsdocUsers")) || [];
}

function setUsers(users) {
    localStorage.setItem("pawsdocUsers", JSON.stringify(users));
}

function updateAuthUI() {
    const loggedInUser = localStorage.getItem("pawsdocLoggedInUser");
    if (loggedInUser) {
        openAuthModalButton.style.display = "none";
        logoutButton.style.display = "inline-block";
        welcomeUser.style.display = "inline-block";
        welcomeUser.textContent = `Welcome, ${loggedInUser}`;
    } else {
        openAuthModalButton.style.display = "inline-block";
        logoutButton.style.display = "none";
        welcomeUser.style.display = "none";
        welcomeUser.textContent = "";
    }
}

if (openAuthModalButton) openAuthModalButton.addEventListener("click", openAuthModal);
if (closeAuthModalButton) closeAuthModalButton.addEventListener("click", closeAuthModal);
if (switchAuthModeButton) switchAuthModeButton.addEventListener("click", switchAuthMode);

if (authModal) {
    authModal.addEventListener("click", (event) => {
        if (event.target === authModal) closeAuthModal();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && authModal && authModal.classList.contains("open")) {
        closeAuthModal();
    }
});

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim().toLowerCase();
        const password = document.getElementById("register-password").value.trim();

        if (!name || !email || !password) {
            showToast("Please fill all register fields.", "error");
            return;
        }

        const users = getUsers();
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            showToast("User already exists. Please login.", "error");
            return;
        }

        users.push({ name, email, password });
        setUsers(users);
        showToast("Registration successful! Please login.");
        registerForm.reset();
        if (!isLoginMode) switchAuthMode();
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value.trim().toLowerCase();
        const password = document.getElementById("login-password").value.trim();
        const users = getUsers();

        const matchedUser = users.find((user) => user.email === email && user.password === password);
        if (!matchedUser) {
            showToast("Invalid email or password.", "error");
            return;
        }

        localStorage.setItem("pawsdocLoggedInUser", matchedUser.name);
        showToast(`Welcome back, ${matchedUser.name}!`);
        loginForm.reset();
        closeAuthModal();
        updateAuthUI();
    });
}

if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("pawsdocLoggedInUser");
        updateAuthUI();
        showToast("Logged out successfully.");
    });
}

const passwordToggleButtons = document.querySelectorAll(".password-toggle");
passwordToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const inputId = button.getAttribute("data-target");
        const input = document.getElementById(inputId);
        if (!input) return;
        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
});

const revealElements = document.querySelectorAll("#main, .section-wrap, .footer");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

const sectionIds = ["main", "services-section", "about", "why-choose", "doctors", "appointment", "contact", "cta"];
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("active-link");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active-link");
                }
            });
        }
    });
}, { threshold: 0.45 });

sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) sectionObserver.observe(section);
});

window.addEventListener("scroll", () => {
    if (!backToTopButton) return;
    if (window.scrollY > 350) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

updateAuthUI();
