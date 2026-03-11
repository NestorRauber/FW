let tabela = document.getElementsByTagName("tabela");

for(let i=0;i<tabela.length;i++){

    let tab = tabela[i];

    let linhas= tab.getAttribute("linha");
    let colunas= tab.getAttribute("coluna");

    let novaTabela= document.createElement("table");

    let colspanAttr= document.getElementsByTagName("expand");

    let matriz=[];

    for(let w=0; w<colspanAttr.length;w++){

        matriz.push([
            colspanAttr[w].getAttribute("linha"),
            colspanAttr[w].getAttribute("coluna"),
            colspanAttr[w].getAttribute("tamanho"),
            colspanAttr[w].getAttribute("tipo") // ALTERAÇÃO: agora guardamos também o "tipo" (linha ou coluna)
        ]);

    }

    let bordaAttr =  tab.getAttribute("borda");

    let vetBorda = bordaAttr.split(" ");

    novaTabela.style.setProperty('--cor-borda', vetBorda[2]);
    novaTabela.style.setProperty('--tipo-borda', vetBorda[1]);
    novaTabela.style.setProperty('--tamanho-borda', vetBorda[0]);



    for(let x=0;x<linhas;x++){

        let tr=document.createElement("tr");

        for(let y=0;y<colunas;y++){

            let td=document.createElement("td");

            // ALTERAÇÃO: antes existia apenas "span"
            // agora criamos duas variáveis separadas
            // uma para colspan (horizontal) e outra para rowspan (vertical)

            let colspan = 1;
            let rowspan = 1;


            for(let k =0; k<matriz.length;k++){

                if(matriz[k][0] == x && matriz[k][1]==y){

                    // ALTERAÇÃO: verificar qual tipo de expansão usar

                    if(matriz[k][3] == "coluna"){ 
                        // se o tipo for coluna → usamos colspan
                        colspan = matriz[k][2];
                    }

                    if(matriz[k][3] == "linha"){
                        // se o tipo for linha → usamos rowspan
                        rowspan = matriz[k][2];
                    }

                    break;

                }

            }


            // ALTERAÇÃO: aplicar colspan apenas se for maior que 1
            if(colspan > 1){
                td.setAttribute("colspan", colspan);
            }


            // ALTERAÇÃO: aplicar rowspan apenas se for maior que 1
            if(rowspan > 1){
                td.setAttribute("rowspan", rowspan);
            }


            // ALTERAÇÃO: agora pulamos colunas apenas no caso de colspan
            // porque rowspan não ocupa colunas extras
            y += colspan - 1;


            tr.appendChild(td);

        }

        novaTabela.appendChild(tr);

    }

    tab.appendChild(novaTabela);

}