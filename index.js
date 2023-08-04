


const bucketHideButton = document.querySelector('.bucket__menu button');
const bucketRow = document.querySelector('.bucket__row');

const missingHideButton = document.querySelector('.missing__menu button');
const missingRow = document.querySelector('.missing__row');

const toggleBlock = (block, button) => {
    button.classList.toggle('rotated')
    // block.classList.toggle('hidden')
    block.classList.toggle('anime')
    if(block.classList.contains("anime")) {
        block.style.maxHeight = 0;
       }
       else {
        block.style.maxHeight = block.scrollHeight + "px";
       }
   
}

bucketHideButton.addEventListener('click', () =>
 toggleBlock(bucketRow, bucketHideButton))
missingHideButton.addEventListener('click', () =>
 toggleBlock(missingRow, missingHideButton))





