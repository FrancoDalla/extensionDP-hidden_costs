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
const spans = document.getElementsByTagName("span");
const hiddenCosts = [];
const prices = [];
const reNumber = /[$]\s*\d+/;
const defaultFontSize = 5;
let biggestPrice;
let biggestPriceSize = -1;

for(let i=0;i<spans.length;i++)
{
    let actualSpan = spans[i];
    let actualSize = parseInt(window.getComputedStyle(actualSpan).fontSize);  
    if(reNumber.test(actualSpan.textContent))
    {

        if(!actualSpan.checkVisibility())
        {
            hiddenCosts.push(actualSpan);
        }
        else
        { 
            if(actualSize < defaultFontSize)
            {
                hiddenCosts.push(actualSpan);
                actualSpan.style.backgroundColor = 'green';
            }
            else
            {
                prices.push(actualSpan);
                actualSpan.style.backgroundColor = 'yellow';
                if(actualSize > biggestPriceSize)
                {
                    biggestPriceSize = actualSize;
                    biggestPrice = actualSpan;
                }
            }
        }
    }
}

console.log("precios visibles:");
for(let i=0; i<prices.length;i++){
    console.log(prices[i].textContent);
}

console.log("precios ocultos:");
for(let i=0; i<hiddenCosts.length;i++){
    console.log(hiddenCosts[i].textContent);
}

console.log(`Tamaño del precio potencial: ${biggestPriceSize}`);


