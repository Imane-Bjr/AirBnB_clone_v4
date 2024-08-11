$(function () {
    const checkedBoxs = {
        "amenities": [],
        "states": [],
        "cities": []
    };
    const statesCities = {};
    let index = 0;

    // Update amenities based on checkbox state
    $('.js-amenities-input').change(function () {
        const isChecked = $(this).is(':checked');
        const amenityName = $(this).data('name');
        const amenityId = $(this).data('id');

        if (isChecked) {
            checkedBoxs.amenities.push({
                "name": amenityName,
                "id":amenityId})
        } else {
            for (const index in checkedBoxs.amenities) {
                if (checkedBoxs.amenities[index].name === amenityName) {
                    checkedBoxs.amenities.splice(index, 1)
                }
            }
        }

        let amenities = '';
        const checkboxlen = Object.keys(checkedBoxs.amenities).length;
        index = 0;
        for (const key of checkedBoxs.amenities) {
            index += 1;
            amenities += key.name;
            if (checkboxlen > 1 && index !== checkboxlen) {
                amenities += ', ';
            }
        }

        $('.amenities h4').text(amenities);
    });

    const apiStatusElemtn = $('div#api_status');
    const sectionPlacesElement = $('.places');

    function checkUrlStatus() {
        fetch('http://0.0.0.0:5001/api/v1/status/')
            .then(response => {
                if (response.status === 200) {
                    apiStatusElemtn.addClass('available');
                } else {
                    if (apiStatusElemtn.hasClass('available')) {
                        apiStatusElemtn.removeClass('available');
                    }
                }
            });
    }
    checkUrlStatus();

    // Load places from API
    function placesSearch(jsonPost) {
        fetch('http://0.0.0.0:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonPost)
        })
        .then(response => response.json())
        .then(data => {
            let HTML = '';
            for (const place of data) {

                HTML += `
                    <article>
                        <div class="title_box">
                            <h2>${ place.name }</h2>
                            <div class="price_by_night">$${ place.price_by_night }</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${ place.max_guest } Guest${ place.max_guest !== 1 ? 's' : ''}</div>
                            <div class="number_rooms">${ place.number_rooms } Bedroom${ place.number_rooms !== 1 ? 's' : ''}</div>
                            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${ place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="user"></div>
                        <div class="description">
                            ${ place.description }
                        </div>
                    </article>
                `;
            }
            sectionPlacesElement.html(HTML);
        });
    }
    placesSearch({});

    const SearchButtonElement = $('button');

    SearchButtonElement.click(function () {
        const Amenities = checkedBoxs.amenities.map(i => i.name);
        const States = checkedBoxs.states.map(i => i.name);
        const Cities = checkedBoxs.cities.map(i => i.name);
        
        const jsondata = {
            "amenities": Amenities,
            "states": States,
            "cities": Cities,
        };
        
        placesSearch(jsondata);
    });
    
    
    // Update states based on checkbox state
    $('.js-states-input').change(function () {
        const isChecked = $(this).is(':checked');
        const stateName = $(this).data('name');
        const stateId = $(this).data('id');

        if (isChecked) {
            checkedBoxs.states.push({
                "name": stateName,
                "id":stateId});
            statesCities[stateName] = stateId;
        } else {
            for (const index in checkedBoxs.states) {
                if (checkedBoxs.states[index].name === stateName) {
                    checkedBoxs.states.splice(index, 1)
                }
            }
            // delete state and chockbox unchecked
            delete statesCities[stateName];
        }

        let states = '';
        const checkboxlen = Object.keys(statesCities).length;
        index = 0;
        for (const key in statesCities) {
            index += 1;
            states += key;
            if (checkboxlen > 1 && index !== checkboxlen) {
                states += ', ';
            }
        }

        $('.js-states').text(states);
    });
    
    // Update cities based on checkbox state
    $('.js-cities-input').change(function () {
        const isChecked = $(this).is(':checked');
        const cityName = $(this).data('name');
        const cityId = $(this).data('id');

        if (isChecked) {
            checkedBoxs.cities.push({
                "name": cityName,
                "id": cityId});
            statesCities[cityName] = cityId;
        } else {
            for (const index in checkedBoxs.cities) {
                if (checkedBoxs.cities[index].name === cityName) {
                    checkedBoxs.cities.splice(index, 1)
                }
            }
            delete statesCities[cityName];
        }

        let cities = '';
        const checkboxlen = Object.keys(statesCities).length;
        index = 0;
        for (const key in statesCities) {
            index += 1;
            cities += key;
            if (checkboxlen > 1 && index !== checkboxlen) {
                cities += ', ';
            }
        }

        $('.js-cities').text(`${cities}`);
    });
    
});

