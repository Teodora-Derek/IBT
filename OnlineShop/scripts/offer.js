// addOffer click event:
const noUserId = document.getElementById("noUserId");
const testbox = document.getElementById("testbox");
const home = document.getElementById("home");

const brandInput = document.getElementById("brandInput");
const modelInput = document.getElementById("modelInput");
const priceInput = document.getElementById("priceInput");
const manufactureDateInput = document.getElementById("manufactureDateInput");
const engineInput = document.getElementById("engineInput");
const litersInput = document.getElementById("litersInput");
const transmissionInput = document.getElementById("transmissionInput");
const categoryInput = document.getElementById("categoryInput");
const mileageInput = document.getElementById("mileageInput");

const phoneInput = document.getElementById("phoneInput");
const cityInput = document.getElementById("cityInput");
const regionInput = document.getElementById("regionInput");
const countryInput = document.getElementById("countryInput");
const submitOfferBtn = document.getElementById("submitOfferBtn");

if (localStorage.getItem("userId") == null) {
    testbox.style.display = "none";
    noUserId.style.display = "flex";
} else {
    testbox.style.display = "flex";
    noUserId.style.display = "none";
}

document.getElementById("noUserIdLoginBtn").onclick = () => {
    if (localStorage.getItem("navIndex") != null)
        localStorage.setItem("navIndex", 3);
    window.location.href = "login.html";
};

submitOfferBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("uploadBtn");
    const file = fileInput.files[0];
    if (!file) {
        console.error("No file selected");
        return;
    }
    const brandData = { brand: brandInput.value };
    const modelData = { model: modelInput.value };
    const priceData = { price: priceInput.value };
    const manufacture_dateData = {
        manufacture_date: manufactureDateInput.value,
    };
    const engineData = { engine: engineInput.value };
    const litersData = { liters: litersInput.value };
    const transmissionData = { transmission: transmissionInput.value };
    const categoryData = { category: categoryInput.value };
    const mileageData = { mileage: mileageInput.value };

    const userIdData = { userId: localStorage.getItem("userId") };
    const phoneData = { phone: phoneInput.value };
    const cityData = { city: cityInput.value };
    const regionData = { region: regionInput.value };
    const countryData = { country: countryInput.value };

    const formData = new FormData();
    formData.append("image", file);
    formData.append("brandData", JSON.stringify(brandData));
    formData.append("modelData", JSON.stringify(modelData));
    formData.append("priceData", JSON.stringify(priceData));
    formData.append(
        "manufacture_dateData",
        JSON.stringify(manufacture_dateData)
    );
    formData.append("engineData", JSON.stringify(engineData));
    formData.append("litersData", JSON.stringify(litersData));
    formData.append("transmissionData", JSON.stringify(transmissionData));
    formData.append("categoryData", JSON.stringify(categoryData));
    formData.append("mileageData", JSON.stringify(mileageData));

    formData.append("userIdData", JSON.stringify(userIdData));
    formData.append("phoneData", JSON.stringify(phoneData));
    formData.append("cityData", JSON.stringify(cityData));
    formData.append("regionData", JSON.stringify(regionData));
    formData.append("countryData", JSON.stringify(countryData));

    const response = await fetch("http://localhost:8080/addOfferTwo", {
        method: "POST",
        body: formData,
    });
    const result = await response.json();
    alert(result.msg);
    home.click();
    // const response = await fetch("http://localhost:8080/addOffer", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({

    //         brand: brandInput.value,
    //         model: modelInput.value,
    //         price: priceInput.value,
    //         manufacture_date: manufactureDateInput.value,
    //         engine: engineInput.value,
    //         liters: litersInput.value,
    //         transmission: transmissionInput.value,
    //         category: categoryInput.value,
    //         mileage: mileageInput.value,

    //         userId: localStorage.getItem("userId"),
    //         phone: phoneInput.value,
    //         city: cityInput.value,
    //         region: regionInput.value,
    //         country: countryInput.value,
    //     }),
    // });
    // await response.json();
});

// Upload image js handle
window.onload = function () {
    var dropzone = document.getElementById("dropzone");
    var uploadBtn = document.getElementById("uploadBtn");
    var uploadButton = document.querySelector(".upload-button");
    var clearButton = document.querySelector(".clear-button");

    dropzone.ondragover = function () {
        this.className = "highlight";
        return false;
    };

    dropzone.ondragleave = function () {
        this.className = "";
        return false;
    };

    dropzone.ondrop = function (event) {
        event.preventDefault();
        this.className = "";

        var file = event.dataTransfer.files[0];
        displayImage(file);
    };

    uploadBtn.onchange = function (event) {
        var file = event.target.files[0];
        displayImage(file);
    };

    uploadButton.onclick = function (event) {
        event.preventDefault();
        uploadBtn.click();
    };

    clearButton.onclick = function (event) {
        event.preventDefault();
        if (dropzone.querySelector("img")) {
            dropzone.innerHTML = "Drag and drop an image here";
            uploadBtn.value = "";
        }
    };

    function displayImage(file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            dropzone.innerHTML =
                '<img src="' + e.target.result + '" alt="Uploaded Image" />';
        };

        reader.readAsDataURL(file);
    }
};
