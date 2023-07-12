let isActiveCounter = false;
let targetActive = "";
/* Modulo I que Genera Artefactos */
function generateArtifact(def) {
  const template = document.querySelector("#template"),
    mainArtifact = document.querySelector("#mainArtifact");
  let fragment = new DocumentFragment();

  /* Recorre el objeto def de la definicion por cada artefacto que se encuentre dentro de el */

  for (const artifact of Object.keys(def)) {
    /* Caracterizacion del Artefacto tipo: Simple */
    /* Establece las caracteristicas que debe de tener el artifacto por defecto si en la definicion se encuentra un artefacto vacio  */

    let defDefault = {
      dataInteraction: {
        correct: 0,
        incorrect: 0,
        forAnswer: 0,
      },
      timeInteraction: 0,
      statusValidate: false,
      variableX: def[artifact].variableX ?? "2",
      buttonsActive: def[artifact].buttonsActive || false,
      inputActive: def[artifact].inputActive || false,
      characteristicsArtifact: def[artifact]?.characteristicsArtifact || {
        typeForm: def[artifact]?.characteristicsArtifact?.typeForm || false,
        arrow: {
          count: def[artifact]?.characteristicsArtifact?.arrow?.count || 2,
          direction:
            def[artifact]?.characteristicsArtifact?.arrow?.direction || "down",
          size: {
            width:
              def[artifact]?.characteristicsArtifact?.arrow?.size?.width ??
              "40px",
            height:
              def[artifact]?.characteristicsArtifact?.arrow?.size?.height ??
              "100px",
          },
          style: {
            marginLeft:
              def[artifact]?.characteristicsArtifact?.arrow?.style.marginLeft ??
              "margin-left:4px",
          },
        },
        width: def[artifact]?.characteristicsArtifact?.width || "auto",
        height: def[artifact]?.characteristicsArtifact?.height || "auto",
        typeDiv:
          def[artifact]?.characteristicsArtifact?.typeDiv != undefined
            ? def[artifact]?.characteristicsArtifact?.typeDiv
            : [
              {
                rounded: {
                  count: 3,
                  border: "1px solid black",
                  formClas: "rounded",
                  inputEnable: true,
                  size: {
                    width: "200px",
                    height: "50px",
                  },
                },
              },
              {
                square: {
                  count: 2,
                  border: "1px solid black",
                  formClas: "square",
                  inputEnable: true,
                  size: {
                    width: "100px",
                    height: "50px",
                  },
                },
              },
            ],
      },
      conditions: def[artifact].conditions || {},
    };

    const clone = template.content.firstElementChild.cloneNode(true);
    clone.classList.add(artifact);
    clone.setAttribute("data-ejercicio", artifact);
    clone.addEventListener("mouseenter", () => {
      gTime(def[artifact]);
      targetActive = clone.dataset.ejercicio;
    });
    clone.addEventListener("mouseleave", () => {
      gTime(def[artifact], false, false);
      targetActive = "";
    });
    def[artifact] = { ...def[artifact], ...defDefault };

    fragment.appendChild(clone);

    mainArtifact.appendChild(fragment);

    artifactDefault(
      defDefault,
      artifact,
      clone,
      def[artifact].typeForm,
      targetActive
    );
  }
}
/* Estado de los botones, funciona para desactivar o activar los botones de los artefactos*/
function stateButton(artifact, input) {
  if (def.inputActive) {
  }
  input.addEventListener("keyup", (e) => { });
  input.addEventListener("blur", (e) => {
    gTime(def[artifact], false, false);
    isActiveCounter = false;
  });

  input.addEventListener("input", (e, updateValue) => {
    if (e.data != null && !isActiveCounter) {
      isActiveCounter = true;
      def[artifact].statusValidate = false;
      gTime(def[artifact], true);
    }
  });

  input.addEventListener("beforeinput", (e) => {
    const targetRanges = e.getTargetRanges();
  });
}
/* Modulo IV - Crear texto en la pagina */
function pageText(tag, divContenText, clone, refArtifact) {
  const { typeTag, content, classContent } = tag;
  const { property, textValue } = content;
  const { typeText, defaultClass, change } = property;
  switch (typeTag) {
    case typeTag:
      let content = "";
      let addonsContent = "";

      textValue.forEach((element, index) => {
        if (element.hasOwnProperty("addons")) {
          content += `
                    <div class="${element.addons.classAddons ?? ""}">
                    \n<${typeTag} class="${defaultClass ?? ""} ${element.class ?? ""
            }" ${element.atribute ?? ""}>
                    ${element.text ?? ""}
                    </${typeTag}>
                    
                    ${element.addons.keyboardActive
              ? pageTextArtifactButtons(clone)
              : ""
            }
                    </div>`;
        } else {
          content += `\n<${typeTag} class="${defaultClass ?? ""} ${element.class ?? ""
            }" ${element.atribute ?? ""}>${element.text ?? ""}</${typeTag}>`;
        }
      });
      const templateString = `
                <div class="${classContent ?? "contentTitleParagraph"}">
                ${content}
                </div>`;
      clone.insertAdjacentHTML("beforeend", templateString);
      break;
  }
}
function generarTabla(params = {}) {
  let mathArray = [];
  let tablet = params.def.characteristicsArtifact.tablet;
  let contenedorTablet = document.createElement("div");
  params.clone.style.margin = "8px";
  params.clone.style.width =
    params.def.characteristicsArtifact?.width ?? "auto";
  contenedorTablet.classList.add("borderDefault");
  // Crea la tabla y su tbody
  let tabla = document.createElement("table");
  let tbody = document.createElement(tablet.typeParent);
  tabla.classList.add("table", "table-bordered");
  tabla.appendChild(tbody);
  // Itera sobre el objeto tablet
  tablet.typeChild.forEach((child) => {
    let tr = document.createElement(child.nodeChild.tag);
  
    child.nodeChild.child.forEach((childElement) => {
      let td = document.createElement(childElement.tag);
  
      // Agrega el elemento al array solo si es un math-field dentro de un td
      
  
      td.className = "media-th";
      td.setAttribute("scope", "row");
      td.style.width = "54px";
      
      if (childElement.hasOwnProperty("child")) {
        let math = document.createElement(childElement.child.tag);
        if (childElement.child?.tag === "math-field" && td.tagName === "TD") {
          mathArray.push(math);
        }
        math.setAttribute("virtual-keyboard-mode", "onfocus");
        math.setAttribute("keypress-sound", "none");
        math.classList.add("element", "math", "tablet");
        childElement.child.disabled ?
          (math.disabled = childElement.child.disabled) :
          false;
        math.value = childElement?.child?.value;
        td.appendChild(math);
      } else {
        td.textContent = childElement?.textDefault ?? "Por defecto";
      }
  
      tr.appendChild(td);
    });
  
    tbody.appendChild(tr);
  });
  //mathArray.map(item => console.log(item.parentElement === ))
    console.log(mathArray)
  contenedorTablet.appendChild(tabla);
  divControllerButton({ ...params, contenedorTablet, mathArray });
  params.clone.appendChild(contenedorTablet);
}



