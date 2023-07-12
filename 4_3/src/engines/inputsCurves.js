//> INICIO________/\/\____/\/\________/\/\/\________/\/\___________/\/\________/\/\_________/\/\______/\/\_________/\/\_________/\/\__________ ...

//Documentación e información de Definiciones: https://docs.google.com/document/d/1EhjchD7XvrH148LPJC4sK1WNrSmJOPsBXtVtwLx28So/edit?usp=sharing 
//EJEMPLO: https://jsfiddle.net/h2gr9y34/2/
//Documentación de la librería: https://cortexjs.io/mathlive/

//CREAR RAMA EN REPOSITORIO

let icPreviousValidation = null


//=========================================================| Función Principal |==================================================================

function icMain(icDefParam, etwDefBoardsParam) {

    const tmp = document.querySelector("#tmp-inputCurves");
    const divs = document.querySelectorAll(".element-inputCurves");

    divs.forEach((div, i) => {

        const clone = tmp.content.firstElementChild.cloneNode(true);
        const $board = clone.querySelector(".inputArtifact__board");
        const btnAll = clone.querySelector(".inputArtifact__btn");

        const id = "inputArtifact__board-" + i;
        const refArtifact = `artifact_${i}`

        $board.setAttribute("id", id);
        clone.id = refArtifact

        const boardSelect = div.dataset.board;

        if (!etwDefBoardsParam[boardSelect]) {
            console.warn("<!> board undefined <!>");
            return;
        }

        if (!icDefParam[refArtifact]) {
            console.warn('🧐 No hay defición', refArtifact, "");
            return
        }

        const artifactDefault = {
            debug: false,
            statusValidate: false,
            curves: [],
            pointsData: [],
            points: [],
            pointsAndInputs:[],
            pointsToCurves: [],
            maxCurves: 2,
            inputsElement: undefined,
            elementsInfiniteData: {},
            timeInteraction: 0,
            artifactNumber: i + 1,
            ...icDefParam[refArtifact],
            conditions: {
                inputsToValidate: icDefParam[refArtifact].conditions.inputsToValidate || false,
                pointsWithInputs:icDefParam[refArtifact].conditions.pointsWithInputs || false
            },
        };

        const style = etwDefBoardsParam[boardSelect].style;

        div.style =
            "width: " +
            (style.maxWidth || "") +
            "px; height: " +
            (style.maxHeight || "") +
            "px;";
        div.appendChild(clone);

        clone.addEventListener('click', () => {
            if (!clone.classList.contains('shadow')) clone.classList.add('shadow')
        })
        btnAll.addEventListener('click', (e) => {
            if (e.target.classList.contains("inputArtifact__btnCreateCurve")) {
                gTime(icDefParam[refArtifact], false, false);
                icValidation(artifactDefault.conditions, board, artifactDefault, clone, icPreviousValidation)
                console.log('checked');
                e.stopPropagation()
            }
            else if (e.target.classList.contains("infinite")) {
                console.log("infinities");
                gButtonToggle({ def: artifactDefault, button: e.target, mode: 6 })
                const curve = artifactDefault.curves[0]

            }
            else if (e.target.classList.contains("pointClose")){
                gButtonToggle({ def: artifactDefault, button: e.target, mode: 1})
            }
            else if (e.target.classList.contains("inputArtifact__btnReset")) {
                console.log('reset');
                resetArtifact(artifactDefault, board, clone, refArtifact)
            }

        })


        const board = etwDefBoard(icDefParam, etwDefBoardsParam, refArtifact, boardSelect, id, style,);
        board.on('down',()=>{
            if (artifactDefault.mode === 1) {
                cDefAddPoint(artifactDefault, board, null,{
                    input: {
                        noiseY: 0.5,
                        noiseX:0.5
                     },
                });
             };
            
        })

        elementOfArtifact(artifactDefault, etwDefBoardsParam, refArtifact, clone, board, icPreviousValidation)


        icDefParam[refArtifact] = artifactDefault;
    });
}

//======================================================== Función Para Pintar Boards |====================================================

function etwDefBoard(etwDefParam, etwDefBoardsParam, ref, boardSelect, id, style) {
    const elementReturned = gBoard(ref, etwDefBoardsParam[boardSelect], id, style)
    return elementReturned['board'];
}

//funcion para crear elementos por artefactos

