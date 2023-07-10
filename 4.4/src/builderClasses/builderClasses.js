
class Boards {
  constructor() {

    this.style = {

      axis: [false, true, true],
    }
  }

  setGrid(boolean = true) {
    this.style['grid'] = boolean
  }
  boardSize(width, height) {
    this.style['maxWidth'] = width;
    this.style['maxHeight'] = height
  }
  setOrigin(boolean = true) {
    this.style['origin'] = boolean
  }

  setBourdingBox(x1 = -4, y1 = 4, x2 = 4, y2 = -4) {
    this.style['boundingbox'] = [x1, y1, x2, y2]
  }

  createBoard(type = 1) {
    if (type === 1) {

      this.setGrid()
      this.setOrigin()
      this.setBourdingBox()
      this.style['valueAxis'] = {
        yd: [[0, 0], [0, 1]], //dirección del eje y
        xd: [[0, 0], [1, 0]],
        colory: "#000000",
        colorx: "#000000"
      }
    }
  }

  builder() {
    return {

      style: this.style
    }
  }
}

class ArtifactValidateInput {

  /**
   *  Clase utilizada para crear artefactos de inputs
   * 
   */
  constructor() {
    this.helpMsg = false
    this.maxCurves = 1
    this.condition = {}
    this.inputsToValidate = []
    this.allDefinition = {}
  }

  setMaxCurves(number) {
    this.maxCurves = number
  }

  createInput(defaultXvalue, succesValue, defaultYvalue = null) {
    const editable = succesValue === null ? false : true
    const data = { defaultXvalue, succesValue, editable, defaultYvalue }
    return data
  }

  createNewCurveToValidate(id = this.inputsToValidate.length) {
    const aux = id
    const data = {
      id: aux,
      inputs: [],
      infinities: false
    }

    this.inputsToValidate.push(data)
  }

  insertInputToCurve(defaultXvalue = 0, succesValue = null, id = this.inputsToValidate.length, defaultYvalue = null) {


    if (!this.inputsToValidate.length) {
      const response = confirm('debes crear primero una curva \n ¿desea crear la curva?');
      if (!response) return false

      this.createNewCurveToValidate(id)
    }

    let aux = this.inputsToValidate.filter(x => x.id == id)

    if (!aux.length) {
      const response = confirm(`La curva con el id: " ${id} " no se encuentra creada, \n ¿Deseas crearla?`);
      if (!response) return false
      this.createNewCurveToValidate(id)

    }

    aux = this.inputsToValidate.filter(x => x.id == id)


    const objectCurve = aux[0]
    //const input = this.createInput(defaultXvalue,succesValue)
    const input = succesValue === null ? this.createInput(defaultXvalue, null, defaultYvalue) : this.createInput(defaultXvalue, succesValue)

    objectCurve.inputs.push(input)

  }

  insertDefaultPointsToCurves(idCurve = null, ...points) {
    if (idCurve === null) {
      alert('ingresa el id en el llamado a insertDefaultPointsToCurves')
      return false
    }

    console.log(this.inputsToValidate);
    const aux = this.inputsToValidate.filter(x => x.id === idCurve)
    console.log(aux);

    if (!aux.length) {
      alert('Verifica el id Agregado')
      return false
    }

    aux[0].pointDefault = aux[0].pointDefault || []

    points.forEach(coord => {
      aux[0].pointDefault.push(coord)
    })

    /* const aux = this.inputsToValidate.map((x)=> {
      console.log(x);
    })
 */

  }

  insertDefaultInputToCurve(defaultXvalue = "x", defaultYvalue = "y", id = null) {
    if (id === null) {
      alert('ingresa el id en el llamado a insertDefaultInputsToCurve')
      return false
    }
    this.insertInputToCurve(defaultXvalue, null, id, defaultYvalue)

  }

  insertInfinitiesToCurve(firstSectors, lastSectors, id = null) {

    if (!id) {
      alert("es necesario que se agregue el id")
      return false
    }

    const aux = this.inputsToValidate.filter(x => x.id == id)
    const objectCurve = aux[0]
    console.log(objectCurve.infinities)
    
    objectCurve.infinities = !objectCurve.infinities ? [] : objectCurve.infinities

    objectCurve.infinities[0] = firstSectors
    objectCurve.infinities[1] = lastSectors


  }

  addHelpMessage(title = '<titulo>', text = 'texto') {
    this.helpMsg = {
      title, text
    }
  }


