const elem = document.querySelectorAll(".swiper-wrapper");
const btn = document.querySelector("#btn_update");

btn.onclick = () => {
    location.reload();
}

let volunteer = [];
let pet_claim = [];

async function getVolunteer() {
  const res = await fetch("http://localhost:8080/getVolunteerApplication", {
    method: "GET",
  });
  return res.json();
}

async function getPetClaim() {
  const res = await fetch("http://localhost:8080/getPetClaimApplication", {
    method: "GET",
  });
  return res.json();
}

async function loadVolunteer() {
  try {
    const response = await getVolunteer();
    volunteer = response;
  } catch (error) {
    console.error("Error fetching volunteers:", error);
  }
}

async function loadPetClaim() {
  try {
    const response = await getPetClaim();
    pet_claim = response;
  } catch (error) {
    console.error("Error fetching pets:", error);
  }
}

function setData() {
  volunteer.forEach((element) => {
    let html = `
        <div class="swiper-slide">
            <p class="text">Идентификатор чата: ${element.chatId}</p>
            <p class="text">Время подачи заявки: <br>   ${element.appliedAt}</p>
            <p class="text">Статус: ${element.status}</p>
            <p class="text">Дата визита: ${element.visitDate}</p>
            <p class="text">Индентификатор сообщения меню: ${element.notificationMessageId}</p>
            <div class="container_btn">
                <button>Одобрить</button>
                <button>Удалить</button>
            </div>
        </div>`;
    elem[0].insertAdjacentHTML("beforeend", html);
  });
  pet_claim.forEach((element) => {
    let html = `
        <div class="swiper-slide">
            <p class="text">Идентификатор питомца:<br> ${element.pk.id}</p>
            <p class="text">Идентификатор чата: ${element.pk.chatId}</p>
            <p class="text">Время подачи заявки: <br>   ${element.appliedAt}</p>
            <p class="text">Статус: ${element.status}</p>
            <p class="text">Дата визита: ${element.visitDate}</p>
            <p class="text">Индентификатор сообщения меню: ${element.notificationMessageId}</p>
            <div class="container_btn">
                <button>Одобрить</button>
                <button>Удалить</button>
            </div>
        </div>`;
    elem[1].insertAdjacentHTML("beforeend", html);
  });
}

async function main() {
  await loadVolunteer();
  await loadPetClaim();
  setData();

  const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
    
    slidesPerView: 1,
    slidesPerGroup: 1,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

main();