function elementOfArtifact(artifactDefault, boardDefinition, refArtifact, clone, board, previousValues) {

    if (artifactDefault.conditions.inputsToValidate) {
        icCreateInputs(artifactDefault.conditions, clone, board, artifactDefault, previousValues)
    }

    if (artifactDefault.helpMsg) {
        clone.querySelector(`#${refArtifact} .help-btn`).classList.remove('d-none')
        gHelpMsg(artifactDefault, clone, refArtifact)
    }

    if(artifactDefault.conditions.pointsWithInputs){
        clone.querySelector(`#${refArtifact} .pointClose`).classList.remove('d-none')
    }


}

//===============================================| Función para crear inputs |==================================================================
function icCreateInputs({ inputsToValidate }, dom, board, artifact, previousValues) {

    const containerInputs = dom.querySelector('.inputArtifact__inputs')
    const tmpInputs = document.getElementById('tmp-coords')
    const fragment = new DocumentFragment()
    const allInputs = []


    inputsToValidate.map((elements, indexObject) => {

        elements.inputs.map((inputObject, index, array) => {

            const cloneInput = tmpInputs.content.firstElementChild.cloneNode(true)
            const coordX = cloneInput.querySelector('.defaultCoordX')
            const input = cloneInput.querySelector('.inputArtifact__inputCoord')

            inputObject.defaultYvalue = inputObject.defaultYvalue
            inputObject.editable = inputObject.editable === false ? false : true
            inputObject.pointObject = null
            inputObject.status = null
            inputObject.curveName = `curve-${indexObject}`

            coordX.textContent = inputObject.defaultXvalue

            if (inputObject.editable) {
                input.addEventListener('input', () => {
                    inputObject.status = icValidateInputs(inputObject, input, cloneInput, artifact)
                    const point = managePoints(inputObject, input, board, artifact, dom, indexObject)

                    if (point != null && typeof point != 'number') {
                        inputObject.pointObject = point
                    }

                })

                input.addEventListener('change', (e) => {
                    if (icPreviousValidation === null){
                        icPreviousValidation = {inputs : [inputObject.status], infinities: []}
                        
                    }else{

                        const currentObject = {inputs :[], infinities: [] }
                        const allStatus = inputsToValidate.map(objectCurves => objectCurves.inputs.map(objectInput => objectInput.status )) //obteniendo los status
                        let array = []
                        const values = allStatus.forEach(x => { //obteniendo array de status
                            array = [...array,...x.filter(value => value !== null)]
                        })

                        currentObject.inputs = array

                        const equal = equalValues(currentObject, icPreviousValidation)
                        
                        if(!equal){
                            icPreviousValidation.inputs = currentObject.inputs.map(x => x)
                            cleanData(artifact,null,null)
                        }

                    }
                })
            }
            else {
                input.setAttribute('readonly', '')
                input.setAttribute('data-editable', 'true')
                //input.setAttribute('contenteditable', 'false')
                input.textContent = inputObject.defaultYvalue || 'Y'
                inputObject.status = true
            }

            input.id = `input-${indexObject}-${index}`
            allInputs.push(input)
            fragment.appendChild(cloneInput)
        })

        containerInputs.appendChild(fragment)
        setInputsOptions(allInputs, 1, dom)
        artifact.inputsElement = allInputs

    })

}

function icValidateInputs({ succesValue }, input, element, artifact) {

    if (!input.value) {
        element.classList.remove('pass')
        element.classList.remove('failed')
        return false
    }

    if (succesValue === input.value) {
        if (element.classList.contains('failed')) element.classList.remove('failed')
        element.classList.add('pass')
        return true
    }
    else {
        if (element.classList.contains('pass')) element.classList.remove('failed')
        element.classList.add('failed')
        return false
    }

}

const handleValidatedInputs = (clone) => {
    console.log(clone);
    
    animationResponse('text', clone, 'Debes rehacer la curva para agregar cambios')
    setTimeout(() => {
        console.log(clone.querySelector('.msg'));
        animationResponse(null, clone)
    }, 3000)
    console.log('evento handle');
}

const handleInputOptionsKeyboard = (input) => {
    input.removeAttribute('readonly')
    const optionsKeyboard = getKeyboardMath(window.screen.width)
    input.setOptions({
        "customVirtualKeyboardLayers": optionsKeyboard[0],
        "customVirtualKeyboards": optionsKeyboard[1],
        "virtualKeyboards": optionsKeyboard[2],
    });
}

