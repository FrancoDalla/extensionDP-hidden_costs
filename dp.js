console.log("HOLA ESTO ESTA ANDANDO :)");
const spans = document.getElementsByTagName("span");
const hiddenPrecios = [];
const precios= [];

for(let i=0;i<spans.length;i++)
{

    let actualSpan = spans[i];
    if(actualSpan.textContent.includes('$'))
    {

        if(!actualSpan.checkVisibility())
        {
            hiddenPrecios.push(actualSpan);
            actualSpan.style.backgroundColor = 'green';
            console.log("SE ENTRO");
        }
        else
        {
            actualSpan.style.backgroundColor = 'yellow';
            precios.push(actualSpan);
         }

    }
}

console.log("Spans ocultos:_ ",hiddenPrecios);
console.log("spans", precios);

for(let i = 0;i<hiddenPrecios.length;i++){
    console.log(hiddenPrecios[i].textContent);
}
console.log("AHORA PRECIOS");
for(let i = 0;i<precios.length;i++){
    console.log(precios[i].textContent);
}


