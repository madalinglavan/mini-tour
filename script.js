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
    { name: 'CONFORT', level: '100%' },
    { name: 'EFICIENȚĂ', level: '100%' },
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



// Calendar schedule
const defaultSchedule = {
    1: { start: "05:30", end: "06:40" }, // Luni
    2: { start: "13:50", end: "15:00" }, // Marti
    3: { start: "13:00", end: "14:15" }, // Miercuri
    4: { start: "13:00", end: "14:15" }, // Joi
    5: { start: "05:20", end: "06:30" }, // Vineri
    6: { start: "05:50", end: "07:00" }, // Sambata
    0: { start: "05:50", end: "07:00" }  // Duminica
};

const defaultReturnSchedule = {
    1: { start: "08:40", end: "09:50" }, // Luni
    2: { start: "16:50", end: "18:00" }, // Marti
    3: { start: "16:00", end: "17:10" }, // Miercuri
    4: { start: "16:00", end: "17:10" }, // Joi
    5: { start: "08:30", end: "09:40" }, // Vineri
    6: { start: "08:50", end: "10:00" }, // Sambata
    0: { start: "08:50", end: "10:00" }  // Duminica
};

const newSchedule = {
    1: { start: "19:20", end: "20:30" }, // Luni
    2: { start: "19:20", end: "20:30" }, // Marti
    3: { start: "19:20", end: "20:30" }, // Miercuri
    4: { start: "19:20", end: "20:30" }, // Joi
    5: { start: "19:20", end: "20:30" }, // Vineri
    6: { start: "19:20", end: "20:30" }, // Sambata
    0: { start: "19:20", end: "20:30" }  // Duminica
};

const newReturnSchedule = {
    1: { start: "22:20", end: "23:30" }, // Luni
    2: { start: "22:20", end: "23:30" }, // Marti
    3: { start: "22:20", end: "23:30" }, // Miercuri
    4: { start: "22:20", end: "23:30" }, // Joi
    5: { start: "22:20", end: "23:30" }, // Vineri
    6: { start: "22:20", end: "23:30" }, // Sambata
    0: { start: "22:20", end: "23:30" }  // Duminica
};

const extraSchedule = {
    1: { start: "06:40", end: "07:50" }, // Luni suplimentar
    5: { start: "06:40", end: "07:50" }  // Vineri suplimentar
};

const extraReturnSchedule = {
    1: { start: "09:40", end: "10:50" }, // Luni suplimentar
    5: { start: "09:40", end: "10:50" }  // Vineri suplimentar
};

// Inițializează opțiunile de luni în dropdown-ul lunii
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

// Actualizează zilele în dropdown-ul zilelor pe baza lunii selectate
function updateDays() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const month = parseInt(document.getElementById('month').value);
    const daysInMonth = new Date(today.getFullYear(), month + 1, 0).getDate();
    const daySelect = document.getElementById('day');
    daySelect.innerHTML = '';

    const startDay = (month === currentMonth) ? currentDate : 1;

    const dayNames = ["Duminica", "Luni", "Marti", "Miercuri", "Joi", "Vineri", "Sambata"];

    for (let i = startDay; i <= daysInMonth; i++) {
        const date = new Date(today.getFullYear(), month, i);
        const dayName = dayNames[date.getDay()];
        daySelect.innerHTML += `<option value="${i}">${dayName} ${i}</option>`;
    }
}

// Afișează orarul pentru ziua selectată
function showSchedule() {
    const today = new Date();
    const year = today.getFullYear();
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const selectedDate = new Date(year, month, day);
    const dayOfWeek = selectedDate.getDay();  // Obținem ziua săptămânii

    const dateThreshold = new Date(2024, 9, 27);  // 27 octombrie 2024
    const extraScheduleStart = new Date(2024, 11, 15);  // 15 decembrie 2024

    const table = document.getElementById('schedule-table');
    const tbody = document.getElementById('schedule-body');
    tbody.innerHTML = '';

    let route1, route2;

    if (selectedDate >= dateThreshold && selectedDate < extraScheduleStart) {
        // Începând cu 27 octombrie 2024 până pe 15 decembrie 2024, orar uniform
        route1 = newSchedule[dayOfWeek];
        route2 = newReturnSchedule[dayOfWeek];
    } else if (selectedDate >= extraScheduleStart) {
        // După 15 decembrie 2024, adăugăm și cursele suplimentare lunea și vinerea
        route1 = newSchedule[dayOfWeek];
        route2 = newReturnSchedule[dayOfWeek];

        // Adăugăm cursele suplimentare lunea și vinerea
        if (dayOfWeek === 1 || dayOfWeek === 5) {
            tbody.innerHTML += `
                <tr>
                    <td>Korsor -> Aeroport Copenhaga</td>
                    <td>${extraSchedule[dayOfWeek].start}</td>
                    <td>${extraSchedule[dayOfWeek].end}</td>
                </tr>
                <tr>
                    <td>Aeroport Copenhaga -> Korsor</td>
                    <td>${extraReturnSchedule[dayOfWeek].start}</td>
                    <td>${extraReturnSchedule[dayOfWeek].end}</td>
                </tr>
            `;
        }
    } else {
        // Înainte de 27 octombrie 2024, orar normal
        route1 = defaultSchedule[dayOfWeek];
        route2 = defaultReturnSchedule[dayOfWeek];
    }

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

// Initializează opțiunile de lună și zi pe baza datei curente
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



