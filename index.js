

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

const saleIncrement = 1.65;

const priceFields = document.querySelectorAll('.bucket__item-infoprice .total-price span');
const desktopPriceFields = document.querySelectorAll('.bucket__item-price .total-price span');
const crossedPriceFields = document.querySelectorAll('.bucket__item-infoprice .crossed span');
const desktopCrossedPriceFields = document.querySelectorAll('.bucket__item-price .crossed span');

const controls = document.querySelectorAll('.bucket__item-counter')
const minusButtons = document.querySelectorAll('.bucket__item-counter>button:nth-child(1)')
const plusButtons = document.querySelectorAll('.bucket__item-counter>input+button')
const leftFields = document.querySelectorAll('.bucket__item-remain')

const totalField = document.querySelector('.total__sum-field span')
const totalField2 = document.querySelector('.total__items-field span')
const totalDiscountField = document.querySelector('.total__discount-field span')
const totalItemsField = document.querySelector('.total__items p')

const deleteButtons = document.querySelectorAll('.bucket__item-icons>button:nth-child(2)');
const bucketItems = document.querySelectorAll('.bucket__item');

const itemCheckboxes = document.querySelectorAll("input[name=check__item]");
const itemAllCheckbox = document.querySelector("input[name=bucket_all]");

let amount = [];
let countItems = [];
let checkItems = items.length;
let deletedItems = 0;

for (let i = 0; i < controls.length; i++) {
    amount[i]=controls[i].children[1].value * items[i].cost;
    countItems[i]=controls[i].children[1].value;

    leftFields[i].textContent = '';
    desktopPriceFields[i].textContent = priceFields[i].textContent = amount[i];
    desktopCrossedPriceFields[i].textContent = crossedPriceFields[i].textContent = Math.floor(amount[i]*saleIncrement);

    controls[i].addEventListener('click', (e) => {
        if(e.target === controls[i].children[0]) {
            if(controls[i].children[1].value <= 1) {
                return
            }
            controls[i].children[1].value--;

            if(controls[i].children[1].value == 1) {
                minusButtons[i].classList.add('gray')
            }
            if(items[i].count > controls[i].children[1].value && plusButtons[i].classList.contains('gray')) {
                 plusButtons[i].classList.remove('gray') 
            }

            amount[i] = controls[i].children[1].value * items[i].cost;
            if(itemCheckboxes[i].checked === true) {
                let totalAmount = amount.reduce((a,b)=>a+b,0);
                totalField.textContent = totalAmount;
                totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
                totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

                countItems[i]=controls[i].children[1].value;
                let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
                totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
            }

            desktopPriceFields[i].textContent = priceFields[i].textContent = amount[i];
            desktopCrossedPriceFields[i].textContent = crossedPriceFields[i].textContent = Math.floor(amount[i]*saleIncrement);

            let left = items[i].count - controls[i].children[1].value
            leftFields[i].textContent = (left != 0 && left <= 5) ?
            `Осталось ${left} шт.` : '';
        }
        if(e.target === controls[i].children[2]) {
            if(items[i].count <= controls[i].children[1].value) {
                return
            }
            controls[i].children[1].value++;

            if(items[i].count == controls[i].children[1].value) {
                plusButtons[i].classList.add('gray')
            }
            if(controls[i].children[1].value == 2 && minusButtons[i].classList.contains('gray')) {
                minusButtons[i].classList.remove('gray')
            }
            amount[i] = controls[i].children[1].value * items[i].cost;
            if(itemCheckboxes[i].checked === true) {
                let totalAmount = amount.reduce((a,b)=>a+b,0);
                totalField.textContent = totalAmount
                totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
                totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

                countItems[i]=controls[i].children[1].value;
                let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
                totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
            }

            desktopPriceFields[i].textContent = priceFields[i].textContent = amount[i];
            desktopCrossedPriceFields[i].textContent = crossedPriceFields[i].textContent = Math.floor(amount[i]*saleIncrement);

            let left = items[i].count - controls[i].children[1].value
            leftFields[i].textContent = (left != 0 && left <= 5) ?
            `Осталось ${left} шт.` : '';
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

        amount[i]=controls[i].children[1].value * items[i].cost;
        if(itemCheckboxes[i].checked === true) {
            let totalAmount = amount.reduce((a,b)=>a+b,0);
            totalField.textContent = totalAmount
            totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
            totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

            countItems[i]=controls[i].children[1].value;
            let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
            totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
        }

        desktopPriceFields[i].textContent = priceFields[i].textContent = amount[i];
        desktopCrossedPriceFields[i].textContent = crossedPriceFields[i].textContent = Math.floor(amount[i]*saleIncrement);

        let left = items[i].count - controls[i].children[1].value;
        leftFields[i].textContent = (left != 0 && left <= 5) ?
        `Осталось ${left} шт.` : '';
    })
    
}
let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;

let totalAmount = amount.reduce((a,b)=>a+b,0);
totalField.textContent = totalAmount;
totalField2.textContent = Math.floor(totalAmount*saleIncrement);
totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
        deletedItems++;
        if(itemCheckboxes[i].checked) {
            checkItems--;
        }

        bucketItems[i].remove();
        amount[i]=0;
        countItems[i]=0;
        controls[i].children[1].value = 0;
        
        if(checkItems === bucketItems.length - deletedItems) {
            itemAllCheckbox.checked = true;
        }

        let totalAmount = amount.reduce((a,b)=>a+b,0);
        totalField.textContent = totalAmount
        totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
        totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

        let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
        totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
    })
}

