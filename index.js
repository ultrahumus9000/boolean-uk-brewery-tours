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
const state = {
  breweries: [],
  brewtype: "",
  brewcity: [],
  search: "",
  indexupdate: 0,
  book: [],
};

function getdata(usstate) {
  return fetch(
    `https://api.openbrewerydb.org/breweries?by_state=${usstate}&per_page=50`
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (statebreweries) {
      let filteredbreweris = statebreweries.filter(function (brewery) {
        return ["micro", "regional", "brewpub"].includes(brewery.brewery_type);
      });
      state.breweries = filteredbreweris;
      return state.breweries;
    });
}
let page = document.querySelector("footer");
let formel = document.querySelector("#select-state-form");
let stateinput = document.querySelector("#select-state");
formel.addEventListener("submit", function (event) {
  event.preventDefault();
  page.setAttribute("style", "visibility: visible");
  let usstate = stateinput.value;
  getdata(usstate).then(function (stateinfo) {
    let newindex = state.indexupdate + 10;
    stateinfo = state.breweries.slice(state.indexupdate, newindex);
    loadmainsection(usstate, stateinfo);
    let pageselector = document.querySelector(".second");
    pageselector.addEventListener("click", function (event) {
      event.preventDefault();
      state.indexupdate = 10;
      newindex = newindex + 10;
      let newstateinfo = state.breweries.slice(state.indexupdate, newindex);
      loadmainsection(usstate, newstateinfo);
    });
  });
});

function pagedynamic() {}

function getrenderinfo() {
  let brewerytorender = state.breweries;
  if (state.brewtype !== "") {
    brewerytorender = brewerytorender.filter(function (brewery) {
      return brewery.brewery_type === state.brewtype;
    });
  }
  if (state.brewcity.length !== 0) {
    brewerytorender = brewerytorender.filter(function (brewery) {
      return state.brewcity.includes(brewery.city);
    });
  }
  if (state.search !== "") {
    brewerytorender = brewerytorender.filter(function (brewery) {
      return brewery.name.toLowerCase().includes(state.search.toLowerCase());
    });
  }

  brewerytorender = brewerytorender.slice(0, 10);
  console.log(brewerytorender);
  return brewerytorender;
}

const mainel = document.querySelector("main");
const ulel = document.createElement("ul");

function loadmainsection(usstate, stateinfo) {
  loadaside(usstate);
  createmainlisttitle();

  loadlists(stateinfo);
}

function loadaside(usstate) {
  mainel.innerHTML = "";
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
  filtersectionel.append(opt);

  let optionsarray = ["micro", "regional", "brewpub"];

  for (const option of optionsarray) {
    const breweriytype = document.createElement("option");
    breweriytype.setAttribute("value", option);
    breweriytype.innerText = option;
    filtersectionel.append(breweriytype);
  }

  filtersectionel.addEventListener("change", function (event) {
    state.brewtype = event.target.value;
    let breweryinfo = getrenderinfo();
    loadlists(breweryinfo);
  });

  formfilterel.append(filterlabel, filtersectionel);

  const divelcity = document.createElement("div");
  divelcity.setAttribute("class", "filter-by-city-heading");
  const h3cityel = document.createElement("h3");
  h3cityel.innerText = "Cities";
  const clearbtn = document.createElement("button");
  clearbtn.setAttribute("class", "clear-all-btn");
  clearbtn.innerText = "clear all";
  divelcity.append(h3cityel, clearbtn);

  clearbtn.addEventListener("click", function () {
    let allCheckBox = document.querySelectorAll("input[type = 'checkbox']");
    for (const checkbox of allCheckBox) {
      checkbox.checked = false;
    }
    state.brewtype = "";
    state.brewcity = [];
    console.log(state);
    let renderinfo = getrenderinfo();
    console.log(renderinfo);
    loadlists(renderinfo);
  });

  const formfilterbycity = document.createElement("form");
  formfilterbycity.setAttribute("id", "filter-by-city-form");

  // or load without if statement
  function unique(array) {
    return [...new Set(array)];
  }
  let needfiltercity = state.breweries.map(function (brewery) {
    return brewery.city;
  });
  let readycitylist = unique(needfiltercity).slice().sort();

  //   let checkboxcity = [];
  for (const cityinfo of readycitylist) {
    // let checkboxinlist = !checkboxcity.includes(cityinfo.city);
    // checkboxcity.push(cityinfo.city);
    const checkboxinput = document.createElement("input");
    checkboxinput.setAttribute("type", "checkbox");
    checkboxinput.setAttribute("name", `${cityinfo}`);
    checkboxinput.setAttribute("value", `${cityinfo}`);

    const labelinputforcity = document.createElement("label");
    labelinputforcity.setAttribute("for", `${cityinfo}`);
    labelinputforcity.innerText = `${cityinfo}`;
    formfilterbycity.append(checkboxinput, labelinputforcity);
    checkboxinput.addEventListener("click", function (event) {
      let cityname = event.target.value;
      if (event.target.checked) {
        if (!state.brewcity.includes(cityname)) {
          state.brewcity.push(cityname);
        }
        let renderinfo = getrenderinfo();
        console.log(renderinfo);
        loadlists(renderinfo);
        console.log(state);
      } else {
        let index = state.brewcity.indexOf(cityname);
        state.brewcity.splice(index, 1);
        let renderinfo = getrenderinfo();
        console.log(renderinfo);
        loadlists(renderinfo);
        console.log(state);
      }
    });
  }

  asideel.append(h2el, formfilterel, divelcity, formfilterbycity);
}

