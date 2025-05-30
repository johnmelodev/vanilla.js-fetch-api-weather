// Já coloca o async aqui do lado do event
document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();
  // valeu pega o valor do input
  const cityName = document.querySelector("#city_name").value;

  if (!cityName) {
    // ai eu uso a funcao criada abaixo que o showalert vai ser uma modificacao no HTML
    document.querySelector("#weather").classList.remove("show");
    showAlert(`
        digite o nome de uma cidade
        `);
    return;
  }

  // aqui temos a url da api key
  const apiKey = "8a60b2de14f7a17c7a11706b2cfcd87c";
  // O encode URI Faz com que pedimos textos normais digitados no campo e transforme linguagem web com url
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&Lang=pt-br`;

  const results = await fetch(apiUrl);
  const json = await results.json();

  if (json.cod === 200) {
    showInfo({
      city: json.name,
      country: json.sys.country,
      temperature: json.main.temp,
      temperatureMax: json.main.temp_max,
      temperatureMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  } else {
    document.querySelector("#weather").classList.remove("show");
    showAlert(`
        <p>Não foi possível localizar os dados</p>
        <img src="src/images/error_image.svg" alt="error image">
      `);
  }
});

function showInfo(json) {
  showAlert("");
  document.querySelector("#weather").classList.add("show");

  document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
  document.querySelector("#temperature-value").innerHTML = `${json.temperature
    // Arredonda a temperatura para 1 casa decimal
    // .toFixed(1)

    // Converte o número para string (na verdade, toFixed já retorna string, então esse .toString() é redundante aqui)
    // .toString()

    // Substitui o ponto decimal por vírgula (estilo brasileiro)
    // .replace(".", ",")
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#temperature-max").innerHTML = `${json.temperatureMax
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#temperature-min").innerHTML = `${json.temperatureMin
    .toFixed(1)
    .toString()
    .replace(".", ",")} <sup>C°</sup>`;
  document.querySelector("#humidity").innerHTML = `${json.humidity}%`;

  document.querySelector("#wind").innerHTML = `${json.windSpeed} km/h`;

  document.querySelector("#temperature-image").setAttribute(
    "src",
    `
    https://openweathermap.org/img/wn/${json.tempIcon}@2x.png
    `
  );
}

// innerHTML serve para escrever dentro da div do id selecionado
function showAlert(message) {
  document.querySelector("#alert").innerHTML = message;
}
