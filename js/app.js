const loadPhones = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent= '';
    // display only 9 phones
       const showAll = document.getElementById('show-all');
       if(dataLimit && phones.length > 10 ){
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
       }
       else{
        showAll.classList.add('d-none');
       }

    // No Phone Found 
    const noFoundPhone = document.getElementById('no-found-phone');
    if(phones.length === 0){
        noFoundPhone.classList.remove('d-none');
    }
    else{
        noFoundPhone.classList.add('d-none');
    }

    // get every phone for for each 
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });

    // stop loader and spinner
    toggleSpinner(false);
}   

// using commom function
const phoneShow = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('phone-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
    searchField.value = '';
}
// click button only 9 phones show 
document.getElementById('search-btn').addEventListener('click', function(){
    // srart loader
    phoneShow(10);
})

// click button all phone show 
document.getElementById('btn-show-all').addEventListener('click', function(){
    console.log('clickded buttn');
    phoneShow();
})
// search input field enter key 
document.getElementById('phone-field').addEventListener('keypress', function(e){
    if(e.key === "Enter"){
       phoneShow(10);
    }
})

// do toggler spinner
const loadSpinner = document.getElementById('loader');
const toggleSpinner = isLoading => {
    if(isLoading){
        loadSpinner.classList.remove('d-none');
    }
    else{
        loadSpinner.classList.add('d-none');
    }
}
// loadPhones();