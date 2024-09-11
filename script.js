// Variables
const result = document.querySelector(".result");
const escalation = document.querySelector("#escalation");
const options = document.querySelectorAll(".option");
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
const zip = document.querySelector("#zip");
const baccarat = document.querySelector("#baccarat");

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
const account_closed = document.querySelector("#account_closed");
const account_suspended = document.querySelector("#account_suspended");

const showQR = document.querySelector("#show-QR");
const donateInfo = document.querySelector(".donate-info");

// Add initial input field listeners
addInputFieldListeners();

// Event listeners

// Toggles "checked" status of selection divs when clicked
selectionDivs.forEach((div) => {
	div.addEventListener("click", () => {
		div.classList.toggle("checked");
		updateResult();
	});
});

// Reset Button
resetBtn.addEventListener("click", () => {
	// Remove all input fields without placeholders, clear input fields with placeholders, then updateResult
	const allInputFields = document.querySelectorAll("input");
	const inputGroups = document.querySelectorAll(".input-group");
	selectionDivs.forEach((div) => {
		div.classList.remove("checked");
	});

	// Remove input groups (created by "Add More")
	allInputFields.forEach((field) => {
		field.value = "";
	});

	inputGroups.forEach((inputGroup) => {
		inputGroup.remove();
	});

	// Update result after processing input fields
	updateResult();
});

