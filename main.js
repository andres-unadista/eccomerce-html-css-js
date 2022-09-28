/* DECLARE ELEMENTS */
const iconMenu = document.querySelector('.header__menu');
const iconCloseMenu = document.querySelector('.modal-navbar__close-icon');
const iconCart = document.querySelector('.header__cart');
const imageGallery = document.querySelector('.gallery__image-container');
const iconCloseGallery = document.querySelector('.modal-gallery__close');
const iconMinus = document.querySelector('.input__minus');
const inputQuantity = document.querySelector('.input__quantity');
const iconPlus = document.querySelector('.input__plus');
const cartModal = document.querySelector(".cart-modal");
const galleryThumbnails = document.querySelectorAll(".gallery__thumbnail");
const galleryContainer = document.querySelector(".gallery__image-container");
const galleryPrevious = document.querySelector(".gallery__previous");
const galleryNext = document.querySelector(".gallery__next");
const galleryModalThumb = document.querySelectorAll(".modal-gallery__thumbnail");
const galleryModalContainer = document.querySelector(".modal-gallery__image-container");
const galleryModalPrevious = document.querySelector(".modal-gallery__previous");
const galleryModalNext = document.querySelector(".modal-gallery__next");
const cartModalDetails = document.querySelectorAll(".cart-modal__details");
const cartModalContainer = document.querySelector(".cart-modal__checkout-container");
const cartModalDelete = document.querySelectorAll(".cart-modal__delete");
const cartButtonCheck = document.querySelector(".cart-modal__check");
const price = document.querySelector("#detail-price");
const buttonAddCart = document.querySelector(".details__button");
const titleDetailCart = document.querySelector(".details__title");
const copyDetailCart = document.querySelector(".cart-modal__details");
const cartNotification = document.querySelector(".header__cart--notification");

/* DECLARE ELEMENTS */

let quantityProduct = 0;
let cartActive = false;

/* EVENTS */
document.addEventListener("click", clickOutCart);
iconMenu.addEventListener('click', function () { showModal(); });
iconCloseMenu.addEventListener('click', function () { showModal(); });
iconCart.addEventListener('click', function () {
  if (!cartActive) {
    setTimeout(() => {
      cartActive = true;
    }, 500);
    showModal('.cart-modal');
  }
});
imageGallery.addEventListener('click', function () {
  if (document.body.clientWidth > 1115) {
    showModal('.modal-gallery__background', 'grid');
  }
});
iconCloseGallery.addEventListener('click', function () { showModal('.modal-gallery__background', 'grid'); });
iconMinus.addEventListener('click', function () { changeQuantity(-1); });
iconPlus.addEventListener('click', function () { changeQuantity(1); });
inputQuantity.addEventListener('change', assingQuantity);
galleryThumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', thumbnailImageDesk);
});
galleryPrevious.addEventListener('click', function () { thumbnailButtons('prev'); });
galleryNext.addEventListener('click', function () { thumbnailButtons('next'); });
galleryModalPrevious.addEventListener('click', function () {
  const idThumbnail = thumbnailButtons('prev', galleryModalContainer);
  opacityImage(idThumbnail);
});
galleryModalNext.addEventListener('click', function () {
  const idThumbnail = thumbnailButtons('next', galleryModalContainer);
  opacityImage(idThumbnail);
});

document.addEventListener('click', function (e) {
  if (e.target && e.target.className === 'cart-modal__delete') {
    e.target.parentNode.classList.add('hide');
    const quantity = e.target.parentNode.querySelector('.cart-modal__price').dataset.quantity;
    cartNotification.innerText = +cartNotification.textContent - quantity;
    validateEmptyCart();
  }
});

buttonAddCart.addEventListener('click', function () { calculatePrice(); });


/* EVENTS */


/* LOGIC */
preloadThumbnail();
validateEmptyCart();


function showModal(element = '.modal-navbar__background', classTarget = 'show') {
  const menu = document.querySelector(element);
  menu.classList.toggle(classTarget);
}

function changeQuantity(value) {
  if (value === -1 && quantityProduct - 1 === -1) {
    return;
  }
  quantityProduct += (value);
  inputQuantity.value = quantityProduct;
}

function assingQuantity() {
  quantityProduct = +this.value;
}

function clickOutCart(event) {
  if (cartModal.classList.contains('show') && cartActive) {
    const isClickInside = cartModal.contains(event.target);

    if (!isClickInside) {
      cartActive = false;
      showModal('.cart-modal');
    }
  }
}

function thumbnailImageDesk() {
  galleryThumbnails.forEach(thumbnail => {
    thumbnail.style.opacity = 1;
  });
  this.style.opacity = '0.5';
  galleryContainer.style.backgroundImage = `url('../images/image-product-${this.id}.jpg')`;
  galleryContainer.dataset.id = +this.id;
}

function thumbnailButtons(direction, gallery = galleryContainer) {
  const maxImages = 4;
  let newId;
  if (direction === 'next') {
    if (+gallery.dataset.id === maxImages) {
      newId = 1;
    } else {
      newId = +gallery.dataset.id + 1;
    }
  } else {
    if (+gallery.dataset.id === 1) {
      newId = 4;
    } else {
      newId = +gallery.dataset.id - 1;
    }
  }
  gallery.dataset.id = newId;
  gallery.style.backgroundImage = `url('../images/image-product-${newId}.jpg')`;
  return newId;
}

function opacityImage(id) {
  galleryModalThumb.forEach(thumbnail => {
    thumbnail.style.opacity = 1;
  });
  document.querySelector(`#m${id}`).style.opacity = '0.5';
}

function preloadThumbnail() {
  document.getElementById('1').style.opacity = '0.5';
  document.getElementById(`m1`).style.opacity = '0.5';
}

function validateEmptyCart() {
  const cartModalDetailsNow = document.querySelectorAll(".cart-modal__details");
  const cartModalDetailsHide = document.querySelectorAll(".cart-modal__details.hide");

  console.log('hide');
  if (cartModalDetailsNow.length === cartModalDetailsHide.length) {
    let notification = document.createElement('div');
    let message = document.createElement('p');
    notification.classList.add('cart-modal__notification');
    message.textContent = 'Your cart is empty.';
    notification.appendChild(message);

    cartButtonCheck.classList.add('hide');
    cartModalContainer.appendChild(notification);
  } else {
    if (document.querySelector('.cart-modal__notification')) {
      document.querySelector('.cart-modal__notification').remove();
      cartButtonCheck.classList.remove('hide');

    }
  }
}

function calculatePrice() {
  const title = titleDetailCart.textContent;
  const contentPrice = +price.dataset.price;
  const quantity = +inputQuantity.value;
  if (+inputQuantity.value > 0) {
    // alert(`Se añadirán ${quantity} del producto '${title}' con precio de \$${contentPrice}`);
  }
  addDetailCart(title, contentPrice, quantity);
}

function addDetailCart(title, price, quantity) {
  const cartDetail = copyDetailCart.cloneNode(true);
  cartNotification.innerText = +cartNotification.textContent + quantity;
  cartDetail.classList.remove('hide');
  cartDetail.querySelector(".cart-modal__product").innerText = title.slice(0, 25) + '...';
  cartDetail.querySelector(".cart-modal__price").dataset.quantity = +quantity;
  cartDetail.querySelector(".cart-modal__price").innerHTML = `\$${price} x${quantity} <span>${price * quantity}</span>`;
  cartModalContainer.insertBefore(cartDetail, cartModalContainer.firstChild);
  validateEmptyCart();
}