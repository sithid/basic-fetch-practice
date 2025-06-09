// this url is the only one that would work. I tried the address from the assignment, I tried the raw.githubusercontent.com,
// I finally got it working using the api.
const dataUrl =
  "https://api.github.com/repos/dan-collins-dev/dummy-data-fetching-repo/contents/data/users.json";

const allUsersBtn = document.getElementById("allUsersBtn");
const filteredUsersBtn = document.getElementById("filteredUsersBtn");
const resetBtn = document.getElementById("resetBtn");
const cardContainer = document.getElementById("user-container");

allUsersBtn.addEventListener("click", allUsersClicked);
filteredUsersBtn.addEventListener("click", filteredUsersClicked);
resetBtn.addEventListener("click", resetClicked);

function allUsersClicked() {
  const requestHeader = new Headers();
  requestHeader.append("Accept", "application/json");
  requestHeader.append("Content-Type", "application/json");

  const options = {
    method: "GET",
    headers: requestHeader,
  };

  fetch(dataUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      // data.content is base64 encoded.
      // decode and convert to json.
      const decodedContent = atob(data.content);
      const jsonData = JSON.parse(decodedContent);

      const cards = [];

      // process users
      for (let user of jsonData) {
        const card = createUserCard(user);
        cards.push(card);
      }

      cardContainer.replaceChildren(...cards);
    })
    .catch((error) => {
      console.log(error);
    });
}

function filteredUsersClicked() {
  const requestHeader = new Headers();
  requestHeader.append("Accept", "application/json");
  requestHeader.append("Content-Type", "application/json");

  const options = {
    method: "GET",
    headers: requestHeader,
  };

  fetch(dataUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      const decodedContent = atob(data.content);
      const jsonData = JSON.parse(decodedContent);

      const cards = [];

      for (let user of jsonData) {
        // filter users without enough experience
        if (user.yearsEmployed < 10) {
          const card = createUserCard(user);
          cards.push(card);
        }
      }

      cardContainer.replaceChildren(...cards);
    })
    .catch((error) => {
      console.log(error);
    });
}

function resetClicked() {
  cardContainer.replaceChildren(); // no args clears the children
}

function createUserCard(user) {
  // I like flex alot but grid seems to be the best
  // choice for the user card.  Placement of divs
  // containing the user info is much more consistent.

  const userCard = document.createElement("div");
  userCard.classList.add("user-card");
  userCard.setAttribute("data-user-id", user.id);

  const nameInfo = document.createElement("div");
  nameInfo.classList.add("user-info");
  nameInfo.innerHTML = `<strong>Name:</strong> ${user.firstName} ${user.lastName}`;

  const emailInfo = document.createElement("div");
  emailInfo.classList.add("user-info");
  emailInfo.innerHTML = `<strong>Email:</strong> ${user.email}`;

  const companyInfo = document.createElement("div");
  companyInfo.classList.add("user-info");
  companyInfo.innerHTML = `<strong>Company:</strong> ${user.companyName}`;

  const yearsInfo = document.createElement("div");
  yearsInfo.classList.add("user-info");
  yearsInfo.innerHTML = `<strong>Years:</strong> ${user.yearsEmployed}`;

  userCard.append(nameInfo, emailInfo, companyInfo, yearsInfo);
  return userCard;
}
