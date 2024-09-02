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

const name_names = document.querySelector("#name_names");
const lost_cards = document.querySelector("#lost_cards");
const sa1_cards = document.querySelector("#sa1_cards");
const sa2_cards = document.querySelector("#sa2_cards");
const user_number = document.querySelector("#user_number");
const state_name = document.querySelector("#state_name");
const addMoreBtns = document.querySelectorAll("button.addMore");
const sa1_card1 = document.querySelector("#sa1_card1");
const sa1_card2 = document.querySelector("#sa1_card2");

addInputFieldListeners();

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

addMoreBtns.forEach((button) => {
	button.addEventListener("click", () => {
		const parent = button.parentNode;
		const newField = document.createElement("input");
		newField.type = "text";

		parent.insertBefore(newField, button);
		addInputFieldListeners();
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
function addInputFieldListeners() {
	const inputFields = document.querySelectorAll("input");
	inputFields.forEach((field) => {
		field.addEventListener("keyup", () => {
			updateResult();
		});
	});
}
function isChecked(element) {
	if (element.classList.contains("checked")) {
		return true;
	} else {
		return false;
	}
}

function getInputFieldContents(target_element) {
	const result = [];

	// Add input field content to result
	const inputElements = target_element.querySelectorAll("input");

	inputElements.forEach((item) => {
		if (item.value !== "") {
			result.push(item.value);
		}
	});

	if (result.length <= 1) {
		return result;
	} else {
		final_result = "";

		for (let i = 0; i < result.length; i++) {
			if (i === result.length - 1) {
				final_result += `& ${result[i]}`;
			} else if (i === result.length - 2) {
				final_result += `${result[i]} `;
			} else {
				final_result += `${result[i]}, `;
			}
		}

		return final_result;
	}
}

function getSA1inputs() {
	const result = [];
	const inputElements = sa1_cards.querySelectorAll("input");

	inputElements.forEach((item) => {
		if (item.value !== "") {
			result.push(item.value);
		}
	});

	return result;
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
		name_names.style.display = "flex";
		const input_fields_content = getInputFieldContents(name_names);

		//Get names
		if (first_escalation) {
			result.push(`2 different names on account: ${input_fields_content}`);
			first_escalation = false;
		} else {
			result.push(`has 2 different names on account: ${input_fields_content}`);
		}
	} else {
		name_names.style.display = "none";
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
		lost_cards.style.display = "flex";
		const input_fields_content = getInputFieldContents(lost_cards);
		if (first_escalation) {
			result.push(`(${input_fields_content}) has been reported lost or stolen`);
			first_escalation = false;
		} else {
			result.push(`(${input_fields_content}) has been reported lost or stolen`);
		}
	} else {
		lost_cards.style.display = "none";
	}

	if (isChecked(sa1)) {
		sa1_cards.style.display = "flex";
		const sa1_card_details = getSA1inputs();

		if (first_escalation) {
			result.push(
				`withdrawing to a payment method (${sa1_card_details[0]}) used for a small deposit with larger deposits made with (${sa1_card_details[1]})`
			);
			first_escalation = false;
		} else {
			result.push(
				`withdrawing to a payment method (${sa1_card_details[0]}) used for a small deposit with larger deposits made with (${sa1_card_details[1]})`
			);
		}
	} else {
		sa1_cards.style.display = "none";
	}

	if (isChecked(sa2)) {
		sa2_cards.style.display = "flex";
		const input_fields_content = getInputFieldContents(sa2_cards);

		if (first_escalation) {
			result.push(
				`Customer has attempted to deposit with multiple debit cards in the past 24 hours - ${input_fields_content}`
			);
			first_escalation = false;
		} else {
			result.push(
				`customer has attempted to deposit with multiple debit cards in the past 24 hours - ${input_fields_content}`
			);
		}
	} else {
		sa2_cards.style.display = "none";
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
		user_number.style.display = "flex";
		const input_fields_content = getInputFieldContents(user_number);
		if (first_escalation) {
			result.push(
				`Account is sharing a device with (${input_fields_content}) related users`
			);
			first_escalation = false;
		} else {
			result.push(
				`account is sharing a device with (${input_fields_content}) related users`
			);
		}
	} else {
		user_number.style.display = "none";
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
		state_name.style.display = "flex";
		const input_fields_content = getInputFieldContents(state_name);
		if (first_escalation) {
			result.push(`(${input_fields_content}) Account, no license`);
			first_escalation = false;
		} else {
			result.push(`(${input_fields_content}) Account, no license`);
		}
	} else {
		state_name.style.display = "none";
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
		result = result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
	}

	return "Escalating case - " + result + ".";
}

updateResult();
