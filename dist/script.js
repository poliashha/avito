const scriptURL =
  "https://script.google.com/macros/s/AKfycbyfZZLbXIULvyZ3UZJ1DHqqVqmnuPQQ9xULOIsF6Bm7fTrFXFkUDCd0XmhzwZJj-kbufA/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
   const formData = new FormData(form);

   const drinks = formData.getAll("drinks");

   // Преобразуем массив в строку с разделителем (например, запятая)
   const drinksString = drinks.join(", ");

   // Создаем новый FormData и добавляем все поля
   const newFormData = new FormData();
   newFormData.append("name", formData.get("name"));
   newFormData.append("presence", formData.get("presence"));
   newFormData.append("allergy", formData.get("allergy"));
   newFormData.append("listallergy", formData.get("listallergy"));
   newFormData.append("drinks", drinksString); 
  
  fetch(scriptURL, { method: "POST", body: newFormData })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));
}); 

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
    document.getElementById("greeting").textContent = `Уважаемые,`;
    document.getElementById("greeting").textContent = `${decodedName}`;
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
