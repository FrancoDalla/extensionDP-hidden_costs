function getCenter(element) {
    const rectangle = element.getBoundingClientRect();
    return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
}

function getDistance (element,anotherElement) {
    const centerA = getCenter(element);
    const centerB = getCenter(anotherElement);
    return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
}

console.log("Cargaste el viewPort test");
const spans = document.getElementsByTagName("span");
console.log("elemento 7: ",spans[7].textContent);
for (let i=0;i<spans.length;i++){
    let actual = spans[i];
    console.log(`Elemento ${i}: `,actual.textContent);
    console.log(getDistance(actual,spans[7]));
    console.log(`tamaño de texto: `,actual.style.fontSize);
}