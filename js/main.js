//1.VARIABLE
let body = document.querySelector("body");
let burgerMenu = document.querySelector("#hamburger");
let navbarCollapse=document.querySelector(".navbar-collapse"); 
let navbarCustom=document.querySelector(".navbar-custom"); 
let sideNavLink=document.querySelectorAll('.side-nav .nav-link')
let footerSocialMobileHolder  = document.querySelector('#footer-social-mobile')
let footerSocialDesktopHolder =document.querySelector('#footer-social-desktop')
let socialIcon=document.querySelector('.footer-social-icon')
let sections = document.querySelectorAll('section[id]')
let isClosed = false;

//2.EVENT
AOS.init({
    easing: 'ease',
    duration: 1000,
    once: true,
});

window.addEventListener('scroll', scrollActive)

window.addEventListener('resize', (event) => {
    moveSocialIcon();
});

window.addEventListener('load', (event) => {
    moveSocialIcon();
    //loader();
    bannerAnimationDesktop()
});

if(burgerMenu){
    burgerMenu.onclick = function () {
        burgerTime();
    };
}

// Array.from(sideNavLink).forEach(function(el) {
//     el.addEventListener("click", (e) => { 
//         e.preventDefault();
//         let link=e.srcElement.attributes.href.textContent;
//         gsap.to(window, {duration: 0.75, scrollTo: link, ease: "power2"});
//     }); 
// });

$('a[href^="#"]').on('click',function (e) {
    var target = this.hash,
        $target = $(target);
  
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top-69
    }, 900, 'swing', function () {
      window.location.hash = target;
    });
});

//2.FUNCTION
moveSocialIcon = () => {
    if (window.innerWidth <= 767) {
        footerSocialMobileHolder.append(socialIcon)
    } else {
        footerSocialDesktopHolder.append(socialIcon)
    }
}

burgerTime = () =>{
	if (isClosed == true) {
		burgerMenu.classList.remove("open");
		burgerMenu.classList.add("closed");
        body.classList.remove('no-scroll');
		isClosed = false;
	} else {
		burgerMenu.classList.remove("closed");
		burgerMenu.classList.add("open");
        body.classList.add('no-scroll');
		isClosed = true;
	}
}

bannerAnimationDesktop =() =>{
    var tl = gsap.timeline({duration: 1});
    // tl.to(".navbar-brand", {duration: 0.2, opacity: 1});
    tl.to(".banner__info-container", {duration: 0.4, opacity: 1});
    tl.to('.banner__image-container',{duration: 0.4, opacity: 1});
    tl.to(".side-nav", {duration: 0.4, opacity: 1});
}

loader =() =>{
    let loader = gsap.timeline();
    loader.to(".loader__icon-container", {
        duration: 0.5,
        scale: 0,
        ease: "expo.inOut",
    })
    .to(".loader", {
        duration: 1.2,
        xPercent: -100,
        ease: "expo.inOut",
        onComplete: bannerAnimationDesktop,
    });
}

function scrollActive()
{
    const scrollY = window.pageYOffset
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 120,
              sectionId = current.getAttribute('id')
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.side-nav a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.side-nav a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

