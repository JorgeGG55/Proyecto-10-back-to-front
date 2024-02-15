const obtenerEventosUsuario = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return "<p>Please log in to view your events.</p>";
  }

  try {
    const response = await fetch("http://localhost:3000/api/user/events/", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    if (!data.events || data.events.length === 0) {
      return "<p class='myEventsMsg'>No estás asistiendo a ningún evento.</p>";
    }

    const events = data.events;

    let eventsHTML = "";
    events.forEach((event) => {
      eventsHTML += `
        <div class="card">
          <h2>${event.title}</h2>
          <p><strong>Date:</strong> ${new Date(
            event.date
          ).toLocaleDateString()}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Description:</strong> ${event.description}</p>
          <button class="cancel-button" data-event-id="${
            event._id
          }">Cancelar Asistencia</button>
        </div>
      `;
    });
    return eventsHTML;
  } catch (error) {
    console.error("Error fetching user events:", error);
    return "<p>Failed to fetch user events. Please try again later.</p>";
  }
};

document.addEventListener("click", async function (event) {
  if (event.target.classList.contains("cancel-button")) {
    const eventId = event.target.dataset.eventId;
    console.log(`hola ${eventId}`);
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/attendees/registered/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error cancelling attendance:", error);
    }
  }
});

export default obtenerEventosUsuario;
