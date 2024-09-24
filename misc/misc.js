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
  cleared.textContent = `FBG Withdrawals Handled by MNL Team CLEARED - Updated as of ${currentTime}`;
}

updateCleared();

setInterval(updateCleared, 1000);
