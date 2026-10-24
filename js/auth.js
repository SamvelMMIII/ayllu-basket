const tabs = [...document.querySelectorAll(".auth-tab")];
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const feedback = document.querySelector("#form-feedback");
const title = document.querySelector("#form-title");
const subtitle = document.querySelector("#form-subtitle");

function setMode(mode, moveFocus = false) {
  const isLogin = mode === "login";
  const activeForm = isLogin ? loginForm : registerForm;
  const inactiveForm = isLogin ? registerForm : loginForm;
  activeForm.classList.remove("is-hidden");
  inactiveForm.classList.add("is-hidden");

  tabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  title.innerHTML = isLogin ? "Qué bueno tenerte<br />en el equipo." : "Solicita acceso<br />para tu familia.";
  subtitle.textContent = isLogin
    ? "Ingresa a tu cuenta o solicita acceso para tu familia."
    : "El club validará la solicitud y la vinculará con un jugador inscrito.";
  feedback.textContent = "";
  if (moveFocus) tabs.find((tab) => tab.dataset.mode === mode)?.focus();
}

function handleTabKeydown(event) {
  const currentIndex = tabs.indexOf(event.currentTarget);
  let nextIndex;
  if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
  else if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  else if (event.key === "Home") nextIndex = 0;
  else if (event.key === "End") nextIndex = tabs.length - 1;
  else return;

  event.preventDefault();
  setMode(tabs[nextIndex].dataset.mode, true);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setMode(tab.dataset.mode));
  tab.addEventListener("keydown", handleTabKeydown);
});

document.querySelectorAll(".official-logo").forEach((logo) => {
  const showLogo = () => logo.closest(".brand")?.classList.add("logo-ready");
  logo.addEventListener("load", showLogo, { once: true });
  if (logo.complete && logo.naturalWidth > 0) showLogo();
});

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.closest(".input-wrap").querySelector("input");
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.textContent = showing ? "Ver" : "Ocultar";
    button.setAttribute("aria-label", showing ? "Mostrar contraseña" : "Ocultar contraseña");
  });
});

document.querySelector("[data-action='forgot']").addEventListener("click", () => {
  feedback.textContent = "Para recuperar tu acceso, escribe a ayllubasket@gmail.com.";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Prototipo visual: el inicio de sesión aún no está conectado.";
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Solicitud de demostración; no se enviaron tus datos al club.";
});