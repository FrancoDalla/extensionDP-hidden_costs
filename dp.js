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
        }
        else
        {
            actualSpan.style.backgroundColor = 'yellow';
            precios.push(actualSpan);
         }

    }
}



