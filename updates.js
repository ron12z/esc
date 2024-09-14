const showQR = document.querySelector("#show-QR");
const donateInfo = document.querySelector(".donate-info");

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