function generateTree(params = {}) {
  let { def, clone } = params
  let { contenedor } = def.characteristicsArtifact.tree
  let { tag, classStyle, child } = contenedor

  

  let content = createHtmlElement({ tag, classStyle })
  bucleItem({ content, child })

  clone.appendChild(content)
  let nodoLeft = Array.from(document.querySelectorAll('#nodoLeft'))
  let nodoRight= Array.from(document.querySelectorAll('#nodoRight'))
  let nodoOperator= Array.from(document.querySelectorAll('#nodoOperator'))
  let nodoResult= Array.from(document.querySelectorAll('#nodoResult'))
  


  divControllerButton({
    ...params, 
    content, 
    nodoLeft:nodosValidate(nodoLeft), 
    nodoRight:nodosValidate(nodoRight), 
    nodoOperator:nodosValidate(nodoOperator),
    nodoResult:nodosValidate(nodoResult)});

}


function createHtmlElement(childElement = {}) {
  const { tag, classStyle } = childElement;

  const element =  document.createElement(tag)

  element.className = classStyle;

  if(tag === 'math-field'){
    element.setAttribute("virtual-keyboard-mode", "onfocus"); 
  }
  if(childElement?.id !== undefined){
    element.setAttribute('id',childElement?.id)
    element.setAttribute('data-nodo',childElement?.id)
  }
  if(childElement?.defaultValue !== undefined){
    element.value = childElement?.defaultValue ?? 'por defecto'
    childElement?.disabled ? element.disabled = childElement?.disabled : element.disabled = false
  }

  
  return element;
  
}

