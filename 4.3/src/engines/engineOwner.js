targetActive = "";
let targetInput = ""

function generator(def) {
   let mainOwner = document.querySelector("#mainOwner");
   let grid = document.querySelector("#grid");
   let template = document.querySelector("#template");
   let fragment = new DocumentFragment();
   for (key of Object.keys(def)) {
      let defDefault = {
         defInput: [],
         dataInteraction: {
            correct: 0,
            incorrect: 0,
         },
         defValueInput: def[key].defValueInput || false,
         changeContent: def[key].changeContent || false,
         sizeInput: def[key].sizeInput || false,
      };
      const clone = template.content.firstElementChild.cloneNode(true);
      const conteiner = clone.querySelector(".content_2");
      clone.setAttribute("data-ejercicio", key);
      clone.addEventListener("mouseenter", (e) => {
         targetActive = clone.dataset.ejercicio;
      });
      clone.addEventListener("mouseleave", (e) => {
         targetActive = "";
      });
      def[key] = { ...def[key], ...defDefault };
      fragment.appendChild(clone);
      add(key, conteiner, def[key].datadefault, grid);
      if (def[key].changeContent) {
         grid.appendChild(fragment);
      } else {
         mainOwner.appendChild(fragment);
      }
   }
}

function add(key, conteiner, iterator, grid) {
   if (iterator) {
      for (el of iterator) {
         if (Array.isArray(el)) {
            //Parrafo = 1
            if (el[0] == 1) {
               let div = document.createElement("div");

               let p = document.createElement("p");
               p.textContent = el[1];
               div.appendChild(p);
               div.className = "contenedor texto";
               p.className = "parrafo";
               conteiner.appendChild(p);
            }
            //subtitulo = 2
            if (el[0] == 2) {
               let div = document.createElement("div");
               let h5 = document.createElement("h5");
               h5.textContent = el[1];
               div.appendChild(h5);
               conteiner.appendChild(div);
               div.className = "contenedor";
               h5.className = "subtitulo";
            }
            //Subtitulo y parrafo  = 3
            if (el[0] == 3) {
               let div = document.createElement("div");
               let p = document.createElement("p");
               let h5 = document.createElement("h5");
               h5.textContent = el[1];
               p.textContent = el[2];
               div.appendChild(h5);
               div.appendChild(p);
               conteiner.appendChild(div);
               div.className = "contenedor textDouble";
               p.className = "parrafo margen-5";
               h5.className = "subtitulo margen-5";
            }
            //Board de la curvas
            if (el[0] == 4) {
               let padre = document.createElement("div");
               let hijo = document.createElement("div");
               conteiner.appendChild(padre);
               padre.appendChild(hijo);
               padre.className = "content_1";
               hijo.className = "defBoard jxgbox short-board";
               hijo.setAttribute("data-board", el[1]);
            }
            //Tableros
            if (el[0] == 5) {
               let ExprestionSort = [];
               let ResulExpressItem = [];

               //Contenedor
               let div = document.createElement("div");
               div.className =
                  "contenedor table-responsive reduce-table margen-bottom-50 margen-top-50";
               let table = document.createElement("table");
               table.className = "table table-bordered table-width ";
               let thead = document.createElement("thead");
               let tbody = document.createElement("tbody");

               //Botones
               let targetInput = "";
               //posicion del cursor en el input
               let targetStart = "";
               let targetEnd = "";
               let btn_content = document.createElement("div");
               let allButtons = document.createElement("div");
               allButtons.className = "content_1 allbuttons";
               btn_content.className = "content_1";

               let btn_check = document.createElement("button");
               let btn_reset = document.createElement("button");
               let btn_empty = document.createElement("button");
               let btn_setOf = document.createElement("button");
               let btn_infinity = document.createElement("button");
               let btn_ParenthesisRight = document.createElement("button");
               let btn_ParenthesisLeft = document.createElement("button");
               let btn_BracketsLeft = document.createElement("button");
               let btn_BracketsRight = document.createElement("button");
               btn_empty.setAttribute("data-text", "∅");
               btn_setOf.setAttribute("data-text", "∪");
               btn_infinity.setAttribute("data-text", "∞");
               btn_ParenthesisRight.setAttribute("data-text", ")");
               btn_ParenthesisLeft.setAttribute("data-text", "(");
               btn_BracketsLeft.setAttribute("data-text", "[");
               btn_BracketsRight.setAttribute("data-text", "]");
               btn_check.className = "check buttonPrimary button-marg buttonKey";
               btn_reset.className = "reset buttonSecundary button-marg buttonKey";
               btn_empty.className =
                  "empty buttonTertiary button-marg buttonTarget buttonKey";
               btn_setOf.className =
                  "setOf buttonTertiary button-marg buttonTarget buttonKey";
               btn_infinity.className =
                  "infiniteWrite buttonTertiary button-marg buttonTarget buttonKey";
               btn_ParenthesisRight.className =
                  "parenthesisRight buttonTertiary button-marg buttonTarget buttonKey";
               btn_ParenthesisLeft.className =
                  "parenthesisLeft buttonTertiary button-marg buttonTarget buttonKey";
               btn_BracketsLeft.className =
                  "bracketsLeft buttonTertiary button-marg buttonTarget buttonKey";
               btn_BracketsRight.className =
                  "bracketsRight buttonTertiary button-marg buttonTarget buttonKey";

               allButtons.appendChild(btn_ParenthesisLeft);
               allButtons.appendChild(btn_ParenthesisRight);
               allButtons.appendChild(btn_BracketsLeft);
               allButtons.appendChild(btn_BracketsRight);
               allButtons.appendChild(btn_setOf);
               allButtons.appendChild(btn_infinity);
               allButtons.appendChild(btn_empty);
               //btn_content.appendChild(allButtons);
               btn_content.appendChild(btn_reset);
               btn_content.appendChild(btn_check);

               //generadores de filas y columnas
               for (i = 0; i < el[1]; i++) {
                  let th = document.createElement("th");
                  th.setAttribute("scope", "row");
                  thead.appendChild(th);
               }

               for (i = 0; i < el[2]; i++) {
                  let tr = document.createElement("tr");
                  let th = document.createElement("th");
                  th.className = "media-th";
                  th.setAttribute("scope", "row");
                  tr.appendChild(th);
                  tbody.appendChild(tr);

                  for (inputFor = 0; inputFor < el[1] - 1; inputFor++) {
                     let td = document.createElement("td");
                     td.className = "center-td";
                     let input = document.createElement("input");
                     input.setAttribute("inputmode", "none");

                     if (el[1] > 3) {
                        input.classList.add("input-width");
                        table.classList.add("table-width");
                        div.className = "reduce-table";
                     }
                     input.style = "text-align:center";
                     input.classList.add("input-width-normalice");
                     def[key].defInput.push(input);

                     td.appendChild(input);
                     tr.appendChild(td);
                     input.addEventListener("click", () => {
                        targetInput = input;
                     });
                  }
               }
               for (item of Object.keys(thead.children)) {
                  thead.children[item].classList.add("item");
                  thead.children[item].textContent = el[3][item];
               }
               for (element of Object.keys(tbody.children)) {
                  tbody.children[element].children[0].classList.add("item");
                  tbody.children[element].children[0].textContent = el[4][element];
               }
               //Valor predefinido
               if (def[key].defValueInput) {
                  tbody.children[0].children[1].children[0].setAttribute(
                     "disabled",
                     "disabled"
                  );
                  tbody.children[0].children[2].children[0].setAttribute(
                     "disabled",
                     "disabled"
                  );
                  tbody.children[0].children[1].children[0].value =
                     def[key].defValueInput[0];
                  tbody.children[0].children[2].children[0].value =
                     def[key].defValueInput[1];
               }

               /* /\(-?[0-9],-?[0-9]\)[,;]\(-?[0-9],-?[0-9]\)/g */
               btn_check.addEventListener("click", () => {
                  def[key].dataInteraction.correct = 0;
                  def[key].dataInteraction.incorrect = 0;

                  if (def[key].defValueInput) {
                     for (item = 2; item < def[key].defInput.length; item++) {
                        const regex = /(\+∞)/g;
                        let ExpresRex = /\)[,y]\(/;
                        //let toLower = def[key].defInput[item].value.replace(new RegExp("[' ']", 'g'), "").replace(new RegExp(ExpresRex, 'g'), ");(").replace(regex, '∞').toLocaleLowerCase()
                        let toLower = def[key].defInput[item].value
                           .replace(new RegExp("[' ']", "g"), "")
                           .replace(regex, "∞")
                           .toLocaleLowerCase();
                        const separador =
                           toLower.match(/[∪]/g) !== null &&
                              toLower.match(/[;y]/g) !== null
                              ? false
                              : toLower.match(/[∪]/g) !== null &&
                                 toLower.match(/[;y]/g) !== null
                                 ? "∪"
                                 : ";";
                        //(?<=chau)hola
                        let oper = /[y;∪]|(?<=\)|\]),/g;
                        //console.log(toLower.match(oper));

                        if (
                           def[key].conditions[item].includes(
                              toLower.split(oper).sort().join(";")
                           )
                        ) {
                           def[key].defInput[item].classList.add("pass");
                           def[key].defInput[item].classList.remove("failed");
                           def[key].dataInteraction.correct += 1;
                        } else {
                           def[key].defInput[item].classList.remove("pass");
                           def[key].defInput[item].classList.add("failed");
                           def[key].dataInteraction.incorrect += 1;
                        }
                     }
                  } else {
                     for (item in def[key].conditions) {
                        //

                        const regex = /(\+∞)/g;
                        let ExpresRex = /\)[,y;]\(|\][,y;]\(|\)[,y;]\[|\][,y;]\[/;
                        let ExpressCondition = /[,y;]/;

                        let toLower = def[key].defInput[item].value
                           .replace(new RegExp("[' ']", "g"), "")
                           .replace(regex, "∞")
                           .toLocaleLowerCase();
                        if (ExpresRex.test(toLower)) {
                           let t1 = toLower.replace(
                              new RegExp(ExpresRex, "g"),
                              `${toLower[toLower.search(ExpresRex)]}${toLower[
                                 toLower.search(ExpresRex) + 1
                              ].replace(new RegExp(ExpressCondition, "g"), ";")}${toLower[toLower.search(ExpresRex) + 2]
                              }`
                           );

                           if (
                              def[key].conditions[item].includes(
                                 t1.split(";").sort().join(";")
                              )
                           ) {
                              def[key].defInput[item].classList.add("pass");
                              def[key].defInput[item].classList.remove("failed");
                              def[key].dataInteraction.correct += 1;
                           } else {
                              def[key].defInput[item].classList.remove("pass");
                              def[key].defInput[item].classList.add("failed");
                              def[key].dataInteraction.incorrect += 1;
                           }

                           //(-1,0],(1,0)

                           //console.log('Separador', def[key].defInput[item].value[def[key].defInput[item].value.search(ExpresRex) + 1])
                           //console.log('Expresion', def[key].defInput[item].value)
                           //console.log('replace', toLower.replace(new RegExp(ExpresRex, 'g'), `${toLower[toLower.search(ExpresRex)]}${toLower[toLower.search(ExpresRex) + 1].replace(new RegExp(ExpressCondition, 'g'), ';')}${toLower[toLower.search(ExpresRex) + 2]}`))
                        } else {
                           if (def[key].conditions[item].includes(toLower)) {
                              def[key].defInput[item].classList.add("pass");
                              def[key].defInput[item].classList.remove("failed");
                              def[key].dataInteraction.correct += 1;
                           } else {
                              def[key].defInput[item].classList.remove("pass");
                              def[key].defInput[item].classList.add("failed");
                              def[key].dataInteraction.incorrect += 1;
                           }
                        }
                     }
                  }

                  sendData(cleanDataJ());
               });

               btn_reset.addEventListener("click", () => {
                  if (def[key].defValueInput) {
                     for (
                        itemInput = 1;
                        itemInput < tbody.children.length;
                        itemInput++
                     ) {
                        for (
                           count = 2;
                           count < tbody.children[itemInput].children.length;
                           count++
                        ) {
                           for (
                              i = 1;
                              i < tbody.children[itemInput].children.length;
                              i++
                           ) {
                              tbody.children[itemInput].children[i].children[0].value =
                                 "";
                              tbody.children[itemInput].children[
                                 i
                              ].children[0].classList.remove("pass");
                              tbody.children[itemInput].children[
                                 i
                              ].children[0].classList.remove("failed");
                           }
                        }
                     }
                  } else {
                     for (element of Object.keys(tbody.children)) {
                        for (
                           itemInput = 1;
                           itemInput < tbody.children[element].children.length;
                           itemInput++
                        ) {
                           tbody.children[element].children[
                              itemInput
                           ].children[0].value = "";
                           tbody.children[element].children[
                              itemInput
                           ].children[0].classList.remove("pass");
                           tbody.children[element].children[
                              itemInput
                           ].children[0].classList.remove("failed");
                        }
                     }
                  }
               });

               window.addEventListener("click", (e) => {
                  if (e.target.tagName === "INPUT") {
                     targetInput = e.target;
                  }
               });

               allButtons.addEventListener("click", (e) => {
                  if (
                     e.target.classList.value.includes("buttonTarget") &&
                     targetInput != null
                  ) {
                     defAllBottons(e.target.dataset.text);
                     targetInput.focus();
                  }
               });

               function defAllBottons(buttons) {
                  targetStart = targetInput.selectionStart;
                  targetEnd = targetInput.selectionEnd;
                  if (targetInput) {
                     targetInput.setRangeText(buttons, targetStart, targetEnd, "end");
                  }
               }

               //insertando tablas y contenedores de boton al container principal
               table.appendChild(thead);
               table.appendChild(tbody);
               div.appendChild(table);
               div.appendChild(btn_content);

               conteiner.appendChild(div);
            }
            //Board_Double and tablet 2x6
            if (el[0] == 6) {
               let contenedor = document.createElement("div");
               let contentBoardTable = document.createElement("div");
               let contentBoard = document.createElement("div");
               let board_1 = document.createElement("div");
               let board_2 = document.createElement("div");

               let contentBoard_1 = document.createElement("div");
               let contentBoard_2 = document.createElement("div");
               let contentConexa = document.createElement("div");
               let contentDisconexa = document.createElement("div");
               let conexa = document.createElement("p");
               let disconexa = document.createElement("p");
               contentConexa.appendChild(conexa);
               contentDisconexa.appendChild(disconexa);
               conexa.className = "titulo";
               disconexa.className = "titulo";
               conexa.textContent = el[7];
               disconexa.textContent = el[8];
               contentBoard_1.className = "item reduce-table";
               contentBoard_2.className = "item reduce-table";
               contentBoard_1.appendChild(contentConexa);
               contentBoard_2.appendChild(contentDisconexa);
               contentBoard_1.appendChild(board_1);
               contentBoard_2.appendChild(board_2);

               contentBoardTable.classList.add("table-board");
               contentBoard.classList.add("contentBoard_Double");
               contentBoard.classList.add("margen-button");
               board_1.className = "defBoard jxgbox short-board board-item";
               board_1.setAttribute("data-board", el[5]);
               board_2.className = "defBoard jxgbox short-board";
               board_2.setAttribute("data-board", el[6]);

               contenedor.classList.add("contenedor");
               contentBoardTable.classList.add("table-board");
               let contentTable = document.createElement("div");
               contentTable.classList.add("contentTable");
               let table = document.createElement("table");
               table.className = "table table-bordered tablet3x6";
               let thead = document.createElement("thead");
               let tbody = document.createElement("tbody");
               table.appendChild(thead);
               table.appendChild(tbody);
               contentTable.appendChild(table);

               //Botones

               let targetInput = "";
               //posicion del cursor en el input
               let targetStart = "";
               let targetEnd = "";
               let btn_content = document.createElement("div");
               btn_content.className = "content_1";
               let btn_check = document.createElement("button");
               let btn_reset = document.createElement("button");
               let btn_empty = document.createElement("button");
               btn_empty.setAttribute("data-text", "∅");
               btn_check.className = "check buttonPrimary button-marg buttonKey";
               btn_reset.className = "reset buttonSecundary button-marg buttonKey";
               btn_empty.className = "empty buttonTertiary buttonKey";
               btn_content.appendChild(btn_reset);
               btn_content.appendChild(btn_check);
               //btn_content.appendChild(btn_empty)

               //generadores de filas y columnas
               for (i = 0; i < el[1]; i++) {
                  let th = document.createElement("th");
                  th.setAttribute("scope", "col");
                  thead.appendChild(th);
               }
               for (i = 0; i < el[2]; i++) {
                  let tr = document.createElement("tr");
                  let th = document.createElement("th");

                  th.setAttribute("scope", "row");
                  tr.appendChild(th);
                  tbody.appendChild(tr);

                  for (input = 0; input < el[1] - 1; input++) {
                     let td = document.createElement("td");
                     let input = document.createElement("input");
                     input.style = "text-align:center";
                     def[key].defInput.push(input);
                     td.appendChild(input);
                     tr.appendChild(td);
                     input.addEventListener("click", () => {
                        targetInput = input;
                     });
                  }
               }
               for (item of Object.keys(thead.children)) {
                  thead.children[item].className = "item";
                  thead.children[item].textContent = el[3][item];
               }
               for (element of Object.keys(tbody.children)) {
                  tbody.children[element].children[0].className = "item";
                  tbody.children[element].children[0].textContent = el[4][element];
               }
               btn_check.addEventListener("click", () => {
                  def[key].dataInteraction.correct = 0;
                  def[key].dataInteraction.incorrect = 0;

                  for (item in def[key].defInput) {
                     let toLower = def[key].defInput[item].value
                        .replace(new RegExp("[' ']", "g"), "")
                        .toLowerCase();
                     if (toLower === def[key].conditions[item][0]) {
                        def[key].defInput[item].classList.add("pass");
                        def[key].defInput[item].classList.remove("failed");

                        def[key].dataInteraction.correct += 1;
                     } else {
                        def[key].defInput[item].classList.remove("pass");
                        def[key].defInput[item].classList.add("failed");
                        def[key].dataInteraction.incorrect += 1;
                     }
                  }
                  sendData(cleanDataJ());
               });
               btn_reset.addEventListener("click", () => {
                  for (element of Object.keys(tbody.children)) {
                     for (
                        itemInput = 1;
                        itemInput < tbody.children[element].children.length;
                        itemInput++
                     ) {
                        tbody.children[element].children[itemInput].children[0].value =
                           "";
                        tbody.children[element].children[
                           itemInput
                        ].children[0].classList.remove("pass");
                        tbody.children[element].children[
                           itemInput
                        ].children[0].classList.remove("failed");
                     }
                  }
               });

               //añdiendo contenedores
               contentBoard.appendChild(contentBoard_1);
               contentBoard.appendChild(contentBoard_2);
               contenedor.appendChild(contentBoardTable);
               contentBoardTable.appendChild(contentBoard);
               contentBoardTable.appendChild(contentTable);
               contentTable.appendChild(btn_content);
               conteiner.appendChild(contenedor);
            }
            //Genera div con board y cada unno tiene un texto
            if (el[0] == 7) {
               //create elements
               let contenedor = document.createElement("div");
               let BoardContainer = document.createElement("div");
               let BoardPositive = document.createElement("div");
               let BoardNegative = document.createElement("div");
               let arrayDiv = [[], []];
               let contenedorBoardPositive = document.createElement("div");
               let contenedorBoardNegative = document.createElement("div");
               let p = document.createElement("p");
               let searchBoard = /board/gi;
               let elementEmpty = /[' ']/gi;

               if (el[1] > 0) {
                  for (i = 0; i < el[1]; i++) {
                     let contentText = document.createElement("div");
                     contentText.classList.add("contenedor");
                     contentText.classList.add("inputCenter");
                     contentText.classList.add("content_1");
                     contentText.classList.add(`div_${[i]}`);
                     contentText.classList.add("borderIndividual");
                     BoardPositive.appendChild(contentText);
                     arrayDiv[0].push(contentText);
                  }

                  for (i = 0; i < el[1]; i++) {
                     let contentText = document.createElement("div");
                     contentText.classList.add("contenedor");
                     contentText.classList.add("inputCenter");
                     contentText.classList.add("content_1");
                     contentText.classList.add("borderIndividual");
                     BoardNegative.appendChild(contentText);
                     contentText.classList.add(`div_${[i]}`);
                     arrayDiv[1].push(contentText);
                  }
               }

               if (el[1] > 3) {
                  if (searchBoard.test(el[2][1])) {
                     //Parte Positiva del cuadro del baord
                     arrayDiv[0][0].textContent = el[2][0];
                     arrayDiv[0][0].classList.remove("borderIndividual");
                     arrayDiv[0][0].classList.add("bold-example");
                     contenedorBoardPositive.className = "defBoard short-board nota";
                     contenedorBoardPositive.setAttribute("data-board", el[2][1]);
                     arrayDiv[0][1].appendChild(contenedorBoardPositive);
                     arrayDiv[0][1].classList.remove("borderIndividual");
                     arrayDiv[0][2] == null
                        ? arrayDiv[0][2].classList.remove("borderIndividual")
                        : (arrayDiv[0][2].textContent = el[2][2]);
                     arrayDiv[0][3] == null
                        ? arrayDiv[0][3].classList.remove("borderIndividual")
                        : (arrayDiv[0][3].textContent = el[2][3]);
                     arrayDiv[0][4] == null
                        ? arrayDiv[0][4].classList.remove("borderIndividual")
                        : (arrayDiv[0][4].textContent = el[2][4]);

                     //Parte Negativa del cuadro del baord
                     arrayDiv[1][0].textContent = el[3][0];
                     arrayDiv[1][0].classList.remove("borderIndividual");
                     arrayDiv[1][0].classList.add("bold-example");
                     contenedorBoardNegative.className = "defBoard short-board nota";
                     contenedorBoardNegative.setAttribute("data-board", el[3][1]);
                     arrayDiv[1][1].appendChild(contenedorBoardNegative);
                     arrayDiv[1][1].classList.remove("borderIndividual");
                     arrayDiv[1][2] == undefined
                        ? console.log("no hay nada aqui")
                        : (arrayDiv[1][2].textContent = el[3][2]);
                     arrayDiv[1][3] == undefined
                        ? console.log("no hay nada aqui")
                        : (arrayDiv[1][3].textContent = el[3][3]);
                     arrayDiv[1][4] == undefined
                        ? console.log("no hay nada aqui")
                        : (arrayDiv[1][4].textContent = el[3][4]);
                  } else {
                     //Parte Positiva del cuadro del baord
                     arrayDiv[0][0].textContent = el[2][0];
                     arrayDiv[0][0].classList.add("bold-example");
                     arrayDiv[0][1].textContent = el[2][1];
                     contenedorBoardPositive.className = "defBoard short-board nota";
                     arrayDiv[0][2].appendChild(contenedorBoardPositive);
                     arrayDiv[0][2].classList.add("content_1");
                     contenedorBoardPositive.setAttribute("data-board", el[2][2]);
                     arrayDiv[0][3].textContent = el[2][3];

                     //Parte Negativa del cuadro del baord
                     arrayDiv[1][0].textContent = el[3][0];
                     arrayDiv[1][0].classList.add("bold-example");
                     arrayDiv[1][1].textContent = el[3][1];
                     contenedorBoardNegative.className = "defBoard short-board nota";
                     arrayDiv[1][2].appendChild(contenedorBoardNegative);
                     arrayDiv[1][2].classList.add("content_1");
                     contenedorBoardNegative.setAttribute("data-board", el[3][2]);
                     arrayDiv[1][3].textContent = el[3][3];
                  }
               } else {
                  if (searchBoard.test(el[2][1])) {
                     //Parte Positiva del cuadro del baord
                     arrayDiv[0][0].textContent = el[2][0];
                     arrayDiv[0][0].classList.remove("borderIndividual");
                     arrayDiv[0][0].classList.add("bold-example");
                     contenedorBoardPositive.className = "defBoard short-board nota";
                     contenedorBoardPositive.setAttribute("data-board", el[2][1]);
                     arrayDiv[0][1].appendChild(contenedorBoardPositive);
                     arrayDiv[0][1].classList.remove("borderIndividual");
                     arrayDiv[0][2].textContent = el[2][2];

                     //Parte Negativa del cuadro del baord
                     arrayDiv[1][0].textContent = el[3][0];
                     arrayDiv[1][0].classList.remove("borderIndividual");
                     arrayDiv[1][0].classList.add("bold-example");
                     contenedorBoardNegative.className = "defBoard short-board nota";
                     contenedorBoardNegative.setAttribute("data-board", el[3][1]);
                     arrayDiv[1][1].appendChild(contenedorBoardNegative);
                     arrayDiv[1][1].classList.remove("borderIndividual");
                     arrayDiv[1][2].textContent = el[3][2];
                  } else {
                     //Parte Positiva del cuadro del baord
                     arrayDiv[0][0].textContent = el[2][0];
                     arrayDiv[0][0].classList.add("bold-example");
                     arrayDiv[0][1].textContent = el[2][1];
                     contenedorBoardPositive.className = "defBoard short-board nota";
                     arrayDiv[0][2].appendChild(contenedorBoardPositive);
                     arrayDiv[0][2].classList.add("content_1");
                     contenedorBoardPositive.setAttribute("data-board", el[2][2]);
                     arrayDiv[0][3].textContent = el[2][3];

                     //Parte Negativa del cuadro del baord
                     arrayDiv[1][0].textContent = el[3][0];
                     arrayDiv[1][0].classList.add("bold-example");
                     arrayDiv[1][1].textContent = el[3][1];
                     contenedorBoardNegative.className = "defBoard short-board nota";
                     arrayDiv[1][2].appendChild(contenedorBoardNegative);
                     arrayDiv[1][2].classList.add("content_1");
                     contenedorBoardNegative.setAttribute("data-board", el[3][2]);
                     arrayDiv[1][3].textContent = el[3][3];
                  }
               }

               //adding style in the elements
               contenedor.classList.add("contenedor");
               BoardContainer.classList.add("contentDoubleBaord");
               BoardPositive.classList.add("sizeBoardDouble");
               BoardNegative.classList.add("sizeBoardDouble");

               BoardContainer.appendChild(BoardPositive);
               BoardContainer.appendChild(BoardNegative);
               contenedor.appendChild(BoardContainer);
               conteiner.appendChild(contenedor);
            }
            //Genera los 6 ejercicios del principio de pagina mas sus curvas con titulos
            if (el[0] == 8) {
               let content = document.createElement("div");
               let contentArtefact = document.createElement("div");
               let arrayDivBoard = [];
               let arraDivText = [];
               if (el[1] > 0) {
                  for (i = 0; i < el[1]; i++) {
                     let contentExampleText = document.createElement("div");
                     let example = document.createElement("div");
                     let exampleText = document.createElement("div");
                     contentExampleText.appendChild(exampleText);
                     contentExampleText.appendChild(example);
                     exampleText.classList.add("bold-example");
                     contentArtefact.appendChild(contentExampleText);
                     contentExampleText.className = "artefact";
                     example.className = "defBoard test short-board margen-5";
                     example.setAttribute("data-board", el[3][i]);
                     arrayDivBoard.push(contentExampleText);

                     for (text = 0; text < el[2]; text++) {
                        let span = document.createElement("span");
                        span.textContent = el[4][i][text];
                        arraDivText.push(span);
                        exampleText.appendChild(span);
                     }
                  }
               }
               content.classList.add("contenedorGrid");
               contentArtefact.classList.add("contenTest");
               content.appendChild(contentArtefact);
               conteiner.appendChild(content);

               /* for(i = 0; i < el[1]; i++){
                 let contentExampleText = document.createElement('div');
                 let example = document.createElement('div');
                 let exampleText = document.createElement('div');
                 contentExampleText.appendChild(exampleText);
                 contentExampleText.appendChild(example);
                 contentArtefact.appendChild(contentExampleText);
                 exampleText.classList.add('bold-example');
                 example.className = 'defBoard test short-board margen-5'; 
                 example.setAttribute('data-board',el[3][i]);
                 arrayDivBoard.push(contentExampleText);
                 for(text = 0; text < el[2]; text++){
                   let span = document.createElement('span');
                   span.textContent = el[4][i][text];
                   arraDivText.push(span);
                   exampleText.appendChild(span);
                   
                 }
               }
               content.classList.add('contenedorGrid');
               contentArtefact.classList.add('contenTest');
               content.appendChild(contentArtefact); 
               conteiner.appendChild(content); */
            }
            if (el[0] == 9) {
               let regex = /(∞\+|\+∞)/g;
               let searchNum = /{([1-9]+|[1-9]+[.,][1-9]+)}/gi; //  /{(\d+|\d+[.,]\d+)}/gi
               let searchBoard = /board/gi;
               let itemDivText = [];
               let itemInput = [];
               let targetInput = "";
               let targetBox = "";

               if (el[1] > 0) {
                  let contenedorGrid = document.createElement("div");

                  for (container = 0; container < el[1]; container++) {
                     let box = document.createElement("div");
                     box.classList.add("contentArtefact", "sizeContenedor");
                     box.setAttribute("data-content", `${container}`);
                     itemDivText.push([container]);
                     itemInput.push([]);

                     if (el[2] > 0) {
                        for (div = 0; div < el[2]; div++) {
                           let contenedorText = document.createElement("div");
                           contenedorText.setAttribute("data-text", `${div}`);
                           contenedorText.classList.add("divOrdenate");
                           itemDivText[container][div] = contenedorText;
                           box.appendChild(contenedorText);

                           if (el[4] === true) {
                              if (el[5].hasOwnProperty("shortInputText")) {
                                 box.classList.remove("sizeContenedor");

                                 for (
                                    count = 0;
                                    count < el[5].shortInputText.countInput;
                                    count++
                                 ) {
                                    let divC = document.createElement("div");
                                    divC.classList.add("divAlignDouble");
                                    divC.style = "margin:10px ";

                                    if (count == 0) {
                                       if (el[5].shortInputText.item.at(0) == "p") {
                                          console.log(el[3][container][div][0]);
                                          let p = document.createElement("p");
                                          p.textContent = el[3][container][div][0][0];
                                          p.style = "margin:0";
                                          divC.appendChild(p);
                                       }
                                       if (el[5].shortInputText.item.at(1) == true) {
                                          let input = document.createElement("input");
                                          input.classList.add(
                                             "inputCenter",
                                             "sizeInput-Default"
                                          );
                                          input.style.height = "28px";
                                          divC.appendChild(input);
                                          input.addEventListener("click", (e) => {
                                             targetInput = e.target;
                                          });
                                          itemInput[container].push(input);
                                          if (el[5].hasOwnProperty("widthInput")) {
                                             input.classList.remove("sizeInput-Default");
                                             input.style.width = el[5].widthInput;
                                          }
                                       }
                                       if (el[5].shortInputText.item.at(-1) == "p") {
                                          let p = document.createElement("p");
                                          p.textContent = el[3][container][div][0][2];
                                          p.style = "margin:0";
                                          divC.appendChild(p);
                                       }

                                       itemDivText[container][div].appendChild(divC);
                                    }
                                    if (count == 1) {
                                       if (el[5].shortInputText.item.at(0) == "p") {
                                          console.log(el[3][container][div][0]);
                                          let p = document.createElement("p");
                                          p.textContent = el[3][container][div][1][0];
                                          p.style = "margin:0";
                                          divC.appendChild(p);
                                       }
                                       if (el[5].shortInputText.item.at(1) == true) {
                                          let input = document.createElement("input");
                                          input.classList.add(
                                             "inputCenter",
                                             "sizeInput-Default"
                                          );
                                          input.style.height = "28px";
                                          divC.appendChild(input);
                                          input.addEventListener("click", (e) => {
                                             targetInput = e.target;
                                          });
                                          itemInput[container].push(input);
                                          if (el[5].hasOwnProperty("widthInput")) {
                                             input.classList.remove("sizeInput-Default");
                                             input.style.width = el[5].widthInput;
                                          }
                                       }
                                       if (el[5].shortInputText.item.at(-1) == "p") {
                                          let p = document.createElement("p");
                                          p.textContent = el[3][container][div][1][2];
                                          p.style = "margin:0";
                                          divC.appendChild(p);
                                       }

                                       itemDivText[container][div].appendChild(divC);
                                    }
                                 }
                              } else {
                                 if (el[5].hasOwnProperty("doubleLayel")) {
                                    box.classList.remove("sizeContenedor");

                                    for (
                                       count = 0;
                                       count < el[5].doubleLayel.inputCount;
                                       count++
                                    ) {
                                       let divC = document.createElement("div");
                                       divC.classList.add("divAlignDouble");
                                       divC.style = "margin:10px ";

                                       let input = document.createElement("input");
                                       let p = document.createElement("p");
                                       input.classList.add(
                                          "inputCenter",
                                          "sizeInput-Default"
                                       );
                                       input.style.height = "28px";

                                       if (el[5].hasOwnProperty("widthInput")) {
                                          input.classList.remove("sizeInput-Default");
                                          input.style.width = el[5].widthInput;
                                       } else {
                                          //console.log('no')
                                       }
                                       p.textContent = el[3][container][div][count];
                                       p.style = "margin:0";
                                       divC.appendChild(p);
                                       divC.appendChild(input);
                                       itemDivText[container][div].appendChild(divC);

                                       input.addEventListener("click", (e) => {
                                          targetInput = e.target;
                                       });
                                       itemInput[container].push(input);
                                    }
                                 } else {
                                    box.classList.remove("sizeContenedor");
                                    let divC = document.createElement("div");
                                    let order = document.createElement("div");
                                    order.classList.add("divAlignSingle");
                                    divC.style = "margin:10px ";
                                    let p = document.createElement("p");
                                    p.style = "margin:0";
                                    p.textContent = el[3][container][div];
                                    let input = document.createElement("input");
                                    input.classList.add("inputCenter");
                                    if (el[5].nullLittle) {
                                       divC.classList.add("orderLitte");
                                    } else {
                                       divC.classList.add("orderLarge");
                                    }
                                    if (el[5].hasOwnProperty("sizeInput")) {
                                       input.setAttribute("maxlength", el[5].sizeInput);
                                       input.classList.add("sizeInput-Default");
                                    } else {
                                       input.classList.add("input-reduce");
                                       input.setAttribute("maxlength", 2);
                                    }
                                    if (!p.textContent.match(searchBoard)) {
                                       divC.appendChild(p);
                                       divC.appendChild(input);
                                       order.appendChild(divC);
                                       itemDivText[container][div].appendChild(order);
                                       input.addEventListener("click", (e) => {
                                          targetInput = e.target;
                                       });
                                       itemInput[container].push(input);
                                    } else {
                                       divC.appendChild(p);
                                       order.appendChild(divC);
                                       itemDivText[container][div].appendChild(order);
                                       itemDivText.map((content) => {
                                          let result = content.findIndex((item) =>
                                             item.textContent.match(searchBoard)
                                          );

                                          if (content[result]) {
                                             content[result].setAttribute(
                                                "data-board",
                                                content[result].textContent
                                             );
                                             content[result].classList.add(
                                                "defBoard",
                                                "short-board",
                                                "board-item"
                                             );
                                             content[result].classList.remove("textValInput");
                                          } else {
                                             content.length !== 0 ? false : false;
                                          }
                                       });
                                    }
                                 }
                              }
                           } else {
                              box.classList.remove("sizeContenedor");
                              let divC = document.createElement("div");
                              let order = document.createElement("div");
                              order.classList.add("divAlignSingle");
                              divC.style = "margin:10px ";
                              let p = document.createElement("p");
                              p.style = "margin:0";
                              p.textContent = el[3][container][div];
                              divC.classList.add("itemContenFlex");
                              divC.appendChild(p);
                              order.appendChild(divC);
                              itemDivText[container][div].appendChild(order);
                              console.warn("Se han desabilitado los inputs");
                              itemDivText.map((content) => {
                                 let result = content.findIndex((item) =>
                                    item.textContent.match(searchBoard)
                                 );

                                 if (content[result]) {
                                    content[result].setAttribute(
                                       "data-board",
                                       content[result].textContent
                                    );
                                    content[result].classList.add(
                                       "defBoard",
                                       "short-board",
                                       "board-item"
                                    );
                                    content[result].classList.remove("textValInput");
                                 } else {
                                    content.length !== 0 ? false : false;
                                 }
                              });
                           }

                           contenedorText.addEventListener("click", (e) => { });
                        }
                     }
                     box.addEventListener("mouseenter", () => {
                        targetBox = box.dataset.content;
                     });

                     if (el[4] === true) {
                        let divControlled = document.createElement("div");
                        divControlled.classList.add(
                           "content_1",
                           "allbuttons",
                           "border-dark-top"
                        );
                        let btn_check = document.createElement("button");
                        let btn_reset = document.createElement("button");
                        btn_check.className =
                           "check buttonPrimary button-marg buttonKey";
                        btn_reset.className =
                           "reset buttonSecundary button-marg buttonKey";
                        divControlled.appendChild(btn_reset);
                        divControlled.appendChild(btn_check);
                        box.appendChild(divControlled);

                        btn_check.addEventListener("click", () => {
                           let counterInput = [];
                           let defaultInputValue =
                              def[targetActive].datadefault[0][5].conditions[targetBox];

                           def[key].dataInteraction.correct = 0;
                           def[key].dataInteraction.incorrect = 0;

                           for (
                              inputVal = 0;
                              inputVal < defaultInputValue.length;
                              inputVal++
                           ) {
                              itemInput[targetBox][inputVal].setAttribute(
                                 "id",
                                 `input_${inputVal + 1}`
                              );
                              counterInput.push(itemInput[targetBox][inputVal]);
                              let valNum = itemInput[targetBox][inputVal].value
                                 .replace(new RegExp("[' ']", "g"), "")
                                 .replace(regex, "∞")
                                 .toLocaleLowerCase();
                              let searNN = /\[(\d+[,]\d+)\]/gi;
                              let braket = /[\[\]]/gi;

                              if (defaultInputValue[inputVal].includes(null)) {
                                 if (
                                    valNum.match(searNN) !== null &&
                                    valNum
                                       .match(searNN)[0]
                                       .replace(new RegExp(braket), "")
                                       .split(",")
                                 ) {
                                    let nnResult = valNum
                                       .match(searNN)[0]
                                       .replace(new RegExp(braket), "")
                                       .split(",");
                                    if (nnResult[0] === nnResult[1]) {
                                       itemInput[targetBox][inputVal].classList.remove(
                                          "failed"
                                       );
                                       itemInput[targetBox][inputVal].classList.add("pass");
                                       def[key].dataInteraction.correct += 1;
                                    } else {
                                       itemInput[targetBox][inputVal].classList.remove(
                                          "pass"
                                       );
                                       itemInput[targetBox][inputVal].classList.add(
                                          "failed"
                                       );
                                       def[key].dataInteraction.incorrect += 1;
                                    }
                                 } else {
                                    if (valNum.search(searchNum) !== -1) {
                                       itemInput[targetBox][inputVal].classList.remove(
                                          "failed"
                                       );
                                       itemInput[targetBox][inputVal].classList.add("pass");
                                       def[key].dataInteraction.correct += 1;
                                    } else {
                                       itemInput[targetBox][inputVal].classList.remove(
                                          "pass"
                                       );
                                       itemInput[targetBox][inputVal].classList.add(
                                          "failed"
                                       );
                                       def[key].dataInteraction.incorrect += 1;
                                    }
                                 }
                              } else {
                                 const regex = /(\+∞)/g;
                                 let ExpresRex = /\)[,y]\(/;
                                 let toLower = itemInput[targetBox][inputVal].value
                                    .replace(new RegExp("[' ']", "g"), "")
                                    .replace(regex, "∞")
                                    .toLocaleLowerCase();
                                 const separador =
                                    toLower.match(/[∪]/g) !== null &&
                                       toLower.match(/[;y]/g) !== null
                                       ? false
                                       : toLower.match(/[∪]/g) !== null &&
                                          toLower.match(/[;y]/g) !== null
                                          ? "∪"
                                          : ";";
                                 let oper = /[y;]|(?<=\)|\]),/g;
                                 //validation anterior itemInput[targetBox][inputVal].value.replace(new RegExp("[' ']", "g"), "").replace(regex, "∞").replace(searchNum, "").toLocaleLowerCase())
                                 if (
                                    defaultInputValue[inputVal].includes(
                                       toLower.split(oper).sort().join(";")
                                    )
                                 ) {
                                    itemInput[targetBox][inputVal].classList.remove(
                                       "failed"
                                    );
                                    itemInput[targetBox][inputVal].classList.add("pass");
                                    def[key].dataInteraction.correct += 1;
                                 } else {
                                    itemInput[targetBox][inputVal].classList.remove("pass");
                                    itemInput[targetBox][inputVal].classList.add("failed");
                                    def[key].dataInteraction.incorrect += 1;
                                 }
                              }
                           }

                           sendData(cleanDataJ(counterInput));
                        });

                        btn_reset.addEventListener("click", () => {
                           itemInput[targetBox].map((el) => {
                              el.classList.remove("pass", "failed", "borderNone");
                              el.value = "";
                           });
                        });
                     } else {
                        console.warn(
                           `Se han desabilitado los botones del contenedor ${container}`
                        );
                     }
                     conteiner.appendChild(box);
                  }
               }
            }
            //Genera los 3 ejercicios del principio de pagina mas sus curvas validadas
         } else {
            let fragment = new DocumentFragment();
            let mainOwner = document.querySelector("#mainOwner");


            //recomendaria usar un switch
            switch (el.type) {
               case 10: // en caso de ser 10 agregara la cantidad de boards con sus correspondientes dataset
                  let contentArtiacts = "";
                  el.contents.forEach((element) => {
                     contentArtiacts += `
                     <div class='jxgbox fixed-content'>
                     ${element.childAfter ?
                           `<div class="${element.childAfter.class
                           }" data-artifact ='${element.childAfter.dataSet.artifact ?? ""
                           }' data-board ='${element.childAfter.dataSet.board ?? ""}'> 
                        </div>`: ''
                        }
                     <div class="${el.classGlobal
                        }" data-artifact ='${element.dataSet.artifact ?? ""
                        }' data-board ='${element.dataSet.board ?? ""}'> 
                     </div>
                     </div>`;
                  });
                  const templateString = `<div class="contenedorGrid">
         <div class="d-flex flex-wrap justify-content-center">
            ${contentArtiacts}
         </div>
         </div>`;
                  conteiner.insertAdjacentHTML("beforeend", templateString);
                  break;
                  case 11:

                  let globalArtifactContainer = document.querySelector(
                    "#globalContainer"
                  );
                  
                     const definition = el
                     const mainContainer = document.querySelector(el.parent);
                     totalClone = generateQuestion(definition,false);
                     fragment.appendChild(totalClone)
                     mainContainer.appendChild(fragment)
                //     globalArtifactContainer.appendChild(mainContainer)
         
              //    mainOwner.appendChild(fragment);  
                   break;
                   case 12:
                     

                     el.contents.forEach((definition)=>{      
                       let totalClone = generateCard(definition,el)
                       fragment.appendChild(totalClone)
                     })
                     mainOwner.appendChild(fragment);  
                         break;
                   case 13: 
                  totalClone =  generateTable(el)
                  tableContainer = document.querySelector("#contenedorTablass")
         
                 default:
                   break;
            }
         }

  
      }

      allMyInputs =document.querySelectorAll("math-field")
  //    console.log("AAA",allMyInputs)


