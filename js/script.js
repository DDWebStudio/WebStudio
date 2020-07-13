const script_file = path_to_files + '/main.php',
  tab_switchers = document.querySelectorAll('.switcher-item'),
  order_form = document.querySelector('.order-form'),
  tabs = document.querySelector('.content-canvas').children;

/* Переключаем вкладки */
function packTabSwitcher(switcher) {
  if (switcher.classList.contains('active')) return false;
  else {
    for (let i = 0; i < switcher.parentElement.children.length; i++) {
      switcher.parentElement.children[i].classList.remove('active');
    }
    switcher.classList.add('active'); //Есть стили по классу
    switchTab(switcher);
  }
}

/*  */
function switchTab(switcher) {
  let current_offset = 0,
    tab_canvas = document.querySelector('.content-canvas'),
    tab_window = tab_canvas.parentElement,
    tabs_width = 0;
  for (let i = 0; i < tabs.length; i++) {

    tabs[i].style.width = tab_window.offsetWidth + 'px'; //Задаем вкладкам размер "окна просмотра"
    tabs_width = tab_window.offsetWidth * tabs.length + 10; //Считаем ширину изходя из количества вкладок + 10 пикселей "на всякий случай"
    tab_canvas.style.width = tabs_width + 'px'; //Задаем эту ширину контейнеру с вкладками размер 

    if (tabs[i].getAttribute('data-pack-type') == switcher.getAttribute('data-pack-type')) {
      tabs[i].classList.add('active'); //Хз зачем
      tab_canvas.style.transform = 'translateX(' + -tabs[i].offsetLeft + 'px)'; //Перемещяем контейнер с кладками на расстояние вкладки от левого края контейнера
      tab_window.style.height = '' + tabs[i].offsetHeight + 'px'; //Поправляем высоту "окна просмотра"
    } else {
      tabs[i].classList.remove('active'); //Хз зачем
    }

  }
}

/* Вешаем событие на переключатели вкладок */
for (let i = 0; i < tab_switchers.length; i++) {
  tab_switchers[i].addEventListener('click', event => {
    packTabSwitcher(event.target)
  });
}

/*  */
function beautifyPacks() {
  let packs_list = document.querySelector('.pack-list'),
    height = 0,
    pack_advantages = packs_list.querySelectorAll('.pack-advantages'),
    lines = [];

  packs_list.parentElement.parentElement.style.height = packs_list.offsetHeight + 'px';

  for (let i = 0; i < packs_list.length; i++) lines[i] = packs_list[i].querySelectorAll('.pack-advantages');

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      height = findHeightOfHighestItemInList(lines[i]);
      setHeightToItemsInList(lines[i], height - 40); //40 - поправка на паддинги
    }
  }
}

/*  */
function findHeightOfHighestItemInList(list) {
  let tmp_height = [];
  for (let i = 0; i < list.length; i++) {
    tmp_height[i] = list[i].offsetHeight;
  }
  return Math.max.apply(null, tmp_height);
}

/*  */
function setHeightToItemsInList(list, height) {
  for (let i = 0; i < list.length; i++) {
    list[i].style.height = height + 'px';
  }
}

function link() {
  $('a[href^="#"], *[data-href^="#"]').on('click', function (e) {
    e.preventDefault();
    var t = 100;
    var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
    $('html,body').stop().animate({
      scrollTop: $(d).offset().top - 100
    }, t);
  });
}

function portfolioSlider() {
  $('.portfolio-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      }
    }]
  });
}

$(window).scroll(function () {
  var height = $(window).scrollTop();
  /*Если сделали скролл на 100px задаём новый класс для header*/
  if (height > 100) {
    $('.menu').addClass('menu-fixed');
  } else {
    /*Если меньше 100px удаляем класс для header*/
    $('.menu').removeClass('menu-fixed');
  }
});

$(document).ready(function () {
  link();
  portfolioSlider();
  beautifyPacks();
});