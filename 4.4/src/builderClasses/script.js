/*
artifact_0: {
      helpMsg: {
         title: 'titulo',
         text: 'esto es un texto de prueba',
      },
      maxCurves: 2,
      conditions: {
         inputsToValidate: [

            {
               inputs: [
                  {
                     defaultXvalue: '-2',
                     succesValue: '-2'
                  },
                      {
                       defaultXvalue: '-1',                  
                        succesValue: '-1',
      
                     },
                     {
                        defaultXvalue: '0',
                      
                        defaultYvalue:null,
                        succesValue: '0',
      
                     }, 
                  {
                     defaultXvalue: '1',

                     defaultYvalue: null,
                     succesValue: '1',

                  },

               ],
               //infinities: [[8, 9], [2, 1]]

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
*/

class ArtifactValidateInput  {
	constructor(){
		this.helpMsg = false
		this.maxCurves = 1
		this.condition = {}
		this.inputsToValidate = []
		this.allDefinition = {}
	}

	setMaxCurves(number){
		this.maxCurves = number
	}

	createInput(defaultXvalue,succesValue, defaultYvalue = null){
		const editable = succesValue === null ? false : true
		const data = {defaultXvalue, succesValue, editable, defaultYvalue}
		return data
	}

	createNewCurveToValidate(id = this.inputsToValidate.length){
		const aux = id
		const data = {
			id:aux,
			inputs:[],
			infinities:false
		}

		this.inputsToValidate.push(data)
	}

	insertInputToCurve(defaultXvalue = 0, succesValue = null,id = this.inputsToValidate.length , defaultYvalue = null ){
		
		
		if (!this.inputsToValidate.length) { 
			const response = confirm('debes crear primero una curva \n ¿desea crear la curva?'); 
			if (!response)return false
			
			this.createNewCurveToValidate(id)
		}

		let aux = this.inputsToValidate.filter(x => x.id == id)

		if(!aux.length){
			const response = confirm(`La curva con el id: " ${id} " no se encuentra creada, \n ¿Deseas crearla?`); 
			if (!response) return false
			this.createNewCurveToValidate(id)

		}

		aux = this.inputsToValidate.filter(x => x.id == id)


		const objectCurve = aux[0]
		//const input = this.createInput(defaultXvalue,succesValue)
		const input = succesValue === null ?  this.createInput(defaultXvalue,null,defaultYvalue) : this.createInput(defaultXvalue, succesValue)

		objectCurve.inputs.push(input)

	}

	insertDefaultPointsToCurves(idCurve = null, ...points){
		if (idCurve === null ){
			alert('ingresa el id en el llamado a insertDefaultPointsToCurves')
			return false
		}

		console.log(this.inputsToValidate);
		const aux = this.inputsToValidate.filter(x => x.id === idCurve)
		console.log(aux);
		
		if(!aux.length){
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

	insertDefaultInputToCurve(defaultXvalue = "x", defaultYvalue = "y", id = null){
		if (id === null ){
			alert('ingresa el id en el llamado a insertDefaultInputsToCurve')
			return false
		}
		this.insertInputToCurve(defaultXvalue,null,id,defaultYvalue)

	}

	insertInfinitiesToCurve(firstSectors,lastSectors, id = null){
		
		if(!id){
			alert("es necesario que se agregue el id")
			return false
		}

		const aux = this.inputsToValidate.filter(x => x.id == id)
		const objectCurve = aux[0]
		console.log(objectCurve.infinities)
		objectCurve.infinities = !objectCurve.infinities ? [[],[]] : objectCurve.infinities

		objectCurve.infinities[0].push(...firstSectors)
		objectCurve.infinities[1].push(...lastSectors)		


	}

	addHelpMessage(title = '<titulo>', text = 'texto') {
		this.helpMsg = {
			title, text
		}
	}


	builder(){
 		
		return {

			helpMsg:this.helpMsg,
			maxCurves:this.inputsToValidate.length,

			conditions:{
				inputsToValidate:this.inputsToValidate
			}
		}
	}
}

class Boards{
	constructor(){
         
		 this.style = {
			
			axis: [false, true, true],
		 }
	}

	setGrid(boolean = true){
		this.style['grid'] = boolean
	}
	boardSize(width, height){
		this.style['maxWidth'] = width;
		this.style['maxHeight'] = height
	}
	setOrigin(boolean = true){
		this.style['origin'] = boolean
	}
	
	setBourdingBox(x1 = -4,y1 = 4,x2 = 4,y2 = -4){
		this.style['boundingbox'] = [x1,y1,x2,y2]
	}

	createBoard(type = 1){
		if(type === 1){

			this.setGrid()
			this.setOrigin()
			this.setBourdingBox()
			this.style['valueAxis']  = {
				yd: [[0, 0], [0, 1]], //dirección del eje y
				xd: [[0, 0], [1, 0]],
				colory: "#000000",
				colorx: "#000000"
			 }
		}
	}

	builder(){
		return { 
			
			style: this.style
		}
	}
}

const board = new Boards()
board.createBoard(1)


const artifact_0 = new ArtifactValidateInput()

artifact_0.createNewCurveToValidate("curve1")

artifact_0.insertDefaultInputToCurve("x","y","curve1")

artifact_0.insertInputToCurve('-3', '-3','curve1')
artifact_0.insertInputToCurve('-2', '-2','curve1')
artifact_0.insertInputToCurve('-1', '-1','curve1')
artifact_0.insertInputToCurve('1', '1','curve1')
artifact_0.insertInputToCurve('2', '2','curve1')
artifact_0.insertInputToCurve('3', '3','curve1')
artifact_0.insertDefaultPointsToCurves('curve1',[-3,3],[-3.5,3],[3,-4])


artifact_0.createNewCurveToValidate("curve2")
artifact_0.insertInputToCurve('-2', '-3','curve2')
artifact_0.insertInputToCurve('2', '-3','curve2')

 artifact_0.insertInfinitiesToCurve([1,2,3],[4,5,6],"curve1")
// artifact_0.insertInfinitiesToCurve([1,2,3],[4,5,6],"curve1")

artifact_0.addHelpMessage("este es el titulo", 'este es el texto')

