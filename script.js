
//  Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCxwnqEuY3vGrFOk81MkYk8LXYh9Bu-gsY",
  authDomain: "foodbridge-d9a74.firebaseapp.com",
  projectId: "foodbridge-d9a74",
  storageBucket: "foodbridge-d9a74.appspot.com",
  messagingSenderId: "908551693136",
  appId: "1:908551693136:web:8c11e189386d6e9dbfc255"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Convert Firestore timestamp to "time ago"
function timeAgo(timestamp) {
  if (!timestamp) return "Just now";
  const now = new Date();
  const seconds = Math.floor((now - timestamp.toDate()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

// Restaurant form
// Restaurant form
const donationForm = document.getElementById("donationForm");

if (donationForm) {
  donationForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("✅ Submit clicked");

    const restaurantName = document.getElementById("restaurantName").value;
    const foodDetails = document.getElementById("foodDetails").value;
    const quantity = document.getElementById("quantity").value;

    console.log("📦 Data:", restaurantName, foodDetails, quantity);

    try {
      await db.collection("donations").add({
        restaurantName,
        foodDetails,
        quantity: parseInt(quantity),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: "available"
      });
      console.log("🔥 Firestore write success");
      alert("Donation posted successfully!");
    } catch (err) {
      console.error("❌ Firestore write failed:", err);
    }

    donationForm.reset();
  });
}

// Show recent donations (for restaurant view)
// Show recent donations (for restaurant view)
const donationList = document.getElementById("donationList");

if (donationList) {
  db.collection("donations")
    .orderBy("timestamp", "desc")
    .limit(10)
    .onSnapshot((snapshot) => {
      donationList.innerHTML = "";

      if (snapshot.empty) {
        donationList.innerHTML = "<li>No donations yet.</li>";
        return;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        const statusColor =
          data.status === "claimed"
            ? "red"
            : data.status === "available"
            ? "green"
            : "gray";

        const li = document.createElement("li");
        li.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
            <span>
              <strong>${data.restaurantName}</strong> - ${data.quantity} meals: ${data.foodDetails} 
            </span>
            <span style="color:${statusColor}; font-weight:bold;">${data.status || "unknown"}</span>
          </div>
        `;
        donationList.appendChild(li);
      });
    });
}



// NGO view: list available donations
// NGO view: list available donations
const ngoDonationList = document.getElementById("ngoDonationList");

if (ngoDonationList) {
  db.collection("donations")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      ngoDonationList.innerHTML = "";

      snapshot.forEach((doc) => {
        const data = doc.data();

        // Only show available donations
        if (data.status === "available") {
          const li = document.createElement("li");
          const timeText = timeAgo(data.timestamp);
          li.innerHTML = `
            <strong>${data.restaurantName}</strong> - ${data.quantity} meals: ${data.foodDetails}
            <br><small>🕒 ${timeText}</small>
            <button class="claimBtn">Claim</button>
          `;

          

          // Claim button click
          li.querySelector(".claimBtn").addEventListener("click", async () => {
            try {
              await db.collection("donations").doc(doc.id).update({
                status: "claimed"
              });
              // Strike-through text immediately
              li.style.textDecoration = "line-through";
              li.style.opacity = "0.6";

              // Optionally hide after 2–3 seconds
              setTimeout(() => li.remove(), 2000);
            } catch (err) {
              console.error("Claim failed:", err);
            }
          });

          ngoDonationList.appendChild(li);
        }
      });
    });
}


// ✅ Popup helper (keep this outside)
function showPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 2000);
}

// ✅ Claim function (separate)
window.claimDonation = async function (donationId) {
  try {
    const donationRef = db.collection("donations").doc(donationId);

    await donationRef.update({ status: "claimed" });
    showPopup("✅ Donation claimed!");

    console.log(`Donation ${donationId} claimed successfully!`);

    // Optional visual effect before removing
    const claimedItem = document.querySelector(
      `[onclick="window.claimDonation('${donationId}')"]`
    ).parentElement;
    claimedItem.style.textDecoration = "line-through";
    claimedItem.style.opacity = "0.6";
    setTimeout(() => claimedItem.remove(), 1000);
  } catch (error) {
    console.error("Error claiming donation:", error);
  }
};

// ✅ Live Firestore listener
if (ngoDonationList) {
  db.collection('donations')
    .where('status', '==', 'available')
    .onSnapshot(snapshot => {
      ngoDonationList.innerHTML = '';

      if (snapshot.empty) {
        ngoDonationList.innerHTML = '<li>No donations available right now.</li>';
        return;
      }

      snapshot.forEach(doc => {
        const data = doc.data();
        const docId = doc.id;

        const li = document.createElement('li');
        li.className = "donation-item";

        li.innerHTML = `
          <div style="display: flex; justify-content: center; gap: 20px; width: 100%; align-items: center; background: white; padding: 10px; margin: 5px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <span><strong>${data.restaurantName}</strong> - ${data.quantity} meals: ${data.foodDetails}</span>
            <button class="claim-btn" onclick="window.claimDonation('${docId}')">Claim</button>
          </div>
        `;
        ngoDonationList.appendChild(li);
      });
    }, error => {
      console.error("Firebase Error:", error.message);
      if (error.message.includes("requires an index")) {
        ngoDonationList.innerHTML =
          `<li>Error: <a href="https://console.firebase.google.com" target="_blank">Click here to enable the database index</a></li>`;
      }
    });
}
