var count = document.querySelector(".js-count");
var addButton = document.querySelector(".js-add");
var subButton = document.querySelector(".js-sub");
var number = document.querySelector(".js-number");
var icon = document.querySelector(".js-add .js-icon");
var counter = 1;

var add = function() {
  counter = Number(number.textContent);
  number.textContent = ++counter;
  icon.style.transform = 'rotate('+ 90*(counter-1) +'deg)';
}

var sub = function() {
  if(counter >= 1) {
    number.textContent = --counter;
    icon.style.transform = 'rotate('+ 90*(counter-1)+ 'deg)';
  }
}

addButton.addEventListener('click', function(e) {

  if(count.classList.contains('is-active')) {
    add();
  }

  else {
    count.classList.add('is-active');
  }

}, false);

subButton.addEventListener('click', function(e) {
  sub();
}, false);

document.addEventListener('click', function(e) {
  if (!e.target.closest('.js-count')) {
    count.classList.remove('is-active');
  }
});

document.addEventListener('keyup', function(e) {
  if (e.keyCode === 27 && count.classList.contains('is-active')) {
    count.classList.remove('is-active');
  }
});

