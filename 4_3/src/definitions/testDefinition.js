
const board = new Boards()

board.createBoard(1)


//Eliezer

const artifact_0 = new ArtifactValidateInput()

artifact_0.createNewCurveToValidate("curve1")
artifact_0.insertDefaultInputToCurve("x", "x", "curve1")
artifact_0.insertDefaultInputToCurve("1", "1", "curve1")
artifact_0.insertInputToCurve('2', '2', 'curve1')
artifact_0.insertInputToCurve('3', '3', 'curve1')
artifact_0.insertInputToCurve('0', '0', 'curve1')
artifact_0.insertInputToCurve('-1', '-1', 'curve1')
artifact_0.insertInputToCurve('-2', '-2', 'curve1')
artifact_0.insertInputToCurve('-3', '-3', 'curve1')
artifact_0.addPointWithInputs([1,'1'])
//artifact_0.insertInfinitiesToCurve([7,8,9],null,"curve1")





//artifact_0.insertDefaultPointsToCurves('curve1',[-3,3],[-3.5,3],[3,-4])
//artifact_0.insertInfinitiesToCurve([1,2,3],[4,5,6],"curve1")

artifact_0.addHelpMessage("este es el titulo", 'este es el texto')

//Jhorman 
const exerciseTable = new ArtifactKeysAndTables()

exerciseTable.createTable()
exerciseTable.addRowinTable('Tecla', '()', true, "( )")
exerciseTable.addRowinTable('Notación Funcional', 'f(x)=x', false, 'f(x)=')
exerciseTable.addRowinTable('Ecuacion en dos variables', "y=x", false, "y=")
exerciseTable.addRowinTable('por pares Ordenados', "(x,x)", false, "(x, )" )




const ejercicio2 = new ArtifactKeysAndTables()


ejercicio2.createArtifactGridSimple()
ejercicio2.createRoundedDefault('x')
ejercicio2.createRoundedDefault("(x)")
ejercicio2.createDefaultKey('( )')
/* 
ejercicio2.createKey('text1', 2)
ejercicio2.createRoundedDefault('n')

 */





const keyDefinition = new ArtifactKeysAndTables()



/* exerciseTable.addRowinTable('Notación Funcional', 'f(x)', true, 'f(x)')
exerciseTable.addRowinTable('Ecuación en dos variables', 'y=', true, 'y=')
exerciseTable.addRowinTable('Por pares ordenados', '(x, y)', true, '(x,y)')
 */
//const keyDefinition = new ArtifactKeysAndTables()

//keyDefinition.createArtifactGridSimple()
//keyDefinition.createRounded(2, '1')
//keyDefinition.createRoundedDefault('n')
//keyDefinition.createDefaultKey('-( )')
//keyDefinition.createRoundedDefault('-n')
//keyDefinition.createKey('text1',2)
//keyDefinition.createRounded(1)

const artifactTest = new ArtifactOwner()

artifactTest.createNewNode(11, 'node1', "#oneContainer") //se crea el nodo
artifactTest.createQuestionsGroup('node1', 'grupo1') //se crea el questionGroup
artifactTest.createOneQuestionWithManyInputs('pregunta para responder', false, ['Dominio', '\\left(-\\infty,\\infty\\right)'], ['Rango', '\\left(-\\infty,\\infty\\right)', 'R']) //se define la pregunta
artifactTest.createOneQuestionWithManyInputs("", false, ['Puntos de corte con el eje x', '\\left(0,0\\right)'], ['Puntos de corte con el eje y', "\\left(0,0\\right)"])
artifactTest.createOneQuestionWithManyInputs("", false, ['Partes positivas', '\\left(0,\\infty\\right)'], ['Partes negativas', '\\left(-\\infty,0\\right)'])
artifactTest.createOneQuestionWithManyInputs("", false, ["Conexidad", 'Conexa'])



/* 
artifactTest.createSelectWithOneQuestion('pregunta del select','pregunta1','pregunta 2',['pregunta 3', true], 'pregunta 4', )
artifactTest.createRadioButton('preguntas del radioButton',['sí',true],'no') */

