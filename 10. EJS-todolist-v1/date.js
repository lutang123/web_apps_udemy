console.log(module); // this is an object

// we canalso just say export.getDate

//module.exports is a js object, and we can save a funtion in a variable
module.exports.getDate = function() {
  let today = new Date() // similiar as the code var tom1 = new Audio("sounds/tom-1.mp3");  tom1.play();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  let day = today.toLocaleDateString("en-US", options);
  return day
}

// alternatively, but this way you can only export one method:

// module.exports = getDate;

// function getDate() {
//   let today = new Date() // similiar as the code var tom1 = new Audio("sounds/tom-1.mp3");  tom1.play();
//   let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric"
//   }
//   let day = today.toLocaleDateString("en-US", options);
//   return day
// }

// and in this way when we use in app.js, we should write getDate(), which means running the function, instead of getDate.


// if we write and we can define other methods too, e.g. module.exports.getMilk
// module.exports.getDate = getDate;

// function getDate() {
//   let today = new Date() // similiar as the code var tom1 = new Audio("sounds/tom-1.mp3");  tom1.play();
//   let options = {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric"
//   }
//   let day = today.toLocaleDateString("en-US", options);
//   return day
// }

// and in this way when we use in app.js, we should write getDate(), which means running the function, instead of getDate.
