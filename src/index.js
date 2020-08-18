import flower from "./assets/flower.jpeg"
import "./style.scss"

document.body.innerHTML = '<div id="myMemes"></div>';
document.getElementById('myMemes').innerHTML = `
    <h1>And his name is...</h1>
    <img src="${flower}"/>
`