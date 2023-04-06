

const rightNav = document.querySelectorAll('.right-side-nav')
const menuButton = document.querySelector('.menu-btn')
const scrollButton = document.querySelector(".bottom-button-right")
const topSection = document.querySelector('.top-section')
const cover = document.querySelector('.cover')

menuButton.onclick = () => {
    rightNav.forEach((el) => {
        el.classList.toggle('active')
    })
    cover.classList.toggle('darkened')
}

scrollButton.onclick = () => {
    window.scrollTo({
        top: topSection.getBoundingClientRect().top,
        left: 0,
        behavior: "smooth",
    })
}
