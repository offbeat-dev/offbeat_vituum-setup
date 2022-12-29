import template from "../html/components/test.hbs";
const htmlStr = template({ text: "hola" });
document.querySelector("#templatearea").innerHTML = htmlStr;
