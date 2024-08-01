console.log("HOLA ESTO ESTA ANDANDO :)");
const spans = document.getElementsByTagName("span");
let hiddenSpans = [];
const precios= [];

for(let i=0;i<spans.length;i++)
{

    let actualSpan = spans[i];
    if(actualSpan.textContent.includes('$'))
    {

        if(actualSpan.style.visibility.valueOf === 'hidden')
        {
            hiddenSpans.push(actualSpan);
            actualSpan.style.backgroundColor = 'green';
        }
        else
        {
            actualSpan.style.backgroundColor = 'yellow';
            precios.push(actualSpan);
         }

    }
}

console.log("Spans ocultos:_ ",hiddenSpans);
console.log("spans", precios);

for(let i = 0;i<hiddenSpans.length;i++){
    console.log(hiddenSpans[i].textContent);
    console.log(hiddenSpans[i].style.visibility.valueOf);
}

for(let i = 0;i<precios.length;i++){
    console.log(precios[i].textContent);
    console.log(precios[i].style.getPropertyValue);
}

