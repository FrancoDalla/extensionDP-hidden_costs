function getCenter(element) {
    const rectangle = element.getBoundingClientRect();
    return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
}

function getDistance (element,anotherElement) {
    const centerA = getCenter(element);
    const centerB = getCenter(anotherElement);
    return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
}

console.log("HOLA ESTO ESTA ANDANDO :)");
const spans = document.getElementsByTagName("p"); //Esto es temporal porque podrían aparecer precios con varios tipos de tags HTML
let hiddenCosts = [];
let prices = [];
const reNumber = /[$]\s*\d+/;
const defaultFontSize = 5;
let potentialPrincipalPrices = [];
let biggestPriceSize = -1;
const minDistance = 40;

/*Se busca diferenciar precios por el mayor tamaño porque, suponemos, que es mas probable que sean precios finales debido a que llaman más la atención
ESTO ES LO OPUESTO DE LO QUE ES UN HIDDEN COST.
Ademas de eso se busca diferenciar precios de por si mediante el uso de RegExp*/

for(let i=0;i<spans.length;i++)
{
    let actualSpan = spans[i];
    let actualSize = parseInt(window.getComputedStyle(actualSpan).fontSize);  
    if(reNumber.test(actualSpan.textContent))
    {
        if(actualSize >= biggestPriceSize)
        {
            if(actualSize > biggestPriceSize)
            {
                biggestPriceSize = actualSize;
                prices = prices.concat(potentialPrincipalPrices);
                potentialPrincipalPrices = [];
                potentialPrincipalPrices.push(actualSpan);
            }
            else
            {
                potentialPrincipalPrices.push(actualSpan);
            }
        }
        else
        {
            prices.push(actualSpan);
        }
    }
}

/* Se realiza una comparación con los precios que se consideraron no finales buscando diferenciar los que pueden catalogarse como hidden costs*/
for(let i=0;i<prices.length;i++)
{
    let j = 0;
    while(j < potentialPrincipalPrices.length)
    {
        let distance = getDistance(prices[i],potentialPrincipalPrices[j]);
        if(distance < minDistance )
        {
            hiddenCosts.push(prices[i]);
        }
        j++;
    }
}

console.log("precios: ");
for(let i=0; i<prices.length;i++){
    console.log(prices[i].textContent);
}

console.log("precios ocultos: ");
for(let i=0; i<hiddenCosts.length;i++){
    console.log(hiddenCosts[i].textContent);
}

console.log(`Tamaño del precio potencial: ${biggestPriceSize}`);
for(let i=0;i<potentialPrincipalPrices.length;i++)
    console.log(potentialPrincipalPrices[i].textContent);


