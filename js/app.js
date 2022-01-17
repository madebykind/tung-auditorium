document.addEventListener('DOMContentLoaded', function(event) {
  

  const today = new Date();
  const eventTeasers = document.querySelectorAll("[data-show-until]");
  const cookieNotice = document.querySelector("[data-cookie-notice]");

  document.querySelector("html").classList.add("js");
  

  //
  // Hide events after event date
  //
  //
  if (eventTeasers != null) {

    eventTeasers.forEach(function(el, index) {

      let hideDate = new Date(el.dataset.showUntil);

      if (today >= hideDate) {
        el.remove();
      }
    });
  }

  //
  // Handle cookies popup
  //
  //
  if (cookieNotice != null) {
    const cookie_consent = getCookie("cookie_consent");

    if (cookie_consent != ""){
        cookieNotice.remove();
    }
  }

});


// Create cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie
function deleteCookie(cname) {
  const d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=;" + expires + ";path=/";
}

// Read cookie
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

// Set cookie consent
function acceptCookieConsent(){
  deleteCookie('cookie_consent');
  setCookie('cookie_consent', 1, 30);
  document.querySelector("[data-cookie-notice]").remove();;
}