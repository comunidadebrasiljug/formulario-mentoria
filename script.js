function mostrarOutroCampo() {
    const select = document.getElementById("areaSelect");
    const outroCampo = document.getElementById("outroCampo");

    if (select.value === "Outro") {
      outroCampo.style.display = "block"; 
    } else {
      outroCampo.style.display = "none";
    }
  }

function mostrarPopup(mensagem) {
    const popup = document.getElementById('successPopup');
    const popupMessage = document.getElementById('popupMessage');
    
    popupMessage.innerText = mensagem;
    popup.style.display = 'flex';
}

function fecharPopup() {
    const popup = document.getElementById('successPopup');
    popup.style.display = 'none';

    const formulario = document.getElementById('mentorForm');
    formulario.reset();

    const outroCampo = document.getElementById('outroCampo');
    outroCampo.style.display = 'none';
}

document.getElementById('mentorForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formData = {
      nome: document.querySelector('input[name="nome"]').value,
      email: document.querySelector('input[name="email"]').value,
      perfil: document.querySelector('input[name="perfil"]').value,
      area: document.getElementById('areaSelect').value,
      areaOutro: document.querySelector('input[name="area_outro"]').value,
      disponibilidade: document.querySelector('input[name="disponibilidade"]').value,
      motivo: document.querySelector('textarea[name="motivo"]').value,
    };

    const apiUrl = 'http://localhost:8080/api/formulario/mentor';
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.text();
    })
    .then(data => {
        mostrarPopup(data); 
    })
    .catch(error => {
        console.error('Erro:', error);
        mostrarPopup('Erro ao enviar a inscrição: ' + error.message);
    });
});
