// Variables
const result = document.querySelector(".result");
const escalation = document.querySelector("#escalation");
const options = document.querySelectorAll(".option");
const amount = document.querySelector("#amount");
const amount_options = document.querySelector("#amount-options");
const amount_options_choices = document.querySelectorAll(".amount-option");
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
const noPermission = document.querySelector("#no-permission");
const noPermissionChoices = document.querySelector("#no-permission-choices");
const nj = document.querySelector("#nj");
const nj_options = document.querySelector("#nj-options");
const nj_options_choices = document.querySelectorAll(".nj-option");
const usersInitial = document.querySelector("#users-initial");
const usersInitialDetails = document.querySelector("#users-initial-details");
const usersInitial2 = document.querySelector("#users-initial2");
const usersInitialDetails2 = document.querySelector("#users-initial-details2");
const usersInitial3 = document.querySelector("#users-initial3");
const usersInitialDetails3 = document.querySelector("#users-initial-details3");
const noPermission2 = document.querySelector("#no-permission2");
const noPermissionChoices2 = document.querySelector("#no-permission-choices2");

const selectionDivs = document.querySelectorAll(".selection");
const resetBtn = document.querySelector("#reset");

const suspended_options = document.querySelector("#suspended-options");
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
const header = document.querySelector("header");

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
		newField.focus();
		addInputFieldListeners();

		// Add event listener to the remove button
		removeButton.addEventListener("click", () => {
			parent.removeChild(fieldContainer); // Remove the entire container
			updateResult();
		});
	});
});

// For copying escalation
function handleEscalationClick() {
	const textToCopy = escalation.textContent;

	navigator.clipboard
		.writeText(textToCopy)
		.then(() => {
			const popup = document.createElement("div");
			popup.classList.add("popup");
			popup.textContent = "Copied to clipboard!";
			result.appendChild(popup);

			setTimeout(() => {
				popup.style.opacity = "0";
				setTimeout(() => {
					result.removeChild(popup);
				}, 300); // Match the duration of the transition
			}, 500); // Display duration;
		})
		.catch((err) => {
			console.error("Could not copy text: ", err);
		});
}

function CtoCopy(event) {
	// Don't copy when typing on input fields
	if (event.target.tagName == "INPUT") {
		return;
	}

	if (event.key === "c" || event.key === "C") {
		// Your code here
		console.log('The "C" key was pressed!');
		handleEscalationClick();
	}
}

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

// Add event listeners to each "nj-option" div
nj_options_choices.forEach((option) => {
	option.addEventListener("click", () => {
		// Remove "checked" from all nj_options_choices
		nj_options_choices.forEach((opt) => opt.classList.remove("checked"));

		// Add "checked" to the clicked option
		option.classList.add("checked");
		updateResult();
	});
});

