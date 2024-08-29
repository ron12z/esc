// Variables
const result = document.querySelector(".result");
const escalation = document.querySelector("#escalation");
const options = document.querySelector(".options");
const amount = document.querySelector("#amount");
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

	if (isChecked(amount)) {
		if (first_escalation) {
			result += "Withdrawal amount is greater than $5,000";
			first_escalation = false;
		} else {
			result += ", and withdrawal amount is greater than $5,000";
		}
	}

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
			result += "Multiple names in account - (name1), (name2)";
			first_escalation = false;
		} else {
			result += ", and has multiple names in account - (name1), (name2)";
		}
	}

	if (isChecked(email)) {
		if (first_escalation) {
			result +=
				"Account is less than 1 month old with email mismatch - (email1)";
			first_escalation = false;
		} else {
			result +=
				", and account is less than 1 month old with email mismatch - (email1)";
		}
	}

	if (isChecked(lost)) {
		if (first_escalation) {
			result += "(Card1) has been reported lost or stolen";
			first_escalation = false;
		} else {
			result += ", and (Card1) has been reported lost or stolen";
		}
	}

	if (isChecked(sa1)) {
		//Get cards
		if (first_escalation) {
			result +=
				"Withdrawing to a payment method (card1) used for small deposit with larger deposits made from (card2)";
			first_escalation = false;
		} else {
			result +=
				", and withdrawing to a payment method (card1) used for small deposit with larger deposits made from (card2)";
		}
	}

	if (isChecked(sa2)) {
		//Get cards
		if (first_escalation) {
			result +=
				"Customer has attempted to deposit with multiple debit cards in the past 24 hours - (card1), (card2), (card3)";
			first_escalation = false;
		} else {
			result +=
				", and customer has attempted to deposit with multiple debit cards in the past 24 hours - (card1), (card2), (card3)";
		}
	}

	if (isChecked(cashed)) {
		if (first_escalation) {
			result += "Cashed out bet before withdrawal";
			first_escalation = false;
		} else {
			result += ", and cashed out bet before withdrawal";
		}
	}

	if (isChecked(short)) {
		if (first_escalation) {
			result += "Has short odds bet placement";
			first_escalation = false;
		} else {
			result += ", and has short odds bet placement";
		}
	}

	if (isChecked(user)) {
		//Get number of related users
		if (first_escalation) {
			result += "Account is sharing a device with (x) related users";
			first_escalation = false;
		} else {
			result += ", and account is sharing a device with (x) related users";
		}
	}

	if (isChecked(outside)) {
		if (first_escalation) {
			result += "Account is Geo-locating outside US";
			first_escalation = false;
		} else {
			result += ", and account is Geo-locating outside US";
		}
	}

	if (isChecked(newloc)) {
		if (first_escalation) {
			result += "Account is on a new device in a new location";
			first_escalation = false;
		} else {
			result += ", account is on a new device in a new location";
		}
	}

	result += ".";

	if (!anyChecked) {
		result = "No Escalations - Good to approve";
	}
	return result;
}

updateResult();