function setInputsOptions(allInputs, band = 1, clone = null) {

    const pivote = (input, x) => {

        const aux = Number(input.dataset.status)
        if (aux === 1) handleInputOptionsKeyboard(input)
        if (aux === 3) { handleValidatedInputs(clone); }
    }

    allInputs.forEach(input => {

        if (band === 1) {
            input.setAttribute('data-status', '1')
            input.addEventListener('click', () => pivote(input, clone))
        }

        if (band === 2) {
            input.setAttribute('readonly', '')
        }
        if (band === 3) {
            input.setAttribute('data-status', '3')
        }
    })
}

function managePoints({ defaultXvalue, status, pointObject, curveName } = param, input, board, artifact, clone, indexObject) {

    const contentInput = input.value
    const x = latexCalc(defaultXvalue)

    if (contentInput !== '') {
        if (pointObject === null) {

            //const point =  board.create('point',[parseFloat(defaultXvalue)|| 0,parseFloat(input.value) || 0],{fixed:true})
            //console.log(latexCalc(defaultXvalue))
            const point = board.create('point', [latexCalc(defaultXvalue) || 0, parseFloat(input.value) || 0], { fixed: true, name: '' })

            point.curveName = curveName
            artifact.pointsToCurves[indexObject] = artifact.pointsToCurves[indexObject] ?? []

            artifact.pointsData.push(point)
            artifact.pointsToCurves[indexObject].push(point)

            return point
        }
        else { //cuando edita el punto que ya esta creado

            const pointOfcurves = artifact.pointsToCurves.filter(x => x[0]?.curveName === curveName)

            if (!pointOfcurves.length) {
                artifact.pointsToCurves.push([pointObject])
            }


            pointObject.setPosition(JXG.COORDS_BY_USER, [pointObject.X(), parseFloat(input.value)])
            pointObject.setAttribute({ visible: true })

            const findPoint = artifact.pointsData.findIndex(e => e === pointObject)

            if (pointOfcurves[0] === undefined) return

            const y = pointOfcurves[0].findIndex(z => z.id === pointObject.id)

            if (findPoint === -1) { artifact.pointsData.push(pointObject) }
            if (y === -1) { pointOfcurves[0].push(pointObject) }
            animationResponse(null, clone)
            board.update()
        }

    }
    else {

        if (pointObject !== null) {

            pointObject.setAttribute({ visible: false })
            const aux = artifact.pointsToCurves.filter(x => x[0].curveName === curveName)
            const newArray = deleteElements(aux[0], "id", pointObject.id)


            artifact.pointsToCurves = artifact.pointsToCurves.map(item => item[0]?.curveName === curveName ? newArray : item)
            artifact.pointsToCurves = artifact.pointsToCurves.filter (array => array.length > 0)
            artifact.pointsData = deleteElements(artifact.pointsData, 'id', pointObject.id)


            animationResponse(null, clone)

            board.update()
        } else {
            return null
        }
    }

}

function deleteElements(array, key, idOrName) {
    return array.filter(item => item[key] !== idOrName)
}


