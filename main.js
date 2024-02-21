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

const tags = document.querySelectorAll(".gift-bag-image, .pool-1, .pool-2, .pool-3");

tags.forEach((tag) => {
  observer.observe(tag);
});
//
//
//
//
//
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
//
//
//
//
//
//Accordians
const accordianItem = document.getElementsByClassName("accordion-item");
const accordianItemHeading = document.getElementsByClassName("accordion-item-heading");
for (i = 0; i < accordianItemHeading.length; i++) {
  accordianItemHeading[i].addEventListener("click", toggleItem, false);
}
function toggleItem() {
  const itemClass = this.parentNode.className;
  for (i = 0; i < accordianItem.length; i++) {
    accordianItem[i].className = "accordion-item close";
  }
  if (itemClass == "accordion-item close") {
    this.parentNode.className = "accordion-item open";
  }
}
//
//
//
//
//
//Form Display
const redeemEntries = document.querySelector(".redeem");
const redeemForm = document.querySelector(".fl-redemption-content");
redeemEntries.addEventListener("click", () => {
  if (redeemForm.style.display === "none" || redeemForm.style.display === "") {
    redeemForm.style.display = "flex";
  } else {
    redeemForm.style.display = "none";
  }
});
