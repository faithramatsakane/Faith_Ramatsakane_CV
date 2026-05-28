// Detect user location
navigator.geolocation.getCurrentPosition(success, error);

function success(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);

    // Your REAL OpenWeather API key
    const apiKey = "ccc3a69d84bab8ed13ae203e3b486332";

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            const city = data.name;
            const country = data.sys.country;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;

            document.getElementById("location").innerHTML =
                `Location: ${city}, ${country}`;

            document.getElementById("weather").innerHTML =
                `
                Weather: ${temp}°C | ${description}
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                `;

            const now = new Date();

            document.getElementById("datetime").innerHTML =
                `Date & Time: ${now.toLocaleString()}`;
        })
        .catch(err => {
            console.log(err);
        });
}

function error() {
    alert("Location access denied.");
}