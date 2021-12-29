const slider = document.querySelector(".slider input");
const dragLine = document.querySelector(".drag-line");
const img2 = document.querySelector(".img-2");
slider.oninput = () => {
  let sliderValue = slider.value;
  dragLine.style.left = sliderValue + "%";
  img2.style.width = sliderValue + "%";
};

const player = document.querySelector(".video");
const video = player.querySelector(".player-video-main");
const bigPlayBtn = document.querySelector(".big-play");
const returnBtn = document.querySelector(".btn-return");
const playBtn = document.querySelector(".play");
const forwardBtn = document.querySelector(".btn-forward");
const ranges = document.querySelector(".progress-bar");
const volumeBtn = document.querySelector(".volume-btn");
const volumeBar = document.querySelector(".volume-bar");
const fullScreenBtn = document.querySelector(".fullscreen-btn");
const controls = document.querySelector(".control-panel");
const volumeImg = document.querySelector(".volume-img");

function togglePlay() {
  const playState = video.paused ? "play" : "pause";
  video[playState]();
}

function updateButton() {
  if (this.paused) {
    playBtn.innerHTML = `<img src="assets/svg/play.svg" alt="play" width="27">`;
    bigPlayBtn.style.display = "block";
  } else {
    playBtn.innerHTML = `<img src="assets/svg/pause.svg" alt="play" width="27">`;
    bigPlayBtn.style.display = "none";
  }
}

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    document.webkitExitFullscreen();
  } else if (player.webkitRequestFullscreen) {
    player.webkitRequestFullscreen();
  } else {
    player.requestFullscreen();
  }
}

function volumeBtnHandler() {
  if (video.volume === 0) {
    video.volume = volumeMemory;
    volumeImg.src = "assets/svg/volume.svg";
  } else {
    volumeMemory = video.volume;
    video.volume = 0;
    volumeImg.src = "assets/svg/mute.svg";
  }
}

function changeVolume(e) {
  video.volume = this.value / 100;
  volumeBar.style.background = `linear-gradient( to right, #710707 0%, #710707 ${volumeBar.value}%, #c4c4c4 ${volumeBar.value}%, #c4c4c4 100% )`;
}

video.ontimeupdate = handleRangeUpdate;
function handleRangeUpdate(e) {
  ranges.value = (video.currentTime / video.duration) * 100;
  ranges.style.background = `linear-gradient( to right, #710707 0%, #710707 ${ranges.value}%, #c4c4c4 ${ranges.value}%, #c4c4c4 100% )`;
}
function changeProgress(e) {
  ranges.value = (e.offsetX / ranges.offsetWidth) * 100;
  video.currentTime = video.duration * (e.offsetX / ranges.offsetWidth);
}

function slowDown() {
  video.play();
  video.playbackRate = 0.5;
}
function speedUp() {
  video.play();
  video.playbackRate = 2;
}
let countVideo = 0;
function nextVideo() {
  if (countVideo == 5) {
    countVideo = 0;
  }
  video.setAttribute("src", ` ./assets/video${countVideo++}.mp4`);
  console.log(video.src);
  video.play();
}

function prevVideo() {
  if (countVideo == -1) {
    countVideo = 4;
  }
  video.setAttribute("src", ` ./assets/video${countVideo--}.mp4`);
  console.log(video.src);
  video.play();
}

video.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
bigPlayBtn.addEventListener("click", togglePlay);
fullScreenBtn.addEventListener("click", toggleFullScreen);
volumeBtn.addEventListener("click", volumeBtnHandler);
ranges.addEventListener("timeupdate", handleRangeUpdate);
ranges.addEventListener("change", handleRangeUpdate);
volumeBar.addEventListener("mousemove", changeVolume);
ranges.addEventListener("click", changeProgress);
volumeBar.addEventListener("click", changeVolume);
volumeBar.addEventListener("change", changeVolume);

document.addEventListener("keydown", function (event) {
  if (event.code == "Space") {
    togglePlay();
  } else if (event.code == "KeyM") {
    volumeBtnHandler();
  } else if (event.code == "KeyF") {
    toggleFullScreen();
  } else if (event.code == "KeyL") {
    video.currentTime += 5;
  } else if (event.code == "KeyJ") {
    video.currentTime -= 5;
  } else if (event.code == "Period") {
    speedUp();
  } else if (event.code == "Comma") {
    slowDown();
  }
});

