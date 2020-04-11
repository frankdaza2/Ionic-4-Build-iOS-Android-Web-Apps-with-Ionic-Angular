const inputName = document.querySelector("#input-name");
const inputRating = document.querySelector("#input-rating");
const coursesList = document.querySelector('#courses-list');

const btnAdd = document.querySelector("#btn-add");

const alertCtrl = document.querySelector('#ion-alert-controller');

function clear() {
    inputName.value = '';
    inputRating.value = '';
}

btnAdd.addEventListener('click', () => {
    const name = inputName.value;
    const rating = inputRating.value;

   if (name.trim().length <= 0 || rating.trim().length <= 0 || rating <= 0) {
       alertCtrl.create({
           message: 'Please enter a valid course name and rating!',
           header: 'Invalid inputs',
           buttons: ['okay']
       }).then(alertElement => {
           alertElement.present();
       });
       return;
   }

    const newItem = document.createElement('ion-item');
    newItem.innerHTML = `<b>${name}</b>  - ${rating}/5`;

    coursesList.appendChild(newItem);
    clear();
});
