// - A user can enter a US state and view a list of breweries in that state
//     - The list has a maximum of 10 breweries in it
//     - The list has three types of breweries that offer brewery tours:
//         - Micro
//         - Regional
//         - Brewpub
//     - Do not show the other types of breweries
// - From the list of breweries, a user can view the following details about each brewery:
//     - Name
//     - Type of brewery
//     - Address
//     - Phone Number
// - From the list of breweries, a user can visit the website of a brewery
// - From the 'filter by type of brewery' section, a user can filter by type of brewery
// - From the 'filter by city' section, a user can filter by city, the location of the brewery
// - From the 'filter by city' section, a user can clear all filters
// - From the 'search' section, a user can search for breweries by:
//     - Name
//     - City
// Instructions
// - Download the files from https://codesandbox.io/s/js-exercise-brewery-tour-starter-template-whq5i?file=/templates/main-section.html
// - Read the "Open Brewery DB" documentation: https://www.openbrewerydb.org/documentation/01-listbreweries
// - Think about which request type to use
// - Create a state object
// - Create a fetch function to get data
// - Create action functions that update state
// - Create render functions that read from state

// Tips
// - Start with the logic first, use console.log(state) to check your logic is working; when the logic is working as expected move onto styling
// - Use a cleanData function to modify the data in the fetch request before adding it to state
// - Use a extractCitiesData function to extract the cities from the data in the fetch request and add it to state for the 'filter by city' section
// - For filter by type use a select element to capture user input
// - For filter by city use a list of checkbox elements to capture user input

// Challenge
// - Add pagination to the list; if the list of breweries is greater than 10 a user can go to the next page to view more breweries

// Challenge 2
// - Add a booking section; a user can select a date and time to go on a tour at a brewery

function getdata() {
  fetch("https://api.openbrewerydb.org/breweries")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (resp) {
      state.breweries = resp;
    });
}
const state = {
  breweries: [],
};
getdata();

// get state info
let stateinfo = "";
function getstateinfo() {
  stateinfo = state.breweries.filter(function (item) {
    return (
      item.state.toUpperCase() === stateinput.value.toString().toUpperCase()
    );
  });
}

let formel = document.querySelector("#select-state-form");
let stateinput = document.querySelector("#select-state");
formel.addEventListener("submit", function (event) {
  event.preventDefault();
  getstateinfo();
  //trigger show function
});

function loadmainsection() {}
const mainel = document.querySelector("main");
function loadaside() {
  const asideel = document.createElement("aside");
  asideel.classList.add("filters-section");
  mainel.append(asideel);

  const h2el = document.createElement("h2");
  h2el.innerText = "Filter By:";

  const formfilterel = document.createElement("form");
  formfilterel.setAttribute("id", "filter-by-type-form");

  const filterlabel = document.createElement("label");
  filterlabel.setAttribute("for", "filter-by-type");

  const h3el = document.createElement("h3");
  h3el.innerText = "Type of Brewery";
  filterlabel.append(h3el);

  const filtersectionel = document.createElement("select");
  filtersectionel.setAttribute("name", "filter-by-type");
  filtersectionel.setAttribute("id", "filter-by-type");

  const opt = document.createElement("option");
  opt.setAttribute("value", "");
  opt.innerText = "Select a type...";

  const optone = document.createElement("option");
  optone.setAttribute("value", "micro");
  optone.innerText = "micro";

  const optwo = document.createElement("option");
  optwo.setAttribute("value", "regional");
  optwo.innerText = "regional";

  const opthree = document.createElement("option");
  opthree.setAttribute("value", "brewpub");
  opthree.innerText = "brewpub";

  filtersectionel.append(opt, optone, optwo, opthree);
  formfilterel.append(filterlabel, filtersectionel);

  const divelcity = document.createElement("div");
  divelcity.setAttribute("class", "filter-by-city-heading");
  const h3cityel = document.createElement("h3");
  h3cityel.innerText = "Cities";
  const btn = document.createElement("button");
  btn.setAttribute("class", "clear-all-btn");
  btn.innerText = "clear all";
  divelcity.append(h3cityel, btn);

  const formfilterbycity = document.createElement("form");
  formfilterbycity.setAttribute("id", "filter-by-city-form");

  for (const cityinfo of stateinfo) {
    console.log(cityinfo);
    const checkboxinput = document.createElement("input");
    let cityname = cityinfo.city;
    checkboxinput.setAttribute("type", "checkbox");
    checkboxinput.setAttribute("name", `${cityname}`);
    checkboxinput.setAttribute("value", `${cityname}`);

    const labelinputforcity = document.createElement("label");
    labelinputforcity.setAttribute("for", `${cityname}`);
    labelinputforcity.innerText = `${cityname}`;
    formfilterbycity.append(checkboxinput, labelinputforcity);
  }

  asideel.append(h2el, formfilterel, divelcity, formfilterbycity);
}
loadaside();
function loadlist() {}

let h1el = document.createElement("h1");
h1el.innerText = "List of Breweries";

let headerel = document.createElement("header");
headerel.classList.add("search-bar");

let articleel = document.createElement("article");
mainel.append(h1el, headerel, articleel);

let formforsearch = document.createElement("form");
formforsearch.setAttribute("id", "search-breweries-form");

let labelforsearch = document.createElement("label");
labelforsearch.setAttribute("for", "search-breweries");

let h2forsearch = document.createElement("h2");
h2forsearch.innerText = "Search breweries";
labelforsearch.append(h2forsearch);

let inputforsearch = document.createElement("input");
inputforsearch.setAttribute("id", "search-breweries");
inputforsearch.setAttribute("name", "search-breweries");
inputforsearch.setAttribute("type", "text");

formforsearch.append(labelforsearch, labelforsearch, inputforsearch);
headerel.append(formforsearch);

let ulel = document.createElement("ul");
ulel.classList.add("breweries-list");

articleel.append(ulel);

// need for loop

let listofshop = document.createElement("li");
ulel.append(listofshop);

let shopname = document.createElement("h2");
// variable
shopname.innerText = "shopname";

let divbretype = document.createElement("div");
divbretype.classList.add("type");
// variable
divbretype.innerText = "divbretype";

let addresssection = document.createElement("section");
addresssection.classList.add("address");

let addressh3 = document.createElement("h3");
addressh3.innerText = "Address:";

let roadaddress = document.createElement("p");
// varible
roadaddress.innerText = "roadaddress";

let citypluspostcode = document.createElement("p");
let strongsign = document.createElement("strong");
citypluspostcode.append(strongsign);
strongsign.innerText = "city, postcode";

addresssection.append(addressh3, roadaddress, citypluspostcode);

let phonesection = document.createElement("section");
phonesection.classList.add("phone");

let phoneh3 = document.createElement("h3");
phoneh3.innerText = "Phone:";

let phonep = document.createElement("p");
// varible
phonep.innerText = "phone";

phonesection.append(phoneh3, phonep);

let linksection = document.createElement("section");
linksection.classList.add("link");

let alink = document.createElement("a");
// varbible
alink.setAttribute("href", ".");
alink.setAttribute("target", "_blank");
alink.innerText = "Visit Website";

linksection.append(alink);
listofshop.append(
  shopname,
  divbretype,
  addresssection,
  phonesection,
  linksection
);
