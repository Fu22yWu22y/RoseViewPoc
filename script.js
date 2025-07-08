document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quoteForm');
  const priceBox = document.getElementById('jsPriceBox');
  const previewImg = document.getElementById('modelPreview');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');
  const modelSelector = document.getElementById('model');

  const MODEL_PRICE = {
    lily: 349900,
    ivy: 369900,
    iris: 409900,
    orchid: 459900
  };

  const ADDON_PRICE = {
    garage: 35000,
    basement: 45000,
    deck: 15000
  };

  const modelImages = {
    lily: ['assets/images/lily_1.webp', 'assets/images/lily_2.webp'],
    ivy: ['assets/images/ivy_1.webp', 'assets/images/ivy_2.webp'],
    iris: ['assets/images/iris_1.webp', 'assets/images/iris_2.webp'],
    orchid: ['assets/images/orchid_1.webp', 'assets/images/orchid_2.webp', 'assets/images/orchid_3.webp']
  };

  let currentModel = 'lily';
  let modelImageIndex = 0;

  function updatePreview(model) {
    currentModel = model;
    modelImageIndex = 0;
    const imgList = modelImages[model] || [];

    previewImg.src = imgList[0];
    previewImg.classList.add('fade');
    setTimeout(() => previewImg.classList.remove('fade'), 300);

    if (imgList.length > 1) {
      leftArrow.classList.remove('d-none');
      rightArrow.classList.remove('d-none');
    } else {
      leftArrow.classList.add('d-none');
      rightArrow.classList.add('d-none');
    }
  }

  function rotateModelImage(direction) {
    const imgs = modelImages[currentModel];
    if (!imgs || imgs.length <= 1) return;
    modelImageIndex = (modelImageIndex + direction + imgs.length) % imgs.length;
    previewImg.classList.add('fade');
    setTimeout(() => {
      previewImg.src = imgs[modelImageIndex];
      previewImg.classList.remove('fade');
    }, 300);
  }

  function calcPrice() {
    const model = modelSelector.value;
    const addons = [...form.querySelectorAll('input[name="addons[]"]:checked')].map(el => el.value);
    let total = MODEL_PRICE[model] || 0;
    addons.forEach(a => total += ADDON_PRICE[a] || 0);
    return total;
  }

  function updateDisplay() {
    const model = modelSelector.value;
    const price = calcPrice();
    updatePreview(model);
    priceBox.textContent = `Estimated base price (before HST): $${price.toLocaleString()}`;
    priceBox.classList.remove('d-none');
  }

  form.addEventListener('change', updateDisplay);
  form.addEventListener('input', updateDisplay);
  leftArrow.addEventListener('click', () => rotateModelImage(-1));
  rightArrow.addEventListener('click', () => rotateModelImage(1));

  updateDisplay(); // Initialize on load
});

const lotSelect = document.getElementById('lotSelect');
const lotPreview = document.getElementById('lotPreview');
const lotCaption = document.getElementById('lotCaption');

const lotImages = {
  lot3: { src: 'assets/images/lot3.webp', caption: 'Lot 3 – 0.26 ac' },
  lot5: { src: 'assets/images/lot5.webp', caption: 'Lot 5 – 0.13 ac' },
  lot6: { src: 'assets/images/lot6.webp', caption: 'Lot 6 – 0.13 ac' },
  lot7: { src: 'assets/images/lot7.webp', caption: 'Lot 7 – 0.13 ac' },
  lot8: { src: 'assets/images/lot8.webp', caption: 'Lot 8 – 0.13 ac' },
  lot9: { src: 'assets/images/lot9.webp', caption: 'Lot 9 – 0.13 ac' }
};

lotSelect.addEventListener('change', () => {
  const selected = lotSelect.value;
  if (selected && lotImages[selected]) {
    lotPreview.src = lotImages[selected].src;
    lotCaption.textContent = lotImages[selected].caption;
  } else {
    lotPreview.src = 'images/lotsOverview.webp';
    lotCaption.textContent = 'Site Overview';
  }
});