// Adding input fields when "Add More" is clicked
addMoreBtns.forEach((button) => {
	button.addEventListener("click", () => {
		const parent = button.parentNode;

		// Create a container div for the input and button
		const fieldContainer = document.createElement("div");
		fieldContainer.classList.add("input-group"); // Add a class for styling if needed

		const newField = document.createElement("input");
		newField.type = "text";

		// Create the remove button
		const removeButton = document.createElement("button");
		removeButton.textContent = "❌"; // Or any suitable label
		removeButton.classList.add("remove-button");

		// Append input and button to the container
		fieldContainer.appendChild(newField);
		fieldContainer.appendChild(removeButton);

		// Insert the container before the "Add More" button
		parent.insertBefore(fieldContainer, button);
		addInputFieldListeners();

		// Add event listener to the remove button
		removeButton.addEventListener("click", () => {
			parent.removeChild(fieldContainer); // Remove the entire container
			updateResult();
		});
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
			popup.style.zIndex = "2";
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
// Add Input Field Listeners to all current input fields in DOM
function addInputFieldListeners() {
	const inputFields = document.querySelectorAll("input");
	inputFields.forEach((field) => {
		field.addEventListener("keyup", () => {
			updateResult();
		});
	});
}

// Add event listeners to each "option" div
options.forEach((option) => {
	option.addEventListener("click", () => {
		// Remove "checked" from all options
		options.forEach((opt) => opt.classList.remove("checked"));

		// Add "checked" to the clicked option
		option.classList.add("checked");
		updateResult();
	});
});

// Toggle QR visibility
showQR.addEventListener("click", () => {
	if (donateInfo.style.display === "none") {
		donateInfo.style.display = "flex";
	} else {
		donateInfo.style.display = "none";
	}
});

// Hide QR when clicked
donateInfo.addEventListener("click", () => {
	donateInfo.style.display = "none";
});

// --------------------------------
// Checked if an element has "checked" class
function isChecked(element) {
	if (element.classList.contains("checked")) {
		return true;
	} else {
		return false;
	}
}

// Get Input Field Contents from target element and return formatted result
function getInputFieldContents(target_element) {
	// Initialize result
	const result = [];

	// Add input field content to result
	const inputElements = target_element.querySelectorAll("input");

	// Add each result to result list
	inputElements.forEach((item) => {
		if (item.value !== "") {
			result.push(item.value);
		}
	});

	// Return result
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

// Specific for SA1 input since it has fixed 2 inputs needed, and would also be used separately.
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
// Generating result text based on checked selections
// Checks first escalation flag if first escalation
function GenerateText() {
	const anyChecked = Array.from(selectionDivs).some((div) =>
		div.classList.contains("checked")
	);

	let result = [];
	let first_escalation = true;

	// Withdrawal amount more than 5k
	if (isChecked(amount)) {
		if (first_escalation) {
			result.push("WD greater than $5k");
			first_escalation = false;
		} else {
			result.push("WD greater than $5k");
		}
	}

	// Account is closed/suspended
	if (isChecked(suspended)) {
		suspended_options.style.display = "flex";
		let account_status = "";

		// Use switch case to handle multiple options
		switch (true) {
			case isChecked(account_closed):
				account_status = "closed";
				break;
			case isChecked(account_suspended):
				account_status = "suspended";
				break;
			// Add more cases here as needed for future options
			default:
				account_status = "unknown"; // Handle unexpected cases
		}

		if (first_escalation) {
			result.push(`Account is ${account_status}`);
			first_escalation = false;
		} else {
			result.push(`account is ${account_status}`);
		}
	} else {
		suspended_options.style.display = "none";
	}

	// Name mismatch
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

	// Email mismatch
	if (isChecked(email)) {
		if (first_escalation) {
			result.push("account less than 1 month old with email name mismatch");
			first_escalation = false;
		} else {
			result.push("account less than 1 month old with email name mismatch");
		}
	}

	// Failed deposit with lost/stolen cards
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

	// Suspicious Activity 1
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

	// Suspicious Activity 2
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

	// Cashed out before latest withdrawal
	if (isChecked(cashed)) {
		if (first_escalation) {
			result.push("Cashed out bet before the latest withdrawal");
			first_escalation = false;
		} else {
			result.push("cashed out bet before the latest withdrawal");
		}
	}

	// Has short odd bets
	if (isChecked(short)) {
		if (first_escalation) {
			result.push("Short odds bet placement");
			first_escalation = false;
		} else {
			result.push("has short odds bet placement");
		}
	}

	// Has 4 or more related users
	if (isChecked(user)) {
		user_number.style.display = "flex";
		const input_fields_content = getInputFieldContents(user_number);
		if (first_escalation) {
			result.push(
				`Account is sharing a device with (${input_fields_content}) users`
			);
			first_escalation = false;
		} else {
			result.push(
				`account is sharing a device with (${input_fields_content}) users`
			);
		}
	} else {
		user_number.style.display = "none";
	}

	// Geolocating outside US
	if (isChecked(outside)) {
		if (first_escalation) {
			result.push("Account is Geo locating outside of the US");
			first_escalation = false;
		} else {
			result.push("account is Geo locating outside of the US");
		}
	}

	// In a new device on a new location
	if (isChecked(newloc)) {
		if (first_escalation) {
			result.push("Account is on a new device in a new location");
			first_escalation = false;
		} else {
			result.push("account is on a new device in a new location");
		}
	}

	// Licensed state
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

	// Has no initial deposit
	if (isChecked(initial)) {
		if (first_escalation) {
			result.push("No intial deposit");
			first_escalation = false;
		} else {
			result.push("no intial deposit");
		}
	}

	// Has multiple zip codes
	if (isChecked(zip)) {
		if (first_escalation) {
			result.push("Has 2 or more zip codes used within the past 24 hours");
			first_escalation = false;
		} else {
			result.push("has 2 or more zip codes used within the past 24 hours");
		}
	}

	if (isChecked(baccarat)) {
		if (first_escalation) {
			result.push("Baccarat abuse");
			first_escalation = false;
		} else {
			result.push("baccarat abuse");
		}
	}

	// Default if there's no selection/escalation checked
	if (!anyChecked) {
		return "No Escalations - Good to approve";
	}

	// Formatting escalation display
	if (result.length > 1) {
		result = result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
	}

	return "Escalating case - " + result + ".";
}

updateResult();