function icValidation({ inputsToValidate,pointsWithInputs }, board, artifact, clone, previousValues) {
    console.log(pointsWithInputs);
    const { pointsData, pointsToCurves, curves, inputsElement, mode, maxCurves } = artifact
    let info = ''
    let warning = ''
    let inputsValidation = []

    const allCurrentResponse = {
        inputs: [],
        infinities : []
    }

    let response = inputsToValidate.map((objectDefinition, index) => {
        let response = false
        let curve = curves[index] ?? false


        const inputsToValidation = objectDefinition.inputs.filter((obj) => obj.editable !== false)
        const toSave = inputsToValidation.map(object => object.status)
        allCurrentResponse.inputs = allCurrentResponse.inputs.length ? [...allCurrentResponse.inputs, ...toSave] : toSave 
        


        if (pointsToCurves[index] === undefined || pointsToCurves[index] === 1) return false

        response = inputsToValidation.every((input) => input.status === true)

        if(!response) warning = 'Los puntos colocados son incorrectos'

        pointsToCurves[index].sort((p1, p2) => p2.X() - p1.X())

        if (curves.length < maxCurves && artifact.statusValidate === false) {
           
            const defaultPoint = objectDefinition.pointDefault ? objectDefinition.pointDefault : false
            console.log(defaultPoint);
            const objectDefaultPoints = []
            if(defaultPoint){
                const aux = defaultPoint.map(coord => {
                    return board.create('point',[coord[0], coord[1]],{visible:false})
                })
                objectDefaultPoints.push(...aux)
            }

            pointsToCurves[index].push(...objectDefaultPoints)
            pointsToCurves[index].sort((p1, p2) => p2.X() - p1.X())

            curve = board.create('cardinalspline', [pointsToCurves[index], 1, 'centripetal'], { strokeColor: 'black', strokeWidth: 3 },)

            curve.curveName = pointsToCurves[index][0].curveName

            const firstPoint = Object.values(curve.ancestors).at(-1)
            const lastPoint = Object.values(curve.ancestors)[0]

            firstPoint.infinityMode = false
            lastPoint.infinityMode = false

            const auxFirstPoint = board.create('point', [
                curve.points.at(-18)?.usrCoords.slice(1)[0] || 0,
                curve.points.at(-18)?.usrCoords.slice(1)[1] || 0,
            ], { name: "", visible: false, color: "red" })

            const auxLastPoint = board.create('point', [
                curve.points[18]?.usrCoords.slice(1)[0] || 0,
                curve.points[18]?.usrCoords.slice(1)[1] || 0,
            ], { name: "", visible: false, color: "red" })

            pointInteraction({ point: firstPoint, point2: auxFirstPoint, curve, board, objectArtifact: artifact }, 0)
            pointInteraction({ point: lastPoint, point2: auxLastPoint, curve, board, objectArtifact: artifact }, 1)

            curve.pivotes = [auxFirstPoint, auxLastPoint]
            curves.push(curve)
        }


        if (objectDefinition.infinities) {   
           
            response = validateInfinities(curve.curveName, artifact, objectDefinition.infinities) // true si los infinitos son correctos
      
            if (!artifact.statusValidate) {
                info = 'Recuerda colocar los infinitos'
            }else if(!response){
                warning = 'Agrega o revisa el angulo de los infinitos'
            }

            allCurrentResponse.infinities = allCurrentResponse.infinities.length ? [...allCurrentResponse.infinities, response] : [response]
        }

        return response
    })
   
    if(pointsWithInputs){

        console.log('points w Inputs', pointsWithInputs);
        const responseInputs = pointsWithInputs.map((objectDefinition) => {
            const coordDefinition = objectDefinition.coord
            const value = objectDefinition.value

            const auxPoint = artifact.pointsAndInputs.some(object => {
                console.log(object);
                console.log(object.input.value);
                return (gInterPoint(object.point.coords.usrCoords[1], coordDefinition)) && (value === object.input.value)
            })

            objectDefinition.status = auxPoint
            
            return auxPoint
        })

        inputsValidation = [...responseInputs]
        console.log('respuesta de los inputs',inputsValidation);
    }
   
    const validation = response.every((x) => x === true) && inputsValidation.every( x => x === true)
    
    const optionAnimation = info ? info : validation

    if(!info){
        cleanData(artifact, allCurrentResponse, response, inputsValidation)
    }
    
    if(info){
        animationResponse(info, clone, info)
    }else if (warning){
        animationResponse(warning, clone, warning)
    }else{
        animationResponse(validation, clone)
    }

    setInputsOptions(artifact.inputsElement, 2, clone)
    setInputsOptions(artifact.inputsElement, 3, clone)
    artifact.statusValidate = true
}


function animationResponse(status, clone, text = '') {

    const msg = clone.querySelector(".msg")
    msg.textContent = ''

    if (status === true) {

        msg.classList.remove('d-none')
        if (msg.classList.contains('msg__error')) msg.classList.remove('msg__error')
        if (msg.classList.contains('infoAlertContainer')) msg.classList.remove('infoAlertContainer')
        if (msg.classList.contains('alertSucces')) msg.classList.remove('alertSucces')
        msg.classList.add('msg__succes')
        msg.classList.add('animateSucces')
        setTimeout(function () {
            msg.classList.add('animateSucces')
        }, 100)
    }
    else if (status === false) {
        msg.classList.remove('d-none')
        if (msg.classList.contains('infoAlertContainer')) msg.classList.remove('infoAlertContainer')
        if (msg.classList.contains('alertSucces')) msg.classList.remove('alertSucces')
        if (!msg.classList.contains('msg__error')) msg.classList.add('msg__error')
        msg.classList.add('animateError')
        setTimeout(function () {
            msg.classList.add('animateError')

        }, 100)
    } else if (typeof status === 'string') {
        msg.classList.remove('d-none')

        if (msg.classList.contains('msg__error')) msg.classList.remove('msg__error')
        if (msg.classList.contains('msg__succes')) msg.classList.remove('msg__succes')

        if (!msg.classList.contains('infoAlertContainer')) msg.classList.add('infoAlertContainer')
        if (!msg.classList.contains('alertSucces')) msg.classList.add('alertSucces')
        msg.textContent = text
        setTimeout(function () {
            msg.classList.add('animateInfo')
        }, 100)

    }
    else if (status === null) {

        if (!msg.classList.contains('d-none')) {
            msg.classList.add('d-none')
            if (msg.classList.contains('msg__succes')) msg.classList.remove('msg__succes')
            if (msg.classList.contains('msg__error')) msg.classList.remove('msg__error')
            if (msg.classList.contains('infoAlertContainer')) msg.classList.remove('infoAlertContainer')
            if (msg.classList.contains('alertSucces')) msg.classList.remove('alertSucces')

        }
    }

    setTimeout(function () {
        if (msg.classList.contains('animateSucces')) msg.classList.remove('animateSucces')
        if (msg.classList.contains('animateError')) msg.classList.remove('animateError')
        if (msg.classList.contains('animateInfo')) msg.classList.remove('animateInfo')

    }, 500)
}


