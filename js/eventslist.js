// All events
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events

// Event details
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events/{{ eventid }}/

// Event instances
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events/{{ eventid }}/instances


// Seat availability
// https://tickets.thetungauditorium.com/thetungauditorium/api/v3/instances/{{ instanceid }}/status


// const day1 = new Date('2022-01-01');
// const today = new Date();
// const thisDay = Math.floor((today.getTime() - day1.getTime()) / 86400000) + 1;
// const thisWeek = Math.ceil(thisDay / 7);

document.addEventListener('DOMContentLoaded', function(event) {

  // Show teasers based on date
  const eventsContainer = document.querySelector("[data-event-list]");
  const eventsJson = JSON.parse(Get("https://tickets.thetungauditorium.com/thetungauditorium/api/v3/events"));
  console.log(eventsJson);

  console.log(eventsContainer);


});

function Get(url){
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET",url,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}