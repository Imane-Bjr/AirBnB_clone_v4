$(function () {
  const checkedBoxs = {};
  let index = 0;
  $('input').change(function () {
    const isChecked = $(this).is(':checked');
    const amenityName = $(this).data('name');
    const amenityId = $(this).data('id');
  
    if (isChecked) {
      checkedBoxs[amenityName] = amenityId;
    } else {
      delete checkedBoxs[amenityName];
    }
  
    let amenities = ``;
    const checkboxlen = Object.keys(checkedBoxs).length;
    let index = 0;
    for (const key in checkedBoxs) {
        index += 1;
        amenities += `${key}`
        if (checkboxlen > 1 && index !== checkboxlen)
          amenities += ', '
    }
    console.log(checkedBoxs);
    $('.amenities h4').text(amenities)
  });

  const apiStatusElemtn = $('div#api_status');
  const sectionPlacesElement = $('.places');

  function checkUrlStatus() {
    fetch('http://0.0.0.0:5001/api/v1/status/')
      .then(response => {
         if (response.status === 200)
         {
           apiStatusElemtn.addClass('available');
        } else {
          if (apiStatusElemtn.hasClass('available')) {
            apiStatusElemtn.removeClass('available');
          }
        }
      });
  }
  checkUrlStatus()

  //   load palces from from API
  function placesSearch() {
    fetch('http://0.0.0.0:5001/api/v1/places_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
      let HTML =``;
      for (const place of data) {
        HTML += `
          <article>
            <div class="title_box">
              <h2>${ place.name }</h2>
              <div class="price_by_night">$${ place.price_by_night }</div>
            </div>
            <div class="information">
              <div class="max_guest">${ place.max_guest } Guest${ place.max_guest !== 1 ? 's' : 0}</div>
                  <div class="number_rooms">${ place.number_rooms } Bedroom${ place.number_rooms !== 1? 's': 0 }</div>
                  <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${ place.number_bathrooms !== 1? 's': 0 }</div>
            </div>
            <div class="user">
                </div>
                <div class="description">
              ${ place.description }
                </div>
          </article>
        `;
      }
      sectionPlacesElement.html(HTML)
    });
  }

  placesSearch();

});
