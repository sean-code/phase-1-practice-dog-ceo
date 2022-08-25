console.log('%c HI', 'color: firebrick')
let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();
  loadBreedOptions();
});

function loadImages() {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
    .then(res=> res.json())
    .then(results => {
      results.message.forEach(image => addImage(image))
    });
}

function addImage(dogPicUrl) {
  let container = document.getElementById('dog-image-container');
  let newImageEl = document.createElement('img');
  newImageEl.src = dogPicUrl;
  container.appendChild(newImageEl);
}
function loadBreedOptions() {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {

      breeds = Object.keys(results.message);
      updateBreedList(breeds);
      addBreedSelectListener();
    });
}
function updateBreedList(breeds) {
  let ul = document.getElementById('dog-breeds');
  removeChildren(ul);
  breeds.forEach(breed => addBreed(breed));
}
function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}
function selectBreedThatBeginsWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}
function addBreedSelectListener() {
  let breedDropdown = document.getElementById('breed-dropdown');
  breedDropdown.addEventListener('change', function (event) {
    selectBreedThatBeginsWith(event.target.value);
  });
}
function addBreed(breed) {
  let ul = document.getElementById('dog-breeds');
  let li = document.createElement('li');
  li.innerHTML = breed;
  li.style.cursor = 'pointer';
  ul.appendChild(li);
  li.addEventListener('click', updateColor);
}
function updateColor(event) {
  event.target.style.color = 'brown';
}