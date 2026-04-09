const form = document.getElementById("prediction-form");
const resultElement = document.getElementById("result");
const exampleButtons = document.querySelectorAll(".example-button");

const apiUrl = "http://127.0.0.1:8001/predict";

const examples = {
  SEKER: {
    Area: 28395,
    Perimeter: 610.291,
    MajorAxisLength: 208.17811670852728,
    MinorAxisLength: 173.88874704163598,
    AspectRation: 1.1971914241160242,
    Eccentricity: 0.5498121871383472,
    ConvexArea: 28715,
    EquivDiameter: 190.1410972745107,
    Extent: 0.7639225181598063,
    Solidity: 0.9888559986069998,
    roundness: 0.9580271262501276,
    Compactness: 0.9133577547957626,
    ShapeFactor1: 0.007331506135183212,
    ShapeFactor2: 0.00314728916733569,
    ShapeFactor3: 0.8342223882455564,
    ShapeFactor4: 0.9987238890131684
  },
  HOROZ: {
    Area: 33006,
    Perimeter: 710.496,
    MajorAxisLength: 283.0203846998961,
    MinorAxisLength: 149.62371856555887,
    AspectRation: 1.8915475929432164,
    Eccentricity: 0.84882891532034,
    ConvexArea: 33354,
    EquivDiameter: 204.99888881047326,
    Extent: 0.6354762317333795,
    Solidity: 0.9895664687893506,
    roundness: 0.8216360477301875,
    Compactness: 0.7243255252721325,
    ShapeFactor1: 0.008574816236438711,
    ShapeFactor2: 0.0014559274841805731,
    ShapeFactor3: 0.5246474665607507,
    ShapeFactor4: 0.9923956525167446
  },
  CALI: {
    Area: 45504,
    Perimeter: 793.417,
    MajorAxisLength: 295.4698305520384,
    MinorAxisLength: 196.3118224893667,
    AspectRation: 1.5051046177722822,
    Eccentricity: 0.7473721581277368,
    ConvexArea: 45972,
    EquivDiameter: 240.70208192624517,
    Extent: 0.7377790748577265,
    Solidity: 0.9898198903680501,
    roundness: 0.9083567245276849,
    Compactness: 0.8146418247728765,
    ShapeFactor1: 0.0064932715926520395,
    ShapeFactor2: 0.0017640469732470574,
    ShapeFactor3: 0.6636413026692821,
    ShapeFactor4: 0.9988495891919492
  },
  BOMBAY: {
    Area: 114004,
    Perimeter: 1279.356,
    MajorAxisLength: 451.3612557792678,
    MinorAxisLength: 323.7479960574839,
    AspectRation: 1.3941746706568812,
    Eccentricity: 0.6967950943084995,
    ConvexArea: 115298,
    EquivDiameter: 380.9913398726899,
    Extent: 0.7489866041219098,
    Solidity: 0.9887769085326719,
    roundness: 0.8752802579062288,
    Compactness: 0.8440940266680944,
    ShapeFactor1: 0.003959170342964,
    ShapeFactor2: 0.0012397875137779369,
    ShapeFactor3: 0.7124947258567577,
    ShapeFactor4: 0.9933420997661099
  }
};

function fillForm(exampleData, label) {
  Object.entries(exampleData).forEach(([key, value]) => {
    const input = document.getElementById(key);
    if (input) {
      input.value = value;
    }
  });

  resultElement.textContent = `Exemplo ${label} carregado. Clique em "Prever variedade".`;
}

exampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const exampleName = button.dataset.example;
    fillForm(examples[exampleName], exampleName);
  });
});

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