allMyInputs.forEach(element => {
   
   const optionsKeyboard = getKeyboardMath (window.screen.width)
   element.setOptions({
      "customVirtualKeyboardLayers": optionsKeyboard[0],
      "customVirtualKeyboards": optionsKeyboard[1],
      "virtualKeyboards": optionsKeyboard[2],
     
    });


});



   } else {
      return false;
   }
}
function generateCards(template, element) {
   let carcdConteiner = document.querySelector("#cardCol");
   const containerClone = carcdConteiner.content
      .querySelector("div")
      .cloneNode(true);

   let NEWcontentArtiacts = "";
   const clone = template.content.querySelector(".card").cloneNode(true);
   clone.setAttribute("artifact", element.dataSet.board);
   const cardBodyContainer = clone.querySelector(".card-body");
   const cardHeadContainer = clone.querySelector(".card-header");
   const cardFooterContainer = clone.querySelector(".card-footer");
   NEWcontentArtiacts += `<div class="${el.classGlobal} d-flex justify-content-center" data-artifact ='${element.dataSet.artifact ?? ""
      }' data-board ='${element.dataSet.board ?? ""}' style="width:100% min-width:280px"> </div>`;
   console.log(NEWcontentArtiacts);
   const templateString1 = `<div class="contenedorGrid ">
                            <div class="d-flex flex-wrap justify-content-center" style="min-width:280px !important; width:100%">
                               ${NEWcontentArtiacts}
                            </div>
                            </div>`;
   cardBodyContainer.insertAdjacentHTML("beforeend", templateString1);

   containerClone.appendChild(clone);
   //   cardFooterContainer.insertAdjacentHTML("beforeend", "");

   return containerClone;
}
function cleanDataJ(countInput_9) {
   let result = {};
   result.elementArtifact = { inputValue: {} };
   if (def[targetActive].defInput.length == 0) {
      Object.values(countInput_9).map((element, index) => {
         result.elementArtifact.inputValue[element.id] = element.value;
      });
   } else {
      Object.values(def[targetActive].defInput).map((element, index) => {
         element.setAttribute("id", `input_${index + 1}`);
         result.elementArtifact.inputValue[element.id] = element.value;
      });
   }
   result.typeArtifact = "Standard";
   result.artifact = Number(targetActive.split("_").at(-1));
   result.results = def[targetActive].dataInteraction;

   return result;
}
function cleanDataQ(artefacto) {

console.log(artefacto)
let result = {};
if (artefacto != null) {
console.log('cumple esta condicion');

result.typeArtifact = "Standard";
result.artifact  = Number(targetInput.split("_").at(-1));
result.results = artefacto.dataInteraction;
return result;
}
else{
    console.log("verificar por que se llama dos veces");

}
}






