const obtenerUsuario = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/user/", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    });

    let inputsHTML = "<h2>Profile Data</h2>";

    if (response.ok) {
      const userData = await response.json();

      inputsHTML += `
                <div>
                    <p>${userData.name}</p>
                </div>
                <div>
                    <p>${userData.email}</p>
                </div>
            `;
    } else {
      console.error(
        "Error al obtener los datos del usuario:",
        response.statusText
      );
    }
    return inputsHTML;
  } catch (error) {
    console.error("Ocurrió un error al realizar la solicitud:", error);
  }
};

export default obtenerUsuario;
