let pegarResultado = document.getElementById('buscadorGif');
let tempoFim = null;
let resultado = '';
let html = '';
var todosGifs = [];


function httpGetAsync(theUrl, callback)
{
   
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);

    return;
}

function tenorCallback_search(responsetext)
{
    var response_objects = JSON.parse(responsetext);

    todosGifs = response_objects["results"];
    
    for(let i in todosGifs){
        html += '<div class="col-md-4 h-100 w-100"><div class="gif"><img class="rounded" src="'+todosGifs[i]["media"][0]["nanogif"]["url"]+'"/></div></div>';
    }
    $('.gifs').html(html);
    return;

}

// Busca o termo digitado
function retornarGifs(resultado){
    let apiKey = '4HCLV7HQ0799';
    let limite = 30;

    let buscarDigitado = resultado;
    
    let pesquisarUrl = "https://g.tenor.com/v1/search?q=" + buscarDigitado + "&key=" +apiKey + "&limit=" + limite;

    httpGetAsync(pesquisarUrl, tenorCallback_search);
    return;

}

// Entrega resultado de pesquisa após o término da digitação !importante
function verificarResultado(){
    pegarResultado.addEventListener('keyup', function(e){
        clearTimeout(tempoFim);
        tempoFim = setTimeout(function(){
            if(pegarResultado === '' || pegarResultado.length === 0){
                return;
            }else{
                resultado = pegarResultado.value;
                resultadoDigitado(resultado);
            }
        }, 1000);
    });
    
}

// Validação de termo nulo
function resultadoDigitado(resultado){
    if(resultado === ''){
        limparResultado(resultado);
        verificarResultado()
    }else{
        resultado = resultado;
        retornarGifs(resultado);
        limparResultado();
    }

}

// Zerando a busca
function limparResultado(resultado){
    if (resultado === ''){
        verificarResultado();
    }else{
        html = '';
    }
    
}

verificarResultado();