  builder() {

    return {

      helpMsg: this.helpMsg,
      maxCurves: this.inputsToValidate.length,

      conditions: {
        inputsToValidate: this.inputsToValidate
      }
    }
  }

}

class ArtifactKeysAndTables {
  constructor() {
    this.buttonsActive = true;
    this.depurate = false;
    this.characteristicsArtifact = {}
    this.defaultInput = {}
    this.conditions = {}
  }

  //Creacion de tablas

  createTable(classTypeParent = 'tbody') {

    this.characteristicsArtifact.tablet = {
      typeParent: classTypeParent,
      typeChild: []
    }

    this.conditions.table = []
  }

  addRowinTable(text = '<inserte Texto>', succesValue = '', disabledOrEnable = false, textField) {
    
    if (!this.characteristicsArtifact.tablet) {
      alert('No existe ninguna tabla creada')
      return
    }
    const table = this.characteristicsArtifact.tablet.typeChild
    console.log(table);
    const data = {
      nodeChild: {
        tag: "tr",
        child: [
          { tag: "th", textDefault: text, disabled: disabledOrEnable },
          {
            tag: "td",
            child: { tag: "math-field", value: textField, disabled: disabledOrEnable }
          }
        ]
      }
    }

    table.push(data)
    this.addCondition(succesValue, 'table')
  }

  addDefaultRow(text = '<text Default>', value = '') {
    this.addRowinTable(text, value, true, value)
  }

  addCondition(succesValue = '', property = '') {
    if (property === "table") {
      console.log('valor correcto en ',succesValue);
       
    if(Array.isArray(succesValue)){
      console.log('lo que se envia es un array');
      this.conditions[property].push(succesValue)
      return
    }

      this.conditions[property].push([succesValue])
      return
    }
    console.log('valor correcto en2 ',succesValue);

    this.conditions[property].push(succesValue)

  }

  //creacion de key and scr een

  createArtifactGridSimple() {
    this.characteristicsArtifact.typeForm = "artifactGridSimple";
    //this.characteristicsArtifact.typeForm = "artifactGrid";

    this.characteristicsArtifact.arrow = {
      count: 1,
      direction: "down"
    }
    this.characteristicsArtifact.typeDiv = []

    this.defaultInput.screen = { defaultText: [] }
    this.defaultInput.key = { defaultText: [] }
    this.conditions.screen = []
    this.conditions.key = []

    console.log(this.conditions);
  }

  createRounded(succesValue = 1, textValue = '', numberOfRounded = 1, formClassParam = 'rounded', sizeParam = { width: "200px", height: "50px", }, disabled = false) {

    const aux = this.characteristicsArtifact.typeDiv.filter((objectDef) => objectDef.id == 'roundedElements')
    const valueCondition = !disabled ? succesValue : []
    
    if (!aux.length) {
      console.log('aaaaaaaaaaaa', succesValue);
      const data = {
        id: 'roundedElements',
        rounded: {
          count: numberOfRounded,
          border: "1px solid black",
          formClass: formClassParam,
          size: sizeParam
        }
      }

      this.characteristicsArtifact.typeDiv.push(data)
      this.addDefaultTextInRoundedAndKey(textValue, disabled, 'screen')
      this.addCondition(valueCondition, 'screen')
      return
    }

    aux[0].rounded.count += numberOfRounded
    if (aux[0].rounded.count > 2) {
      this.characteristicsArtifact.typeForm = "artifactGrid";
      this.characteristicsArtifact.arrow.count += 1
    }
    this.addDefaultTextInRoundedAndKey(textValue, disabled, 'screen')
    console.log('aaaaaaaaaa', succesValue);
    this.addCondition(succesValue, 'screen')

  }

  createKey(textValue = '', succesValue, numberOfKeys = 1, formClassParam = "square", sizeParam = { width: "100px", height: "50px", }, disabled = false) {

    const valueCondition = !disabled ? [succesValue] : []
    const aux = this.characteristicsArtifact.typeDiv.filter((objectDef) => objectDef.id === 'squareElements')

    if (!aux.length) {
      const data = {
        id: 'squareElements',
        square: {
          count: numberOfKeys,
          border: "1px solid black",
          formClas: formClassParam,
          size: sizeParam
        }
      }

      this.characteristicsArtifact.typeDiv.push(data)
      console.log(this.characteristicsArtifact);
      this.addCondition(valueCondition, 'key')
      this.addDefaultTextInRoundedAndKey(textValue, disabled, 'key')
      return
    }

    aux[0].square.count += numberOfKeys
    this.addDefaultTextInRoundedAndKey(textValue, disabled, 'key')
    this.addCondition(valueCondition, 'key')
    return
  }

