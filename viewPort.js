function getCenter(element) {
    const rectangle = element.getBoundingClientRect();
    return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
}

function getDistance (element,anotherElement) {
    const centerA = getCenter(element);
    const centerB = getCenter(anotherElement);
    return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
}
let potentialPriceSize = -1;
let potentialPrice;
console.log("Cargaste el viewPort test");
const spans = document.getElementsByTagName("span");
for (let i=0;i<spans.length;i++){ //como lo mas probable es que el precio mas grande sea donde quieran que pongamos foco. Nos interesa para poder buscar precios cercanos a este. 
    let actual = spans[i];
    let actualSize = parseFloat(window.getComputedStyle(actual,null).getPropertyValue('font-size'));    
    if(actualSize > potentialPriceSize){
        potentialPrice = actual;
        potentialPriceSize = actualSize;
    }
}
console.log(`El tamaño de fuente del precio potencial es de: ${potentialPriceSize}`);
console.log(`El precio potencial es: ${potentialPrice.textContent}`);