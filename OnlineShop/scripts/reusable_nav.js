const fetchDatabaseInputs = async () => {
    try {
        const response = await fetch("reusable_nav.html");
        if (!response.ok) {
            throw new Error("Failed to fetch HTML");
        }
        const data = await response.text();

        document.getElementById("reusable-content").innerHTML = data;
        const navItems = document.querySelectorAll("nav li");

        const navIndex = parseInt(localStorage.getItem("navIndex"));
        navItems.forEach((item, i) => {
            if (i === navIndex) item.classList.add("active");
        });

        console.log(navItems);
        navItems.forEach((item, index) => {
            item.addEventListener("click", () => {
                localStorage.setItem("navIndex", index);
                navItems.forEach((item) => {
                    item.classList.remove("active");
                });
                item.classList.add("active");
            });
        });
    } catch (error) {
        console.log("Error:", error);
    }
};

fetchDatabaseInputs();