function generateQuestion(definition,isIndividual,nodeCollection=null){
  
   const globalTemplate = document.querySelector("#globalTemplate");
   const mainContainer = document.querySelector(el.parent);
 
   let fragment = new DocumentFragment();
   let totalClone ;
   if (isIndividual === true){
 
     if (definition.type === 0) {
       if(definition.text[1]){
         p = document.createElement("math-field")
         p.setAttribute("read-only","true")
         p.classList.add("m-auto")
         p.setAttribute("style","width:fit-content")
       }
       else{
          p = document.createElement("p")
 
       }
 
        p.textContent = definition.text[0]
       return p
     }
 
 
     if (definition.type === 1) {
       totalClone = generateRadio(definition,true);
       return totalClone
     }
     if (definition.type === 2) {
       totalClone = generateSelect(definition,true);
       return totalClone
     }
     if (definition.type === 3) {
       totalClone = generateInput(definition,true);
       return totalClone
     }
   }
   else{
      console.log("se está ejecutando esta condición")
       for (const [key,value] of Object.entries(definition.contents)) {
       templateClone = globalTemplate.content.firstElementChild.cloneNode(true);
       templateClone.setAttribute("artifact", key);
      Object.values(value.questions).map((question, index) =>  {
    
       if (definition.type === 0) {
         totalClone = definition.text
        // console.log(totalClone)
         return totalClone
       }
    
       if (question.type === 1) {
       question.artifact = `${key}${index}`
       totalClone = generateRadio(question,false,key);
       value.allinputs.push(totalClone)
 
     }
     if (question.type === 2) {
 
       totalClone = generateSelect(question,false);
       value.allinputs.push(totalClone)
 
       fragment.appendChild(totalClone)
       
     }
     if (question.type === 3) {
       totalClone = generateInput(question,false);
       //console.log("input", totalClone)
       value.allinputs.push(totalClone)
 
     fragment.appendChild(totalClone)
     }
    // console.log(totalClone)
     fragment.appendChild(totalClone)
       }
 
     )
    
     if(definition.parentBoard){
       
 
     }
     else{
       if(mainContainer){
         templateClone.querySelector("#content").appendChild(fragment)
         mainContainer.appendChild(templateClone)
         //mainOwner.appendChild(mainContainer)
       }
      else
      {
       mainOwner.appendChild(fragment);
     }
     }
     







     templateClone.addEventListener("click",(e)=>{
       if(e.target.classList.contains("check")){
       validation(definition.contents[key])
         }
         if(e.target.classList.contains("reset")){
           reset(definition.contents[key])
           }    
       })
   
     }
     templateClone.addEventListener("copy",(e)=>{
      removeDelimitersFromCopiedText(e)

     })
 
 
     return fragment
   }
   
 }
