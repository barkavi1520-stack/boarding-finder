/* =====================================
   BOARDING FINDER
   ===================================== */


/* =====================================
   SAMPLE BOARDINGS
   ===================================== */

const defaultBoardings = [

    {
        id: 1,

        name: "Cozy Student Boarding",

        location: "Moratuwa",

        price: 15000,

        people: 2,

        contact: "0771234567",

        image:
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",

        description:
            "A comfortable and peaceful boarding place suitable for university students. Located close to shops and public transport.",

        facilities:
            ["Wi-Fi", "Kitchen", "Parking"]

    },


    {
        id: 2,

        name: "Green Garden Boarding",

        location: "Katubedda",

        price: 12000,

        people: 2,

        contact: "0712345678",

        image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",

        description:
            "Affordable student accommodation in a quiet neighbourhood with easy access to public transportation.",

        facilities:
            ["Wi-Fi", "Kitchen"]

    },


    {
        id: 3,

        name: "Modern City Room",

        location: "Dehiwala",

        price: 20000,

        people: 1,

        contact: "0759876543",

        image:
            "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",

        description:
            "Modern private room with a comfortable environment. Perfect for students or young professionals.",

        facilities:
            ["Wi-Fi", "AC", "Parking"]

    },


    {
        id: 4,

        name: "Sunshine Ladies Boarding",

        location: "Mount Lavinia",

        price: 18000,

        people: 2,

        contact: "0764567890",

        image:
            "https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=900&q=80",

        description:
            "Safe and comfortable accommodation with a peaceful environment and easy access to shops.",

        facilities:
            ["Wi-Fi", "Kitchen", "AC"]

    },


    {
        id: 5,

        name: "Budget Friends Boarding",

        location: "Colombo",

        price: 9000,

        people: 4,

        contact: "0781122334",

        image:
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=900&q=80",

        description:
            "Budget-friendly shared boarding for students and friends. Great option for people looking for affordable accommodation.",

        facilities:
            ["Wi-Fi", "Kitchen", "Parking"]

    },


    {
        id: 6,

        name: "Blue Sky Residence",

        location: "Moratuwa",

        price: 22000,

        people: 1,

        contact: "0709988776",

        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=80",

        description:
            "Premium private room with modern facilities and a peaceful atmosphere.",

        facilities:
            ["Wi-Fi", "AC", "Kitchen", "Parking"]

    }

];


/* =====================================
   LOAD SAVED BOARDINGS
   ===================================== */

let savedBoardings =
    JSON.parse(localStorage.getItem("boardingHubBoardings")) || [];

let boardings = [
    ...defaultBoardings,
    ...savedBoardings
];


/* =====================================
   FAVORITES
   ===================================== */

let favorites =
    JSON.parse(localStorage.getItem("boardingHubFavorites")) || [];


/* =====================================
   DISPLAY BOARDINGS
   ===================================== */

