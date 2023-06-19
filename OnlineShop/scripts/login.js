const tablinks = document.getElementsByClassName("tablinks");
const tabcontent = document.getElementsByClassName("tabcontent");

const loginNavBtn = document.getElementById("loginNavBtn");
const signUpNavBtn = document.getElementById("signUpNavBtn");
const signOutNavBtn = document.getElementById("signOutNavBtn");

const id01 = document.getElementById("id01");
const id02 = document.getElementById("id02");
const id03 = document.getElementById("id03");

const setActiveLinkBtn = (currBtnClicked) => {
    for (let i = 0; i < tablinks.length; i++)
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    currBtnClicked.className += " active";
};

const toggleForm = (clickedBtnContent) => {
    for (let i = 0; i < tabcontent.length; i++)
        tabcontent[i].style.display = "none";
    clickedBtnContent.style.display = "block";
};

//Add the 'click' eventListener to each navigation button
loginNavBtn.addEventListener("click", () => {
    setActiveLinkBtn(loginNavBtn);
    toggleForm(id01);
});

signUpNavBtn.addEventListener("click", () => {
    setActiveLinkBtn(signUpNavBtn);
    toggleForm(id02);
});

signOutNavBtn.addEventListener("click", () => {
    setActiveLinkBtn(signOutNavBtn);
    toggleForm(id03);
    localStorage.removeItem("userId", null);
});

//Handle the SignUp form
const signUpBtn = document.getElementById("signUpBtn");
const cancelBtn = document.getElementById("cancelBtn");
const username = document.getElementById("username");
const userPass = document.getElementById("userPass");
const userPassRepeat = document.getElementById("userPassRepeat");

signUpBtn.addEventListener("click", async () => {
    if (username.value == "" || userPass.value == "") {
        alert("Please fill out the required fields.");
        return;
    }
    if (userPass.value != userPassRepeat.value) {
        alert(
            'Fields "Password" and "Repeat password" must have the same value!'
        );
        return;
    }

    const response = await fetch("http://localhost:8080/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            userpass: userPass.value,
        }),
    });
    const result = await response.json();
    alert(result.msg);
});

cancelBtn.addEventListener("click", () => {
    username.value = "";
    userPass.value = "";
    userPassRepeat.value = "";
});

//Handle the LogIn form
const loginBtn = document.getElementById("loginBtn");
const usernameLogin = document.getElementById("usernameLogin");
const userPassLogin = document.getElementById("userPassLogin");

loginBtn.addEventListener("click", async () => {
    if (usernameLogin.value == "" || userPassLogin.value == "") {
        alert("Please fill out the required fields.");
        return;
    }
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameLogin.value,
            userpass: userPassLogin.value,
        }),
    });
    const result = await response.json();
    if (result.isSuccess) {
        localStorage.setItem("userId", result.userId);
    }

    alert(result.msg);
});