// Add event listeners to each "amount-option" div
amount_options_choices.forEach((option) => {
	option.addEventListener("click", () => {
		// Remove "checked" from all amount_options_choices
		amount_options_choices.forEach((opt) => opt.classList.remove("checked"));

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

document.addEventListener("click", () => {
	updateResult();
});

// Initialize first state (hidden)
donateInfo.style.display = "none";

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
		if (item.getAttribute("data-ignore") == "ignore") {
			return;
		}

		if (item.value !== "") {
			result.push(item.value.trim());
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

// For updating DOM
function updateResult() {
	escalation.textContent = GenerateText();
}

function getNamesCount() {
	const placeholder = 2;
	const namesGroup = document.querySelector("#name_names");
	const inputFields = namesGroup.querySelectorAll("input");

	let count = 0;

	inputFields.forEach((inputField) => {
		if (inputField.value.trim() !== "") {
			count++;
		}
	});

	return placeholder >= count ? placeholder : count;
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
		amount_options.style.display = "flex";
		let threshold = "";
		const isVIP = document.querySelector("#isVIP");

		if (isVIP.classList.contains("checked")) {
			threshold = "$25k";
		} else {
			threshold = "$24,999.99";
		}

		if (first_escalation) {
			result.push(`WD greater than ${threshold}`);
			first_escalation = false;
		} else {
			result.push(`WD greater than ${threshold}`);
		}
	} else {
		amount_options.style.display = "none";
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
		const namesCount = getNamesCount();

		//Get names
		if (first_escalation) {
			result.push(
				`${namesCount} different names on account: ${input_fields_content}`
			);
			first_escalation = false;
		} else {
			result.push(
				`has ${namesCount} different names on account: ${input_fields_content}`
			);
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
		const withdrawal_card = document.querySelector("#sa1_card1").value.trim();
		const largerCards = getInputFieldContents(sa1_cards);

		if (first_escalation) {
			result.push(
				`withdrawing to a payment method (${withdrawal_card}) used for a small deposit with larger deposits made with (${largerCards})`
			);
			first_escalation = false;
		} else {
			result.push(
				`withdrawing to a payment method (${withdrawal_card}) used for a small deposit with larger deposits made with (${largerCards})`
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
	// if (isChecked(user)) {
	// 	user_number.style.display = "flex";
	// 	const input_fields_content = getInputFieldContents(user_number);
	// 	if (first_escalation) {
	// 		result.push(
	// 			`Account is sharing a device with (${input_fields_content}) users`
	// 		);
	// 		first_escalation = false;
	// 	} else {
	// 		result.push(
	// 			`account is sharing a device with (${input_fields_content}) users`
	// 		);
	// 	}
	// } else {
	// 	user_number.style.display = "none";
	// }

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

	// No permission to open in nats
	if (isChecked(noPermission)) {
		noPermissionChoices.style.display = "flex";
		const clientState = document.querySelector("#client-state").value.trim();
		const withdrawalState = document
			.querySelector("#withdrawal-state")
			.value.trim();

		if (first_escalation) {
			result.push(
				`${clientState} client withdrawing to ${withdrawalState}, no permission to open in NATS`
			);
			first_escalation = false;
		} else {
			result.push(
				`${clientState} client withdrawing to ${withdrawalState}, no permission to open in NATS`
			);
		}
	} else {
		noPermissionChoices.style.display = "none";
	}

	// NJ Client withdrawing to licensed state
	if (isChecked(nj)) {
		let withdrawalState = "";
		const PA = document.querySelector("#PA");
		const WV = document.querySelector("#WV");

		// Use switch case to handle multiple options
		switch (true) {
			case isChecked(PA):
				withdrawalState = "PA";
				break;
			case isChecked(WV):
				withdrawalState = "WV";
				break;
			// Add more cases here as needed for future options
			default:
				withdrawalState = "unknown"; // Handle unexpected cases
		}

		nj_options.style.display = "flex";
		if (first_escalation) {
			result.push(`NJ Client withdrawing in ${withdrawalState} - No License`);
			first_escalation = false;
		} else {
			result.push(`NJ Client withdrawing in ${withdrawalState} - No License`);
		}
	} else {
		nj_options.style.display = "none";
	}

	// Device Sharing (initial escalation)
	if (isChecked(usersInitial)) {
		usersInitialDetails.style.display = "flex";
		const accountStatuses = getInputFieldContents(usersInitialDetails);
		const relatedUsers = document
			.querySelector("#initial-related")
			.value.trim();

		if (first_escalation) {
			result.push(
				`Has ${relatedUsers} related users - New device links to ${accountStatuses}`
			);
			first_escalation = false;
		} else {
			result.push(
				`has ${relatedUsers} related users - New device links to ${accountStatuses}`
			);
		}
	} else {
		usersInitialDetails.style.display = "none";
	}

	// Device Sharing (NOT initial escalation)
	if (isChecked(usersInitial2)) {
		usersInitialDetails2.style.display = "flex";
		const accountStatuses = getInputFieldContents(usersInitialDetails2);
		const relatedUsers = document
			.querySelector("#initial-related2")
			.value.trim();

		if (first_escalation) {
			result.push(
				`Now has ${relatedUsers} related users - device sharing with new account ${accountStatuses}`
				// `Device sharing with new account ${accountStatuses}`
			);
			first_escalation = false;
		} else {
			result.push(
				`now has ${relatedUsers} related users - device sharing with new account ${accountStatuses}`
				// `device sharing with new account ${accountStatuses}`
			);
		}
	} else {
		usersInitialDetails2.style.display = "none";
	}

	// Device Sharing 4+
	if (isChecked(usersInitial3)) {
		usersInitialDetails3.style.display = "flex";
		const numOfAccounts = getInputFieldContents(usersInitialDetails3);
		const relatedUsers = document
			.querySelector("#initial-related3")
			.value.trim();

		if (first_escalation) {
			result.push(
				`Has ${relatedUsers} related users - ${numOfAccounts} accounts on devices`
			);
			first_escalation = false;
		} else {
			result.push(
				`has ${relatedUsers} related users - ${numOfAccounts} accounts on devices`
			);
		}
	} else {
		usersInitialDetails3.style.display = "none";
	}

	// No permission to view the amelco in NATS
	if (isChecked(noPermission2)) {
		noPermissionChoices2.style.display = "flex";
		const clientState = getInputFieldContents(noPermissionChoices2);

		if (first_escalation) {
			result.push(`Sharing with ${clientState} account, unable to view`);
			first_escalation = false;
		} else {
			result.push(`sharing with ${clientState} account, unable to view`);
		}
	} else {
		noPermissionChoices2.style.display = "none";
	}

	if (!anyChecked) {
		// Default if there's no selection/escalation checked
		escalation.removeEventListener("click", handleEscalationClick);
		escalation.classList.add("no_content");
		document.removeEventListener("keydown", CtoCopy);

		header.style.background = "rgb(108 135 167)";
		header.style.color = "inherit";
		escalation.style.cursor = "not-allowed";
		return "No restrictions/escalations selected.";
	} else {
		// When at least one restriction is selected
		escalation.addEventListener("click", handleEscalationClick);
		escalation.classList.remove("no_content");
		document.addEventListener("keydown", CtoCopy);
		header.style.background = "rgba(255, 86, 57, 1)";
		header.style.color = "white";
		escalation.style.cursor = "pointer";
	}

	// Formatting escalation display
	if (result.length > 1) {
		result = result.slice(0, -1).join(", ") + ", and " + result.slice(-1);
	}

	return "Escalating case - " + result + ".";
}

updateResult();
//
