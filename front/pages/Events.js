import "../style.css";

const apiUrl = "http://localhost:3000/api/events";
const token = localStorage.getItem("token");

const obtenerEventos = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("No se pudo obtener la lista de eventos");
    }
    const eventos = await response.json();
    return mostrarEventos(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error.message);
    return "";
  }
};

const mostrarEventos = (eventos) => {
  let eventosHTML = "";
  eventos.forEach((evento) => {
    eventosHTML += Event(evento);
  });
  return eventosHTML;
};

const Event = (evento) => {
  return `
    <div class="card">
      <h2>${evento.title}</h2>
      <p>Date: ${new Date(evento.date).toLocaleDateString()}</p>
      <p>Location: ${evento.location}</p>
      <p>Description: ${evento.description}</p>
      <div class="eventButtons">
        <button class="confirm-button" data-event-id="${
          evento._id
        }">Confirmar Asistencia</button>
        <button class="attendee-list" data-event-id="${
          evento._id
        }">Ver lista de asistentes</button>
      </div>
    </div>
  `;
};

document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("confirm-button")) {
    const eventId = event.target.dataset.eventId;
    if (token) {
      const response = await fetch(
        `http://localhost:3000/api/user/attendees/registered/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } else {
      const nombre = prompt("Ingrese su nombre:");
      const correo = prompt("Ingrese su correo:");
      if (nombre && correo) {
        const response = await fetch(
          `http://localhost:3000/api/user/attendees/${eventId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: nombre,
              email: correo,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      } else {
        console.error("Nombre y correo son requeridos");
      }
    }
  }
});

document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("attendee-list")) {
    const eventId = event.target.dataset.eventId;

    try {
      const response = await fetch(
        `http://localhost:3000/api/attendees/events/${eventId}`
      );
      const attendees = await response.json();
      if (!response.ok) {
        alert(attendees.message);
      } else {
        if (attendees.length > 0) {
          const numAttendees = attendees.length;
          alert(`Número de asistentes: ${numAttendees}`);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
});

export default obtenerEventos;
