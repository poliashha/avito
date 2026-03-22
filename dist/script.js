const URL_APP =
  "https://script.google.com/macros/s/AKfycbw65TZY6m6s_-sn5bcF4vDvDO10sL-FtG7aYjzskGRAC3BCxN8OIwAZsjqfDc1kCrZu/exec";

// находим форму в документе
const form = document.querySelector("#form");

// указываем адрес отправки формы (нужно только в начале примера)
form.action = URL_APP;

// вспомогательная функция проверки заполненности формы
function isFilled(details) {
  const { name, email, phone, rule, category } = details;
  if (!name) return false;
  
  return true;
}

// навешиваем обработчик на отправку формы
form.addEventListener("submit", async (ev) => {
  // отменяем действие по умолчанию
  ev.preventDefault();

  // получаем ссылки на элементы формы
  const name = document.querySelector("[name=name]");
 
  //const category = document.querySelector("[name=category]");

  // собираем данные из элементов формы
  let details = {
    name: name.value.trim(),
   
  };

  // если поля не заполнены - прекращаем обработку
  if (!isFilled(details)) return;

  // подготавливаем данные для отправки
  let formBody = [];
  for (let property in details) {
    // кодируем названия и значения параметров
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  // склеиваем параметры в одну строку
  formBody = formBody.join("&");

  // выполняем отправку данных в Google Apps
  const result = await fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    //cors: "no-cors", <- это неправильно
    mode: "cors", //<- оставим по умолчанию
    body: formBody,
  })
    .then((res) => res.json())
    .catch((err) => alert("Ошибка!"));
  // .then((res) => console.log(res));

  if (result.type === "success") {
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    alert("Спасибо за заявку!");
  }
  if (result.type === "error") {
    alert(`Ошибка( ${result.errors}`);
  }
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
