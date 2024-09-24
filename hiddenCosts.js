function getCenter(element) {
    const rectangle = element.getBoundingClientRect();
    return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
}

function getDistance (element,anotherElement) {
    const centerA = getCenter(element);
    const centerB = getCenter(anotherElement);
    return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
}

function distanceCheck(){
    for(let i=0;i<prices.length;i++)
        {
            let j = 0;
            while(j < principalPrices.length)
            {
                let distance = getDistance(prices[i],principalPrices[j]);
                if(distance < hiddenCostDistance )
                {
                    hiddenCosts.push(prices[i]);
                    break;
                }
                j++;
            }
        }
}

function sizeCheck(){
    for(let i=0;i<elementos.length;i++)
        {
            let actualElement = elementos[i];
            let actualSize = parseInt(window.getComputedStyle(actualElement).fontSize);  
            if(reNumber.test(actualElement.textContent))
            {
                if(actualSize >= biggestPriceSize)
                {
                    if(actualSize > biggestPriceSize)
                    {
                        biggestPriceSize = actualSize;
                        prices = prices.concat(principalPrices);
                        principalPrices = [];
                        principalPrices.push(actualElement);
                    }
                    else
                    {
                        principalPrices.push(actualElement);
                    }
                }
                else
                {
                    prices.push(actualElement);
                }
            }
        }
}

function logPrint(){
    console.log("precios: ");
    for(let i=0; i<prices.length;i++){
        console.log(prices[i].textContent);
    }
    
    console.log("precios ocultos: ");
    for(let i=0; i<hiddenCosts.length;i++){
        console.log(hiddenCosts[i].textContent);
        hiddenCosts[i].setAttribute("style","background-color: #FFCCCB;")
    }
    
    console.log(`Tamaño de precio potencial: ${biggestPriceSize}`);
    console.log(`Se detectaron ${principalPrices.length} precios potenciales`);
    
    for(let i=0;i<principalPrices.length;i++)
    {
        console.log(principalPrices[i].textContent);
        principalPrices[i].setAttribute("style","background-color: #CCFEFF;")
    }
}

console.log("HOLA ESTO ESTA ANDANDO :)");
const elementos = document.querySelectorAll('p,span,h5'); //Esto es temporal porque podrían aparecer precios con varios tipos de tags HTML. Estamos viendo como incluir distintos tags
let hiddenCosts = [];
let prices = [];
const reNumber = /[$]\s*\d+/;
const hiddenCostSize = 5;
let principalPrices = [];
let biggestPriceSize = -1;
const hiddenCostDistance = 40; //El minimo se basa en la pagina de ejemplo pero de momento no pensamos que considerar para este valor.

/*Se busca diferenciar precios por el mayor tamaño porque, suponemos, que es mas probable que sean precios finales debido a que llaman más la atención
Ademas de eso se busca diferenciar precios de por si mediante el uso de RegExp*/

sizeCheck();

/* Se realiza una comparación con los precios que se consideraron no finales buscando diferenciar los que pueden catalogarse como hidden costs*/
distanceCheck();

/* Se imprime resultados para testear */

logPrint();

// Escuchar el cambio de estado del historial (navegación sin recargar)
window.addEventListener('popstate', function() {
    // Lógica que se activa cuando cambia la "ruta" en la SPA
    sizeCheck();
    distanceCheck();
    logPrint();
    
    //ESTA NO ES LA UNICA OPCION.
    // No estoy seguro si es necesario re-analizar toda la pagina una vez que pasa el cambio. Falta probar.
});