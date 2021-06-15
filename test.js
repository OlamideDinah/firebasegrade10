  // PLANNING 1 //
  
  document.getElementById("placeholder").addEventListener("event", function() { // when the event is triggered, begin running the function
    var message = db.collection('placeholder').limit(1) 
    message.get().then(function(querySnapshot) { 
        querySnapshot.forEach(function(doc) { 
            doc.ref.delete(); 
        });
    });
});

// PLANNING 2 //

formatDate = d => {
    // Months array to string months
    const months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    );
    // get the month
    const month = d.getMonth();
    // get the day
    const day = d.getDate();
    // get the year
    let year = d.getFullYear();
    // pull the last two digits of the year
    year = year.toString().substr(-2);
    // get the hours
    const hours = d.getHours();
    // get the minutes
    const minutes = ("0" + d.getMinutes()).slice(-2);
    //return the string 
    return (
      day + " " + months[month] + " '" + year + " - " + hours + ":" + minutes
    );
  };

// PLANNING 3 //

    db.collection("messages")
    db.orderBy("date") // will order all documents by date
    db.onSnapshot(querySnapshot => {
      let messages = [];
      querySnapshot.forEach(chat => { // capturing all current data in the ''messages'' collection
        messages.push(chat.data());
        
// PLANNING 4 //

if (nickname.value !== "" && message.value !== "") {

    db.collection("topic2") // adding to this collections
    db.add({
      nickname: nickname.value,
      message: message.value,
      date: new Date()
    })
