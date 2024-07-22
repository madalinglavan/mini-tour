//menu-toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    // Deschide/Închide meniul la clic pe toggle
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('menu-open');
    });

    // Ascultă clicurile în afară meniului deschis pentru a-l închide
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);

        // Verifică dacă clicul a fost în afara meniului și nu pe toggle
        if (!isClickInsideNav && !isClickOnMenuToggle) {
            nav.classList.remove('menu-open');
        }
    });
});

function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('menu-open');
}
document.getElementById('menuToggle').addEventListener('click', function() {
    this.classList.toggle('active');
});


//animatie servicii
document.addEventListener("DOMContentLoaded", () => {
    const timeline = gsap.timeline({ repeat: -1 });

    // Animația pentru linia de rută (Programare spre Întâlnire)
    timeline.to(".route", { duration: 2.5, width: "50%", ease: "power1.inOut" });

    // Animația pentru punctul de pas (Programare)
    const steps = document.querySelectorAll(".step");
    const message = document.querySelector(".message");
    timeline.to(steps[0], { duration: 0.5, opacity: 1, onStart: () => steps[0].classList.add("show") }, "-=2.5");

    // Pauză de 2 secunde la "Întâlnire"
    timeline.to({}, { duration: 2, onStart: () => steps[1].classList.add("show") });

    // Continuarea animației pentru linia de rută (Întâlnire spre Sosire)
    timeline.to(".route", { duration: 2.5, width: "100%", ease: "power1.inOut" });

    // Animația pentru punctele de pas (Întâlnire și Sosire)
    timeline.to(steps[1], { duration: 0.5, opacity: 1 }, "-=2.5");
    timeline.to(steps[2], { duration: 0.5, opacity: 1, onStart: () => steps[2].classList.add("show") }, "-=2.0");

    // Pauză de 2 secunde la "Sosire"
    timeline.to({}, { duration: 2 });

    // Animația pentru linia de rută (întoarcere - Sosire spre Casă)
    timeline.to(".route", { duration: 5, width: "0%", ease: "power1.inOut" });

    // Animația pentru punctele de pas (întoarcere - Sosire spre Casă)
    timeline.to(steps[1], { duration: -1, opacity: 0, onComplete: () => steps[1].classList.remove("show") }, "-=4.5");
    timeline.to(steps[0], { duration: -1, opacity: 0, onComplete: () => {
        steps[0].classList.remove("show");
        steps[0].style.display = 'none';
        steps[3].style.display = 'block';
    } }, "-=4.0");

    // Animația pentru mesajul informativ
    timeline.to(message, { duration: 0.1, opacity: 1, onStart: () => message.style.display = 'block' }, "-=3.8");
    timeline.to(message, { duration: 2, opacity: 1 });
    timeline.to(message, { duration: 0.5, opacity: 0, onComplete: () => message.style.display = 'none' });

    // Animația pentru punctul de pas "Casă"
    timeline.to(steps[3], { duration: -1, opacity: 1, onStart: () => steps[3].classList.add("show") }, "-=3.5");

    // Pauză de 2 secunde la "Casă"
    timeline.to({}, { duration: 1 });

    // Resetăm punctele și animația pentru a începe din nou
    timeline.to({}, { duration: -1, onComplete: () => {
        steps[3].style.display = 'none';
        steps[0].style.display = 'block';
        steps[3].classList.remove("show");
        steps[2].classList.remove("show");
        steps[0].classList.remove("show");
        steps[1].classList.remove("show");
        timeline.restart();
    } });
});


//skills
const skills = [
    { name: 'SERIOZITATE', level: '100%' },
    { name: 'COMFORT', level: '100%' },
    { name: 'EFICIENTA', level: '100%' },
];

const skillsContainer = document.getElementById('skills-container');

function displaySkills() {
    skills.forEach(skill => {
        const skillElement = createSkillElement(skill);
        skillsContainer.appendChild(skillElement);
    });
}

function createSkillElement(skill) {
    const skillElement = document.createElement('div');
    skillElement.classList.add('skill');
    skillElement.innerHTML = `
        <h3>${skill.name}</h3>
        <div class="level" data-level="${skill.level}">
            <span class="percentage">0%</span>
        </div>
    `;
    return skillElement;
}

function animateSkill(skillElement) {
    const levelElement = skillElement.querySelector('.level');
    const percentageElement = skillElement.querySelector('.percentage');
    const skillLevel = parseInt(levelElement.dataset.level, 10);
    let width = 0;
    const increment = 5; // Increment percentage by 5 at each step
    const interval = 10; // Set interval to 10 milliseconds

    const intervalId = setInterval(() => {
        if (width >= skillLevel) {
            clearInterval(intervalId);
            width = skillLevel; // Ensure final width matches skillLevel
        } else {
            width += increment;
            if (width > skillLevel) {
                width = skillLevel; // Prevent width from exceeding skillLevel
            }
            levelElement.style.width = width + '%';
            percentageElement.textContent = width + '%';
        }
    }, interval);
}

