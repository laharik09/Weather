async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherBox = document.getElementById("weatherBox");
    const notFound = document.getElementById("notFound");
    if (!city) return;

    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);

        if (!res.ok) throw new Error("Network error");

        const data = await res.json();

        if (!data || !data.current_condition || !data.current_condition[0]) {
            throw new Error("Invalid data");
        }

        const temp = data.current_condition[0].temp_C;
        const desc = data.current_condition[0].weatherDesc[0].value;
        const humidity = data.current_condition[0].humidity;
        const windSpeed = data.current_condition[0].windspeedKmph;

        let iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        if (desc.toLowerCase().includes("sun")) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if (desc.toLowerCase().includes("cloud")) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if (desc.toLowerCase().includes("rain")) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png";
        } else if (desc.toLowerCase().includes("snow")) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
        } else if (desc.toLowerCase().includes("mist")) {
            iconUrl = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png";
        }

        document.getElementById("weatherIcon").src = iconUrl;
        document.getElementById("temp").innerHTML = `${temp}°C`;
        document.getElementById("description").innerText = desc;
        document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
        document.getElementById("wind").innerText = `Wind Speed: ${windSpeed} km/h`;

        weatherBox.style.display = "flex";
        notFound.style.display = "none";
    } catch (err) {
        weatherBox.style.display = "none";
        notFound.style.display = "flex";
    }
}