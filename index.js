

const itemDecl = n => {  
    n = Math.abs(n) % 100; 
    let n1 = n % 10;
    if (n > 4 && n < 21) { return 'товаров'; }
    if (n1 > 1 && n1 < 5) { return 'товара'; }
    if (n1 == 1) { return 'товар'; }
    return 'товаров';
}


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

const totalField = document.querySelector('.total__sum-field')
const totalField2 = document.querySelector('.total__items-field')
const totalItemsField = document.querySelector('.total__items p')


const deleteButtons = document.querySelectorAll('.bucket__item-icons>button:nth-child(2)');
const bucketItems = document.querySelectorAll('.bucket__item');

let amount = [];
let countItems = [];

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
        bucketItems[i].remove();
        amount[i]=0;
        let totalAmount = amount.reduce((a,b)=>a+b,0);
        totalField2.textContent = totalField.textContent = `${totalAmount} сом`;
        countItems[i]=0;
        let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
        totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
    })
}

for (let i = 0; i < controls.length; i++) {

    amount[i]=controls[i].children[1].value * items[i].cost;
    countItems[i]=controls[i].children[1].value;

    desktopPriceFields[i].textContent = priceFields[i].textContent =
    `${amount[i]} сом`;


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
            amount[i] = controls[i].children[1].value * items[i].cost;
            let totalAmount = amount.reduce((a,b)=>a+b,0);
            totalField2.textContent = totalField.textContent = `${totalAmount} сом`;
            countItems[i]=controls[i].children[1].value;
            let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
            totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;

            desktopPriceFields[i].textContent = priceFields[i].textContent = 
            `${amount[i]} сом`;

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

            amount[i] = controls[i].children[1].value * items[i].cost;
            let totalAmount = amount.reduce((a,b)=>a+b,0);
            totalField2.textContent = totalField.textContent = `${totalAmount} сом`;
            countItems[i]=controls[i].children[1].value;
            let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
            totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;

            desktopPriceFields[i].textContent = priceFields[i].textContent = 
            `${amount[i]} сом`;

            leftFields[i].textContent = 
            items[i].count - controls[i].children[1].value != 0 && 
            items[i].count - controls[i].children[1].value <= 5 ?
            `Осталось ${items[i].count - controls[i].children[1].value} шт.`
            : '';
        }
    })
    
    controls[i].children[1].addEventListener('change', (e) => {
        console.log('change')
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

        amount[i]=controls[i].children[1].value * items[i].cost;
        let totalAmount = amount.reduce((a,b)=>a+b,0);
        totalField2.textContent = totalField.textContent = `${totalAmount} сом`;
        countItems[i]=controls[i].children[1].value;
        let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
        totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;

        desktopPriceFields[i].textContent = priceFields[i].textContent = 
        `${amount[i]} сом`;
        leftFields[i].textContent = 
        items[i].count - controls[i].children[1].value != 0 && 
        items[i].count - controls[i].children[1].value < 5 ?
        `Осталось ${items[i].count - controls[i].children[1].value} шт.`
        : '';
    })
    
}
let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;

let totalAmount = amount.reduce((a,b)=>a+b,0);
totalField2.textContent = totalField.textContent = `${totalAmount} сом`;

// const itemCheckboxes = document.querySelectorAll("input[name=check__item]");
// console.log(itemCheckboxes[0]);

// let price = [];


// for (let i = 0; i < controls.length; i++) {
//     itemCheckboxes[i].addEventListener('change', function() {
//     if (this.checked) {
//         price[i]=amount[i]
//     } else {
//         price[i]=0
//     }
//     console.log(price.reduce((a,b)=>a+b,0))
//     console.log(price)
//     console.log(amount)
//     });
// }
