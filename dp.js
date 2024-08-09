console.log("HOLA ESTO ESTA ANDANDO :)");
const spans = document.getElementsByTagName("span");
const hiddenPrecios = [];
const precios= [];
const reNumber = /[$]\s*\d+/;

for(let i=0;i<spans.length;i++)
{

    let actualSpan = spans[i];
    if(reNumber.test(actualSpan.textContent))
    {

        if(!actualSpan.checkVisibility())
        {
            hiddenPrecios.push(actualSpan);
        }
        else
        {
            actualSpan.style.backgroundColor = 'yellow';
            precios.push(actualSpan);
         }

    }
}

console.log("precios visibles:");
for(let i=0; i<precios.length;i++){
    console.log(precios[i].textContent);
}
console.log("precios ocultos:");
for(let i=0; i<hiddenPrecios.length;i++){
    console.log(hiddenPrecios[i].textContent);
}



