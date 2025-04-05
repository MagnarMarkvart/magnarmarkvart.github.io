// IMPORTS

function toggleMenu() {
    const menu = document.querySelector("header .menu-links");
    const icon = document.querySelector(".burger-icon");

    menu.classList.toggle("open");
    icon.classList.toggle("open");

    if (icon.classList.contains("fa-bars")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }

    // Close menu when clicking outside
    document.addEventListener("click", function closeMenu(event) {
        if (!menu.contains(event.target) && !icon.contains(event.target)) {
            menu.classList.remove("open");
            icon.classList.remove("open");
            icon.classList.replace("fa-xmark", "fa-bars");

            // Remove event listener after closing
            document.removeEventListener("click", closeMenu);
        }
    });
}


// typed.js
var typed = new Typed(".auto-type", {
    strings: ["Web Developer", "IT Student in TalTech", "WordPress Enthusiast", "Tech Lover"],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

// Skill rotation
document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".job-article--skills div");
    const skillDisplay = document.getElementById("current-skill");
    const workExperience = document.querySelector(".work-experience");
    let activeIndex = 0;
    let interval;
    let userInteracted = false;

    function updateActiveSkill(index) {
        skills.forEach((skill, i) => {
            skill.style.opacity = i === index ? "1" : "0.5";
        });
        skillDisplay.textContent = skills[index].querySelector("span").textContent;

        activeIndex = index;
    }

    function startRotation() {
        interval = setInterval(() => {
            if (!userInteracted) {
                activeIndex = (activeIndex + 1) % skills.length;
                updateActiveSkill(activeIndex);
            }
        }, 3000);
    }

    skills.forEach((skill, index) => {
        skill.addEventListener("mouseenter", () => {
            userInteracted = true;
            clearInterval(interval);
            updateActiveSkill(index);
        });

        skill.addEventListener("click", () => {
            userInteracted = true;
            clearInterval(interval);
            updateActiveSkill(index);
        });
    });

    workExperience.addEventListener("mouseenter", () => {
        userInteracted = true;
        clearInterval(interval);
    });

    workExperience.addEventListener("mouseleave", () => {
        userInteracted = false;
        startRotation();
    });

    updateActiveSkill(activeIndex);
    startRotation();
});

// Stack visualizer
document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const skillsDisplay = document.getElementById("skills-display");
    const skillsDisplayTitle = document.getElementById("skills-display--title");
    const jobSkillsBox = document.querySelector(".skills");

    let currentCategory = null;

    // Function to preload images
    const preloadImages = (images) => {
        images.forEach(src => {
            const img = new Image();
            img.src = src.trim();
        });
    };

    // Preload images for each category at the beginning
    categories.forEach(category => {
        const skillsIcons = category.getAttribute("data-icons").split(",");
        preloadImages(skillsIcons); // Preload images
    });

    categories.forEach(category => {
        category.addEventListener("mouseenter", () => {
            if (currentCategory && currentCategory !== category) {
                currentCategory.classList.remove("active-category");
            }

            const width = window.innerWidth;

            if (width < 451) {
                jobSkillsBox.style.height = 540 + "px";
            } else if (width < 768) {
                jobSkillsBox.style.height = 430 + `px`;
            } else {
                jobSkillsBox.style.height = 405 + `px`;
            }

            const skillsIcons = category.getAttribute("data-icons").split(",");
            const skillsNames = category.getAttribute("data-skills").split(",");
            const categoryName = category.getAttribute("data-category");

            // Update title
            skillsDisplayTitle.textContent = categoryName;

            // Clear previous content
            skillsDisplay.innerHTML = "";

            // Add new icons with text
            skillsIcons.forEach((iconSrc, index) => {
                const skillWrapper = document.createElement("div");
                skillWrapper.classList.add("skill-item");

                const img = document.createElement("img");
                img.src = iconSrc.trim();
                img.alt = skillsNames[index].trim() + " icon";
                img.classList.add("skill-icon");

                const text = document.createElement("span");
                text.textContent = skillsNames[index].trim();
                text.classList.add("skill-label");

                skillWrapper.appendChild(img);
                skillWrapper.appendChild(text);
                skillsDisplay.appendChild(skillWrapper);
            });

            category.classList.add("active-category");
            currentCategory = category;
        });
    });

    jobSkillsBox.addEventListener("mouseleave", async () => {
        if (currentCategory) {
            currentCategory.classList.remove("active-category");
            currentCategory = null;
        }
        skillsDisplay.innerHTML = ""; // Clear icons
        skillsDisplayTitle.textContent = "Hover or click on a category to see my stack!";

        const width = window.innerWidth;

        if (width < 451) {
            jobSkillsBox.style.height = "360px";
        } else if (width < 543) {
            jobSkillsBox.style.height = "290px";
        } else if (width < 768) {
            jobSkillsBox.style.height = "270px";
        } else {   
            jobSkillsBox.style.height = "300px";
        }
    });
});

// Education dropdown functionality
document.addEventListener("DOMContentLoaded", () => {
    const educationItems = document.querySelectorAll(".education-item");

    educationItems.forEach(item => {
        const title = item.querySelector(".education-title");
        const content = item.querySelector(".education-content");
        const icon = item.querySelector(".dropdown-icon");

        title.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
});

// Swiper.js
document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
        direction: "horizontal",
        grabCursor: true,
        loop: true,
        effect: "cube",
        preventInteractionOnTransition: true,
        cubeEffect: {
            shadow: true,
            shadowOffset: 35,
            shadowScale: 0.9,
            slideShadows: false,
        },
        navigation: {
            prevEl: ".prev-a",
            nextEl: ".next-a",
        },
        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
        },
    });
});

async function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}