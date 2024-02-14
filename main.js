// Animate on scroll
const observer = new IntersectionObserver(
  (animations) => {
    animations.forEach((element) => {
      if (element.isIntersecting) {
        element.target.classList.add("animate");
        element.target.classList.remove("undo-animate");
      } else {
        element.target.classList.remove("animate");
        element.target.classList.add("undo-animate");
      }
    });
  },
  {
    rootMargin: "0px",
    threshold: [0, 0.1, 1],
  }
);

const tags = document.querySelectorAll(".pool-1, .pool-2, .pool-3");

tags.forEach((tag) => {
  observer.observe(tag);
});

// Snow Effect
class WaveNoise {
  constructor(requiredWaves, speed) {
    this.wavesSet = [];
    this.speed = speed || 1;

    for (let i = 0; i < requiredWaves; i++) {
      this.wavesSet.push(Math.random() * 360);
    }
  }

  getValue() {
    let blendedWave = 0;

    this.wavesSet.forEach((e) => {
      blendedWave += Math.sin((e / 180) * Math.PI);
    });

    return (blendedWave / this.wavesSet.length + 1) / 2;
  }

  update() {
    this.wavesSet.forEach((e, i) => {
      this.wavesSet[i] = (e + Math.random() * (i + 1) * this.speed) % 360;
    });
  }
}

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const resize = function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};

resize();

window.onresize = resize;

const configSnow = {
  maxParticleSize: 7,
  swingSpeed: 2.3,
  fallSpeed: 3,
  spawn: 4,
};

const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

const circle = function (x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
};

class SnowParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -configSnow.maxParticleSize;
    this.z = random(0.3, 1);
    this.size = this.z * configSnow.maxParticleSize;
    this.noise = new WaveNoise(10, 0.7);
  }

  draw() {
    ctx.globalAlpha = this.z;
    circle(this.x, this.y, this.size);
  }

  move() {
    let c = this.noise.getValue() * 2 - 1;

    this.x += c * configSnow.swingSpeed * this.z + (this.z - 0.65) * configSnow.swingSpeed * 0.4;
    this.y += (1 - Math.abs(c)) * configSnow.fallSpeed * this.z;

    this.noise.update();
  }
}

class Snow {
  constructor() {
    this.particles = [];
    this.spawn = 0;
  }

  addParticle() {
    this.spawn++;
    if (this.spawn >= configSnow.spawn) {
      this.spawn = 0;
      this.particles.push(new SnowParticle());
    }
  }

  deleteParicles() {
    for (let i in this.particles) {
      if (this.particles[i].y > canvas.height + configSnow.maxParticleSize) {
        this.particles.splice(i, 1);
      }
    }
  }

  init() {
    this.addParticle();
    this.deleteParicles();

    ctx.save();

    ctx.fillStyle = "white";

    this.particles.map((e) => {
      e.move();
      e.draw();
    });

    ctx.restore();
  }
}

const snow = new Snow();

const loop = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snow.init();
  requestAnimationFrame(loop);
};

window.onload = loop;

// Slider Swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 19,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// Parallax Images
function getParallaxImages() {
  var images = document.querySelectorAll(".Parallax img");
  new simpleParallax(images, {
    scale: 1.1,
    delay: 1.3,
    transition: "cubic-bezier(0,0,0,1)",
  });
}
getParallaxImages();

// Redeem Points Section

const redeemEntries = document.querySelector(".btn-redeem");
const redeemForm = document.querySelector(".fully-loaded-redeem-form");
redeemEntries.addEventListener("click", () => {
  redeemForm.style.display = "block";
});

// Email Validation
const emailInput = document.querySelector("#user-email");
const phoneInput = document.querySelector("#user-phone");
const submitBtn = document.querySelector("#submit-btn");
// const errorMessage = document.querySelector("#error-message");
const errorMessageEmail = document.querySelector("#error-message-email");
const errorMessagePhone = document.querySelector("#error-message-phone");

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  validateEmail();
  validatePhone();
});

function validateEmail() {
  const userEmail = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (userEmail === "") {
    displayEmailError("Whoops! It looks like you forgot to add your email");
  } else if (!emailRegex.test(userEmail)) {
    displayEmailError("Please provide a valid email address");
  } else {
    clearEmailError();
  }
}