/* Gallery */
const pictureInnerContainer = document.querySelector(
  ".picture-inner-container"
);

const arrGallerry = [
  "assets/img/galery/galery2.jpg",
  "assets/img/galery/galery9.jpg",
  "assets/img/galery/galery4.jpg",
  "assets/img/galery/galery6.jpg",
  "assets/img/galery/galery11.jpg",
  "assets/img/galery/galery1.jpg",
  "assets/img/galery/galery8.jpg",
  "assets/img/galery/galery3.jpg",
  "assets/img/galery/galery5.jpg",
  "assets/img/galery/galery13.jpg",
  "assets/img/galery/galery7.jpg",
  "assets/img/galery/galery10.jpg",
  "assets/img/galery/galery15.jpg",
  "assets/img/galery/galery12.jpg",
  "assets/img/galery/galery14.jpg",
];
const arrShuffle = arrGallerry.sort(() => Math.random() - 0.5);

function addImg(arr, div) {
  for (let i = 0; i < arr.length; i++) {
    const img = document.createElement("img");
    img.classList.add(`picture-item${i}`);
    img.classList.add(`picture-item`);
    img.src = arr[i];
    img.alt = `galery${i}`;
    div.append(img);
  }
}

addImg(arrShuffle, pictureInnerContainer);


const sliderImages = document.querySelectorAll(".picture-item");
 window.addEventListener('scroll', animonScroll);

function animonScroll(param) {
  for (let i = 0; i <sliderImages.length;i++) {
    const sliderImage = sliderImages[i];
    const sliderImageHeight = sliderImage.offsetHeight;
    const sliderImageOffset = offset(sliderImage).top;
    const animStart = 4;

   let sliderImagePoint = window.innerHeight - sliderImageHeight / animStart;

    if ((pageYOffset > sliderImageOffset - sliderImagePoint ) && pageYOffset < (sliderImageOffset + sliderImageHeight)) {
      sliderImage.classList.add('active');      
    } else {
      sliderImage.classList.remove('active'); 
    }
  }
}

function offset(e) {
  const rect = e.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
}

animonScroll();

let closePopup = document.querySelector(".popup-close"),
  showPopupButton = document.querySelector(".popup-button"),
  overlay = document.querySelector(".overlay"),
  popupBody = document.querySelector(".booking");

showPopupButton.addEventListener('click', () => {
  popupBody.classList.add('booking-active');  
  overlay.classList.add('overlay-active'); 
})  

closePopup.addEventListener('click', () => {
  popupBody.classList.remove('booking-active')
  overlay.classList.remove('overlay-active')
})

document.addEventListener('click', (e) => {
  if (e.target == overlay) {
    popupBody.classList.remove('booking-active')
    overlay.classList.remove('overlay-active')
  }
})



let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".nav-list");
let overlayBurger = document.querySelector(".welcome-text");

burger.addEventListener("click", toggle);
function toggle() {
  burger.classList.toggle("active");
  burgerMenu.classList.toggle("active");
  overlayBurger.classList.toggle("welcome-hide");
}


/* WELCOME-SLIDER */


let welcomeSlides = document.querySelectorAll('.slide');
let welcomePrev = document.getElementById('btn-prev');
let welcomeNext = document.getElementById('btn-next');
let welcomeDots = document.querySelectorAll('.dot');
let sliderNum = document.getElementById('slider-num');

let welcomeIndex = 0;



const activeSlide = (n) => {
  for (welcomeSlide of welcomeSlides) {
    welcomeSlide.classList.remove('active');
  }
  welcomeSlides[n].classList.add('active');
  sliderNum.innerHTML =  "0" + (n+1);
};
const activeDot = (n) => {
  for (dot of welcomeDots) {
    dot.classList.remove('active');
  }
  welcomeDots[n].classList.add('active');
  sliderNum.innerHTML =  "0" + (n+1);
};
const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
  activeDot(ind);
};
const nextSlide = () => {
  if (welcomeIndex === welcomeSlides.length - 1) {
    welcomeIndex = 0;
    prepareCurrentSlide(welcomeIndex);
  } else {
    welcomeIndex++;
    prepareCurrentSlide(welcomeIndex);
  }
};
const prevSlide = () => {
  if (welcomeIndex === 0) {
    welcomeIndex = welcomeSlides.length - 1;
    prepareCurrentSlide(welcomeIndex);
  } else {
    welcomeIndex--;
    prepareCurrentSlide(welcomeIndex);
  }
};
welcomeDots.forEach((item, indexDot) => {
  item.addEventListener('click', () => {
    welcomeIndex = indexDot;
    prepareCurrentSlide(welcomeIndex);
  });
});

