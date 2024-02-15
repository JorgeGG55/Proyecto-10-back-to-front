const handleCreateEvent = async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const description = document.getElementById("description").value;

  try {
    const response = await fetch("http://localhost:3000/api/user/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ title, date, location, description }),
    });

    const responseData = await response.json();

    if (response.ok) {
      alert("Evento creado exitosamente");
      window.location.reload();
    } else {
      alert("Error al crear el evento: " + responseData.message);
    }
  } catch (error) {
    console.error("Error during event creation:", error);
    alert(
      "Error durante la creación del evento. Por favor, inténtalo de nuevo más tarde."
    );
  }
};

document.addEventListener("submit", function (event) {
  if (event.target && event.target.id === "create-event-form") {
    handleCreateEvent(event);
  }
});

const CreateEvent = () => {
  return `
    <form id="create-event-form">
      <label for="title">Event Title:</label>
      <input type="text" id="title" name="title" required><br>
      <label for="date">Date:</label>
      <input type="date" id="date" name="date" required><br>
      <label for="location">Location:</label>
      <input type="text" id="location" name="location" required><br>
      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea><br><br>
      <button type="submit" id="create-event-button">Create Event</button>
    </form>
  `;
};

export default CreateEvent;
