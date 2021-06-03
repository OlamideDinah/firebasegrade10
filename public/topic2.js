

// Initialize Firebase


// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);

  const form = document.querySelector("form");
  const nickname = document.getElementById("nickname");
  const message = document.getElementById("message");
  const errorMessage = document.querySelector(".error-message");
  const closebtn = document.querySelector(".error-message .close");
  const dataArea = document.getElementById("load-data");
  
  form.addEventListener("submit", e => {
    e.preventDefault();
  
    if (nickname.value !== "" && message.value !== "") {
      db
        .collection("topic2")
        .add({
          nickname: nickname.value,
          message: message.value,
          date: new Date()
        })
        .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
      errorMessage.classList.remove("show");
      nickname.value = "";
      message.value = "";
    } else {
      errorMessage.classList.add("show");
    }
  });

 document.getElementById("delete").addEventListener("click", function() { // when the delete button is clicked
  
  var message = db.collection('topic2').limit(1) // take the most recent document from this collection
  
message.get().then(function(querySnapshot) { // call a querysnapshot
  querySnapshot.forEach(function(doc) { // for each (really just 1 doc)
    doc.ref.delete(); // delete
  });
});

 });
  

  closebtn.addEventListener("click", () => { // error message removal
    errorMessage.classList.remove("show");
  });
  
  // Neat function inspired from an online source for formatting timestamps
  formatDate = d => {
    //array to get the month in string format
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
    // retrieving current month
    const month = d.getMonth();
    // retrieving day
    const day = d.getDate();
    // the year
    let year = d.getFullYear();
    // shrink so it fits in the box
    year = year.toString().substr(-2);
    // retrieving hour
    const hours = d.getHours();
    // and the current minutes
    const minutes = ("0" + d.getMinutes()).slice(-2);
    //Print out the following format
    return (
      day + " " + months[month] + " '" + year + " - " + hours + ":" + minutes
    );
  };
  
  db
    .collection("topic2")
    .orderBy("date")
    .onSnapshot(querySnapshot => {
      let messages = [];
      querySnapshot.forEach(chat => {
        messages.push(chat.data());
      });
  
      if (messages.length !== 0) {
        dataArea.innerHTML = "";
      } else {
        dataArea.innerHTML = "<p>No messages</p>";
      }
  
      for (let i = 0; i < messages.length; i++) {
        const createdOn = new Date(messages[i].date.seconds * 1000);
        dataArea.innerHTML += `
                              <article>
                                  <div class="p-1 teal-blue box-shadow">
                                      <p>${messages[i].message}</p>
                                  </div>
                                  <div class="float-right">
                                      <span class="green-sheen p-05 small">
                                          ${messages[i].nickname}
                                      </span>
                                      <span class="cambridge-blue p-05 small">
                                          ${formatDate(createdOn)}
                                      </span>
                                  </div>
                              </article>
                          `;
      }
    });
  