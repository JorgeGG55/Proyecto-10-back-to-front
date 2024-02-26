const MainContent = () => {
  return `
    <div id="contenido-principal">
      <div>
        <h2>Bienvenido a Event Click</h2>
        <p>Event Click es un lugar donde puedes crear eventos y compartirlos con otros usuarios. ¡Únete a la diversión!</p>
        <p>Para ver los eventos de otros usuarios, simplemente haz clic en "Events".</p>
        <p>Para poder crear y gestionar tus propios eventos, necesitas registrarte e iniciar sesión.</p>
      </div>
      <div>
        <img src="/assets/male.png"></img>
      </div>
    </div>
    <div id="contenido-eventos"></div>
    <div id="contenido-perfil"></div>
  `;
};

export default MainContent;
