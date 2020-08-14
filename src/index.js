import flower from "./assets/flower.jpeg"

document.body.innerHTML = '<div id="myMemes"></div>';
document.getElementById('myMemes').innerHTML = `
    <h1>And his name is...</h1>
    <img src="${flower}"/>
`