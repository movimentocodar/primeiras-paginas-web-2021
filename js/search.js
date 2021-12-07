const searchInput = document.querySelector('[data-search]')
searchInput.addEventListener('input', () =>{
    const itemName = document.querySelectorAll('.item-name').forEach(item => {
        const nameList = item.textContent.toLowerCase()
        const inputValue = searchInput.value.toLowerCase()
        if (!nameList.includes(inputValue)){
            item.parentElement.style.display = 'none';
        }else{
            item.parentElement.style.display = '';
        }
    })
})