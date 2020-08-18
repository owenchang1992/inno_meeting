import flower from "./assets/flower.jpeg"
import "./style.scss"

document.body.innerHTML = '<div id="myMemes"></div>';
document.getElementById('myMemes').innerHTML = `
    <h1>And his name is...</h1>
    <img src="${flower}"/>
`

import('./module-1').then(mod => {
    const nothing = mod.default();
    const nothingToo = mod.useless();

    console.log(`${nothing} and ${nothingToo}`)
})