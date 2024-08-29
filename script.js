// Variables
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

//Helper functions
function isChecked(element) {
	if (element.classList.contains("checked")) {
		return true;
	} else {
		return false;
	}
}

//Main function
function GenerateText() {
	let result = "Escalating Case - ";
	let first_escalation = true;

	if (isChecked(suspended)) {
		if (first_escalation) {
			result += "Account is suspended";
			first_escalation = false;
		} else {
			result += " and account is suspended";
		}
	}

	if (isChecked(name1)) {
		//Get names
		if (first_escalation) {
			result += "Name mismatch";
			first_escalation = false;
		} else {
			result += "and name mismatch";
		}
	}

	if (isChecked(email)) {
		if (first_escalation) {
			result += "Email mismatch";
			first_escalation = false;
		} else {
			result += "Email mismatch";
		}
	}

	if (isChecked(lost)) {
		if (first_escalation) {
			result += "Has lost/stolen card";
			first_escalation = false;
		} else {
			result += "Has lost/stolen card";
		}
	}

	if (isChecked(sa1)) {
		//Get cards
		if (first_escalation) {
			result += "SA1";
			first_escalation = false;
		} else {
			result += "SA1";
		}
	}

	if (isChecked(sa2)) {
		//Get cards
		if (first_escalation) {
			result += "SA2";
			first_escalation = false;
		} else {
			result += "SA2";
		}
	}

	if (isChecked(cashed)) {
		if (first_escalation) {
			result += "Cashed out";
			first_escalation = false;
		} else {
			result += "Cashed out";
		}
	}

	if (isChecked(short)) {
		if (first_escalation) {
			result += "";
			first_escalation = false;
		} else {
			result += "";
		}
	}

	if (isChecked(user)) {
		//Get number of related users
		if (first_escalation) {
			result += "";
			first_escalation = false;
		} else {
			result += "";
		}
	}

	if (isChecked(outside)) {
		if (first_escalation) {
			result += "";
			first_escalation = false;
		} else {
			result += "";
		}
	}

	if (isChecked(newloc)) {
		if (first_escalation) {
			result += "";
			first_escalation = false;
		} else {
			result += "";
		}
	}
	return result;
}
console.log(isChecked(suspended));

console.log("test");
