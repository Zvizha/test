
// для розміру екрана
var addEvent = function(object, type, callback) {
  if (object == null || typeof(object) == 'undefined') return;
  if (object.addEventListener) {
      object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
      object.attachEvent("on" + type, callback);
  } else {
      object["on"+type] = callback;
  }
};
// підтягую дані при іншому розмірі екрану
addEvent(window, "resize", function(event) {
  dataContent()
});
//

// підтягую дані
function dataContent() {
  if (window.innerWidth <= 991) {
    fetch('./mobile.html')
    .then(function (data) {
      return data.text();
    })
    .then(function (html) {
      document.getElementById('content').innerHTML = html;
      var scripts = document.getElementById("content").querySelectorAll("script");
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].innerText) {
          eval(scripts[i].innerText);
        } else {
          fetch(scripts[i].src).then(function (data) {
            data.text().then(function (r) {
              eval(r);
            })
          });
    
        }
        scripts[i].parentNode.removeChild(scripts[i]);
      }
      // ініціалізація свайпера коли екран менший 991
      swiperSlider();
    });
  }else{
    fetch('./content.html')
    .then(function (data) {
      return data.text();
    })
    .then(function (html) {
      document.getElementById('content').innerHTML = html;
      var scripts = document.getElementById("content").querySelectorAll("script");
      for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].innerText) {
          eval(scripts[i].innerText);
        } else {
          fetch(scripts[i].src).then(function (data) {
            data.text().then(function (r) {
              eval(r);
            })
          });
    
        }
        scripts[i].parentNode.removeChild(scripts[i]);
      }
      // ініціалізація свайпера коли екран більший 991
      swiperSlider();
    });
    
  }
}
// підтягую дані
dataContent()

//ініціалізація свайпера
function swiperSlider() {
  var menu = ['Targeted Panels', 'Whole Exome Sequencing', 'lcWGS and Microarrays'];
  var swiper = new Swiper('.swiper', {
      simulateTouch: false,
      slidesPerView: 1.23,
      spaceBetween: 20,
      watchOverFlow: true,
      centeredSlides: true,
      loop:false,
      speed: 800,
      fadeEffect: {
        crossFade: true
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      breakpoints: {
        400:{
          slidesPerView: 1.2,
        },
        576:{
          slidesPerView: 1,
          loop:true,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 0,
          loop:true,
        },
      },
      pagination: {
        el: '.swiper-pagination.pagination-custom',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (menu[index]) + '</span>';
        },
      },
  });
}


