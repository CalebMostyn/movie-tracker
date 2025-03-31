async function fetchHtml(username) {
    try {
        const response = await fetch(`https://caleb-mostyn.com:3000/fetch-html?username=${username}`); // Fetch from your proxy
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error("Error fetching HTML:", error);
        return null;
    }
}

function get_num_movies_per_year(doc) {
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

function get_avatar_image(doc) {
    const avatarElement = doc.querySelector('.profile-avatar img'); // Look inside profile-avatar div
    
    if (!avatarElement) {
        console.error("Avatar image not found! HTML:", doc.body.innerHTML);
        return null;
    }

    console.log("Avatar image src:", avatarElement.src);
    return avatarElement.src;
}