  createDefaultKey(textValue) {
    this.createKey(textValue, '', 1, 'square', { width: "100px", height: "50px", }, true)
  }

  addDefaultTextInRoundedAndKey(text = '', disabledParam = false, property) {
    console.log('text', text);
    const data = { textValue: text, disabled: disabledParam }
    this.defaultInput[property].defaultText.push(data)
  }


  createRoundedDefault(text = '<inserta Texto>') {
    this.createRounded(1, text, 1, 'rounded', { width: "200px", height: "50px", }, true)
  }

  builder() {
    return {
      buttonsActive: this.buttonsActive,
      characteristicsArtifact: this.characteristicsArtifact,
      defaultinput: this.defaultInput,
      conditions: this.conditions
    }
  }
}

class ArtifactOwner {
  /**
   * clase utilizada para crear artefactos
   */
  constructor() {
    this.artifactHtml = {}
    this.dataDefault = []
    this.conditions = {}
    this.currentArtifact = 'hi'
  }


  /**
  * Metodo que proporciona un nodo aislado en el cual trabajar
  * @param {*} idParam -> Tipo de elemento a crear
  * @param {*} classGlobalParam clase global por defecto "QA" ya no va
  * @param {*} parentParam clase del contenedor donde va el elemento
  */
  createNewNode(typeParam = 11, idParam = '1', parentParam = "#oneContainer") {
    const data = {
      id: idParam,
      type: typeParam,

      parent: parentParam,
      contents: {
      }
    }

    // data.contents[`artifact_${Object.keys(data.contents).length +1}`] = {}
    //console.log('hola',Object.keys(data.contents).length +1 );
    this.dataDefault.push(data)
    //console.log(data);

  }

  //**************************************************************************************************************************************************