function resetArtifact(artifact, board, clone, refArtifact) {
    const { inputsToValidate } = artifact.conditions
    const domInputs = document.querySelectorAll(`#${refArtifact} .inputArtifact__coord`)

    if (domInputs.length) {
        domInputs.forEach(input => {
            if (input.classList.contains('pass')) input.classList.remove('pass')
            if (input.classList.contains('failed')) input.classList.remove('failed')
        })
    }

    if (artifact.inputsElement) {
        artifact.inputsElement.forEach(input => {
            console.log(input.dataset.editable);
            if(!Boolean(input.dataset.editable))input.value = ''
        } )
    }

    if (artifact.curves.length) {

        const aux = []
        artifact.curves.forEach(curve => curve.remove())
        artifact.curves = aux.map(x => x)

    }

    if (artifact.pointsData.length) {
     
        const points = artifact.pointsData.splice(0, artifact.pointsData.length)
        points.forEach(point => {
            point.setAttribute({ visible: false })
            if (point.infinityMode) point.infinityMode = false
        })
    }

    inputsToValidate.forEach(objectInput => {
        objectInput.inputs.forEach((input) => {
            input.status = null
            input.pointObject = null
        })

    })



    if(artifact.pointsAndInputs.length){
        const aux = []

        artifact.pointsAndInputs.forEach((item)=>{
            board.removeObject(
                item.point
            )

            board.removeObject(
                item.mathfield,
                
            )
            //item.mathfield
        })

        artifact.pointsAndInputs = aux.map(x => x)
        
        board.update()
    }

    for (const property in artifact.elementsInfiniteData) {
        artifact.elementsInfiniteData[property].forEach(array => array.forEach(objectInfinite => objectInfinite.remove()))
    }
    delete artifact.elementsInfiniteData
    artifact.elementsInfiniteData = {}

    console.log(artifact.elementsInfiniteData);
    const aux = []
    artifact.pointsToCurves = aux.map(x => x)

    setInputsOptions(artifact.inputsElement, 1, clone)

    artifact.statusValidate = false
    icPreviousValidation = null

    animationResponse(null, clone)
    board.update()
}

function cleanData({ conditions, artifactNumber }, objectResponse, response = null, responseInputs = null ) {
    const data = {}
    const { inputsToValidate, pointsWithInputs } = conditions

    const correctInputs = []
    let incorrectInputs = []
    let inputsForAnswer = []

    const interactivePointCorrect = []
    const interactivePointIncorrect = []
    const interactivePointForAnswer = []

    const correct = response != null ?  response.filter((x) => x === true).length : 0
    const incorrect = response != null ? response.filter((x)=> x === false ).length : 0

    inputsToValidate.forEach((object)=> {
       const auxCorrect = object.inputs.filter(x => x.status == true)
       const auxIncorrect = object.inputs.filter(x => x.status == false)
       const auxForAnswer = object.inputs.filter(x => x.status == null)

       incorrectInputs.push(...auxIncorrect)
       inputsForAnswer.push(...auxForAnswer)
       correctInputs.push(...auxCorrect)
    })


    if(pointsWithInputs){
  
        pointsWithInputs.map(x => console.log(x.status))
        const auxCorrect = pointsWithInputs.filter((object)=> object.status === true)
        const auxIncorrect = pointsWithInputs.filter((object)=> object.status === false)
        console.log(auxCorrect);
        interactivePointCorrect.push(...auxCorrect)
        interactivePointIncorrect.push(...auxIncorrect)
    }

    console.log(interactivePointCorrect.length);
    console.log(interactivePointIncorrect.length);
    const aux = inputsToValidate.length - (correct + incorrect)
    
    data.artifact = artifactNumber
    data.typeArtifact = 'Standar'
    data.results = { 
        inputs: {
            correctInputs:correctInputs.length,
            incorrectInputs:incorrectInputs.length,
            inputsForAnswer:inputsForAnswer.length
        },
        curves:{
            correct,
            incorrect,
            forAnswer: aux,
        },
        
        }

        if(response === null) data.results.curves.forAnswer = inputsToValidate.length

        if(pointsWithInputs){
            data.results.pointsWithInputs =  {
                correct: interactivePointCorrect.length,
                incorrect:interactivePointIncorrect.length
            }
        }
    console.log(data)
}