//Raul
const questions = new ArtifactOwner()

questions.createNewNode(11, 'node2', '.otherContainer')
questions.createQuestionsGroup('node2', 'z')

questions.createOneQuestionWithManyInputs('Maximos y minimos', false, ['Máx. Abs', '\\phi'], ['Alcanzado en', '\\phi'])
questions.createOneQuestionWithManyInputs('', false, ['Máx Rel', '\\phi'], ['Alcanzado en', '\\phi'])


const questions2 = new ArtifactOwner()
questions2.createNewNode(11, 'node3', '.otherContainer')
questions2.createQuestionsGroup('node3')
questions2.createOneQuestionWithManyInputs('', false, ['Zonas de crecimiento', '\\left(-\\infty,\\infty\\right)'])
questions2.createOneQuestionWithManyInputs('', false, ['Zonas de decrecimiento', '\\phi'])



/* 
artifactTest.createNewNode(13,'node2','#tablaNumero1')
artifactTest.createTable('node2','y',)

artifactTest.createHeadOfTable('Opcion','tebajo','ssadasdasaaaaaaaaaaaaaaaaaaaaaa   ')

const textToRow = artifactTest.createTextFieldToTable('holaa')
const selectToRow = artifactTest.createSelectFieldToTable('1',['2'])
const input = artifactTest.createInputsToTable(1)

artifactTest.addRowToTable(textToRow,textToRow,textToRow,textToRow)
artifactTest.createNewNode(13,'node3', '#tabla2')
artifactTest.createTable('node3','y')
artifactTest.createHeadOfTable('Opcion','tebajo','ssadasdas','sadawewaaaaaaaaaaaaaaaead')

 */


const definitioBoards = {
    board_0: board.builder()
}

const definitionArtifacts = {
   artifact_0:artifact_0.builder()
}

/*const definitionArtifacts = {
    //artifact_0: artifact_0.builder()
    artifact_0:{
        helpMsg: {
           title: 'titulo',
           text: 'esto es un texto de prueba',
        },
        maxCurves: 2,
        conditions: {
     
             pointsWithInputs:[
              {
               coord:1,
               value:'1'
              },
              {
                 coord:2,
                 value:'2'
              },
              {
                 coord:3,
                 value:'3'
              }
            ], 
     
           inputsToValidate: [
     
              {
                 inputs: [
                    {
                       defaultXvalue: 'x',
                       defaultsuccesValue:'-x'
                    },
     
                       {
                          defaultXvalue: '1',                  
                          succesValue: '-1',
        
                       },
                       {
                          defaultXvalue: '2',
                        
                          defaultYvalue:null,
                          succesValue: '-2',
        
                       },
                    {
                       defaultXvalue: '3',
     
                       defaultYvalue: null,
                       succesValue: '-3',
     
                    },
     
                 ],
                 //infinities: [[8, 9]],
                 pointDefault:[[2,-1],[3,-2]]
     
              },
     
              {
                 inputs: [
                    {
                       defaultXvalue: '-2',
                       succesValue: '-3'
                    },
     
                      {
                        defaultXvalue: '-1',                  
                        succesValue: '-3',
      
                     },
                     {
                        defaultXvalue: '0',
                      
                        defaultYvalue:null,
                        succesValue: '-3',
      
                     }, 
                    {
                       defaultXvalue: '1',
     
                       defaultYvalue: null,
                       succesValue: '-3',
     
                    },
     
                 ],
                // infinities: [[8, 9, 10]]
     
     
              }
           ]
     
        },
     },
}*/


const def = {
    artifact_1: exerciseTable.builder(),
    artifact_0: ejercicio2.builder()
}

/*
const def2 = {
    artifact_0: keyDefinition.builder(),
    artifact_1: exerciseTable.builder(),
} 
*/

const def1 = {
    artifact_0: artifactTest.builder(),
    artifact_1: questions.builder(),
    artifact_2: questions2.builder()
}

generateArtifact(def) // motor para las tablas y las pantallas con screen
generator(def1) // motor para las git
icMain(definitionArtifacts, definitioBoards)

