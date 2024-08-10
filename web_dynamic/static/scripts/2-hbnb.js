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
  
});