function latexCalc(latex) {
    const computer = new ComputeEngine.ComputeEngine({ numericMode: "complex" })
    return computer.parse(latex).N()._value
}

function pointInteraction(params, index = 0) {

    params.point.on('down', (e) => {

        console.log(params.point.infinityMode);
        if (params.point.infinityMode) {
            console.log(params.point.infinityMode);
            console.log('sale por infinities mode');
            return null
        }

        if (params.objectArtifact.mode != 6) return

        const aux = infinityDrawing(params, params.point2)
        const infinities = [params.point, ...aux[1]]
        params.curve.infinities = params.curve.infinities ?? []
        console.log("indeeex", params.curve.infinities);
        params.curve.infinities[index] = [...infinities]

        params.point.infinityMode = params.point.infinityMode === false ? true : false

        params.objectArtifact.elementsInfiniteData = params.objectArtifact.elementsInfiniteData ?? {}
        params.curve.elementsInfiniteData = params.curve.elementsInfiniteData ?? {}
        params.objectArtifact.elementsInfiniteData[params.curve.curveName] = params.objectArtifact.elementsInfiniteData[params.curve.curveName] ?? []

        params.objectArtifact.elementsInfiniteData[params.curve.curveName].push(aux[0])

    })
}

function infinityDrawing(params = {}, point2, count = 0, element = [], style = { visible: false }, elementsData = []) {
    if (count >= 2) { return [elementsData, element]; }
    console.log('x');
    const p1 = params.board.create('mirrorpoint', [point2, params.point], style);

    const c1 = params.board.create('circle', [params.point, p1], { visible: false });

    const c2 = params.board.create('circle', [p1, params.point], { visible: false });

    const i1 = params.board.create('intersection', [c1, c2, 0], style);
    const i2 = params.board.create('intersection', [c1, c2, 1], style);

    const arc = params.board.create('circumcirclearc', [i1, p1, i2], { visible: false });
    const p2 = params.board.create('glider', [p1.X(), p1.Y(), arc], { name: '', color: "#2196f3" });

    elementsData = [...elementsData, p1, c1, c2, i1, i2, arc, p2]

    return infinityDrawing({ ...params, point: p2 }, params.point, count + 1, [...element, p2], style = { visible: false }, elementsData);
};

function defAngle(x1, y1, x2, y2) {
    return (Math.atan2(y2 - y1, -1 * x2 - -1 * x1) * 180) / Math.PI;
};

function getOrientation(angle) {

    if (angle > 90 && angle <= 120) {
        return 1
    }
    else if (angle > 120 && angle <= 180) {
        return 2
    }
    else if (angle > -180 && angle <= -120) {
        return 3
    }
    else if (angle > -120 && angle <= -90) {
        return 4
    }
    else if (angle > -90 && angle <= -60) {
        return 5
    }
    else if (angle > -60 && angle <= -30) {
        return 6
    }
    else if (angle > -90 && angle <= 0) {
        return 7
    }
    else if (angle > 0 && angle <= 30) {
        return 8
    }
    else if (angle > 0 && angle <= 30) {
        return 9
    }
    else if (angle > 30 && angle <= 90) {
        return 10
    }
}


