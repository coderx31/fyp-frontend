const accordions = document.querySelectorAll(".contentBx");
console.log(accordions);
console.log(accordions.length)

for (const accordion of accordions) {
    accordion.addEventListener('click', () => {
        accordion.classList.toggle('active')
    })
}