function bucleItem(params = {}) {
  let { content, child } = params

  
if(params.child !== undefined){
  for (const item of child) {
    
    
    if(item[Object.keys(item)]?.id){
      let element = item[Object.keys(item)] !== undefined ? 
      createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle,id: item[Object.keys(item)]?.id }) :
      createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle,})
      content.appendChild(element)
      bucleItem({ content: element, child: item[Object.keys(item)]?.child })
    }else{
      if(item[Object.keys(item)]?.defaultValue){
        let element = item[Object.keys(item)] !== undefined ? 
        createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle, defaultValue: item[Object.keys(item)]?.defaultValue, disabled:item[Object.keys(item)]?.disabled}) :
        createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle })
        content.appendChild(element)
        bucleItem({ content: element, child: item[Object.keys(item)]?.child })
      }else{
        let element = item[Object.keys(item)] !== undefined ? 
        createHtmlElement({ tag: item[Object.keys(item)]?.tag, classStyle: item[Object.keys(item)]?.classStyle }) :
        createHtmlElement({ tag: item?.tag, classStyle: item?.classStyle })
      content.appendChild(element)
      bucleItem({ content: element, child: item[Object.keys(item)]?.child })
      }
      
    }

    
  }
}


}

function nodosValidate(nodo){  
  let nodoArray = []
  const myKeyboard = {
    MG_KEYBOARD_LAYER: {
      numeros: {
        rows: [
          [
            { label: "7", key: "7", class:"goldenrod" },
            { label: "8", key: "8" },
            { label: "9", key: "9" },
            {
              label: "&#xf7;",
              insert: "\\frac{\\placeholder{}}{\\placeholder{}}",
            },
          ],
          [
            { label: "6", key: "6" },
            { label: "5", key: "5" },
            { label: "4", key: "4" },
            { label: "&#x2E3", insert: "\\times " },
          ],
        ],
      },
      funciones: {
        rows: [
          [
            { label: "sin", key: "sin" },
            { latex: "\\sin^{-1}" },
            { label: "cos", key: "cos" },
            { latex: "\\cos^{-1}" },
          ],
          [
            { label: "tan", key: "tan" },
            { latex: "\\tan^{-1}" },
            { latex: "\\ln" },
            { latex: "\\exponentialE^{\\placeholder{}}" },
          ],
          [
            { label: "(", key: "(" },
            { label: ")", key: ")" },
            { latex: "\\placeholder{}^2" },
            {
              latex: "\\placeholder{}^{\\placeholder{}}",
            },
          ],
  
          [
            { latex: "\\sqrt{\\placeholder{}}" },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-left' /></svg>",
              command: ["performWithFeedback", "moveToPreviousChar"],
            },
            {
              class: "action",
              label: "<svg><use xlink:href='#svg-arrow-right' /></svg>",
              command: ["performWithFeedback", "moveToNextChar"],
            },
            {
              class: "action font-glyph bottom right",
              label: "&#x232b;",
              command: ["performWithFeedback", "deleteBackward"],
            },
          ],
        ],
      },
    },
    MG_KEYBOARD: {
      numeros: {
        label: "Números",
        tooltip: "Números",
        layer: "numeros",
      },
      funciones: {
        label: "Funciones",
        tooltip: "Funciones",
        layer: "funciones",
      },
    },
    virtualKeyboards: "numeros funciones",
  };
  let nodoFromArray = Array.from(nodo).map(item => {
    Array.from(item.querySelectorAll('math-field')).map(math => { 

      math.setOptions({
        customVirtualKeyboardLayers: myKeyboard.MG_KEYBOARD_LAYER,
        customVirtualKeyboards: myKeyboard.MG_KEYBOARD,
        virtualKeyboards: myKeyboard.virtualKeyboards,
      });
      nodoArray.push(math)
        

    })
  })
 
  return nodoArray

}



