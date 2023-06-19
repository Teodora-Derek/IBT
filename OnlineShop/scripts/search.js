const brand = document.querySelector("#brand");
const model = document.querySelector("#model");
const category = document.querySelector("#category");
const searchButton = document.querySelector("#search");
// const isBrandChecked = false;
// const isModelChecked = false;

const loadBrands = async () => {
    const response = await fetch("http://localhost:8080/getBrands");
    const result = await response.json();
    const brands = result.brands;

    for (let i = 0; i < brands.length; i++) {
        const option = document.createElement("option");
        option.textContent = brands[i].brand;
        option.setAttribute("id", option.textContent);
        brand.appendChild(option);
    }
};

const loadModels = async (brandId) => {
    try {
        const response = await fetch("http://localhost:8080/getModels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ brandId }),
        });
        if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
        }
        const result = await response.json();
        const models = result.models;

        console.log(result);
        for (let i = 0; i < models.length; i++) {
            const option = document.createElement("option");
            option.textContent = models[i].model;
            model.appendChild(option);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

const loadCategories = async (modelId) => {
    try {
        const response = await fetch("http://localhost:8080/getCategories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ modelId }),
        });
        if (!response.ok) {
            throw new Error("Request failed with status: " + response.status);
        }
        const result = await response.json();
        const categories = result.categories;

        console.log(result);
        for (let i = 0; i < categories.length; i++) {
            const option = document.createElement("option");
            option.textContent = categories[i].category;
            category.appendChild(option);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

brand.addEventListener("change", async () => {
    const selectedBrandId = brand.value;
    console.log(selectedBrandId);
    if (selectedBrandId) {
        model.innerHTML = "<option>Select a car model</option>";
        await loadModels(selectedBrandId);
    }
});

loadBrands();

model.addEventListener("change", async () => {
    const selectedModelId = model.value;
    console.log(selectedModelId);
    if (selectedModelId) {
        category.innerHTML = "<option>Select a car category</option>";
        await loadCategories(selectedModelId);
    }
});

searchButton.addEventListener("click", async () => {
    await applyFilters();
});

const addCarInfo = (car, carDiv) => {
    var brandPara = document.createElement("p");
    brandPara.textContent = "Brand: " + car.brand;

    var modelPara = document.createElement("p");
    modelPara.textContent = "Model: " + car.model;

    var pricePara = document.createElement("p");
    pricePara.textContent = "Price: " + car.price + "€";

    var manufactureDatePara = document.createElement("p");
    manufactureDatePara.textContent =
        "Manufacture date: " + (car.manufacture_date + "").substring(0, 10);

    var enginePara = document.createElement("p");
    enginePara.textContent = "Engine: " + car.engine;

    var litersPara = document.createElement("p");
    litersPara.textContent = "Liters: " + car.liters;

    var transmissionPara = document.createElement("p");
    transmissionPara.textContent = "Transmission: " + car.transmission;

    var categoryPara = document.createElement("p");
    categoryPara.textContent = "Category: " + car.category;

    var mileagePara = document.createElement("p");
    mileagePara.textContent = "Mileage: " + car.mileage + "km";

    // Append elements to car div
    carDiv.appendChild(brandPara);
    carDiv.appendChild(modelPara);
    carDiv.appendChild(pricePara);
    carDiv.appendChild(manufactureDatePara);
    carDiv.appendChild(enginePara);
    carDiv.appendChild(litersPara);
    carDiv.appendChild(transmissionPara);
    carDiv.appendChild(categoryPara);
    carDiv.appendChild(mileagePara);
};

const addSellerInfoToCar = async (car, carDiv) => {
    let carId = car.id;
    const sellerInfoObj = await fetchSellerInfo(carId);
    let info = sellerInfoObj.res[0];
    if (sellerInfoObj.res[1]) {
        info.phone_number = "0123456789";
        info.city = "Sofia";
        info.region = "Sofia-city";
        info.country = "Bulgaria";
    } else {
        info = sellerInfoObj.res[0][0];
    }

    var phone = document.createElement("p");
    phone.textContent = "Contact phone: " + info.phone_number;
    var city = document.createElement("p");
    city.textContent = "City: " + info.city;
    var region = document.createElement("p");
    region.textContent = "Region: " + info.region;
    var country = document.createElement("p");
    country.textContent = "Country: " + info.country;

    carDiv.appendChild(phone);
    carDiv.appendChild(city);
    carDiv.appendChild(country);
    carDiv.appendChild(region);
};

const applyFilters = async () => {
    var cars = await fetchCars(brand.value, model.value, category.value);
    // Clear existing car data
    var carContainer = document.getElementById("car-container");
    carContainer.innerHTML = "";

    // Generate HTML for each car
    cars.forEach(async (car) => {
        var carDiv = document.createElement("div");
        var pDiv = document.createElement("div");
        carDiv.className = "car";

        var image = document.createElement("img");
        var CHUNK_SIZE = 1024;
        var data = new Uint8Array(car.image.data);
        var imgStr = "";
        for (var i = 0; i < data.length; i += CHUNK_SIZE) {
            var chunk = data.subarray(i, i + CHUNK_SIZE);
            imgStr += String.fromCharCode.apply(null, chunk);
        }
        image.src = "data:image/jpeg;base64," + window.btoa(imgStr);
        image.alt = "The image must be displayed here.";
        carDiv.appendChild(image);

        addCarInfo(car, pDiv);
        await addSellerInfoToCar(car, pDiv);

        // Append car div to car container
        carDiv.appendChild(pDiv);
        carContainer.appendChild(carDiv);
    });
};

const fetchCars = async (brand, model, category) => {
    const response = await fetch("http://localhost:8080/getCarsResults", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand, model, category }),
    });
    if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
    }
    const result = await response.json();
    return result.cars;
};

const fetchSellerInfo = async (carId) => {
    const response = await fetch("http://localhost:8080/getSellerInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ carId }),
    });
    const result = await response.json();
    return {
        res: [result.info, result.isSiteOwned],
    };
};
