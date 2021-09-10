// jshint esversion: 6
function date() {
  const today = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const date = today.toLocaleDateString("en-us", options);

  return date;
}

exports.DATE = date;
