const BASE_URL_ = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-acc-et-web-pt-a/events`;

const mainEl = document.getElementById("mainid");
const formEl = document.getElementById("formid");
const eventName = document.getElementById("eventName");
const description = document.getElementById("description");
const eventDate = document.querySelector("#dateIso");
const eventLocation = document.querySelector("#eventLocation");
// console.log("form", formid);
// console.log("eventdate", dateIso);
async function getEvents() {
  try {
    const response = await fetch(BASE_URL_);
    const data = await response.json();
    console.log("data", data.data);
    return data.data;
  } catch (err) {
    console.error(err);
  }
}
/** Render Events */
function render(events) {
  const template = events
    .map((event) => {
      return `<section>
               <h2>${event.name}</h2>
               <p>${event.description}</p>
               <h3>${event.date}</h3>
               <p>${event.location}</p>
               <button data-id="${event.id}">Delete Recipe</button> 
             </section>`;
    })
    .join("");
  mainEl.innerHTML = template;
}

async function eventApp() {
  const events = await getEvents();
  render(events);
}
eventApp();
// console.log("name", eventName.value);
// console.log("description", description.value);
// console.log("date", eventDate.vaule);
// console.log("location", eventLocation.vaule);
// console.log("eventName", eventName);
formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    // console.log("name", eventName.value);
    // console.log("description", description.value);
    // console.log("date", eventDate.value);
    // console.log("location", eventLocation.value);
    // console.log("eventName", eventName);

    const dateIso = new Date(eventDate.value).toISOString();
    await fetch(BASE_URL_, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: eventName.value,
        description: description.value,
        date: dateIso,
        location: eventLocation.value,
      }),
    });
    //Clear all the form fields
    eventName.value = "";
    description.value = "";
    eventDate.value = "";
    eventLocation.value = "";

    eventApp();
    if (!response.ok) {
      throw new Error("Failed to create Party");
    }
  } catch (err) {}
});

mainEl.addEventListener("click", async (e) => {
  if (e.target.matches("button")) {
    const id = e.target.dataset.id;
    await fetch(`${BASE_URL_}/${id}`, {
      method: "DELETE",
    });
    eventApp();
  }
});
