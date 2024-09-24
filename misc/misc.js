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
    const textToCopy = textElement.textContent;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard!");
        // Optionally, provide visual feedback to the user
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

textGroups.forEach((group) => {
  group.addEventListener("click", copyTextContent);
});
