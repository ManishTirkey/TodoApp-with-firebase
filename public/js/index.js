// jshint esversion: 8
function del(props) {
  console.log(props);
  $(`#item${props}`).toggleClass("line-through");
}
