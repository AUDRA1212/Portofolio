// download js
function confirmDwonload() { /**/
    const confirmation = confirm("Konfirmasi Download") /**/
    if (confirmation) { /**/
        window.location.href = "cv-audra.pdf"; /**/
        return true; /**/
    }else{
        window.location.href = "index.html" /**/
        return false; /**/
    }
}


// main js
;(function (window) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
  
    const FRAME_RATE = 50
    const PARTICLE_NUM = 5000
    const RADIUS = Math.PI * 2
    const CANVASWIDTH = 1500
    const CANVASHEIGHT = 150
    const CANVASID = 'canvas'
  
    let texts = ['TAP DIMANA AJA YA :)','PAKAI LANDSCAPE MODE', 'TERIMAKASIH', 'SUDAH', 'MELIHAT', 'PORTOFOLIO SAYA', 'TERIMAKASIH',]
  
    let canvas,
      ctx,
      particles = [],
      quiver = true,
      text = texts[0],
      textIndex = 0,
      textSize = 50
  
    function draw () {
      ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
      ctx.fillStyle = 'rgb(255, 255, 255)'
      ctx.textAlign = 'center'; // Agar teks berada di tengah horizontal
      ctx.textBaseline = 'middle'; // Agar teks berada di tengah vertikal
      ctx.fontWeight = 'bold'
      ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
      ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width / 3) * 0.5, CANVASHEIGHT * 0.5)
  
      let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)
  
      ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
  
      for (let i = 0, l = particles.length; i < l; i++) {
        let p = particles[i]
        p.inText = false
      }
      particleText(imgData)
  
      window.requestAnimationFrame(draw)
    }
  
    function particleText (imgData) {
  
      var pxls = []
      for (var w = CANVASWIDTH; w > 0; w -= 3) {
        for (var h = 0; h < CANVASHEIGHT; h += 3) {
          var index = (w + h * (CANVASWIDTH)) * 4
          if (imgData.data[index] > 1) {
            pxls.push([w, h])
          }
        }
      }
  
      var count = pxls.length
      var j = parseInt((particles.length - pxls.length) / 2, 10)
      j = j < 0 ? 0 : j
  
      for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
        try {
          var p = particles[j],
            X,
            Y
  
          if (quiver) {
            X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
            Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
          } else {
            X = (pxls[i - 1][0]) - p.px
            Y = (pxls[i - 1][1]) - p.py
          }
          var T = Math.sqrt(X * X + Y * Y)
          var A = Math.atan2(Y, X)
          var C = Math.cos(A)
          var S = Math.sin(A)
          p.x = p.px + C * T * p.delta
          p.y = p.py + S * T * p.delta
          p.px = p.x
          p.py = p.y
          p.inText = true
          p.fadeIn()
          p.draw(ctx)
        } catch (e) {}
      }
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i]
        if (!p.inText) {
          p.fadeOut()
  
          var X = p.mx - p.px
          var Y = p.my - p.py
          var T = Math.sqrt(X * X + Y * Y)
          var A = Math.atan2(Y, X)
          var C = Math.cos(A)
          var S = Math.sin(A)
  
          p.x = p.px + C * T * p.delta / 2
          p.y = p.py + S * T * p.delta / 2
          p.px = p.x
          p.py = p.y
  
          p.draw(ctx)
        }
      }
    }
  
    function setDimensions () {
      canvas.width = CANVASWIDTH
      canvas.height = CANVASHEIGHT
      canvas.style.position = 'absolute'
      canvas.style.left = '0%'
      canvas.style.top = '0%'
      canvas.style.bottom = '0%'
      canvas.style.right = '0%'
      canvas.style.marginTop = window.innerHeight * .15 + 'px'
    }
  
    function event () {
      document.addEventListener('click', function (e) {
        textIndex++
        if (textIndex >= texts.length) {
          textIndex--
          return
        }
        text = texts[textIndex]
        console.log(textIndex)
      }, false)
  
      document.addEventListener('touchstart', function (e) {
        textIndex++
        if (textIndex >= texts.length) {
          textIndex--
          return
        }
        text = texts[textIndex]
        console.log(textIndex)
      }, false)
    }
  
    function init () {
      canvas = document.getElementById(CANVASID)
      if (canvas === null || !canvas.getContext) {
        return
      }
      ctx = canvas.getContext('2d')
      setDimensions()
      event()
  
      for (var i = 0; i < PARTICLE_NUM; i++) {
        particles[i] = new Particle(canvas)
      }
  
      draw()
    }
  
    class Particle {
      constructor (canvas) {
        let spread = canvas.height
        let size = Math.random() * 1.2
        
        this.delta = 0.06
        
        this.x = 0
        this.y = 0
        
        this.px = Math.random() * canvas.width
        this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
        
        this.mx = this.px
        this.my = this.py
        
        this.size = size
        
        this.inText = false
        
        this.opacity = 0
        this.fadeInRate = 0.005
        this.fadeOutRate = 0.03
        this.opacityTresh = 0.98
        this.fadingOut = true
        this.fadingIn = true
      }
      fadeIn () {
        this.fadingIn = this.opacity > this.opacityTresh ? false : true
        if (this.fadingIn) {
          this.opacity += this.fadeInRate
        }else {
          this.opacity = 1
        }
      }
      fadeOut () {
        this.fadingOut = this.opacity < 0 ? false : true
        if (this.fadingOut) {
          this.opacity -= this.fadeOutRate
          if (this.opacity < 0) {
            this.opacity = 0
          }
        }else {
          this.opacity = 0
        }
      }
      draw (ctx) {
        ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
        ctx.closePath()
        ctx.fill()
      }
    }
    
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      if(!isChrome){
        $('#iframeAudio').remove()
    }
    
    // setTimeout(() => {
      init()  
    // }, 4000);
  })(window)
  


