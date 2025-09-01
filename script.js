var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// ***************   CURSOR   *****************
function cursorskew(){
  clearTimeout(timeout);
  
  var xscale = 1;
  var yscale =1;
  
  var xprev =0;
  var yprev =0;
  
  window.addEventListener("mousemove", function(dets){
    
    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    cursorFollower(xscale,yscale);

    timeout = setTimeout(function(){
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    })
  });
}




function cursorFollower(xscale,yscale){
  window.addEventListener("mousemove",function(dets){
    document.querySelector("#minicircle").style.opacity = 1;
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}




cursorFollower();
cursorskew();



// ***************   PAGE 1  *****************
function page1Ani(){
  var t1 = gsap.timeline();
  t1.from('#nav',{
    y : -10,
    opacity : 0,
    duration : 1.5,
    ease : Expo.easeInOut
  })
  .to(".boundingElem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 2,
    delay: -1,
    stagger: 0.2,
  })
  .from("#herofooter", {
    y: -10,
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
  });
  
}

page1Ani();


// ***************   PAGE 2  *****************


document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.8),
    });
  });
});

// *******************        PRE LOADER     **********************
var loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// *********************   CLOCK  *****************
const currentTime = () => {
  let curTime = new Date().toLocaleTimeString();
  document.getElementById("clock").innerText = curTime;
};
currentTime();

const intervalId = setInterval(() => {
  currentTime();
}, 1000);