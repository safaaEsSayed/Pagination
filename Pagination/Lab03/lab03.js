let buttonsList = document.querySelector(".pagination");
let page = document.querySelector(".pets");


async function getPets(pageNum) {
  let res = await (
    await fetch(`https://pets-v2.dev-apis.com/pets?page=${pageNum}`)
  ).json();
  if (!pageNum) setPages(res.numberOfResults, res.startIndex, res.endIndex);
  viewSelectedPage(res.pets);
}


function setPages(numberOfResults, starIndex, endIndex) {
  buttonsList.textContent = "";
  let numberOfPages = numberOfResults / (endIndex - starIndex);
  for (let i = 0; i < numberOfPages; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");
    li.setAttribute("id", i);
    li.classList.add("page-link");
    li.textContent = i + 1;
    li.addEventListener("click", (event) => {
      getPets(event.target.id);
    });
    buttonsList.append(li);
  }
}


function viewSelectedPage(pets) {
  page.textContent = "";
  pets.forEach((pet) => {
    let card = generateCard(pet);
    page.append(card);
  });
}


function generateCard(pet) {
  let card = document.createElement("div");
  card.classList.add("crad");
  card.setAttribute("style", "width: 18rem;");
  let cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", pet.images[0]);
  card.append(cardImg);
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = pet.name;
  cardBody.append(cardTitle);
  let cardText = document.createElement("p");
  cardText.classList.add("card-text");
  cardText.textContent = pet.description;
  cardBody.append(cardText);
  card.append(cardBody);
  return card;
}

getPets(0);