/* Modulo III  Crea el esqueleto de los artefactos, por defecto y tambien los modificados FUNCION PRINCIPAL */
function artifactDefault(defDefault, artifact, clone, typeForm, targetActive) {
  let stateChange = false;
  let targetInput = "";
  let screenDivArray = [];
  let keyDivArray = [];
  let equationArray = [];
  let solutionArray = [];

  /* Nota: mejorar la logica de typediv antes estaba negada !def[artifact].characteristicsArtifact.hasOwnProperty('typeDiv') */
  if (def[artifact]?.characteristicsArtifact.hasOwnProperty("typeDiv")) {
    def[artifact].characteristicsArtifact.typeForm !== undefined ?
      clone.classList.add(`${def[artifact].characteristicsArtifact.typeForm}`) :
      clone.classList.add("artifactGrid");

    /* Funcionalidad para mostrar un input de Verdadero y Falso, 
   esto no se va  a usar solo fue una funcionalidad que se uso para abordar el examen del capitulo 3 */

    if (def[artifact].modeDouble) {
      for (const [key, value] of Object.entries(defDefault.characteristicsArtifact.typeDiv)) {
        Object.keys(value).map((type, index) => {
          for (countType = 0; countType < value[type].count; countType++) {
            let mathLatex = document.createElement("math-field");
            mathLatex.setAttribute("virtual-keyboard-mode", "onfocus");
            mathLatex.setAttribute("keypress-sound", "none");
            mathLatex.classList.add("math", "element");
            mathLatex.setAttribute("data-type", type);
            mathLatex.style.width = value[type].size.width;
            mathLatex.style.height = value[type].size.height;
            mathLatex.style.border = value[type].border;
            type.match(/rounded/gi) ?
              ((mathLatex.style.borderRadius = "4rem"),
                mathLatex.classList.add(`rounded-${countType}`, `screenDouble-${countType}`),
                stateButton(artifact, mathLatex),
                screenDivArray.push(mathLatex)) :
              ((mathLatex.style.borderRadius = "0.2rem"),
                mathLatex.classList.add(`square-${countType}`),
                stateButton(artifact, mathLatex),
                keyDivArray.push(mathLatex));
            clone.appendChild(mathLatex);
          }
        });
      }
      if (def[artifact].hasOwnProperty("equationsEnd")) {
        def[artifact].equationsEnd.forEach((item, index) => {
          let input = document.createElement("math-field");
          input.classList.add("math", "element");
          input.setAttribute("virtual-keyboard-mode", "onfocus");
          input.setAttribute("keypress-sound", "none");
          input.classList.add(`${Object.keys(item)[0]}-${index}`);
          input.style.width = item[Object.keys(item)]?.size?.width ?? "320px";
          input.style.height = item[Object.keys(item)]?.size?.height ?? "50px";
          input.style.border = "1px solid black";
          input.style.borderRadius = "0.2rem";
          input.classList[2].match(/solution/gi) ?
            (clone.appendChild(input),
              stateButton(artifact, input),
              solutionArray.push(input)) :
            (clone.appendChild(input),
              stateButton(artifact, input),
              equationArray.push(input));
          item[Object.keys(item)].defaultText.hasOwnProperty("disabled") ?
            ((input.disabled = item[Object.keys(item)]?.defaultText?.disabled),
              (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? "defecto")) :
            (input.value = item[Object.keys(item)]?.defaultText?.textValue ?? "defecto");
        });
      }
    } else {
      for (const [key, value] of Object.entries(defDefault.characteristicsArtifact.typeDiv)) {
        Object.keys(value).map((type) => {
          for (countType = 0; countType < value[type].count; countType++) {
            let mathLatex = document.createElement("math-field");
            mathLatex.setAttribute("virtual-keyboard-mode", "onfocus");
            mathLatex.setAttribute("keypress-sound", "none");
            mathLatex.classList.add("math", "element");
            mathLatex.setAttribute("data-type", type);
            mathLatex.style.width = value[type].size.width;
            mathLatex.style.height = value[type].size.height;
            mathLatex.style.border = value[type].border;
            type.match(/rounded/gi) ?
              ((mathLatex.style.borderRadius = "2rem"),
                mathLatex.classList.add(`rounded-${countType}`),
                stateButton(artifact, mathLatex),
                screenDivArray.push(mathLatex)) :
              ((mathLatex.style.borderRadius = "0.2rem"),
                mathLatex.classList.add(`square-${countType}`),
                stateButton(artifact, mathLatex),
                keyDivArray.push(mathLatex));
            clone.appendChild(mathLatex);
          }
        });
      }
    }

    if (def[artifact].hasOwnProperty("defaultinput")) {
      screenDivArray.map((math, index) => {
        if (def[artifact]?.defaultinput?.screen?.defaultText[index] !== "") {
          console.log(def[artifact]?.defaultinput?.screen)
          math.value = def[artifact]?.defaultinput?.screen?.defaultText[index]?.textValue ?? "";
          math.disabled = def[artifact]?.defaultinput?.screen?.defaultText[index]?.disabled ?? def[artifact]?.defaultinput?.screen?.disabled;
        }
      });
      if (def[artifact].defaultinput.hasOwnProperty("key")) {
        keyDivArray.map((math, index) => {
          if (def[artifact]?.defaultinput?.key[index] !== "") {
            math.value = def[artifact]?.defaultinput?.key?.defaultText[index]?.textValue ?? "";
            math.disabled = def[artifact]?.defaultinput?.key?.defaultText[index]?.disabled ?? def[artifact]?.defaultinput?.key?.disabled;
          }
        });
      }
    }

    if (def[artifact].arrowUpDown) {
      for (countArrow = 0; countArrow < def[artifact].characteristicsArtifact.arrow.count; countArrow++) {
        let arrow = document.createElement("div");
        if (countArrow === 0) {
          arrow.style = def[artifact]?.characteristicsArtifact?.arrow?.styleArrowDown ?? "margin:4px";
          arrow.classList.add("arrowDown"),
            arrow.setAttribute("data-type", "arrow-down"),
            arrow.classList.add(`arrowD-${countArrow}`);
        } else if (countArrow === 1) {
          arrow.style = def[artifact]?.characteristicsArtifact?.arrow?.styleArrowUp ?? "margin:4px";
          arrow.classList.add("arrowUp"),
            arrow.setAttribute("data-type", "arrow-up"),
            arrow.classList.add(`arrowD-${countArrow}`);
        } else {
          if (countArrow === 3 || countArrow === 5 || countArrow === 7) {
            arrow.classList.add("arrowUp"),
              arrow.setAttribute("data-type", "arrow-up"),
              arrow.classList.add(`arrowD-${countArrow}`);
          } else {
            arrow.classList.add("arrowDown"),
              arrow.setAttribute("data-type", "arrow-down"),
              arrow.classList.add(`arrowD-${countArrow}`);
          }
        }

        clone.appendChild(arrow);
      }
    } else {
      if (defDefault.characteristicsArtifact.hasOwnProperty("arrow")) {
        for (countArrow = 0; countArrow < defDefault.characteristicsArtifact.arrow.count; countArrow++) {
          let arrow = document.createElement("div");
          def[artifact].characteristicsArtifact.arrow.direction == "down" ?
            (arrow.classList.add("arrowDown"),
              arrow.setAttribute("data-type", "arrow-down"),
              arrow.classList.add(`arrowD-${countArrow}`)) :
            (arrow.classList.add("arrowUp"),
              arrow.setAttribute("data-type", "arrow-up"),
              arrow.classList.add(`arrowD-${countArrow}`));
          clone.appendChild(arrow);
        }
      }
    }
    clone.style.width = defDefault.characteristicsArtifact.width;
    clone.style.height = defDefault.characteristicsArtifact.height;
    clone.style.margin = "8px";
    def[artifact].characteristicsArtifact.border != undefined ?
      def[artifact].characteristicsArtifact.border :
      clone.classList.add("borderDefault");
    contenedor.appendChild(clone);
    def[artifact].buttonsActive ?
      divControllerButton({ clone, screenDivArray, keyDivArray, def: def[artifact], artifact, artifact, equationArray, solutionArray, })
      : false;
  } else {

    if (def[artifact].characteristicsArtifact.hasOwnProperty("page")) {
      contenedor.classList.remove("mainContent");
      contenedor.classList.add("contentText");
      let divContenText = document.createElement("div");
      divContenText.classList.add("contentText");
      def[artifact].characteristicsArtifact.page.map(
        (textObject, textIndex) => {
          pageText(textObject, divContenText, clone, def[artifact]);
          contenedor.appendChild(clone);
        }
      );
    }
    if (def[artifact].characteristicsArtifact.hasOwnProperty("tablet")) {
      contenedor.classList.add("mainContent");
      let divContenText = document.createElement("div");
      divContenText.classList.add("contentText");
      generarTabla({ divContenText, clone, def: def[artifact], artifact });
      contenedor.appendChild(clone);
    }
    if (def[artifact].characteristicsArtifact.hasOwnProperty('tree')) {
      contenedor.classList.add("mainContent");
      generateTree({ clone, def: def[artifact], artifact })
      contenedor.appendChild(clone);

    }

  }
}
function refactValidate(params = {}) {
  let computerEngine = new ComputeEngine.ComputeEngine({
    numericMode: "machine",
  });
  
  const { equationArray, keyDivArray, screenDivArray, solutionArray } = params;
  params.def.conditions[params.key].forEach((conditions, inputIndex) => {
    const input = params.validate[inputIndex];
    if (params.mode) {
      if (conditions.length > 0) {
        if (input.getAttribute("disabled") !== "" && input.value !== "") {
          if (validateInput({ conditions, input, computerEngine, ...params })) {
            input.setAttribute("data-pass", "pass");
            input.classList.add("pass");
            input.classList.remove("failed");
            input.removeAttribute("data-failed");
            input.removeAttribute("data-forAnswer");
            params.def.dataInteraction.correct++;
          } else {
            input.classList.add("failed");
            input.classList.remove("pass");
            input.setAttribute("data-failed", "failed");
            input.removeAttribute("data-pass");
            input.removeAttribute("data-forAnswer");
            params.def.dataInteraction.incorrect++;
          }
        } else {
          input.setAttribute("data-forAnswer", "forAnswer");
          input.removeAttribute("data-pass");
          input.removeAttribute("data-failed");
          input.classList.remove("pass");
          input.classList.remove("failed");
          params.def.dataInteraction.forAnswer++;
        }
      }
    } else {
      if (input.getAttribute("disabled") !== "" && input.value !== "") {
        if (input.value != "") {
          input.value = "";
          input.classList.remove("pass");
          input.classList.remove("failed");
          params.def.dataInteraction.correct = 0;
          params.def.dataInteraction.incorrect = 0;
          params.def.dataInteraction.forAnswer = 0;
        }
      }
    }
  });


}
function validateInput(params = {}) {
  let expreVarX = /\b[x|\w*x\w]\b/gi;
  let input = params.computerEngine.parse(
    params.input.value.replace(new RegExp(expreVarX), (match) =>
      match === "x" ? params.def.variableX : match
    )
  );

  return params.conditions.some((valueCondition) => {
    if (typeof valueCondition === "number") {
      if (params.def.depure) {
        console.log(
          Array.isArray(input.N()._value)
            ? input.evaluate()._value
            : input.N()._value
        );
      }
      return gInterPoint(
        Array.isArray(input.N()._value)
          ? input.evaluate()._value
          : input.N()._value,
        valueCondition
      );
    } else {
      if (params.def.depure) {
        console.log(
          valueCondition ===
          params.input.value.replace(new RegExp(/\\|\$/gi), "")
        );
      }
      return (
        valueCondition === params.input.value.replace(new RegExp(/\\|\$/gi), "")
      );
    }
  });
}
function divControllerButton(params = {}) {
  let divControllerButton = document.createElement("div");
  let buttonValidate = document.createElement("button");
  let buttonReset = document.createElement("button");
  divControllerButton.classList.add("divControllerButton");
  buttonValidate.classList.add(
    "check",
    "buttonPrimary",
    "button-marg",
    "buttonKey"
  );
  buttonReset.classList.add(
    "reset",
    "buttonSecundary",
    "button-marg",
    "buttonKey"
  );

  buttonValidate.addEventListener("click", () => {
    mn({ ...params, mode: true });
  });

  buttonReset.addEventListener("click", () => {
    mn({ ...params, mode: false });
  });

  divControllerButton.appendChild(buttonReset);
  divControllerButton.appendChild(buttonValidate);

  params.contenedorTablet ?
  params.contenedorTablet.appendChild(divControllerButton) :
  params.content ?
  params.content.appendChild(divControllerButton) :
  params.clone.appendChild(divControllerButton) ;

}
function mn(params) {

  params.def.dataInteraction.correct = 0;
  params.def.dataInteraction.incorrect = 0;
  params.def.dataInteraction.forAnswer = 0;

  if (params.def.conditions["equation"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.equationArray,
      key: "equation",
    });
  if (params.def.conditions["key"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.keyDivArray,
      key: "key",
    });
  if (params.def.conditions["screen"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.screenDivArray,
      key: "screen",
    });
  if (params.def.conditions["solution"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.solutionArray,
      key: "solution",
    });
  if (params.def.conditions["table"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.mathArray,
      key: "table",
    });

    /* Arboles Binarios */
   
    
    if (params.def.conditions["nodoLeft"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoLeft,
      key: "nodoLeft",
    });
    if (params.def.conditions["nodoRight"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoRight,
      key: "nodoRight",
    });
    if (params.def.conditions["nodoOperator"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoOperator,
      key: "nodoOperator",
    });
    if (params.def.conditions["nodoResult"])
    refactValidate({
      ...params,
      mode: params.mode,
      validate: params.nodoResult,
      key: "nodoResult",
    });
  
  sendData(cleanDataEngine({ ...params }));
}
function cleanDataEngine(params = {}) {
  let validate = params.clone.querySelectorAll("math-field")
  let { artifact, def } = params;

  let auxResult = {};
  let orderInput = {};

  validate.forEach((item) => {
    if (!item.hasAttribute("disabled")) {
      orderInput[[item.classList[2]]] = item.value;
    }
  });

  auxResult = { results: def.dataInteraction };
  auxResult.artifact = Number(targetActive.split("_").at(-1));
  auxResult.typeArtifact = "Standard";
  auxResult.seconds = def.timeInteraction;
  auxResult.idMoodle = !targetActive.debug ? $idMoodle : "debug";
  auxResult.elementArtifact = { inputs: { orderInput } };

  return auxResult;
}