const fetchTopOffers = async () => {
    const list = document.getElementById("unordered-list");
    const NUMBER_OF_OFFERS = 5;
    try {
        list.innerHTML = "";
        const response = await fetch("http://localhost:8080/topOffers");
        const result = await response.json();
        console.log(result.info);

        for (let i = 0; i < NUMBER_OF_OFFERS; i++) {
            console.log(result.isSuccessful);
            if (result.isSuccessful === false) {
                alert("Not enough records in database.");
                return;
            }

            var li = document.createElement("li");
            var button = document.createElement("button");

            //Get the image
            var image = document.createElement("img");
            var CHUNK_SIZE = 1024;
            var data = new Uint8Array(result.info[i].image.data);
            var imgStr = "";
            for (let j = 0; j < data.length; j += CHUNK_SIZE) {
                var chunk = data.subarray(j, j + CHUNK_SIZE);
                imgStr += String.fromCharCode.apply(null, chunk);
            }
            image.src = "data:image/jpeg;base64," + window.btoa(imgStr);
            image.alt = "An image of the car";

            //Create div tag and append the other info-columns of the car as children tags
            var div = document.createElement("div");

            var h2Brand = document.createElement("h2");
            h2Brand.textContent = "Brand: " + result.info[i].brand;
            h2Brand.className = "card-info";

            var h2Model = document.createElement("h2");
            h2Model.textContent = "Model: " + result.info[i].model;
            h2Model.className = "card-info";

            var h2Price = document.createElement("h2");
            h2Price.textContent = "Price: " + result.info[i].price + "€";
            h2Price.className = "card-car-price";

            var h3ManufactureDate = document.createElement("h3");
            h3ManufactureDate.textContent =
                "Manufacture date: " +
                (result.info[i].manufacture_date + "").substring(0, 10);
            h3ManufactureDate.className = "card-car-description";

            var h3Engine = document.createElement("h3");
            h3Engine.textContent = "Engine: " + result.info[i].engine;
            h3Engine.className = "card-car-description";

            var h3Liters = document.createElement("h3");
            h3Liters.textContent = "Liters: " + result.info[i].liters;
            h3Liters.className = "card-car-description";

            var h3Transmission = document.createElement("h3");
            h3Transmission.textContent =
                "Transmission: " + result.info[i].transmission;
            h3Transmission.className = "card-car-description";

            var h3Category = document.createElement("h3");
            h3Category.textContent = "Category: " + result.info[i].category;
            h3Category.className = "card-car-description";

            var h3Mileage = document.createElement("h3");
            h3Mileage.textContent = "Mileage: " + result.info[i].mileage + "km";
            h3Mileage.className = "card-car-description";

            div.appendChild(h2Brand);
            div.appendChild(h2Model);
            div.appendChild(h3ManufactureDate);
            div.appendChild(h3Engine);
            div.appendChild(h3Liters);
            div.appendChild(h3Transmission);
            div.appendChild(h3Category);
            div.appendChild(h3Mileage);
            div.appendChild(h2Price);

            button.appendChild(image);
            button.appendChild(div);
            li.appendChild(button);
            list.appendChild(li);
        }
    } catch (error) {
        console.log("Error:", error);
    }
};

fetchTopOffers();

//     <li>
//     <button>
//         <img src="pictures/CarWallpaper.jpg" alt="Car 1" />
//         <div class="card-info">
//             <h2 class="card-name">Car 1</h2>
//             <h3 class="card-car-description">
//                 This is fully electric car. Max Speed
//                 270km/h. Manifacture year: 2008
//                 hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhaeufhuahfuahfuhfeahuuefaigeigiugouGUguaguoGUGufguOGFUAGUGUGuoaguogfag
//             </h3>
//             <h2 class="card-car-price">11 000&euro;</h2>
//             <h2 class="card-car-price">11 000&euro;</h2>
//             <h2 class="card-car-price">11 000&euro;</h2>
//         </div>
//     </button>
// </li>