  /**
  * Metodo que crea y setea que el artefacto sera un conjunto de preguntas
  * @param {*} idNode 
  * @param {*} idQuestionsGroup 
  */
  createQuestionsGroup(idNode = 0, idQuestionsGroup = 0) {
    let aux = this.dataDefault.filter(objectDefinition => objectDefinition.id === idNode)

    if (!aux.length) {
      this.createNewNode(11, idNode)
      aux = this.dataDefault.filter(objectDefinition => objectDefinition.id === idNode)
    }

    const containerArtifacts = aux[0].contents

    aux[0].contents[`artifact_${Object.keys(containerArtifacts).length + 1}`] = {
      id: idQuestionsGroup,
      allinputs: [], //nodos que se van generando
      dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 }, // aciertos y fallas}
      questions: []
    }
    console.log(containerArtifacts);
    this.currentArtifact = aux[0].contents[`artifact_${Object.keys(containerArtifacts).length}`]
    console.log(containerArtifacts);

  }

  //************************************************************************************************************************************************** */

  /**
  * Metodo que establece que el artefacto sera una tabla
     * @param {*} idNode 
     * @param {*} idTable 
     */

  createTable(idNode = 0, idTable,) {

    let aux = this.dataDefault.filter(objectDefinition => objectDefinition.id === idNode)
    if (!aux.length) {
      this.createNewNode(11, idNode)
      aux = this.dataDefault.filter(objectDefinition => objectDefinition.id === idNode)
    }


    const containerArtifacts = aux[0].contents
    aux[0].interactive = true

    aux[0].parent = aux[0].parent ? aux[0].parent : '#tabla1'
    aux[0].contents[`artifact_${Object.keys(containerArtifacts).length + 1}`] = {
      id: idTable,
      allinputs: [], //nodos que se van generando
      dataInteraction: { incorrect: 0, correct: 0, forAnswer: 0 }, // aciertos y fallas}
      cells: []
    }

    console.log('auxxx 0', aux[0]);
    this.currentArtifact = aux[0].contents[`artifact_${Object.keys(containerArtifacts).length}`]

  }

  //*************************************************************************************************************************************************** */

  /**
  * Metodo que sirve para agregar una fila a la tabla
  * @param  {...any} fields 
  */
  addRowToTable(...fields) {
    console.log(fields);
    const columns = this.currentArtifact.header
    const newRow = []

    columns.forEach((colum, index) => {
      newRow.push(fields[index])
    })
    console.log(newRow);
    this.currentArtifact.cells.push(newRow)
  }


  //*************************************************************************************************************************************************** */


  /**
  * Metodo que sirve para agregar los titulo de cada columna, el numero de parametro determinara la cantidad de columnas de la tabla en cuestion
  * @param  {...any} headers 
  */

  createHeadOfTable(...headers) {
    console.log(this.currentArtifact);
    this.currentArtifact.header = []
    const data = {}
    this.currentArtifact.header = [...headers]

    console.log('CURRENT', this.currentArtifact);

  }

  //*************************************************************************************************************************************************** */


  /**
  * Devuelve el codigo necesario para agregar un campo de texto a una tabla
  * @param {*} textParam 
  * @returns 
  */
  createTextFieldToTable(textParam = '') {
    console.log('llega> ', textParam);
    const data = {
      type: 0,
      text: [textParam],
      conditions: {
        correctIndex: null,
      }
    }

    return data
  }

  //*************************************************************************************************************************************************** */


  /**
  * Devuelve el codigo necesario para agregar un select a una tabla
  * @param  {...any} options 
  * @returns 
  */
  createSelectFieldToTable(...options) {
    options.unshift('Preguntas')

    const data = {
      type: 2,
      answers_values: [],
      conditions: {
        correctIndex: 0,
      }
    }

    options.forEach((option, index) => {
      if (Array.isArray(option)) {
        data.answers_values.push(option[0])
        data.conditions.correctIndex = index
        return
      }

      data.answers_values.push(option)
      return
    })

    return data

  }

  //*************************************************************************************************************************************************** */

  /**
  * Devuelve el codigo necesario para agregar un input a una tabla
  * @param {*} succesResponse 
  * @param {*} latexOrText 
  * @returns 
  */
  createInputsToTable(succesResponse, latexOrText = false) {
    const data = {
      type: 3,
      inputsDefault: [
        ['', latexOrText]
      ],
      conditions: {
        valueInputs: [
          [succesResponse]
        ]
      }
    }

    return data

  }

  //fin creacion de tablas
  //*************************************************************************************************************************************************** */



  createInput(question = null, succesResponse = null, idParam = null) {
    const aux = this.dataDefault.filter(objectDefinition => objectDefinition.id === idParam)

    if (!aux.length) {
      this.createNewNode(11, idParam)
      console.log(' Nuevo Nodo creado');
      return
    }


    console.log(aux);
    console.log('holaa');

  }

  createOneQuestionWithManyInputs(questionParam, latexOrText = true, ...inputs) {

    const aux = this.dataDefault

    const data = {
      type: 3,
      question: questionParam,
      inputsDefault: [],
      conditions: {
        valueInputs: []
      }
    }

    inputs.forEach(objectDefinition => {
      data.inputsDefault.push([objectDefinition[0], latexOrText])
      data.conditions.valueInputs.push(`${objectDefinition[1]}`)
    })

    this.currentArtifact.questions.push(data)
    console.log(data);

  }



  createSelectWithOneQuestion(questionParam, ...options) {
    options.unshift("-- Preguntas --")
    const data = {
      type: 2,
      question: questionParam,
      answers_values: [],
      conditions: {
        correctIndex: 1
      }
    }

    options.forEach((option, index) => {
      console.log(option);
      if (Array.isArray(option)) {
        const correctIndex = index
        data.conditions.correctIndex = correctIndex
        data.answers_values.push(option[0])

        return
      }

      data.answers_values.push(option)

      return
    })

    console.log('opciones ', data);
    console.log(this.currentArtifact);
    this.currentArtifact.questions.push(data)

  }

  /**
* Calcula la suma de dos números.

@param questionParam => se trata de la pregunta que muestra.
@param options => se trata tanto del numero de radiobuttons como de sus etiquetas. solo se colocan las etiquetas.
@returns {number} La suma de los dos números.
*/
  createRadioButton(questionParam, ...options) {

    const data = {
      type: 1,
      question: questionParam,
      answers_values: [],
      conditions: {
        correctIndex: ''
      }
    }

    options.forEach((option, index) => {

      if (Array.isArray(option)) {
        data.conditions.correctIndex = option[0]
        data.answers_values.push(option[0])
        return
      }

      data.answers_values.push(option)
      return
    })

    this.currentArtifact.questions.push(data)
  }

  builder() {
    return {
      datadefault: this.dataDefault
    }
  }

}

