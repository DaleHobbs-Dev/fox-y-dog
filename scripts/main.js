const foxButton = document.querySelector("#fox-button")
foxButton.addEventListener("click", () => {
    fetch("https://randomfox.ca/floof/")
        .then((response) => {
            console.log('Response received!');
            // Parse the JSON in the response
            return response.json();
        })
        .then((foxData) => {
            // This code runs when the JSON parsing is complete
            console.log('Data parsed!');
            console.log(foxData);
            const foxImage = document.querySelector("#fox")
            foxImage.src = foxData.image
        });

    console.log('This code runs immediately!');
})

const dogButton = document.querySelector("#dog-button");
const dogImg = document.querySelector("#dog");

// Add a <video id="dog-video"> next to your img in HTML
// <video id="dog-video" class="animal" controls muted playsinline></video>
const dogVideo = document.querySelector("#dog-video");

dogButton.addEventListener("click", () => {
    fetch("https://random.dog/woof.json")
        .then(r => r.json())
        .then(({ url }) => {
            const isVideo = url.endsWith(".mp4") || url.endsWith(".webm");

            if (isVideo) {
                dogImg.style.display = "none";
                dogVideo.style.display = "block";
                dogVideo.src = url;
                // Optional autoplay:
                dogVideo.play().catch(() => {/* user gesture may be required */ });
            } else {
                dogVideo.pause();
                dogVideo.removeAttribute("src");
                dogVideo.style.display = "none";
                dogImg.style.display = "block";
                dogImg.src = url;
            }
        })
        .catch(console.error);
});