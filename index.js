

const bucketHideButton = document.querySelector('.bucket__menu button');
const bucketRow = document.querySelector('.bucket__row');

const missingHideButton = document.querySelector('.missing__menu button');
const missingRow = document.querySelector('.missing__row');

const toggleBlock = (block, button) => {
    button.classList.toggle('rotated')
    block.classList.toggle('hidden')
    if(block.classList.contains("hidden")) {
        block.style.maxHeight = 0;
       }
       else {
        block.style.maxHeight = block.scrollHeight + "px";
       }
   
}

bucketHideButton.addEventListener('click', () => toggleBlock(bucketRow, bucketHideButton))
missingHideButton.addEventListener('click', () => toggleBlock(missingRow, missingHideButton))



const items = [
     {
        cost: 150,
        count: 10
    },

 {
        cost: 300,
        count: 5
    },

     {
        cost: 350,
        count: 15
    }
]

const priceFields = document.querySelectorAll('.bucket__item-infoprice .total-price');
const desktopPriceFields = document.querySelectorAll('.bucket__item-price .total-price');
const controls = document.querySelectorAll('.bucket__item-counter')
const minusButtons = document.querySelectorAll('.bucket__item-counter>button:nth-child(1)')
const plusButtons = document.querySelectorAll('.bucket__item-counter>input+button')
const leftFields = document.querySelectorAll('.bucket__item-remain')


for (let i = 0; i <= controls.length; i++) {

    desktopPriceFields[i].textContent = priceFields[i].textContent =
    `${controls[i].children[1].value * items[i].cost} сом`;

    controls[i].addEventListener('click', (e) => {
        if(e.target === controls[i].children[0]) {
            if(controls[i].children[1].value <= 1) {
                return
            }
            controls[i].children[1].value--;
            if(controls[i].children[1].value == 1) {
                minusButtons[i].classList.add('gray')
            }
            if(items[i].count > controls[i].children[1].value) {
                if(plusButtons[i].classList.contains('gray')) {
                 plusButtons[i].classList.remove('gray')
                }
            }
            desktopPriceFields[i].textContent = priceFields[i].textContent = 
            `${controls[i].children[1].value * items[i].cost} сом`;

            leftFields[i].textContent = 
            items[i].count - controls[i].children[1].value != 0 && 
            items[i].count - controls[i].children[1].value <= 5 ?
            `Осталось ${items[i].count - controls[i].children[1].value} шт.`
            : '';
        }
        if(e.target === controls[i].children[2]) {
            if(items[i].count <= controls[i].children[1].value) {
                return
            }
            controls[i].children[1].value++
            if(items[i].count == controls[i].children[1].value) {
                plusButtons[i].classList.add('gray')
            }
            if(controls[i].children[1].value == 2) {
                if(minusButtons[i].classList.contains('gray')) {
                minusButtons[i].classList.remove('gray')
                }
            }
            desktopPriceFields[i].textContent = priceFields[i].textContent = 
            `${controls[i].children[1].value * items[i].cost} сом`;

            leftFields[i].textContent = 
            items[i].count - controls[i].children[1].value != 0 && 
            items[i].count - controls[i].children[1].value <= 5 ?
            `Осталось ${items[i].count - controls[i].children[1].value} шт.`
            : '';
        }
    })
    
    controls[i].children[1].addEventListener('change', (e) => {
        if(items[i].count <= e.target.value) {
            controls[i].children[1].value = items[i].count;
        }
        if(e.target.value < 1) {
            controls[i].children[1].value = 1
        }
        if(minusButtons[i].classList.contains('gray')) {
            minusButtons[i].classList.remove('gray')
        }
        controls[i].children[1].value = e.target.value;
        if(controls[i].children[1].value == 1) {
            minusButtons[i].classList.add('gray')
        } 
        desktopPriceFields[i].textContent = priceFields[i].textContent = 
        `${controls[i].children[1].value * items[i].cost} сом`;
        
        leftFields[i].textContent = 
        items[i].count - controls[i].children[1].value != 0 && 
        items[i].count - controls[i].children[1].value < 5 ?
        `Осталось ${items[i].count - controls[i].children[1].value} шт.`
        : '';
    })
    
}


