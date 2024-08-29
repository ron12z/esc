// Variables
const result = document.querySelector(".result");
const escalation = document.querySelector("#escalation");
const options = document.querySelector(".options");
const suspended = document.querySelector("#suspended");
const name1 = document.querySelector("#name");
const email = document.querySelector("#email");
const lost = document.querySelector("#lost");
const sa1 = document.querySelector("#sa1");
const sa2 = document.querySelector("#sa2");
const cashed = document.querySelector("#cashed");
const short = document.querySelector("#short");
const user = document.querySelector("#user");
const outside = document.querySelector("#outside");
const newloc = document.querySelector("#newloc");

const selectionDivs = document.querySelectorAll(".selection");
const resetBtn = document.querySelector("#reset");

// Event listeners
selectionDivs.forEach((div) => {
	div.addEventListener("click", () => {
		div.classList.toggle("checked");
		updateResult();
	});
});

resetBtn.addEventListener("click", () => {
	selectionDivs.forEach((div) => {
		div.classList.remove("checked");
		updateResult();
	});
});

// For copying escalation
escalation.addEventListener("click", () => {
	const textToCopy = escalation.textContent;

	// Copy the text to the clipboard
	navigator.clipboard
		.writeText(textToCopy)
		.then(() => {
			// Display a "Copied to clipboard" popup
			const popup = document.createElement("div");
			popup.textContent = "Copied to clipboard!";
			popup.style.position = "fixed";
			popup.style.top = "20px";
			popup.style.right = "20px";
			popup.style.padding = "10px";
			popup.style.backgroundColor = "green";
			popup.style.color = "white";
			popup.style.borderRadius = "5px";
			document.body.appendChild(popup);

			// Hide the popup after a short delay
			setTimeout(() => {
				popup.remove();
			}, 2000); // 2000 milliseconds (2 seconds)
		})
		.catch((err) => {
			console.error("Could not copy text: ", err);
			// You might want to display an error message to the user here
		});
});

// Helper functions
function isChecked(element) {
	if (element.classList.contains("checked")) {
		return true;
	} else {
		return false;
	}
}

// For updating DOM
function updateResult() {
	escalation.textContent = GenerateText();
}

// Main function
function GenerateText() {
	const anyChecked = Array.from(selectionDivs).some((div) =>
		div.classList.contains("checked")
	);

	let result = "Escalating Case - ";
	let first_escalation = true;

	if (isChecked(suspended)) {
		if (first_escalation) {
			result += "Account is suspended";
			first_escalation = false;
		} else {
			result += ", and account is suspended";
		}
	}

	if (isChecked(name1)) {
		//Get names
		if (first_escalation) {
			result += "Name mismatch";
			first_escalation = false;
		} else {
			result += ", and name mismatch";
		}
	}

	if (isChecked(email)) {
		if (first_escalation) {
			result += "Email mismatch";
			first_escalation = false;
		} else {
			result += ", and email mismatch";
		}
	}

	if (isChecked(lost)) {
		if (first_escalation) {
			result += "Has lost/stolen card";
			first_escalation = false;
		} else {
			result += ", and has lost/stolen card";
		}
	}

	if (isChecked(sa1)) {
		//Get cards
		if (first_escalation) {
			result += "SA1";
			first_escalation = false;
		} else {
			result += ", and SA1";
		}
	}

	if (isChecked(sa2)) {
		//Get cards
		if (first_escalation) {
			result += "SA2";
			first_escalation = false;
		} else {
			result += ", and SA2";
		}
	}

	if (isChecked(cashed)) {
		if (first_escalation) {
			result += "Cashed out";
			first_escalation = false;
		} else {
			result += ", and cashed out";
		}
	}

	if (isChecked(short)) {
		if (first_escalation) {
			result += "Has short odds";
			first_escalation = false;
		} else {
			result += ", and short odds";
		}
	}

	if (isChecked(user)) {
		//Get number of related users
		if (first_escalation) {
			result += "Has 4 related users";
			first_escalation = false;
		} else {
			result += ", and 4 related users";
		}
	}

	if (isChecked(outside)) {
		if (first_escalation) {
			result += "Client is outside US";
			first_escalation = false;
		} else {
			result += ", and outside US";
		}
	}

	if (isChecked(newloc)) {
		if (first_escalation) {
			result += "New device in a new location";
			first_escalation = false;
		} else {
			result += ", and new device in a new location";
		}
	}

	result += ".";

	if (!anyChecked) {
		result = "No Escalations - Good to approve";
	}
	return result;
}

updateResult();