function validatePhone() {
  const userPhone = phoneInput.value.trim();
  const phoneRegex = /^\d{10}$/; // Adjust regex according to your phone number format

  if (userPhone === "") {
    displayPhoneError("Whoops! It looks like you forgot to add your phone number");
  } else if (!phoneRegex.test(userPhone)) {
    displayPhoneError("Please provide a valid phone number");
  } else {
    clearPhoneError();
  }
}

function displayEmailError(message) {
  errorMessageEmail.textContent = message;
  emailInput.placeholder = "example@example.com";
}

function clearEmailError() {
  errorMessageEmail.textContent = "";
  emailInput.placeholder = "Your email address...";
}

function displayPhoneError(message) {
  errorMessagePhone.textContent = message;
  phoneInput.placeholder = "1234567890"; // Adjust placeholder according to your phone number format
}

function clearPhoneError() {
  errorMessagePhone.textContent = "";
  phoneInput.placeholder = "Your phone number...";
}

// WITH PHONE

// submitBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   validateEmail();
//   validatePhone();
// });

// function validateEmail() {
//   const userEmail = emailInput.value.trim(); /* Trim whitespace from the input */

//   /* Regular expression for basic email validation */
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (userEmail === "") {
//     displayError("Whoops! It looks like you forgot to add your email");
//   } else if (!emailRegex.test(userEmail)) {
//     displayError("Please provide a valid email address");
//   } else {
//     clearError();
//   }
//   /* Change the placeholder text */
//   emailInput.value = "";
// }

// function validatePhone() {
//   const userPhone = phoneInput.value.trim(); /* Trim whitespace from the input */

//   /* Regular expression for basic phone number validation */
//   const phoneRegex = /^\d{10}$/; // Assuming 10-digit phone number without any special characters

//   if (userPhone === "") {
//     displayError("Whoops! It looks like you forgot to add your phone number");
//   } else if (!phoneRegex.test(userPhone)) {
//     displayError("Please provide a valid phone number");
//   } else {
//     clearError();
//   }
//   /* Change the placeholder text */
//   phoneInput.value = "";
// }

// /* Add input event listener to clear error on email and phone input */
// emailInput.addEventListener("input", clearError);
// phoneInput.addEventListener("input", clearError);

// function displayError(message) {
//   /* emailInput.classList.add("error"); */
//   errorMessage.textContent = message;
//   /* emailInput.style.border = "1px solid var(--color-alert-error--dark"; */
//   emailInput.placeholder = "example@example.com";
// }

// function clearError() {
//   /* emailInput.classList.remove("error"); */
//   errorMessage.textContent = "";
//   /* emailInput.style.border = "1px solid var(--color-alert-info--dark)"; */
//   emailInput.placeholder = "Your email address...";
// }

// ORIGINAL WITHOUT PHONE
// // Email Validation
// const emailInput = document.querySelector("#user-email");
// const submitBtn = document.querySelector("#submit-btn");
// const errorMessage = document.querySelector("#error-message");

// submitBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   validateEmail();
// });

// function validateEmail() {
//   const userEmail = emailInput.value.trim(); /* Trim whitespace from the input */

//   /* Regular expression for basic email validation */
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (userEmail === "") {
//     displayError("Whoops! It looks like you forgot to add your email");
//   } else if (!emailRegex.test(userEmail)) {
//     displayError("Please provide a valid email address");
//   } else {
//     clearError();
//   }
//   /* Change the placeholder text */
//   emailInput.value = "";
// }

// /* Add input event listener to clear error on user input */
// emailInput.addEventListener("input", clearError);

// function displayError(message) {
//   /* emailInput.classList.add("error"); */
//   errorMessage.textContent = message;
//   /* emailInput.style.border = "1px solid var(--color-alert-error--dark"; */
//   emailInput.placeholder = "example@example.com";
// }

// function clearError() {
//   /* emailInput.classList.remove("error"); */
//   errorMessage.textContent = "";
//   /* emailInput.style.border = "1px solid var(--color-alert-info--dark)"; */
//   emailInput.placeholder = "Your email address...";
// }
