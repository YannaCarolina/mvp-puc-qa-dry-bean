const form = document.getElementById("prediction-form");
const resultElement = document.getElementById("result");

const apiUrl = "http://127.0.0.1:8001/predict";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {};

  formData.forEach((value, key) => {
    payload[key] = Number(value);
  });

  resultElement.textContent = "Processando previsão...";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Não foi possível obter a previsão.");
    }

    const data = await response.json();
    resultElement.textContent = `Classe prevista: ${data.predicted_class}`;
  } catch (error) {
    resultElement.textContent = "Erro ao conectar com a API.";
    console.error(error);
  }
});

