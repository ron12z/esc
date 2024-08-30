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
const state = document.querySelector("#state");
const initial = document.querySelector("#initial");

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

	let result = [];
	let first_escalation = true;

	if (isChecked(amount)) {
		if (first_escalation) {
			result.push("WD greater than $5k");
			first_escalation = false;
		} else {
			result.push("WD greater than $5k");
		}
	}

	if (isChecked(suspended)) {
		if (first_escalation) {
			result.push("Account is suspended/closed");
			first_escalation = false;
		} else {
			result.push("account is suspended/closed");
		}
	}

	if (isChecked(name1)) {
		//Get names
		if (first_escalation) {
			result.push("2 different names on account Name1 & Name2");
			first_escalation = false;
		} else {
			result.push("has 2 different names on account Name1 & Name2");
		}
	}

	if (isChecked(email)) {
		if (first_escalation) {
			result.push("account less than 1 month old with email name mismatch");
			first_escalation = false;
		} else {
			result.push("account less than 1 month old with email name mismatch");
		}
	}

	if (isChecked(lost)) {
		if (first_escalation) {
			result.push("(Card number) has been reported lost or stolen");
			first_escalation = false;
		} else {
			result.push("(Card number) has been reported lost or stolen");
		}
	}

	if (isChecked(sa1)) {
		//Get cards
		if (first_escalation) {
			result.push("withdrawing to a payment method (insert payment method) used for a small deposit with larger deposits made with (insert payment method)");
			first_escalation = false;
		} else {
			result.push("withdrawing to a payment method (insert payment method) used for a small deposit with larger deposits made with (insert payment method)");
		}
	}

	if (isChecked(sa2)) {
		//Get cards
		if (first_escalation) {
			result.push("Customer has attempted to deposit with multiple debit cards in the past 24 hours - (card1), (card2), (card3)");
			first_escalation = false;
		} else {
			result.push("customer has attempted to deposit with multiple debit cards in the past 24 hours - (card1), (card2), (card3)");
		}
	}

	if (isChecked(cashed)) {
		if (first_escalation) {
			result.push("Cashed out bet before the latest withdrawal");
			first_escalation = false;
		} else {
			result.push("cashed out bet before the latest withdrawal");
		}
	}

	if (isChecked(short)) {
		if (first_escalation) {
			result.push("Short odds bet placement");
			first_escalation = false;
		} else {
			result.push("has short odds bet placement");
		}
	}

	if (isChecked(user)) {
		//Get number of related users
		if (first_escalation) {
			result.push("Account is sharing a device with (x) related users");
			first_escalation = false;
		} else {
			result.push("account is sharing a device with (x) related users");
		}
	}

	if (isChecked(outside)) {
		if (first_escalation) {
			result.push("Account is Geo locating outside of the US");
			first_escalation = false;
		} else {
			result.push("account is Geo locating outside of the US");
		}
	}

	if (isChecked(newloc)) {
		if (first_escalation) {
			result.push("Account is on a new device in a new location");
			first_escalation = false;
		} else {
			result.push("account is on a new device in a new location");
		}
	}

	if (isChecked(state)) {
		if (first_escalation) {
			result.push("(State) Account, no license");
			first_escalation = false;
		} else {
			result.push("(State) Account, no license");
		}
	}

	if (isChecked(initial)) {
		if (first_escalation) {
			result.push("No intials deposit");
			first_escalation = false;
		} else {
			result.push("no intials deposit");
		}
	}

	if (!anyChecked) {
		return "No Escalations - Good to approve";
	}

	if (result.length > 1) {
		result = result.slice(0, -1).join(', ') + ', and '+result.slice(-1)
	}
	
	return 'Escalating case - ' + result + '.';

}

updateResult();
