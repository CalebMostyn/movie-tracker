async function fetchHtml(username) {
    try {
        const response = await fetch(`php/api.php?username=${username}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Error fetching HTML:", error);
        return null;
    }
}

function getMoviesPerYear(doc) {
    const statisticElements = doc.querySelectorAll('h4.profile-statistic.statistic');
    for (let stat of statisticElements) {
        const definition = stat.querySelector('span.definition');
        if (definition && definition.textContent.trim() === 'This year') {
            const valueElement = stat.querySelector('span.value');
            return valueElement ? parseInt(valueElement.textContent.trim(), 10) : null;
        }
    }
    return null;
}

function getAvatarImage(doc) {
    const avatarElement = doc.querySelector('.profile-avatar img'); // Look inside profile-avatar div
    
    if (!avatarElement) {
        console.error("Avatar image not found! HTML:", doc.body.innerHTML);
        return null;
    }

    console.log("Avatar image src:", avatarElement.src);
    return avatarElement.src;
}

async function fetchData(username) {
    const htmlText = await fetchHtml(username);
    if (!htmlText) {
        // document.getElementById('output').textContent = 'Error fetching data';
        console.log('Error fetching data');
        console.log(`html returned: ${htmlText}`);
        return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    const numMovies = getMoviesPerYear(doc);
    const avatarImage = getAvatarImage(doc);

    return { numMovies, avatarImage };
}

function getMoviesToWatch(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById("username").value;
    let movieGoal = parseInt(document.getElementById("movieGoal").value) || 365;
    
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    let display = document.getElementById("moviesDisplay");
    if (!display) {
        display = document.createElement("div");
        display.id = "moviesDisplay";
        display.style.fontFamily = "Arial, sans-serif";
        display.style.padding = "20px";
        display.style.border = "2px solid #007BFF";
        display.style.borderRadius = "10px";
        display.style.marginTop = "20px";
        display.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        display.style.backgroundColor = "#f8f9fa";
        display.style.textAlign = "center";
        display.style.maxWidth = "400px";
        display.style.marginLeft = "auto";
        display.style.marginRight = "auto";
        document.body.appendChild(display);
    }

    display.innerHTML = `
        <h2 style="color: #007BFF; margin-bottom: 10px;">${username}'s Movie Report</h2>
        <p style="font-size: 18px; color: #555;">Loading...</p>
    `;

    fetchData(username).then(data => {
        var today = new Date();
        var daysThisYear = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / 86400000);
        var moviesWatched = data.numMovies;
        var moviesPerDay = movieGoal / 365;
        var moviesToWatch = Math.ceil((daysThisYear * moviesPerDay) - moviesWatched);
        // moviesToWatch = moviesToWatch < 0 ? 0 : moviesToWatch;
        var moviesLeft = movieGoal - moviesWatched;
        moviesLeft = moviesLeft < 0 ? 0 : moviesLeft;

        display.innerHTML = `
            <h2 style="color: #007BFF; margin-bottom: 10px; display: flex; align-items: center;">
                <img src="${data.avatarImage}" alt="${username}'s Avatar" style="width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;">
                ${username}'s Movie Report
            </h2>
            <p style="font-size: 18px; color: #28a745;"><strong>Movies Watched This Year : </strong> ${moviesWatched}</p>
            <p style="font-size: 18px; color: #333;"><strong>Days So Far This Year : </strong> ${daysThisYear}</p>
            <p style="font-size: 18px; color: #333;"><strong>Days Per Movie: </strong> ${(1 / moviesPerDay).toFixed(2)}</p>
            <p style="font-size: 18px; color: ${moviesToWatch > 0 ? "#dc3545" : moviesToWatch < 0 ? "#28a745" : "#333"};"><strong>Movies To Catch Up : </strong> ${moviesToWatch}</p>
            <p style="font-size: 18px; color: ${moviesLeft > 0 ? "#dc3545" : "#28a745"};"><strong>Movies Left This Year : </strong> ${moviesLeft}</p>
        `;
    });
}