function displayBoardings(data = boardings) {

    const grid =
        document.getElementById("boardingGrid");

    const noResults =
        document.getElementById("noResults");


    grid.innerHTML = "";


    if (data.length === 0) {

        noResults.style.display = "block";

        return;

    }


    noResults.style.display = "none";


    data.forEach(boarding => {

        const isFavorite =
            favorites.includes(boarding.id);


        const card =
            document.createElement("div");

        card.className = "boarding-card";


        card.innerHTML = `

            <div class="card-image">

                <img
                    src="${boarding.image}"
                    alt="${boarding.name}"
                    onerror="this.src='https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80'"
                >

                <button
                    class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${boarding.id})"
                    aria-label="Favorite">

                    <i class="fa-${isFavorite ? "solid" : "regular"} fa-heart"></i>

                </button>

            </div>


            <div class="card-body">

                <span class="card-location">

                    <i class="fa-solid fa-location-dot"></i>

                    ${boarding.location}

                </span>


                <h3 class="card-title">

                    ${boarding.name}

                </h3>


                <p class="card-description">

                    ${boarding.description}

                </p>


                <div class="card-bottom">

                    <div class="price">

                        Rs. ${Number(boarding.price).toLocaleString()}

                        <small>/month</small>

                    </div>


                    <button
                        class="view-btn"
                        onclick="openDetails(${boarding.id})">

                        View Details

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* =====================================
   FILTER BOARDINGS
   ===================================== */

function filterBoardings() {

    const location =
        document.getElementById("locationFilter").value;

    const price =
        document.getElementById("priceFilter").value;

    const people =
        document.getElementById("peopleFilter").value;


    const filtered =
        boardings.filter(boarding => {


            const locationMatch =
                location === "all" ||
                boarding.location === location;


            const priceMatch =
                price === "all" ||
                boarding.price <= Number(price);


            let peopleMatch = true;


            if (people !== "all") {

                if (people === "4") {

                    peopleMatch =
                        boarding.people >= 4;

                } else {

                    peopleMatch =
                        boarding.people >= Number(people);

                }

            }


            return (
                locationMatch &&
                priceMatch &&
                peopleMatch
            );

        });


    displayBoardings(filtered);


    document
        .getElementById("listings")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================
   CLEAR FILTERS
   ===================================== */

function clearFilters() {

    document.getElementById("locationFilter").value = "all";

    document.getElementById("priceFilter").value = "all";

    document.getElementById("peopleFilter").value = "all";


    displayBoardings();

}


/* =====================================
   FAVORITE
   ===================================== */

function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(
                favoriteId => favoriteId !== id
            );

    } else {

        favorites.push(id);

    }


    localStorage.setItem(
        "boardingHubFavorites",
        JSON.stringify(favorites)
    );


    displayBoardings();

}


/* =====================================
   OPEN DETAILS
   ===================================== */

function openDetails(id) {

    const boarding =
        boardings.find(
            item => item.id === id
        );


    if (!boarding) return;


    document.getElementById("modalImage").src =
        boarding.image;


    document.getElementById("modalName").textContent =
        boarding.name;


    document.getElementById("modalLocation").innerHTML =
        `<i class="fa-solid fa-location-dot"></i> ${boarding.location}`;


    document.getElementById("modalPrice").textContent =
        `Rs. ${Number(boarding.price).toLocaleString()} / month`;


    document.getElementById("modalDescription").textContent =
        boarding.description;


    document.getElementById("modalContact").textContent =
        boarding.contact;


    document.getElementById("callButton").href =
        `tel:${boarding.contact}`;


    const facilities =
        document.getElementById("modalFacilities");


    facilities.innerHTML = "";


    boarding.facilities.forEach(facility => {

        const span =
            document.createElement("span");

        span.innerHTML =
            `<i class="fa-solid fa-check"></i> ${facility}`;

        facilities.appendChild(span);

    });


    document
        .getElementById("detailsModal")
        .classList.add("show");

}


/* =====================================
   CLOSE MODAL
   ===================================== */

function closeModal() {

    document
        .getElementById("detailsModal")
        .classList.remove("show");

}


/* =====================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
   ===================================== */

document
    .getElementById("detailsModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


/* =====================================
   ADD BOARDING
   ===================================== */

document
    .getElementById("boardingForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const facilities =
            Array.from(
                document.querySelectorAll(".facility:checked")
            ).map(
                checkbox => checkbox.value
            );


        const newBoarding = {

            id: Date.now(),

            name:
                document.getElementById("boardingName").value,

            location:
                document.getElementById("boardingLocation").value,

            price:
                Number(
                    document.getElementById("boardingPrice").value
                ),

            people:
                Number(
                    document.getElementById("boardingPeople").value
                ),

            contact:
                document.getElementById("boardingContact").value,

            image:
                document.getElementById("boardingImage").value ||
                "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=900&q=80",

            description:
                document.getElementById("boardingDescription").value,

            facilities:
                facilities.length > 0
                    ? facilities
                    : ["Basic Facilities"]

        };


        savedBoardings.push(newBoarding);


        localStorage.setItem(
            "boardingHubBoardings",
            JSON.stringify(savedBoardings)
        );


        boardings.push(newBoarding);


        displayBoardings();


        this.reset();


        alert(
            "🎉 Boarding place added successfully!"
        );


        document
            .getElementById("listings")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


/* =====================================
   MOBILE MENU
   ===================================== */

function toggleMenu() {

    document
        .querySelector(".nav-links")
        .classList.toggle("active");

}


/* =====================================
   CLOSE MOBILE MENU AFTER CLICK
   ===================================== */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            document
                .querySelector(".nav-links")
                .classList.remove("active");

        });

    });


/* =====================================
   INITIAL LOAD
   ===================================== */

displayBoardings();