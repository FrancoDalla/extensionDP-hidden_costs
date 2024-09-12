//Todavia no se encuentra en uso. El plan es que con estos modulos se pueda detectar los precios pequeños alrededor del precio que tenga mayor tamaño 

function getCenter(element) {
    const rectangle = element.getBoundingClientRect();
    return {"x": (rectangle.left + rectangle.width) / 2, "y": (rectangle.top + rectangle.height) / 2};
}

function getDistance (element,anotherElement) {
    const centerA = getCenter(element);
    const centerB = getCenter(anotherElement);
    return Math.sqrt(Math.pow(centerA.x - centerB.x, 2) + Math.pow(centerA.y - centerB.y, 2));
}

/* 
    FALTA TEST. POSIBLE SOLUCION. INEFICIENTE. 

    se plantea un vector boolean a la par de spans para llevar cuenta de todos los precios y sus
    cercanos. Por cada precio se marca como ya visitado y en caso de tener otro a una distancia
    menor a la minima se lo marca tambien ya que podria ser un HiddenCost.
    como nota aparte:
    En la mayoria de los casos el precio cercano deberia ser menor al actual, por lo que podria
    ser marcado por el check de tamaños antes de que llegue al check de distancias.
*/

console.log("HOLA ESTO ESTA ANDANDO :)");
const spans = document.getElementsByTagName("span");
const hiddenCosts = [];
const prices = [];
const reNumber = /[$]\s*\d+/;
const defaultFontSize = 5;
const minimunDistance = 2; //A determinar
const adyacents = new Array(spans.length).fill(true); //vector boolean
let biggestPrice;
let biggestPriceSize = -1;
for(let i=0;i<spans.length;i++)
{
    let actualSpan = spans[i];
    let actualSize = parseInt(window.getComputedStyle(actualSpan).fontSize);  
    if((reNumber.test(actualSpan.textContent)) && (adyacents[i]))
        /* 
           si adyacents[i] devuelve false es porque ya fue detectado como HiddenCost en otra
           iteracion y no vale la pena revisarlo
        */
    {

        if(!actualSpan.checkVisibility())
        {
            hiddenCosts.push(actualSpan);
            adyacents[i]=false;
        }
        else
        { 
            if(actualSize < defaultFontSize)
            {
                adyacents[i]=false;
                hiddenCosts.push(actualSpan);
                actualSpan.style.backgroundColor = 'green';
            }
            else
                {
                let distance; 
                let j = 0;
                let ok = true;
                while((ok)&&(j<=spans.length)){
                    if((j!=i)&&(adyacents[j])){ //si no es el actual y no fue visitado ya
                        distance=getDistance (actualSpan,spans[j]);
                        if(distance<minimunDistance){ //si la distancia es menor a la minima
                            ok=false;
                            adyacents[j]=false;//visitados el actual y el cercano HiddenCost
                            adyacents[i]=false;
                            hiddenCosts.push(actualSpan);
                            //actualSpan.style.backgroundColor = 'green';
                        }
                    j++;
                }
                
                if(adyacents[i]==true){
                    adyacents[i]=false;//Ya se visito y se analizo si tiene cercanos
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

console.log(`Tamaño del precio mas grande: ${biggestPriceSize}`);