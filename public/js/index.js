const dataUrl = "https://raw.githubusercontent.com/dan-collins-dev/dummy-data-fetching-repo/main/data/users.json";

const allUsersBtn = document.getElementById( "allUsersBtn" );
const filteredUsersBtn = document.getElementById( "filteredUsersBtn" );
const resetBtn = document.getElementById( "resetBtn" );
const cardContainer = document.getElementById( "user-container" );

//
allUsersBtn.addEventListener('click', allUsersClicked );
filteredUsersBtn.addEventListener('click', filteredUsersClicked );
resetBtn.addEventListener('click', resetClicked );

function allUsersClicked() {
  const requestHeader = new Headers();
  requestHeader.append("Accept", "application/json");
  requestHeader.append("Content-Type", "application/json");
  
  const options = { 
    method: "GET",
    headers: requestHeader,
  };

  fetch(dataUrl, options)
    .then( response => {
      console.log(response);
      if( !response.ok ) {
        throw new Error(`Error fetching data: ${response.status}`)
      }

      return response.json();
    })
    .then( data => {
      const cards = [];

      for( let user of data ) {
        const card = createUserCard( user );
        cards.push(card);
      }

      cardContainer.replaceChild(cards);
    })
    .catch(error => {
      console.log(error);
    });
}

function filteredUsersClicked() {
  console.log("filteredUsersClicked");
}

function resetClicked() {
  cardContainer.replaceChildren(); // no args clears the children
  console.log("resetClicked");
}

function createUserCard ( user ) {
  const userCard = document.createElement('div');

  userCard.classList.add('user-card');
  userCard.setAttribute('data-user-id', user.id );
  userCard.innerHTML =
  `
    <p>${user.firstName} ${user.lastName}</p>
    <p>${user.email}</p>
    <p>${user.companyName}</p>
    <p>${user.yearsEmployed}</p>
  `;

  return userCard;
}
/*
  div template:
    <div class="user-card">
      <p class="user-name">James Glosser</p>
      <p class="user-email">demonicurges05@gmail.com</p>
      <p class="company-name">Livepath</p>
      <p class="years-employed">10</p>
    </div>
 */