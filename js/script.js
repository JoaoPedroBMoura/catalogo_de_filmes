//iterar a lista

lista.forEach((filme) => {
   
    let imgFilme = filme.figura
    let nome = filme.titulo
    let descricao = filme.resumo

    function criaElementoHtml( tipo,  classe, id ="",texto = "") {
        const elemento = document.createElement(tipo);
        elemento.className = classe
        elemento.id = id;
        elemento.innerText = texto;
        return elemento
    }

    function criaImagem(src, textoAlt = '',classe = '') {
        const elemento = document.createElement('img')
        elemento.src = src;
        elemento.alt = textoAlt;
        elemento.className = classe

        return elemento
    }

    const divFilme = document.getElementById("filme")
        divFilme.className = 'grid-container backgound-preto'

    const sectionCadaFilme = criaElementoHtml('section','text-center',filme.titulo)

    const divMain = criaElementoHtml('div','flex flex-row espacamento-igual-dl padding-c-20')

    const divIdentificacao = criaElementoHtml('div')

    const divFaixaEtaria = criaElementoHtml('div','card-classificacao')
    
    const imgParaDiv = criaImagem(imgFilme, "Capa do Filme", 'img-card padding-e-25')
    
    let tituloDiv = criaElementoHtml('h3', 'centraliza-texto remove-b-margem', '', nome)

    let tituloElenco = criaElementoHtml('h5', 'centraliza-texto remove-b-margem', '', "Elenco")
    
    let titulosSemelhantes = criaElementoHtml('h6','padding-e-25','',"Títulos Semelhantes")
    
    let resumo = criaElementoHtml('p','centraliza-texto','',descricao)
    
    

    const ulDeGeneros = document.createElement('ul')
        ulDeGeneros.className = 'flex flex-wrap remove-d-padding'
    const ulDeOpinioes = document.createElement('ul')
    const ulElenco = document.createElement('ul')
        ulElenco.className = 'flex flex-wrap'
    const ulTitulosSemelhantes = document.createElement('ul')
        ulTitulosSemelhantes.className = 'flex flex-wrap padding-e-25'



    filme.generos.forEach((generoFilme) => {
        const liDeGeneros = document.createElement('li')
        liDeGeneros.textContent = generoFilme
        liDeGeneros.className = 'list-no-style display-inline flex-no-warp font-media remove-b-padding'
        ulDeGeneros.append(liDeGeneros)
        
    })

    filme.opinioes.forEach((opinioesFilme) => {
        const liDeOpinioes = document.createElement('li')
        liDeOpinioes.textContent = opinioesFilme
        ulDeOpinioes.append(liDeOpinioes)
    
    })

    filme.elenco.forEach((ator) => {
        const liDeElenco = document.createElement('li')
        liDeElenco.textContent = ator
        liDeElenco.className = ' display-inline padding-e-20 flex-no-warp font-pequena'
        ulElenco.append(liDeElenco)
    })

    filme.titulosSemelhantes.forEach((idFilme) => {
        const thisFilmeObj = lista.find(filme => filme.id == idFilme);

        const imgFilme = document.createElement('img');
        imgFilme.src = thisFilmeObj.figura;
        imgFilme.alt = `Card do filme ${thisFilmeObj.nome}`;
        imgFilme.style.width = '5em';
        imgFilme.style.height = '3em';

        const link = document.createElement('a');
        link.href = `#${thisFilmeObj.titulo}`;

        link.append(imgFilme);

        const li = document.createElement('li');
            li.className = 'margin-e-d-10 list-no-style remove-e-margin'

        li.append(link);

        ulTitulosSemelhantes.append(li);
        
    })


    //Faixa Etaria do Filme
    divFaixaEtaria.textContent = filme.classificacao
    divFaixaEtaria.style.borderRadius = '5px';
    divFaixaEtaria.style.color = 'black';
    divFaixaEtaria.style.fontWeight = 'bold';

    if (filme.classificacao <= 14) {
        divFaixaEtaria.style.backgroundColor = 'green';
        divFaixaEtaria.style.color = 'black';
      } else if ( filme.classificacao > 14 && filme.classificacao < 18) {
        divFaixaEtaria.style.backgroundColor = 'yellow';
        divFaixaEtaria.style.color = 'black';
      } else {
        divFaixaEtaria.style.backgroundColor = 'red';
        divFaixaEtaria.style.color = 'white';
      }

    //Classificação
    const rankingFilme = document.createElement('div');
    rankingFilme.className ='centraliza-texto centraliza-estrela '

    const ratings = filme.opinioes.map(opiniao => opiniao.rating); 
    const somaRatings = ratings.reduce((acc, rating) => acc + rating, 0);
    const mediaRatings = somaRatings / ratings.length;
    
    const estrelasInteiras = Math.floor(mediaRatings);
    const estrelaParcial = mediaRatings % 1 >= 0.5;

    for (let i = 0; i < estrelasInteiras; i++) {
        const estrela = document.createElement('span');
        estrela.textContent = '★'; 
        estrela.style.color = 'gold';
        estrela.style.fontSize = '20px';
        rankingFilme.appendChild(estrela);
    }
    
    if (estrelaParcial) {
        const meiaEstrela = document.createElement('span');
        meiaEstrela.textContent = '⯩';
        meiaEstrela.style.color = 'gold';
        meiaEstrela.style.fontSize = '20px';
        rankingFilme.appendChild(meiaEstrela);
    }
    
    const estrelasVazias = 5 - estrelasInteiras - (estrelaParcial ? 1 : 0);
    for (let i = 0; i < estrelasVazias; i++) {
        const estrelaVazia = document.createElement('span');
        estrelaVazia.textContent = '☆';
        estrelaVazia.style.color = 'gray';
        estrelaVazia.style.fontSize = '20px';
        rankingFilme.appendChild(estrelaVazia);
    }
   
    //Fim

    ulDeGeneros.append(rankingFilme)

    divIdentificacao.append(tituloDiv,ulDeGeneros)
    
    divMain.append(imgParaDiv, divIdentificacao,divFaixaEtaria)
    
    sectionCadaFilme.append(divMain,resumo,tituloElenco, ulElenco, titulosSemelhantes, ulTitulosSemelhantes)
    sectionCadaFilme.className = 'card-section backgound-cinza'
    
    divFilme.append(sectionCadaFilme)
    
    
})