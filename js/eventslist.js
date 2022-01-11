// All events
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events

// Event instances
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events/{{ eventid }}/instances

// Seat availability
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/instances/{{ instanceid }}/status

function Get(url){
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET",url,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function readableDate(d) {
  let readableDate = d;
  const options = { year: "numeric", month: "long", day: "2-digit", hour: 'numeric', minute: '2-digit' }
  readableDate = d.toLocaleDateString('en-gb', options);

  return readableDate;
}

function checkOnSale(instance) {

  const now = new Date();

  if (instance.isOnSale == true) {
    let startDate = new Date(instance.startUtc);
    let closeDate = new Date(instance.stopSellingAtWebUtc);

    return (closeDate > now);

  } else {
    return false;
  }
}


document.addEventListener('DOMContentLoaded', function(event) {

  // 
  // Show teasers based on date
  //
  const eventsContainer = document.querySelector("[data-event-list]");
  const events = JSON.parse(Get("https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events?onSale=true"));

  // Get all on sale events
  if (eventsContainer !== null) {
    events.forEach(function(event, i) {
      let eventInstancesHTML = "";
      let eventInstances = JSON.parse(Get("https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events/" + event.id + "/instances/"));
      
      eventInstances.forEach(function(instance, i) {

        if (checkOnSale(instance)) {
          eventInstancesHTML += `<a href="/sandbox/book/?id=${instance.id}">${readableDate(new Date(instance.startUtc))}</a>`;
        }
      });


      let eventItemHtml = `<h2>${event.name}</h2>`;
      eventsContainer.insertAdjacentHTML('beforeend', eventItemHtml);
      eventsContainer.insertAdjacentHTML('beforeend', eventInstancesHTML);

    });
  }



  // 
  // Update booking page content based on instance ID
  //
  const iframeContainer = document.querySelector("[data-iframe-container]");
  let eventTitleElement = document.querySelector("[data-event-title]");
  const params = new URLSearchParams(document.location.search);
  const instanceId = params.get("id"); 

  if (iframeContainer !== null) {
    const instance = JSON.parse(Get(`https://tickets.thetungauditorium.com/thetungauditorium/api/v3/instances/${instanceId}/`));
    const event = JSON.parse(Get(`https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events/${instance.event.id}/`));
    const seats = JSON.parse(Get(`https://tickets.thetungauditorium.com/thetungauditorium/api/v3/instances/${instanceId}/status`));

    // Update event title
    eventTitleElement.innerHTML = event.name;

    // Add availability info
    if (parseInt(seats.available) < 1) {
      eventTitleElement.insertAdjacentHTML('afterend', "<p>This event is sold out.</p>");
    } else if (parseInt(seats.available) < 25) {
      eventTitleElement.insertAdjacentHTML('afterend', `<p>Last ${seats.available} tickets remaining.</p>`);
    } else {
      eventTitleElement.insertAdjacentHTML('afterend', "<p>Tickets available.</p>");
    }

    // Add iframe
    if (checkOnSale(instance)) {
      iframeContainer.innerHTML = `<iframe
          name="SpektrixIFrame"
          id="SpektrixIFrame"
          src="https://tickets.thetungauditorium.com/thetungauditorium/website/ChooseSeats.aspx?EventInstanceId=${parseInt(instance.id)}&resize=true"
          frameborder="0"
          language="javascript"
          style="width: 100%; height:1200px;"
          onload="setTimeout(function(){ window.scrollTo(0,0);}, 100)"></iframe>`;

    } else {
      iframeContainer.innerHTML = "<p>This event is not currently on sale.</p>";
    }

  }


});