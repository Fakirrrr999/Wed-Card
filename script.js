
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase Configuration
    const firebaseConfig = {
  apiKey: "AIzaSyCvEgEJoTIDukmS4G0QXzzO4CTnQHBNm1M",
  authDomain: "wed-card.firebaseapp.com",
  projectId: "wed-card",
  storageBucket: "wed-card.firebasestorage.app",
  messagingSenderId: "578362823380",
  appId: "1:578362823380:web:9240245b8ef5f473d86141"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// HTML Elements
const guestForm = document.getElementById("guestForm");
const guestName = document.getElementById("guestName");
const guestPhone = document.getElementById("guestPhone");
const guestConsent = document.getElementById("guestConsent");

const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

const registrationScreen =
    document.getElementById("registrationScreen");

const invitation = document.getElementById("invitation");

// Guest Registration
guestForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = guestName.value.trim();
    const phone = guestPhone.value.trim();

    if (name.length < 2 || name.length > 100) {
        formMessage.textContent = "Please enter a valid name.";
        return;
    }

    const phonePattern = /^\+?[0-9\s()-]{7,20}$/;

    if (!phonePattern.test(phone)) {
        formMessage.textContent = "Please enter a valid phone number.";
        return;
    }

    if (!guestConsent.checked) {
        formMessage.textContent = "Please accept the consent checkbox.";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Please Wait...";

    formMessage.textContent = "Saving your registration...";

    try {

        // Generate a unique guest ID
        const guestRef = push(ref(database, "guests"));

        // Save guest information
        await set(guestRef, {
            name: name,
            phone: phone,
            registeredAt: serverTimestamp()
        });

        formMessage.style.color = "green";
        formMessage.textContent =
            "Registration successful! Opening invitation...";

        setTimeout(() => {

            registrationScreen.classList.add("hidden");
            invitation.classList.remove("hidden");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }, 1000);

    } catch (error) {

        console.error("Firebase Error:", error);

        formMessage.style.color = "red";
        formMessage.textContent =
            "Registration failed. Please try again.";

        submitBtn.disabled = false;
        submitBtn.textContent = "Open Invitation";

    }

});