function generateTable(definition){
   const parentClone =document.querySelector(`${definition.parent}`)
   const tableTemplate = document.querySelector("#tableTemplate")
   const clone = tableTemplate.content.firstElementChild.cloneNode(true);
   let defincion;
   //tablas interactuables
   const globalTemplate = document.querySelector("#globalTemplate");
   templateClone = globalTemplate.content.firstElementChild.cloneNode(true);
 //se crea la tabla
   for (let key in definition.contents){
   templateClone.setAttribute("artifact", key);
   let nodeCollection =  definition.contents[key].allinputs
     table = clone
      table.classList.add("table","table-bordered")
      const thead = document.createElement('thead');
      table.appendChild(thead);
      const headerRow = document.createElement('tr');
      thead.appendChild(headerRow);
      if (definition.contents[key].hasOwnProperty('header')){ 
        let header =definition.contents[key].header
        header.forEach(element => {
          const headerCell1 = document.createElement('th');
          headerCell1.classList.add("text-center","align-middle")
 
          const headerCellText1 = document.createTextNode(element);
          headerCell1.appendChild(headerCellText1);
          headerRow.appendChild(headerCell1);
        });
        const tbody = document.createElement('tbody');
        table.appendChild(tbody);
        for (let i = 0; i < definition.contents[key].cells.length; i++) {
          const contentRow = document.createElement('tr');
          tbody.appendChild(contentRow);
          for (let j = 0; j < definition.contents[key].cells[i].length; j++) {
            const contentCell = document.createElement('td');
            contentCell.setAttribute("style","width:200px; height:1px")
            contentCell.classList.add("text-center","align-middle")
 
           data =  definition.contents[key].cells[i][j].artifact=`${key}${i}${j}`

            let node =  generateQuestion(definition.contents[key].cells[i][j],true,nodeCollection)
            defincion =  definition.contents[key].cells[i][j].type
 
            if(defincion === 0){

            }else{
               definition.contents[key].allinputs.push(node)
            }
 
 
       // 
        
         contentCell.appendChild(node)  
         contentRow.appendChild(contentCell);
          }
        }
 
        
        if (definition.interactive){
         templateClone.querySelector("#content").appendChild(table)
        }
        else{
         template
         templateClone.querySelector("#content").appendChild(table)
         let check = templateClone.querySelector(".check")
         let reset = templateClone.querySelector(".reset")
         check.remove();
         reset.remove();
         
        }
 
 templateClone.addEventListener("click",(e)=>{
   if(e.target.classList.contains("check")){
     validation(definition.contents[key])
     }
     if(e.target.classList.contains("reset")){
     reset(definition.contents[key])
       }
   })
 if (parentClone){
 
     parentClone.appendChild(templateClone)
 
   
   return  (parentClone) 
 
 }else{
   //parentClone.appendChild(templateClone)
 return  (templateClone) 
 
 }
      }
      else{
        console.log("a")
      }
 
    }
  
 }