function validateInfinities(curveName, objectDefinition, infiniteOfDefinition = []) {
    let response = false
    console.log('en validateInfinities -------------------------------------------------------------');
    const curve = objectDefinition.curves.filter(curve => curve.curveName === curveName)

    const infinitiesToValidate = objectDefinition.infinities
    const infiniteOfUser = curve[0].infinities

    infiniteOfUser?.length === 1 ? infiniteOfUser[1] = undefined : infiniteOfUser
    infiniteOfDefinition?.length === 1 ? infiniteOfDefinition[1] = undefined : infiniteOfDefinition

    if (infiniteOfUser === undefined) {
        console.log('undefineddadsad');
        return false
    }

    const positionOfUndefinedDef = infiniteOfDefinition.findIndex(item => item === undefined || item === null)
    const positionOfUndefinedUser = infiniteOfUser.findIndex(item => item === undefined)

    if (positionOfUndefinedUser !== positionOfUndefinedDef) {
        return false
    }
    else if (positionOfUndefinedDef === positionOfUndefinedUser) {
        let index = null
        if (positionOfUndefinedDef !== -1) index = positionOfUndefinedDef === 0 ? 1 : 0
        const elementsToEvaluate = index != null ? infiniteOfUser[index] : infiniteOfUser

        console.log('elementsToEvaluate', elementsToEvaluate);
        if (Array.isArray(elementsToEvaluate[0])) {
            const auxResponse = elementsToEvaluate.every((point, index) => {

                const p1 = point[1]
                const p2 = point[2]

                formatInfinites = [[p1.X(), p1.Y()], [p2.X(), p2.Y()]]

                const angle = defAngle(p1.X(), p1.Y(), p2.X(), p2.Y())
                const sectorOfInfinite = getOrientation(angle)


                console.log(infiniteOfDefinition[index], 'angle', angle, 'sector', sectorOfInfinite);

                const res = infiniteOfDefinition[index].some((value) => value === sectorOfInfinite)

                return res

            })

            response = auxResponse

        }
        else {

            const p1 = elementsToEvaluate[1]
            const p2 = elementsToEvaluate[2]


            formatInfinites = [[p1.X(), p1.Y()], [p2.X(), p2.Y()]]

            const angle = defAngle(p1.X(), p1.Y(), p2.X(), p2.Y())
            const sectorOfInfinite = getOrientation(angle)


            console.log(infiniteOfDefinition);
            const res = infiniteOfDefinition[index].some((value) => value === sectorOfInfinite)

            console.log(infiniteOfDefinition[index], 'angle', angle, 'sector', sectorOfInfinite);

            response = res
            console.log('es un array de puntos y su respuesta es >> ', res);
            console.log(elementsToEvaluate);
        }
    }

    return response
}

function cDefAddPoint(def, board, position, sty, style = {
    disabled: false,
    ...sty,
    input: {
       precision: {
          touch: 20,
          touchMax: 8,
          mouse: 5,
          pen: 2,
          hasPoint: 1,
          
       },
       layer: 3,
       fixed: false,
       ...sty?.input,
       noiseX: sty?.input.noiseX ?? 1,
       noiseY: sty?.input.noiseY ?? 1,
    },
    point: {
       opacity: 0.8,
       size: 2,
       name: '',
       layer: 2,
       fixed: false,
       ...sty?.point,
       color: sty?.point?.color ?? "black",
    },
 
 }) {
    if (!position) {
       const elementIn = board.getAllUnderMouse();
       console.log(elementIn);
       if (def.mode != 1 || elementIn.findIndex((p) => !Array.isArray(p) && !p.ignore && ["glider", 'point', "text"].includes(p.elType)) !== -1) {
          return;
       };
    };
 
    const coords = position ?? board.getUsrCoordsOfMouse();
    const point = board.create('point', [coords[0],0], {
       ...style.point,
       precision: {
          touch: 2,
          touchMax: 3,
          mouse: 3,
          pen: 2,
          hasPoint: 1,
       },
    });
    
    board.on('move',function(){
        point.moveTo([point.X(), 0])
     })

    if (style.input) {
       const input = board.create('text',
          [
 
             () => point.X() - style.input.noiseX,
             () => point.Y() - style.input.noiseY
             , 
            `<math-field virtual-keyboard-mode='onfocus' fonts-directory='fonts' keypress-sound = "none"  class="inputsToPoints"> </math-field>`

          ], style.input
       );
       //  
       const mathfield = input.rendNode.childNodes[0];
       
       const optionsKeyboard = getKeyboardMath(window.screen.width);
       mathfield.value = style?.input?.value || "";
       mathfield.setOptions({
          "customVirtualKeyboardLayers": optionsKeyboard[0],
          "customVirtualKeyboards": optionsKeyboard[1],
          "virtualKeyboards": optionsKeyboard[2]
       });
 
       input.on("over", function (event) {
          const elementx = board.getAllUnderMouse();
          if (elementx.findIndex(
             (p) => {
                return !Array.isArray(p) && p.id !== input.id;
             }) !== -1) {
             return;
          };
          input.visProp.cssstyle = "z-index:4;";
       }, true);
 
       input.on("out", function (event) {
          input.visProp.cssstyle = "z-index:3;";
       }, true);
       point.input = input;
 
       point.interactive = style.interactive;
       if (style.interactive) {
          def.pointInteractive.push({ mathfield, value: style.input.value });
       };
       def.pointsAndInputs.push({point, mathfield:input, input:mathfield});
    };
    if (!position) {
       def.points.push(point);
    };
 };
 