//   love.js 
$(document).ready(function() {
    const envelope = $('#envelope');
    const btnOpen = $("#open");
    const btnReset = $("#reset");

    envelope.on('click', open);
    btnOpen.on('click', open);
    btnReset.on('click', close);

    function open() {
        envelope.removeClass("close").addClass("open");
    }

    function close() {
        envelope.removeClass("open").addClass("close");
    }
});




// universe js
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var starDensity = .216;
var speedCoeff = .05;
var width;
var height;
var starCount;
var circleRadius;
var circleCenter;
var first = true;
var giantColor = '180,184,240';
var starColor = '226,225,142';
var cometColor = '226,225,224';
var canva = document.getElementById('universe');
var stars = [];
var universe;

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

createUniverse();

function createUniverse() {
  universe = canva.getContext('2d');

  for (var i = 0; i < starCount; i++) {
    stars[i] = new Star();
    stars[i].reset();
  }

  draw();
}

function draw() {
  universe.clearRect(0, 0, width, height);

  var starsLength = stars.length;

  for (var i = 0; i < starsLength; i++) {
    var star = stars[i];
    star.move();
    star.fadeIn();
    star.fadeOut();
    star.draw();
  }

  window.requestAnimationFrame(draw);
}

function Star() {

  this.reset = function() {
    this.giant = getProbability(3);
    this.comet = this.giant || first ? false : getProbability(10);
    this.x = getRandInterval(0, width - 10);
    this.y = getRandInterval(0, height);
    this.r = getRandInterval(1.1, 2.6);
    this.dx = getRandInterval(speedCoeff, 6 * speedCoeff) + (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120) + speedCoeff * 2;
    this.dy = -getRandInterval(speedCoeff, 6 * speedCoeff) - (this.comet + 1 - 1) * speedCoeff * getRandInterval(50, 120);
    this.fadingOut = null;
    this.fadingIn = true;
    this.opacity = 0;
    this.opacityTresh = getRandInterval(.2, 1 - (this.comet + 1 - 1) * .4);
    this.do = getRandInterval(0.0005, 0.002) + (this.comet + 1 - 1) * .001;
  };

  this.fadeIn = function() {
    if (this.fadingIn) {
      this.fadingIn = this.opacity > this.opacityTresh ? false : true;
      this.opacity += this.do;
    }
  };

  this.fadeOut = function() {
    if (this.fadingOut) {
      this.fadingOut = this.opacity < 0 ? false : true;
      this.opacity -= this.do / 2;
      if (this.x > width || this.y < 0) {
        this.fadingOut = false;
        this.reset();
      }
    }
  };

  this.draw = function() {
    universe.beginPath();

    if (this.giant) {
      universe.fillStyle = 'rgba(' + giantColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
    } else if (this.comet) {
      universe.fillStyle = 'rgba(' + cometColor + ',' + this.opacity + ')';
      universe.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);

      //comet tail
      for (var i = 0; i < 30; i++) {
        universe.fillStyle = 'rgba(' + cometColor + ',' + (this.opacity - (this.opacity / 20) * i) + ')';
        universe.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
        universe.fill();
      }
    } else {
      universe.fillStyle = 'rgba(' + starColor + ',' + this.opacity + ')';
      universe.rect(this.x, this.y, this.r, this.r);
    }

    universe.closePath();
    universe.fill();
  };

  this.move = function() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.fadingOut === false) {
      this.reset();
    }
    if (this.x > width - (width / 4) || this.y < 0) {
      this.fadingOut = true;
    }
  };

  (function() {
    setTimeout(function() {
      first = false;
    }, 50)
  })()
}

function getProbability(percents) {
  return ((Math.floor(Math.random() * 1000) + 1) < percents * 10);
}

function getRandInterval(min, max) {
  return (Math.random() * (max - min) + min);
}

function windowResizeHandler() {
  width = window.innerWidth;
  height = window.innerHeight;
  starCount = width * starDensity;
  // console.log(starCount)
  circleRadius = (width > height ? height / 2 : width / 2);
  circleCenter = {
    x: width / 2,
    y: height / 2
  }

  canva.setAttribute('width', width);
  canva.setAttribute('height', height);
}

// mengeti
document.addEventListener("DOMContentLoaded", function () {
  const typingElement = document.getElementById("typing");
  const words = ["Freelance Graphic Designer", "Frontend Developer", "UI/UX Designer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  let deletingSpeed = 50;

  function typeEffect() {
      const currentWord = words[wordIndex];
      const currentText = currentWord.substring(0, charIndex);
      typingElement.innerHTML = `<span class="text">${currentText}</span><span class="cursor">|</span>`;

      if (!isDeleting && charIndex < currentWord.length) {
          charIndex++;
          setTimeout(typeEffect, typingSpeed);
      } else if (isDeleting && charIndex > 0) {
          charIndex--;
          setTimeout(typeEffect, deletingSpeed);
      } else {
          isDeleting = !isDeleting;
          if (!isDeleting) {
              wordIndex = (wordIndex + 1) % words.length;
          }
          setTimeout(typeEffect, 1000);
      }
  }

  typeEffect();
});



// email send

        emailjs.send("service_ihayyxq", "template_txc3lmz", params)
              
document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("Yservice_ihayyxq"); // Ganti dengan User ID dari EmailJS

  document.getElementById("contactForm").addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah reload halaman

      let params = {
          name: document.getElementById("fullname").value,
          email: document.getElementById("fullemail").value,
          message: document.getElementById("message").value
      };

      emailjs.send("service_ihayyxq","template_txc3lmz",{
        from_name: "",
        email_id: "",
        message: "",
        });
  });
});
