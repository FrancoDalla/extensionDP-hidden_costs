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
            actualSpan.style.backgroundColor = 'green';
        }
        else
        {
            actualSpan.style.backgroundColor = 'yellow';
            precios.push(actualSpan);
         }

    }
}