//NO usada

 
function refreshCurve(board, objectArtifact, curveName) {
    let { curves, pointsData, pointsToCurves, elementsInfiniteData } = objectArtifact
    const pointsOfCurve = pointsToCurves.filter((arrayPoint) => arrayPoint[0].curveName === curveName)

    let curvetoRemove = null;

    if (!curves.length) { // si no hay curve
        return
    }

    if (!pointsOfCurve.length) { //si no hay puntos vacia el array de las curvas
        console.log('condicional', curves);
        const x = curves.findIndex(curve => curve.curveName === curveName)
        return
    }


    curvetoRemove = curves.filter(curve => curve.curveName === curveName)

    console.log('curve to remove', curvetoRemove);

    const infiniteOfCurve = elementsInfiniteData[curveName]

    const pivotesOfCurves = curvetoRemove[0]?.pivotes
    //console.log("pivote of curves en refresh",pivotesOfCurves);
    const newArrayCurves = deleteElements(curves, "curveName", curveName)
    console.log('new Array', newArrayCurves);

    //objectArtifact.curves = newArrayCurves.map(item =>  item)
    //objectArtifact.curves = objectArtifact.curves.filter(x => x.curveName !== curveName)

    console.log(objectArtifact.curves);
    curvetoRemove[0].remove()
    //console.log(curves, newArrayCurves);

    if (infiniteOfCurve != undefined) {
        infiniteOfCurve.forEach(arrayObjects => arrayObjects.forEach(items => items.remove()))
    }

    if (pivotesOfCurves != undefined) {
        pivotesOfCurves.map((x) => x.remove())
        //pivotesOfCurves.forEach(arrayObjects => arrayObjects.forEach(item => item.remove()))
        delete curvetoRemove.pivotes
    }


    delete elementsInfiniteData[curveName] // elimina Infinitos 

    //curves = newArrayCurves.map( x => x)

    pointsOfCurve[0].sort((p1, p2) => p2.X() - p1.X()) // ordeno puntos

    pointsOfCurve[0][0].infinityMode = false
    //console.log(pointsOfCurve[0][0].eventHandlers.infityMode);
    pointsOfCurve[0].at(-1).infinityMode = false

    curve = 1
    curve.curveName = curveName
    console.log(curve);
    return curve

    //return [curve, newArrayCurves]
}


function createCurve(artifact, board, arrayPoints = [], curve = null, pivotes = null) {

    curve = curve === null ? curve = board.create('cardinalspline', [arrayPoints, 1, 'centripetal'], { strokeColor: 'black', strokeWidth: 3 },)
        : curve

    curve.pivotes = curve.pivotes ?? []

    if (curve.points[18] !== undefined && curve.points.at(-18) !== undefined) {

        const firstPoint = Object.values(curve.ancestors).at(-1)
        const lastPoint = Object.values(curve.ancestors)[0]

        firstPoint.infinityMode = false
        lastPoint.infinityMode = false

        pointInteraction({ point: firstPoint, point2: pivotes[0], curve, board, objectArtifact: artifact }, 0)
        pointInteraction({ point: lastPoint, point2: pivotes[1], curve, board, objectArtifact: artifact }, 1)

        curve.pivotes = pivotes

    }

    
    return curve
}


function equalValues(currentValue, oldValues) {

    let response = true

    const aux = []
    for(property in currentValue){
        
        const res = currentValue[property].every((item, index) => {
            return item === oldValues[property][index]
        })
        aux.push(res)
        
    }

    response = aux.every(x => x === true)

    return response
}


 //>FIN ...__/\___/\/ ___________________________________________________________________________________________________________________________|