displaySkills();

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkill(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.skill').forEach(skill => {
    observer.observe(skill);
});






//calendar 
const schedule = {
    // Luni, Marti, Miercuri
    1: { start: "08:30", end: "10:00" },
    2: { start: "08:30", end: "10:00" },
    3: { start: "08:30", end: "10:00" },
    // Joi, Vineri
    4: { start: "11:00", end: "12:30" },
    5: { start: "11:00", end: "12:30" }
};

const returnSchedule = {
    // Luni, Marti, Miercuri
    1: { start: "11:00", end: "12:30" },
    2: { start: "11:00", end: "12:30" },
    3: { start: "11:00", end: "12:30" },
    // Joi, Vineri
    4: { start: "13:00", end: "14:30" },
    5: { start: "13:00", end: "14:30" }
};

function initializeMonths() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const monthSelect = document.getElementById('month');
    monthSelect.innerHTML = '';

    const monthNames = [
        "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
        "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
    ];

    for (let i = currentMonth; i < 12; i++) {
        monthSelect.innerHTML += `<option value="${i}">${monthNames[i]}</option>`;
    }
}

function updateDays() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const month = parseInt(document.getElementById('month').value);
    const daysInMonth = new Date(2024, month + 1, 0).getDate();
    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '';

    const startDay = (month === currentMonth) ? currentDate : 1;

    for (let i = startDay; i <= daysInMonth; i++) {
        daySelect.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

function showSchedule() {
    const day = new Date(2024, document.getElementById('month').value, document.getElementById('day').value).getDay();
    const table = document.getElementById('schedule-table');
    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = '';

    const route1 = schedule[day];
    const route2 = returnSchedule[day];

    if (route1 && route2) {
        tbody.innerHTML += `
            <tr>
                <td>Korsor -> Aeroport Copenhaga</td>
                <td>${route1.start}</td>
                <td>${route1.end}</td>
            </tr>
            <tr>
                <td>Aeroport Copenhaga -> Korsor</td>
                <td>${route2.start}</td>
                <td>${route2.end}</td>
            </tr>
        `;
        table.style.display = 'table';
    } else {
        table.style.display = 'none';
        alert('Nu există curse programate pentru această zi.');
    }
}

document.getElementById('month').addEventListener('change', function() {
    updateDays();
    document.getElementById('day').value = document.getElementById('day').options[0].value;
});

// Initialize the month and day options based on the current date
initializeMonths();
updateDays();


//despre noi
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.despre-noi, .services, .intro-services');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;

            if (sectionTop < windowHeight - 100) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            } else if (sectionBottom < 0 || sectionTop > windowHeight) {
                section.style.opacity = 0;
                section.style.transform = 'translateY(50px)';
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();  // Trigger the function on page load in case the sections are already in view
});

//statistici
document.addEventListener("DOMContentLoaded", function() {
    const statsSection = document.getElementById('statistics');
    const stats = document.querySelectorAll('.number');
    let hasAnimated = false;

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function animateStats() {
        stats.forEach(stat => {
            const updateCount = () => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText.replace('+', '');

                const speed = 200; // Adjust this value for animation speed
                const increment = target / speed;

                if (count < target) {
                    stat.innerText = `+${Math.ceil(count + increment)}`;
                    setTimeout(updateCount, 10);
                } else {
                    stat.innerText = `+${target}`;
                }
            };

            updateCount();
        });
    }

    function checkAnimation() {
        if (isInViewport(statsSection) && !hasAnimated) {
            hasAnimated = true;
            animateStats();
        }
    }

    window.addEventListener('scroll', checkAnimation);
    window.addEventListener('resize', checkAnimation);
    checkAnimation(); // Initial check in case the section is already in view
});



//test width

(function() {
    function preventOverflow() {
        if (window.innerWidth < 768) {
            const elements = document.querySelectorAll('*:not(.map-container):not(.map-container *):not(.rezervari-container):not(.rezervari-container *):not(.fa)');
            elements.forEach(el => {
                el.style.overflowX = 'hidden';
                el.style.maxWidth = '100vw';
            });
        } else {
            const elements = document.querySelectorAll('*');
            elements.forEach(el => {
                el.style.overflowX = '';
                el.style.maxWidth = '';
            });
        }
    }

    // Run the function on page load and resize
    window.addEventListener('load', preventOverflow);
    window.addEventListener('resize', preventOverflow);
})();


