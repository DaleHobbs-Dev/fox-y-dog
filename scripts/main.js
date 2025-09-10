// Fox image handling
// Select the button element for fetching a fox image
const foxButton = document.querySelector("#fox-button")

// Add a click event listener to the button
foxButton.addEventListener("click", () => {
    // Fetch a random fox image from the API
    fetch("https://randomfox.ca/floof/")
        // Use .then() to handle the promise returned by fetch
        .then((response) => {
            console.log('Response received!');
            // Parse the JSON in the response
            return response.json();
        })
        // Use another .then() to handle the promise returned by response.json()
        .then((foxData) => {
            // This code runs when the JSON parsing is complete
            console.log('Data parsed!');
            console.log(foxData);
            const foxImage = document.querySelector("#fox");
            foxImage.src = foxData.image;
        });

    console.log('This code runs immediately!');
})

// Dog image and video handling. Variables for button, image, and video elements
const dogButton = document.querySelector("#dog-button");
const dogImg = document.querySelector("#dog");
const dogVideo = document.querySelector("#dog-video");

// Event listener for button click that fetches a random dog image or video
dogButton.addEventListener("click",
    // Using async/await for cleaner asynchronous code when fetching the dog media
    async () => {
        // Use try/catch to handle potential errors in the fetch operation
        try {
            // Fetch a random dog media URL from the API
            const response = await fetch("https://random.dog/woof.json")
            // object destructuring to extract just the URL from the JSON response
            const { url } = await response.json()
            // specifically check if the URL ends with .mp4 or .webm to determine if it's a video
            const isVideo = url.endsWith(".mp4") || url.endsWith(".webm");

            // Show/hide the image and video elements based on the media type
            if (isVideo) {
                // If it's a video, hide the image element and show the video element
                dogImg.style.display = "none";
                dogVideo.style.display = "block";
                // Set the video source to the fetched URL
                dogVideo.src = url;
                // Load and play the video, catching any autoplay errors
                dogVideo.load();
                dogVideo.play().catch(() => {/* ignore autoplay errors */ });
            }
            // If it's not a video, it's an image
            else {
                // Hide the video element and show the image element
                dogVideo.pause();
                dogVideo.removeAttribute("src");
                dogVideo.style.display = "none";
                dogImg.style.display = "block";
                // Set the image source to the fetched URL
                dogImg.src = url;
            }
        }
        // Catch and log any errors that occur during the fetch or processing
        catch (error) {
            console.error("Failed to fetch dog:", error);
        }
    });