function generateCard(definition,el){
   let NEWcontentArtiacts = "";
   let template = document.querySelector("#card-template");
   let carcdConteiner = document.querySelector("#cardCol");
   
   const containerClone = carcdConteiner.content
   .querySelector("div")
   .cloneNode(true);
   
   
   const clone = template.content.firstElementChild.cloneNode(true);
   const cardBodyContainer = clone.querySelector(".card-body");
   const cardHeadContainer = clone.querySelector(".card-header");
   const cardFooterContainer = clone.querySelector(".card-footer");
   const globalTemplate = document.querySelector("#globalTemplate");
   templateClone = globalTemplate.content.firstElementChild.cloneNode(true);
   clone.setAttribute("artifact", definition.parentBoard);
   let nodo = generateQuestion(definition,false)
   templateClone.querySelector("#content").appendChild(nodo)
   cardFooterContainer.appendChild(templateClone)
   
   NEWcontentArtiacts += `<div class="${el.classGlobal} d-flex justify-content-center" data-artifact ='${
     definition.artifact ?? ""
   }' data-board ='${el.board ?? ""}' style="width:100%"> </div>`;
   const templateString1 = `<div class="contenedorGrid">
                             <div class="d-flex flex-wrap justify-content-center" style="width:100%">
                                ${NEWcontentArtiacts}
                             </div>
                             </div>`;
   cardBodyContainer.insertAdjacentHTML("beforeend", templateString1);
   
   containerClone.appendChild(clone)
   
     return containerClone
}
function generateInput(question,isSimple){
   let mydiv = document.createElement('div')
   let  inputclone ;
   if(isSimple === true){
     let simpleTemplateInput =  document.querySelector("#simpleTemplateInput")     
     inputClone = simpleTemplateInput.content.firstElementChild.cloneNode(true);

     //return inputclone
   }
   else{
     const templateInput = document.querySelector("#templateInput");
     inputClone = templateInput.content.firstElementChild.cloneNode(true);
     const title = inputClone.querySelector("#title");
     const text = document.createElement("p");

     //const mathInput = inputClone.querySelector("math-field")
    



text.textContent = question.question
title.appendChild(text)

     const content = inputClone.querySelector("#content");
     
   let setOfInputs= document.createElement("div")
   setOfInputs.classList.add("row")

     question.inputsDefault.forEach((element) => {
      let contentCol =document.createElement("div")
      contentCol.classList.add("contentCol","col-xs-6","col-sm-6","col-md-6","d-flex","justify-content-between","mt-1")
     // contentCol.setAttribute("style","width:fit-content")
      const mathInput = document.createElement("math-field");
       mathInput.classList.add("toValidate")
     
   


    //   const campo = document.querySelector(`#input-${i}-${idBoard}`);
      // campo.textContent = contenido;
      
      //  const optionsKeyboard = getKeyboardMath (window.screen.width)
      //  mathInput.setOptions({
      //     "customVirtualKeyboardLayers": optionsKeyboard[0],
      //     "customVirtualKeyboards": optionsKeyboard[1],
      //     "virtualKeyboards": optionsKeyboard[2],
         
      //   });


//       mathInput.setAttribute("style","min-height:30px; min-width:90px")
      let label;
      if(element[1] === true){
         label = document.createElement("math-field");
         label.setAttribute("read-only","")
         label.setAttribute("data-question","false")
      }
      else{
         label = document.createElement("label");
      }
     
       label.textContent = element[0];
       mathInput.setAttribute("virtual-keyboard-mode", "onfocus");
       mathInput.setAttribute("data-question","true")
       mathInput.setAttribute("style", "min-width:60px");
       mathInput.classList.add("input-for-way");

       //content.appendChild(label);
       contentCol.appendChild(label)
       contentCol.appendChild(mathInput)
       setOfInputs.appendChild(contentCol)
     // content.appendChild(mathInput);


      
      content.appendChild(setOfInputs)
     });
   //  console.log("inputClone",inputClone)
     
   }    
   mydiv.appendChild(inputClone)
   return mydiv 
   }
 function generateSelect(question,isSimple){
   let selectClone;
   if(isSimple === true){
     $simpleTemplateSelect = document.querySelector(" #simpleTemplateSelect")
    selectClone = $simpleTemplateSelect.content.firstElementChild.cloneNode(true);
     question.answers_values.forEach((element) => {
      //  const completeSelectTemplate = document.querySelector("#templateSelect");
      //  const clone = completeSelectTemplate.content.firstElementChild.cloneNode(true);
       let option = document.createElement("option")
       option.value = element;
       option.text = element;
       selectClone.querySelector('select').appendChild(option)
     });
 
   }
   else{
     const completeSelectTemplate = document.querySelector("#templateSelect");
     selectClone = completeSelectTemplate.content.firstElementChild.cloneNode(true);
     const select = selectClone.querySelector("select");
     const label = selectClone.querySelector("label");
 
     label.textContent = question.question;  
     question.answers_values.forEach((element) => {
       let option = document.createElement("option")
       option.value = element;
       option.text = element;
       select.appendChild(option)
 
     });
 
   }
 return selectClone;
 }
 function generateRadio(question,isSimple){
 
   let fragment = new DocumentFragment();
   const template = document.querySelector("#templateCheck");
   
   
   
   let clone = template.content.firstElementChild.cloneNode(true);
   
   let title = clone.querySelector(".title");
   let content = clone.querySelector(".content");

 //  let texto = document.createElement("p");
   //texto.textContent = question.question;
   //title.appendChild(texto);
   
   let radioClone;
   let contenido = document.createElement("div")
   if(isSimple === true){
 
    
     const simpleRadioTemplate = document.querySelector("#simpleTemplateRadio");
    question.answers_values.forEach((element,index) => {
     radioClone = simpleRadioTemplate.content.firstElementChild.cloneNode(true);
     radioClone.querySelector("label").textContent = element
     radioClone.querySelector("label").setAttribute("for",`${question.artifact}`)
     radioClone.querySelector("input").setAttribute("name",`${question.artifact}`)
     radioClone.querySelector("input").setAttribute("value",element)
 
     radioClone.querySelector("input").classList.add("custom-radio");
     contenido.appendChild(radioClone)
     content.appendChild(contenido);

   // fragment.appendChild(radioClone)
     });
   
     return contenido
   }
   else{
     const radioTemplate = document.querySelector("#templateCheck");
     let radioClone = radioTemplate.content.firstElementChild.cloneNode(true);
     const title = radioClone.querySelector(".title");
     title.textContent = question.question

     //console.log("radioClone",radioClone)

     
   //  const title = radioClone.querySelector("#title");

   //  title.textContent =question.question
 
 
     let indice = 0
     const texto = document.createElement("p");
     
     const content = radioClone.querySelector(".content");
     texto.textContent = question.question;



    // title.appendChild(texto)
 //radioClone.appendChild(title)
 let radioContainerRow =  document.createElement("div");
 radioContainerRow.classList.add("row")
 
     question.answers_values.forEach((element,index) => {
       indice = index
       indice = indice -1
     let radioContainerCol = document.createElement("div")

     radioContainerCol.classList.add("col-md-6","d-flex","justify-content-center")
     radioContainerCol.setAttribute("style","width:fit-content")
     let label = document.createElement("label");
     let input = document.createElement("input");
     input.classList.add("custom-radio","ml-2");
     input.type = "radio";
     input.value = element;
     label.textContent = element;
     
     input.setAttribute("name",`${question.artifact}`)
     label.setAttribute("for",`${question.artifact}`)
     radioContainerCol.appendChild(label)
     radioContainerCol.appendChild(input)
     radioContainerRow.appendChild(radioContainerCol) 
     content.appendChild(radioContainerRow)
 
     //content.appendChild(input)    
     });
     return radioClone;
 
   }
 }