itemAllCheckbox.addEventListener('change', function() {
    if (this.checked) {
        checkItems = bucketItems.length;
        itemCheckboxes.forEach((item) =>  item.checked = true );

        for (let i = 0; i < itemCheckboxes.length; i++) {
            amount[i] = controls[i].children[1].value * items[i].cost;
            countItems[i]=controls[i].children[1].value;

            let totalAmount = amount.reduce((a,b)=>a+b,0);
            totalField.textContent = totalAmount;
            totalField2.textContent = Math.floor(totalAmount*saleIncrement);
            totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

            let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
            totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
        }
    } else {
        checkItems = 0;
        itemCheckboxes.forEach((item) => item.checked = false);

        for (let i = 0; i < itemCheckboxes.length; i++) {
            amount[i]=0;
            countItems[i]=0;

            let totalAmount = amount.reduce((a,b)=>a+b,0);
            totalField.textContent = totalAmount
            totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
            totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

            let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
            totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
        }
    }
})

for (let i = 0; i < itemCheckboxes.length; i++) {
    itemCheckboxes[i].addEventListener('change', function() {
    if (this.checked) {
        checkItems++;

        if(checkItems === bucketItems.length) {
         itemAllCheckbox.checked = true;
        }

        amount[i] = controls[i].children[1].value * items[i].cost;
        countItems[i]=controls[i].children[1].value;

        let totalAmount = amount.reduce((a,b)=>a+b,0);
        totalField.textContent = totalAmount
        totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
        totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

        let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
        totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
    } else {
        checkItems--;
        itemAllCheckbox.checked = false;

        amount[i]=0;
        countItems[i]=0;

        let totalAmount = amount.reduce((a,b)=>a+b,0);
        totalField.textContent = totalAmount
        totalField2.textContent  = Math.floor(totalAmount*saleIncrement);
        totalDiscountField.textContent = Math.ceil(totalAmount*(saleIncrement-1));

        let totalItemsCount = countItems.reduce((a,b) => Number(a)+Number(b), 0)
        totalItemsField.textContent = `${totalItemsCount} ${itemDecl(totalItemsCount)}`;
    }
    });
}

const deleteMissingButtons = document.querySelectorAll('.missing__item-icons>button:nth-child(2)');
const missingItems = document.querySelectorAll('.missing__item');
const missingField = document.querySelector('.missing__menu-check p');

let deletedMissingItems = 0;

for (let i = 0; i < deleteMissingButtons.length; i++) {
    deleteMissingButtons[i].addEventListener('click', () => {
        missingItems[i].remove();
        deletedMissingItems++;
        let left = missingItems.length-deletedMissingItems;
        missingField.textContent = `Отсутствуют · ${left} ${itemDecl(left)}`;
    })
}