function createmainlisttitle() {
  let h1el = document.createElement("h1");
  h1el.innerText = "List of Breweries";

  let headerel = document.createElement("header");
  headerel.classList.add("search-bar");

  let articleel = document.createElement("article");

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
  ulel.classList.add("breweries-list");
  articleel.append(ulel);
  mainel.append(h1el, headerel, articleel);
  formforsearch.addEventListener("input", function (event) {
    event.preventDefault();
    state.search = formforsearch["search-breweries"].value;
    // console.log(getrenderinfo());
    let renderinfo = getrenderinfo();
    loadlists(renderinfo);
  });

  return ulel;
}

// need for loop
function loadlists(singletypebrewery) {
  ulel.innerText = "";
  console.log(singletypebrewery);
  for (const optionstate of singletypebrewery) {
    loadlist(optionstate);
  }
}

function loadlist(filterinfo) {
  let listofshop = document.createElement("li");
  ulel.append(listofshop);

  let shopname = document.createElement("h2");
  // variable
  shopname.innerText = filterinfo.name;

  let divbretype = document.createElement("div");
  divbretype.classList.add("type");
  // variable
  divbretype.innerText = filterinfo.brewery_type;

  let addresssection = document.createElement("section");
  addresssection.classList.add("address");

  let addressh3 = document.createElement("h3");
  addressh3.innerText = "Address:";

  let roadaddress = document.createElement("p");
  // varible
  roadaddress.innerText = filterinfo.street;

  let citypluspostcode = document.createElement("p");
  let strongsign = document.createElement("strong");
  citypluspostcode.append(strongsign);
  // variable
  strongsign.innerText = `${filterinfo.city}, ${filterinfo.postal_code}`;

  addresssection.append(addressh3, roadaddress, citypluspostcode);

  let phonesection = document.createElement("section");
  phonesection.classList.add("phone");

  let phoneh3 = document.createElement("h3");
  phoneh3.innerText = "Phone:";

  let phonep = document.createElement("p");
  // varible
  phonep.innerText = filterinfo.phone;

  phonesection.append(phoneh3, phonep);

  let linksection = document.createElement("section");
  linksection.classList.add("link");

  let alink = document.createElement("a");
  // varbible
  alink.setAttribute("href", filterinfo.website_url);
  alink.setAttribute("target", "_blank");
  alink.innerText = "Visit Website";

  let bookBtn = document.createElement("button");
  bookBtn.setAttribute("class", "book_button");
  bookBtn.innerText = "Book";
  bookBtn.addEventListener("click", function () {
    createmodal(filterinfo);
  });
  linksection.append(bookBtn);
  linksection.append(alink);
  listofshop.append(
    shopname,
    divbretype,
    addresssection,
    phonesection,
    linksection
  );
}

function createmodal(filterinfo) {
  let myModal = document.createElement("div");
  myModal.setAttribute("class", "myModal");
  let bookform = document.createElement("form");
  bookform.classList.add("bookform");
  let bookp = document.createElement("p");
  bookp.innerText = "Welcome to book with ";

  let breweryshop = document.createElement("span");
  breweryshop.classList.add("breweryshop");
  breweryshop.innerText = filterinfo.name;
  bookp.append(breweryshop);

  let bookname = document.createElement("label");
  bookname.innerText = "Your Name";
  let nameinput = document.createElement("input");
  nameinput.setAttribute("type", "text");
  nameinput.setAttribute("name", "bookname");
  bookname.append(nameinput);

  let visitlable = document.createElement("label");
  visitlable.innerText = "Date";
  let visitinput = document.createElement("input");
  visitinput.setAttribute("type", "date");
  visitinput.setAttribute("name", "date");
  visitlable.append(visitinput);

  let timeselectlable = document.createElement("label");

  timeselectlable.innerText = "Choose a Time Slot";

  let visitselect = document.createElement("select");
  let timeArray = ["11:00 AM", "12:00 PM", "13:00 PM", "14:00 PM"];

  for (const timeslot of timeArray) {
    let timebookslot = document.createElement("option");
    timebookslot.setAttribute("class", "timeslot");
    timebookslot.setAttribute("value", timeslot);
    timebookslot.innerText = timeslot;
    visitselect.append(timebookslot);
  }

  timeselectlable.append(visitselect);

  let phonelabel = document.createElement("label");
  phonelabel.innerText = "Contact Number";

  let phoneinput = document.createElement("input");
  phoneinput.setAttribute("name", "phoneinput");
  phoneinput.setAttribute("type", "tel");
  phonelabel.append(phoneinput);

  let confirmBtn = document.createElement("button");
  confirmBtn.setAttribute("class", "confirmBtn");
  confirmBtn.innerText = "Confirm";

  bookform.append(
    bookp,
    bookname,
    visitlable,
    timeselectlable,
    phonelabel,
    confirmBtn
  );
  myModal.append(bookform);

  document.body.prepend(myModal);

  bookform.addEventListener("submit", function (event) {
    event.preventDefault();
    let bookObj = {
      guestname: nameinput.value,
      date: visitinput.value,
      timeslot: visitselect.value,
      contact: phoneinput.value,
    };
    state.book.push(bookObj);
    myModal.remove();
  });
}