//para calcular las entradas de los inputs
function calculate(valor){
   const ce =  new ComputeEngine.ComputeEngine({numericMode:"machine"})
 result = ce.parse(valor).N().valueOf();
 return result
 }
 //validación y reseteo de preguntas
 function validation(m){
   let valor;
   let nodo;
   let index = 0;
 
   if (m != undefined || m != null) {
     if (m.hasOwnProperty("questions")){
     m.questions?.forEach((question, i) => {
       let RadioAnswers = m.allinputs[index].querySelector(
         'input[type ="radio"]:checked'
       );
       let SelectAnswers = m.allinputs[index].querySelector("select");
       let InputAnswers = m.allinputs[index].querySelectorAll('math-field[data-question="true"]')



       if (RadioAnswers != null) {
         if (RadioAnswers.value === question.conditions.correctIndex) {
           RadioAnswers.classList.add("pass");
           RadioAnswers.classList.remove("failed");
 
         } else {
           RadioAnswers.classList.add("failed");
           RadioAnswers.classList.remove("pass");
         }
       }
 
       if (SelectAnswers != null) {
         if (SelectAnswers.selectedIndex === question.conditions.correctIndex) {
           SelectAnswers.classList.add("pass");
           SelectAnswers.classList.remove("failed");
         } 
         
         else if(SelectAnswers.selectedIndex === 0  ){
           SelectAnswers.classList.remove("failed");
           SelectAnswers.classList.remove("pass");
         }
         else {
           SelectAnswers.classList.add("failed");
           SelectAnswers.classList.remove("pass");
         }
         if (InputAnswers.length != 0) {
           InputAnswers.forEach((element, i) => {
             if (element.value === question.conditions.valueInputs[i]) {
               element.classList.add("pass");
               element.classList.remove("failed");
             }
             else if(element.value === ""  ){
               element.classList.remove("failed");
               element.classList.remove("pass");
               console.log(element)
             }
             
             else {
               element.classList.add("failed");
               element.classList.remove("pass");
             }
           });
         }
 
       }
       if (InputAnswers.length != 0) {


      


         console.log("VALIDANDO POR ACAAAA")
         InputAnswers.forEach((element, i) => {
 
            console.log("ElEMENT VALUE: ", element )

 
           if (element.value == question.conditions.valueInputs[i]) {

             element.classList.add("pass");
             element.classList.remove("failed");
           } 
           
           else if(element.value === ""  ){
             element.classList.remove("failed");
             element.classList.remove("pass");
             console.log(element)
           }
           else {
             element.classList.add("failed");
             element.classList.remove("pass");
           }
         });
       }
 
 
 
       index = index + 1;
     });
   }
    else {
     matriz_aplanada = m.cells.flat();
     

     const matrizFiltrada = matriz_aplanada.filter((elemento) => elemento.type !== 0);
     matrizFiltrada.forEach((question, i) => {
      simpleSelect = m.allinputs[index].querySelector('select')
      simpleInput = m.allinputs[index].querySelector('math-field')
      simpleRadio =  m.allinputs[index].querySelector(
       'input[type ="radio"]:checked'
     )
     if( question.conditions.hasOwnProperty("valueInputs")){
       correctAnswer = question.conditions.valueInputs[0][0]
     }
     else if(question.conditions.hasOwnProperty("correctIndex")){
         correctAnswer = question.conditions.correctIndex
     }
 
    
if ( simpleSelect !== null){
       nodo = simpleSelect
       valor = simpleSelect.selectedIndex
       if (valor === 0){
         nodo.classList.remove("failed");
         nodo.classList.remove("pass");
       }
       if (valor === correctAnswer){
         nodo.classList.remove("failed");
         nodo.classList.add("pass");
       }
       if((valor !== correctAnswer) && (valor !== 0)){
         nodo.classList.add("failed");
         nodo.classList.remove("pass");
       }
     }
 else if (simpleInput !== null){
   nodo = simpleInput
   valor =simpleInput.value
     if (valor === ""){
     nodo.classList.remove("failed");
     nodo.classList.remove("pass");
   }
   else{
 
     let resultado_resuelto = calculate(valor)

     let comparacion = gInterPoint(resultado_resuelto,correctAnswer,0.5)
 

     if (comparacion && valor != ""){
       nodo.classList.remove("failed");
       nodo.classList.add("pass");
     }
      else if((!comparacion) && (valor !== "")){
       nodo.classList.add("failed");
       nodo.classList.remove("pass");
     }
   }
 }
 else if(simpleRadio !== null){
   nodo = simpleRadio
   valor = simpleRadio.value
   if (valor === "") {
     nodo.classList.remove("failed");
     nodo.classList.remove("pass");
   }
 
   if (valor === correctAnswer){
     nodo.classList.remove("failed");
     nodo.classList.add("pass");
   }
   if((valor !== correctAnswer) && (valor !== "")){
     nodo.classList.add("failed");
     nodo.classList.remove("pass");
   }
 }
 index = index + 1;
     })
   }
   } else {
     console.log(
       "Estas ingresando un artefacto nulo o indefinido, verifica donde estás llamando la función validar"
     );
   }
   sendData(cleanDataQ(m));

 
 }
 function reset(m){
   let nodo;
   let index = 0;
     if (m != undefined || m != null) {
       if (m.hasOwnProperty("questions")){
         console.log("CONDICION 1")
         console.log("Total", m.allinputs)

       m.questions?.forEach((question, i) => {
         let RadioAnswers = m.allinputs[index].querySelector('input[type ="radio"]:checked');
         let SelectAnswers = m.allinputs[index].querySelector("select");
         let InputAnswers = m.allinputs[index].querySelectorAll("math-field")
         console.log(
            "Radio:",
            RadioAnswers
            ,
            "Select:",
            SelectAnswers
            ,
            "Input:",
            InputAnswers
         )
         
         if (RadioAnswers != null) {
            RadioAnswers.classList.remove("pass");
            RadioAnswers.classList.remove("failed");
         }
         if (SelectAnswers != null) {
             SelectAnswers.classList.remove("pass");
             SelectAnswers.classList.remove("failed");
             SelectAnswers.selectedIndex=0
           }
         if (InputAnswers.length != 0) {
             InputAnswers.forEach((element, i) => {
                 element.classList.remove("pass");
                 element.classList.remove("failed");
                 element.value = ""

             });
           }
           index=index+1
   })
}     else{
   // let valor
   console.log("CONDICION 2")
    matriz_aplanada = m.cells.flat();
    const matrizFiltrada = matriz_aplanada.filter((elemento) => elemento.type !== 0);
    matrizFiltrada.forEach((question, i) => {
     simpleSelect = m.allinputs[index].querySelector('select')
     simpleInput = m.allinputs[index].querySelector('math-field')
      simpleRadio =  m.allinputs[index].querySelector(
      'input[type ="radio"]:checked'
    )
    
    if ( simpleSelect !== null){
      nodo = simpleSelect
       simpleSelect.selectedIndex = 0
       nodo.classList.remove("failed");
       nodo.classList.remove("pass");
    }
else if (simpleInput !== null){
  nodo = simpleInput
 simpleInput.value = ""
 nodo.classList.remove("failed");
 nodo.classList.remove("pass");
}
else if(simpleRadio !== null){
  nodo = simpleRadio
 simpleRadio.checked = false
 nodo.classList.remove("failed");
 nodo.classList.remove("pass");
 
}

  if( question.conditions.hasOwnProperty("valueInputs")){
   correctAnswer = question.conditions.valueInputs[0][0]
 
 }
 else if(question.conditions.hasOwnProperty("correctIndex")){

    
 
     correctAnswer = question.conditions.correctIndex
 
   
 }
 else{
   
 }


    })

  }
     }}

function removeDelimitersFromCopiedText(event) {
   console.log(event)
  // Obtener el texto seleccionado
  var selectedText = window.getSelection().toString();
console.log("selectedText",selectedText)

  // Eliminar los delimitadores "$$" del texto seleccionado
  var textWithoutDelimiters = selectedText.replace(/\$\$/g, '');

  // Copiar el texto sin delimitadores al portapapeles
  event.clipboardData.setData('text/plain', textWithoutDelimiters);

  // Prevenir el comportamiento predeterminado de la acción de copiar
  event.preventDefault();
}