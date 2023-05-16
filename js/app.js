const loadPhones = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = (phones) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent= '';
    // display only 10 phones
       phones = phones.slice(0, 10);

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
}

document.getElementById('search-btn').addEventListener('click', function(){
    const searchField = document.getElementById('phone-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';

})

// loadPhones();