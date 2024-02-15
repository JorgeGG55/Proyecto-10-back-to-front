import "./style.css";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEvent from "./pages/createEvent";
import obtenerEventos from "./pages/Events";
import obtenerEventosUsuario from "./pages/myEvents";
import obtenerUsuario from "./pages/user";

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#app").innerHTML = `
        ${Header()}
        ${MainContent()}
        ${Footer()}
    `;

  const renderLoginForm = () => {
    document.getElementById("contenido-principal").innerHTML = Login();
    document.getElementById("contenido-eventos").innerHTML = "";
  };

  const renderRegisterForm = () => {
    document.getElementById("contenido-principal").innerHTML = Register();
    document.getElementById("contenido-eventos").innerHTML = "";
  };

  const renderCreateEventForm = () => {
    document.getElementById("contenido-principal").innerHTML = CreateEvent();
    document.getElementById("contenido-eventos").innerHTML = "";
  };

  const renderEvents = async () => {
    const eventosHTML = await obtenerEventos();
    document.getElementById("contenido-eventos").innerHTML = eventosHTML;
    document.getElementById("contenido-principal").innerHTML = "";
  };

  const renderUserEvents = async () => {
    const userEventosHTML = await obtenerEventosUsuario();
    document.getElementById("contenido-eventos").innerHTML = userEventosHTML;
    document.getElementById("contenido-principal").innerHTML = "";
  };

  const renderUser = async () => {
    const userHTML = await obtenerUsuario();
    document.getElementById("contenido-eventos").innerHTML = "";
    document.getElementById("contenido-principal").innerHTML = userHTML;
  };

  const logoutFunc = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  document.addEventListener("click", async (event) => {
    if (event.target.matches("#login-link")) {
      event.preventDefault();
      renderLoginForm();
    } else if (event.target.matches("#register-link")) {
      event.preventDefault();
      renderRegisterForm();
    } else if (event.target.matches("#logout-link")) {
      event.preventDefault();
      logoutFunc();
    } else if (event.target.matches("#create-event-link")) {
      event.preventDefault();
      renderCreateEventForm();
    } else if (event.target.matches("#events-link")) {
      event.preventDefault();
      await renderEvents();
    } else if (event.target.matches("#my-events-link")) {
      event.preventDefault();
      await renderUserEvents();
    } else if (event.target.matches("#profile-link")) {
      event.preventDefault();
      await renderUser();
    }
  });
});
