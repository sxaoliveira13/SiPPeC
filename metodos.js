//PÁGINA DOS MÉTODOS
  
  function CreateTable(){
  
    const req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.responseType = 'text';
    req.open("GET", "https://liag.ft.unicamp.br/mco/getall/metodos", true);
    req.onloadend  = function() {
        let principal = document.querySelector('.divtabela');
        let testar = document.getElementsByTagName("table");
    
        if(testar.length != 0){
        return;
        }
        let tabela = document.createElement("table");
        tabela.className = "tabela";
        principal.appendChild(tabela);
        
        let teste = "";
        let elementos;
    
        teste =  req.responseText;
        elementos = JSON.parse(teste);
    
        let cabecalho = CreateTableHeader();
        tabela.appendChild(cabecalho);
        let corpo = document.createElement("tbody");
        tabela.appendChild(corpo);
    
        elementos.forEach(element => {
        let linha = CreateTableLine(element);
        corpo.appendChild(linha);
        });
    
        let filtro = document.createElement("script");
        filtro.innerHTML = getValuesFromColumns();
        principal.appendChild(filtro);
    
    };
    req.send(null);
  
  }
  
  function CreateTableHeader(){
    let header = document.createElement("thead");
    let newline = document.createElement("tr");
  
    let colunaTitulo = document.createElement("td");
     colunaTitulo.innerHTML = "Título";
     colunaTitulo.id = "1";
     let TituloFilter = document.createElement("select");
     TituloFilter.className =  "table-filter";
     let TituloOptions = document.createElement("option");
     TituloOptions.value = "all";
     TituloFilter.appendChild(TituloOptions);
     colunaTitulo.appendChild(TituloFilter);
     newline.appendChild(colunaTitulo);
   
     let colunaPublicoAlvo = document.createElement("td");
     colunaPublicoAlvo.innerHTML = "Público Alvo";
     colunaPublicoAlvo.id = "2";
     let PublicoAlvoFilter = document.createElement("select");
     PublicoAlvoFilter.className =  "table-filter";
     let PublicoAlvoOptions = document.createElement("option");
     PublicoAlvoOptions.value = "all";
     PublicoAlvoFilter.appendChild(PublicoAlvoOptions);
     colunaPublicoAlvo.appendChild(PublicoAlvoFilter);
     newline.appendChild(colunaPublicoAlvo);
   
     let colunaConteudo = document.createElement("td");
     colunaConteudo.innerHTML = "Conteúdo";
     colunaConteudo.id = "3";
     let ConteudoFilter = document.createElement("select");
     ConteudoFilter.className =  "table-filter";
     let ConteudoOptions = document.createElement("option");
     ConteudoOptions.value = "all";
     ConteudoFilter.appendChild(ConteudoOptions);
     colunaConteudo.appendChild(ConteudoFilter);
     newline.appendChild(colunaConteudo);
   
     let colunaFerramenta = document.createElement("td");
     colunaFerramenta.innerHTML = "Ferramenta";
     colunaFerramenta.id = "4";
     let FerramentaFilter = document.createElement("select");
     FerramentaFilter.className =  "table-filter";
     let FerramentaOptions = document.createElement("option");
     FerramentaOptions.value = "all";
     FerramentaFilter.appendChild(FerramentaOptions);
     colunaFerramenta.appendChild(FerramentaFilter);
     newline.appendChild(colunaFerramenta);
   
     let colunaHabilidade = document.createElement("td");
     colunaHabilidade.innerHTML = "Habilidade";
     colunaHabilidade.id = "5";
     let HabilidadeFilter = document.createElement("select");
     HabilidadeFilter.className =  "table-filter";
     let HabilidadeOptions = document.createElement("option");
     HabilidadeOptions.value = "all";
     HabilidadeFilter.appendChild(HabilidadeOptions);
     colunaHabilidade.appendChild(HabilidadeFilter);
     newline.appendChild(colunaHabilidade);
   
     let colunaCaminhoDeAcesso = document.createElement("td");
     colunaCaminhoDeAcesso.innerHTML = "Caminho de Acesso";
     colunaCaminhoDeAcesso.id = "6";
     newline.appendChild(colunaCaminhoDeAcesso);
  
     header.appendChild(newline);
   
     return header;
  }
  
  function CreateTableLine(element){
    let newline = document.createElement("tr");
  
    let colunaTitulo = document.createElement("td");
    colunaTitulo.innerHTML = element.Titulo;
    newline.appendChild(colunaTitulo);
  
    let colunaPublicoAlvo = document.createElement("td");
    colunaPublicoAlvo.innerHTML = PublicoAlvoParse(element.PublicoAlvoId);
    newline.appendChild(colunaPublicoAlvo);
  
    let colunaConteudo = document.createElement("td");
    colunaConteudo.innerHTML = element.Conteudo;
    newline.appendChild(colunaConteudo);
  
    let colunaFerramenta = document.createElement("td");
    colunaFerramenta.innerHTML = FerramentaParse(element.FerramentaId);
    newline.appendChild(colunaFerramenta);
  
    let colunaHabilidade = document.createElement("td");
    colunaHabilidade.innerHTML = HabilidadeParse(element.HabilidadeId);
    newline.appendChild(colunaHabilidade);
  
    let colunaCaminhoDeAcesso = document.createElement("td");
    colunaCaminhoDeAcesso.innerHTML = '<a href="' + element.CaminhoDeAcesso + '"> Link de acesso</a>' ;
    newline.appendChild(colunaCaminhoDeAcesso);
  
    return newline;
  
  }
  
  function getValuesFromColumns() {
  
    var dictionary_unique_values = {}

    let allFilters = document.querySelectorAll(".table-filter")
    allFilters.forEach((filter_i) => {
        
        let col_index = filter_i.parentElement.getAttribute("id");
        const rows = document.querySelectorAll("table > tbody > tr")

        rows.forEach((row) => {
            let cell_value = row.querySelector("td:nth-child("+col_index+")").innerHTML;

            if (col_index in dictionary_unique_values) {

                if (dictionary_unique_values[col_index].includes(cell_value)) {

                } else {
                    dictionary_unique_values[col_index].push(cell_value)
                }

            } else {
                dictionary_unique_values[col_index] = new Array(cell_value)
            }
        });

        filter_i.addEventListener("change", filter_rows);
    });
     
    updateSelectOptions(dictionary_unique_values);

};

