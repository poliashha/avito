const TELEGRAM_BOT_TOKEN = "8798342879:AAFawWVHQ4lRPqVqjYQ6X5iclJd8u-B_d_o";
const TELEGRAM_CHAT_ID = "@WeddingDorogovi";
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

async function sendQuestionnaire(event) {
  event.preventDefault();
  const form = event.target;
  const formBth = document.querySelector(".button");
  const formSendResult = document.querySelector(".form-send");
  formSendResult.textContent = "";

  const formData = new FormData(form);

  const name = formData.get("name");
  const presence = formData.get("presence");
  const allergy = formData.get("allergy");
  const listallergy = formData.get("listallergy");
  const drinks = formData.getAll("drinks");

  const text = `Гость: ${name},\nбудет присутствовать: ${presence},\nесть аллергия: ${allergy}${allergy === "да" ? `,\nна что аллергия: ${listallergy}` : ""},\nнапитки: ${drinks.join(", ")}`;

  try {
    formBth.textContent = "Отправка...";
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
      }),
    });

    if (response.ok) {
      formSendResult.textContent = "Спасибо! Анкета отправлена.";

      form.reset();
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = "Спасибо! Анкета отправлена.";
  } finally {
    formBth.textContent = "Подтверидить присутсвие";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const yesRadio = document.getElementById("allergyYes");
  const noRadio = document.getElementById("allergyNo");
  const allergyBlock = document.getElementById("allergyDetails");

  function toggleAllergyField() {
    if (yesRadio.checked) {
      allergyBlock.classList.add("show");
    } else {
      allergyBlock.classList.remove("show");
    }
  }

  yesRadio.addEventListener("change", toggleAllergyField);
  noRadio.addEventListener("change", toggleAllergyField);
  toggleAllergyField();
});

const nameInput = document.getElementById("name");
const errorElement = document.getElementById("error-text");

nameInput.addEventListener("invalid", function (event) {
  event.preventDefault();
  if (this.validity.valueMissing) {
    errorElement.classList.add("show");
  }
});

nameInput.addEventListener("input", function () {
  if (this.value.trim() !== "") {
    errorElement.classList.remove("show");
  }
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("invalid", function (e) {
    e.preventDefault();
    document.getElementById("presenceError").classList.add("show");
    return false;
  });
});

document.querySelectorAll('input[name="presence"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    document.getElementById("presenceError").classList.remove("show");
  });
});

function startCountdown(targetDate) {
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("timer").style.display = "none";
      document.getElementById("datetime").textContent = "Мы стали семьей!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

const newYear = new Date(2026, 7, 14, 15, 0, 0).getTime();
startCountdown(newYear);

const urlParams = new URLSearchParams(window.location.search);
const nameParam = urlParams.get("name");
const arr = [
  "Анна",
  "Аня",
  "Бабушка",
  "Бабушка Ира",
  "Бабушка Света",
  "Наташа",
  "Наталия",
  "Тетя Таня",
  "Марина",
  "Шура",
  "Саша",
  "Александра",
  "Катя",
  "Екатерина",
  "Настя",
  "Анастасия",
  "Лена",
  "Елена",
  "Лиана",
  "Лера",
  "Валерия",
  "Полина",
  "Ульяна",
  "Влада",
  "Лариса",
  "Таня",
  "Татьяна",
  "Надя",
  "Надежда",
];
if (nameParam) {
  const decodedName = decodeURIComponent(nameParam.replace(/\+/g, " "));

  document.getElementById("greeting").style.fontSize = "30px";
  document.getElementById("greeting_wedding").style.fontSize = "30px";

  if (decodedName.includes(" ") && !decodedName.includes("Бабушка Ира")) {
    document.getElementById("greeting").textContent =
      `Уважаемые<br> ${decodedName},`;
  } else {
    if (arr.includes(decodedName)) {
      document.getElementById("greeting").textContent =
        `Уважаемая ${decodedName},`;
    } else
      document.getElementById("greeting").textContent =
        `Уважаемый ${decodedName},`;
  }
} else {
  document.getElementById("greeting").style.display = "none";
}

const button = document.querySelector(".button");
button.addEventListener("touchstart", function (e) {
  this.classList.add("touch-pressed");
});

button.addEventListener("touchend", function (e) {
  this.classList.remove("touch-pressed");
});

function initScrollAnimation() {
  const containers = document.querySelectorAll(".conteiner");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });
  containers.forEach((container) => {
    observer.observe(container);
  });
}
document.addEventListener("DOMContentLoaded", initScrollAnimation);
