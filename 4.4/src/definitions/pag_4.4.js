
const board = new Boards()

board.createBoard(1)


//Eliezer

const artifact_0 = new ArtifactValidateInput()

artifact_0.createNewCurveToValidate("curve1")
artifact_0.insertDefaultInputToCurve("x", "-x", "curve1")
artifact_0.insertDefaultInputToCurve("1", "-1", "curve1")
artifact_0.insertInputToCurve('2', '-2', 'curve1')
artifact_0.insertInputToCurve('3', '-3', 'curve1')
artifact_0.insertInputToCurve('0', '0', 'curve1')
artifact_0.insertInputToCurve('-1', '1', 'curve1')
artifact_0.insertInputToCurve('-2', '2', 'curve1')
artifact_0.insertInputToCurve('-3', '3', 'curve1')
artifact_0.insertInfinitiesToCurve([4,5,6],null,"curve1")



//artifact_0.createNewCurveToValidate("curve2")
//artifact_0.insertInputToCurve('-3', '3', 'curve2')


//artifact_0.insertDefaultPointsToCurves('curve1',[-3,3],[-3.5,3],[3,-4])
//artifact_0.insertInfinitiesToCurve([1,2,3],[4,5,6],"curve1")

artifact_0.addHelpMessage("este es el titulo", 'este es el texto')


//Jhorman 
const exerciseTable = new ArtifactKeysAndTables()

exerciseTable.createTable()
//exerciseTable.addRowinTable('Tecla', ["2",'3']) PARA 2 O MÁS RESPUESTAS

exerciseTable.addRowinTable('Tecla', '-()', true, "-( )")
exerciseTable.addRowinTable('Notación Funcional', 'f(x)=-x', false, 'f(x)=')
exerciseTable.addRowinTable('Ecuacion en dos variables', "y=-x", false, "y=")
exerciseTable.addRowinTable('por pares Ordenados', "(x,-x)", false, "(x, )" )



const ejercicio2 = new ArtifactKeysAndTables()


ejercicio2.createArtifactGridSimple()
ejercicio2.createRoundedDefault('x')
ejercicio2.createRoundedDefault("-(x)")
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
artifactTest.createOneQuestionWithManyInputs('pregunta para responder', false, ['Dominio', '(-∞,∞)', 'a'], ['Rango', 'a', 'R']) //se define la pregunta
artifactTest.createOneQuestionWithManyInputs("", false, ['Puntos de corte con el eje x', '(0,0)'], ['Puntos de corte con el eje y', "(0,0)"])
artifactTest.createOneQuestionWithManyInputs("", false, ['Partes positivas', '(-∞,0)'], ['Partes negativas', "(0,∞)"])
artifactTest.createOneQuestionWithManyInputs("", false, ["Conexidad", 'Conexa'])
//artifactTest.createSelectWithOneQuestion('pregunta del select', 'pregunta1', 'pregunta 2', ['pregunta 3', true], 'pregunta 4',)
//artifactTest.createOneQuestionWithManyInputs('', true, ['Si xE(0,1], 1/xE?', '2'], ['puntos de corte con el eje y', 2])



/* 
artifactTest.createSelectWithOneQuestion('pregunta del select','pregunta1','pregunta 2',['pregunta 3', true], 'pregunta 4', )
artifactTest.createRadioButton('preguntas del radioButton',['sí',true],'no') */

//Raul
const questions = new ArtifactOwner()

questions.createNewNode(11, 'node2', '.otherContainer')
questions.createQuestionsGroup('node2', 'z')

questions.createOneQuestionWithManyInputs('Maximos y minimos', false, ['Máx. Abs', '∄'], ['Alcanzado en', '∄'])
questions.createOneQuestionWithManyInputs('', false, ['Máx Rel', '∄'], ['Alcanzado en', '∄'])


const questions2 = new ArtifactOwner()
questions2.createNewNode(11, 'node3', '.otherContainer')
questions2.createQuestionsGroup('node3')
questions2.createOneQuestionWithManyInputs('', false, ['Zonas de crecimiento', '∄'])
questions2.createOneQuestionWithManyInputs('', false, ['Zonas de decrecimiento', '(-∞,∞)'])



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
    artifact_0: artifact_0.builder()
}


const def = {
    artifact_1: exerciseTable.builder(),
    artifact_0: ejercicio2.builder()
}
/* 
const def2 = {
    artifact_0: keyDefinition.builder(),
    artifact_1: exerciseTable.builder(),
} */


const def1 = {
    artifact_0: artifactTest.builder(),
    artifact_1: questions.builder(),
    artifact_2: questions2.builder()
}

generateArtifact(def) // motor para las tablas y las pantallas con screen
generator(def1) // motor para las git
icMain(definitionArtifacts, definitioBoards)

