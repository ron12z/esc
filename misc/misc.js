const showQR = document.querySelector("#show-QR");
const donateInfo = document.querySelector(".donate-info");
const cleared = document.querySelector("#cleared");
// Toggle QR visibility
showQR.addEventListener("click", () => {
	if (donateInfo.style.display === "none") {
		donateInfo.style.display = "flex";
	} else {
		donateInfo.style.display = "none";
	}
});

// Initialize first state (hidden)
donateInfo.style.display = "none";

// Hide QR when clicked
donateInfo.addEventListener("click", () => {
	donateInfo.style.display = "none";
});

// Time Update
function getCurrentTime() {
	const now = new Date();
	let hours = now.getHours();
	const minutes = now.getMinutes();
	const amPm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
	const timeFormatted = hours + ":" + minutesFormatted + " " + amPm;
	return timeFormatted;
}

function updateCleared() {
	currentTime = getCurrentTime();
	cleared.innerHTML = `FBG Withdrawals Handled by MNL Team <b>CLEARED</b> - Updated as of ${currentTime}`;
}

updateCleared();
setInterval(updateCleared, 1000);

// Event Listeners
const textGroups = document.querySelectorAll(".text-group");

function copyTextContent(event) {
	// Find the <p class="text"> element within the clicked text-group
	const textElement = event.currentTarget.querySelector("p.text");

	if (textElement) {
		// Get the text content, remove leading/trailing whitespace, and collapse multiple spaces/newlines
		const textToCopy = textElement.textContent
			.trim() // Remove leading and trailing whitespace
			.replace(/\s+/g, " "); // Replace multiple spaces/newlines with a single space

		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				// console.log("Text copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
				// Handle errors gracefully
			});
	} else {
		console.error("No text element found within the clicked group.");
		// Optionally, inform the user that there's no text to copy
	}
}

function copyFormattedContent(event) {
	// Find the <p class="text"> element within the clicked text-group
	const textElement = event.currentTarget.querySelector("p.text");

	if (textElement) {
		// Get the inner HTML, which includes formatting
		const htmlToCopy = textElement.innerHTML;

		// Create a temporary element to hold the HTML
		const tempElement = document.createElement("div");
		tempElement.innerHTML = htmlToCopy;

		// Append the temporary element to the body
		document.body.appendChild(tempElement);

		// Select the content of the temporary element
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(tempElement);
		selection.removeAllRanges();
		selection.addRange(range);

		// Copy the selected content to the clipboard
		document.execCommand("copy");

		// Clean up: remove the temporary element and clear the selection
		document.body.removeChild(tempElement);
		selection.removeAllRanges();
	} else {
		console.error("No text element found within the clicked group.");
		// Optionally, inform the user that there's no text to copy
	}
}

function showCopiedToClipboard(event) {
	const targetDiv = event.currentTarget;

	// Create the pop-up element
	const popup = document.createElement("div");
	popup.classList.add("popup-misc");
	popup.textContent = "Copied to Clipboard!";

	// Append the pop-up to the target div
	targetDiv.appendChild(popup);

	// Fade out and remove the pop-up after a delay
	setTimeout(() => {
		popup.style.opacity = "0";
		setTimeout(() => {
			targetDiv.removeChild(popup);
		}, 300); // Match the duration of the transition
	}, 500); // Display duration
}

textGroups.forEach((group) => {
	group.addEventListener("click", copyFormattedContent);
	group.addEventListener("click", showCopiedToClipboard);
});