welcomeNext.addEventListener('click', nextSlide);
welcomePrev.addEventListener('click', prevSlide);


/* CONTACTS */

mapboxgl.accessToken = 'pk.eyJ1IjoiYW5uZXR0YWJlbCIsImEiOiJja3Vrd2YwdTUwNDA4Mm9wZmF5eWoxbmQ3In0.00jAgIXpF5HgkLiknizs4Q';

const map = new mapboxgl.Map({
  container: 'map', 
  style: 'mapbox://styles/mapbox/light-v10',
  center: [2.3364, 48.86091],
  zoom: 16
  });

  const nav = new mapboxgl.NavigationControl({
  showCompass: true,
  showZoom: true
});

map.addControl(nav, 'bottom-right');


map.on('idle',function(){
  map.resize()
  })

  const marker1 = new mapboxgl.Marker({
    color: "#000000",
  })
    .setLngLat([2.3364, 48.86091])
    .addTo(map);

    const marker2 = new mapboxgl.Marker({
      color: "#8f8a8a",
    })
    .setLngLat([2.3333, 48.8602])
    .addTo(map);

    const marker3 = new mapboxgl.Marker({
      color: "#8f8a8a",
    })
    .setLngLat( [2.3397, 48.8607])
    .addTo(map);

    const marker4 = new mapboxgl.Marker({
      color: "#8f8a8a",
    })
    .setLngLat([2.3330, 48.8619])
    .addTo(map);

    const marker5 = new mapboxgl.Marker({
      color: "#8f8a8a",
    })
    .setLngLat( [2.3365, 48.8625])
    .addTo(map); 




    /* video-slider */

    let videoSlides = document.querySelectorAll('.slider-item');
    let videoPrev = document.getElementById('video-btn-prev');
    let videoNext = document.getElementById('video-btn-next');
    let videoDots = document.querySelectorAll('.video-slider-dot');
    let videoSliderItems = document.querySelector('.slider-video');
    let videoSlaider =  document.querySelector('.slider-video-wrapper');
    let videoIndex = 0;

   
    document.addEventListener('DOMContentLoaded', function() {     
     
      videoPrev.addEventListener('click', function() {
        videoSliderItems.insertBefore(videoSlides[videoSlides.length - 1], videoSlides[0]);
        videoSlides = document.querySelectorAll('.slider-item');
        videoIndex--;
        if  (videoIndex < 0) {
          videoIndex = 4;        
      }
      addDottActive(videoIndex);
        
      });
      videoNext.addEventListener('click', function() {
        videoSliderItems.appendChild(videoSlides[0]);
        videoSlides = document.querySelectorAll('.slider-item');
        videoIndex++;
        if (videoIndex >= 5) {
          videoIndex = 0;
        }      
        addDottActive(videoIndex);
       
      });
    });

    const addDottActive = (n) => {
      for (let i = 0; i < videoDots.length; i++){
        videoDots[i].classList.remove('active'); 
      }
      videoDots[n].classList.add('active');    
    }
    
    
    


/* Tickets */

const basicNum = document.querySelector('#input-basic');
const seniorNum = document.querySelector('#input-senior');
const inputsTicketsType = document.querySelectorAll('input[name="radio"]');
const inputsTickets = document.querySelectorAll('input');
const total= document.querySelector('.amount-price');
const btnsNum = document.querySelectorAll('.btn-number');


for (let input of inputsTickets) {
input.addEventListener('change', function () {
  calculate();
  console.log ('fjjff')
});

}
for (let btn of btnsNum) {
  btn.addEventListener('click', function () {
    calculate();
    console.log ('btn');
  });
}
let ticketsTypeValue;

function calculate () {
 
  
  for (const ticketsType of inputsTicketsType) {
    if (ticketsType.checked) {
       ticketsTypeValue = +ticketsType.value;       
    }
  }

  let totalPrice  = ticketsTypeValue * +basicNum.value + parseFloat(ticketsTypeValue * +seniorNum.value/2);
  total.innerText =`Total €${totalPrice}`;
  console.log (totalPrice)
}

