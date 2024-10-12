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
	// Default
	// Find the <p class="text"> element within the clicked text-group
	const textElement = event.currentTarget.querySelector("p.text");
	const result = document.querySelector("#result");

	// Main process
	function copy(target) {
		const htmlToCopy = target.innerHTML;

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
	}

	// Default and other options to copy
	if (textElement) {
		copy(textElement);
		// Get the inner HTML, which includes formatting
	} else if (event.currentTarget == result) {
		copy(result);
	} else if (event.currentTarget == approveChoice1) {
		copy(approveChoice1);
	} else if (event.currentTarget == approveChoice2) {
		copy(approveChoice2);
	} else {
		console.error("No text element found within the clicked group.");
		// Optionally, inform the user that there's no text to copy
	}
}

function showCopiedToClipboard(event) {
	let targetDiv = "";

	if (event.currentTarget == result) {
		targetDiv = indivs;
	} else if (
		event.currentTarget == approveChoice1 ||
		event.currentTarget == approveChoice2
	) {
		targetDiv = approve;
	} else {
		targetDiv = event.currentTarget;
	}

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

// Update
// For "Individual FBG Queues for posting"
const indivs = document.querySelector("#indivs");
const result = document.querySelector("#result");
const choices = document.querySelectorAll(".choice");
const VIPMI = document.querySelector("#VIPMI");
const VIPNL = document.querySelector("#VIPNL");
const Cash = document.querySelector("#Cash");
const IN = document.querySelector("#IN");
const MI = document.querySelector("#MI");
const NL = document.querySelector("#NL");
const PA = document.querySelector("#PA");
const VIPL = document.querySelector("#VIPL");

// Remove eventListener for this specific group
indivs.removeEventListener("click", copyFormattedContent);
indivs.removeEventListener("click", showCopiedToClipboard);
// And add it only to result div
result.addEventListener("click", copyFormattedContent);
result.addEventListener("click", showCopiedToClipboard);

// Add Event Listener for each choice
choices.forEach((choice) => {
	choice.addEventListener("click", toggleCheck);
});

const resetBtn = document.querySelector("#miscReset");
resetBtn.addEventListener("click", resetMiscChoices);

function toggleCheck(event) {
	const target = event.target;
	target.classList.toggle("checked");
}

function resetMiscChoices() {
	choices.forEach((choice) => {
		choice.classList.remove("checked");
	});
}

function isChecked(element) {
	if (element.classList.contains("checked")) {
		return true;
	} else {
		return false;
	}
}

function GenerateText() {
	const anyChecked = Array.from(choices).some((div) =>
		div.classList.contains("checked")
	);

	let output = "";
	const currentTime = getCurrentTime();
	const cleared = ` <b>CLEARED</b> - Updated as of ${currentTime}<br>`;

	// if (isChecked(VIPMI)) {
	// 	output += `Vip Withdrawal - Michigan${cleared}`;
	// }

	if (isChecked(VIPL)) {
		output += `Vip Withdrawal- Licensed States${cleared}`;
	}

	if (isChecked(VIPNL)) {
		output += `Vip Withdrawal - Non Licensed States${cleared}`;
	}

	if (isChecked(Cash)) {
		output += `Withdrawal - Cash At Cage${cleared}`;
	}

	if (isChecked(IN)) {
		output += `Withdrawals - Indiana${cleared}`;
	}

	// if (isChecked(MI)) {
	// 	output += `Withdrawals - Michigan${cleared}`;
	// }

	if (isChecked(NL)) {
		output += `Withdrawals - Non-Licensed States${cleared}`;
	}

	if (isChecked(PA)) {
		output += `Withdrawals - Pennsylvania${cleared}`;
	}

	if (!anyChecked) {
		output = "Please select cleared queues below:<br>";
	}
	return output;
}

document.addEventListener("click", updateResult);
function updateResult() {
	result.innerHTML = GenerateText();
}
updateResult();
setInterval(updateResult, 1000);
// --------------------------------------------------
// Update
// For clients with 2 or more related users but can be approved.
const numberOfUsers = document.querySelector("#userNum");
const duplicate = document.querySelector("#duplicate");
const unverified = document.querySelector("#unverified");
const approve = document.querySelector("#approve");
const approveChoice1 = document.querySelector("#approve1");
const approveChoice2 = document.querySelector("#approve2");
const resetUsers = document.querySelector("#resetUsers");

// Remove eventListener for whole div
approve.removeEventListener("click", copyFormattedContent);
approve.removeEventListener("click", showCopiedToClipboard);

// And add it only to copy-ables
approveChoice1.addEventListener("click", copyFormattedContent);
approveChoice1.addEventListener("click", showCopiedToClipboard);
approveChoice2.addEventListener("click", copyFormattedContent);
approveChoice2.addEventListener("click", showCopiedToClipboard);

function fillChoices() {
	const num = numberOfUsers.value.trim();
	const dups = duplicate.value.trim();
	const unvfs = unverified.value.trim();
	let approve1content = "";

	if (dups != "" && unvfs == "") {
		approve1content = `Client has ${num} related users. ${dups} duplicate device links. No fraud concerns. WD approved.`;
	} else if (dups == "" && unvfs != "") {
		approve1content = `Client has ${num} related users. ${unvfs} unverified device links. No fraud concerns. WD approved.`;
	} else {
		approve1content = `Client has ${num} related users. ${dups} duplicates and ${unvfs} unverified device links. No fraud concerns. WD approved.`;
	}

	approveChoice2.textContent = `Client has ${num} related users, already reviewed by SA. No fraud concerns. WD approved.`;
	approveChoice1.textContent = approve1content;
}

resetUsers.addEventListener("click", function (event) {
	const wrapper = document.querySelector(".users-wrapper");
	const userInputs = wrapper.querySelectorAll("input");

	userInputs.forEach((input) => {
		input.value = "";
	});
});

document.addEventListener("click", fillChoices);
document.addEventListener("keyup", fillChoices);
fillChoices();
setInterval(fillChoices, 1000);