function updateSelectOptions(dictionary_unique_values) {
  let allFilters = document.querySelectorAll(".table-filter")

  allFilters.forEach((filter_i) => {
      let col_index = filter_i.parentElement.getAttribute('id')

      dictionary_unique_values[col_index].forEach((i) => {
          filter_i.innerHTML = filter_i.innerHTML + `\n<option value="${i}">${i}</option>`
      });

  });
};

function filter_rows() {
  let allFilters = document.querySelectorAll(".table-filter")
  var dictionary_filter_value = new Map();

  allFilters.forEach((filter_i) => {
      let col_index = filter_i.parentElement.getAttribute('id')
  
      let value = filter_i.value

      if (value != "all") {
          dictionary_filter_value[col_index] = value;  
      }
  });

  var dictionary_column_value = {};

  const rows = document.querySelectorAll("table tbody tr");
  rows.forEach((row) => {
      var display_row = true;

      allFilters.forEach((filter_i) => {
          let col_index = filter_i.parentElement.getAttribute('id')
          dictionary_column_value[col_index] = row.querySelector("td:nth-child(" + col_index+ ")").innerHTML
      })

      for(const key in dictionary_filter_value){
        let filter_value = dictionary_filter_value[key]
        let row_cell_value = dictionary_column_value[key]
        
        if (row_cell_value.indexOf(filter_value) == -1 && filter_value != "all") {
            display_row = false;
            break;
        }
      }

      if (display_row == true) {
          row.style.display = "table-row"

      } else {
          row.style.display = "none"

      }
  })
}

