const today = new Date();

document.addEventListener('DOMContentLoaded', function(event) {

  // Hide events after event date
  const eventTeasers = document.querySelectorAll("[data-show-until]");

  eventTeasers.forEach(function(el, index) {


    let hideDate = new Date(el.dataset.showUntil);

    if (today >= hideDate) {
      el.remove();
    }
  });
});