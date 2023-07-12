function mainRoad(defBoards, allDef) {
   const globalColor = ['#f16413', 'violet', '#4955FE', '#ffa420', '#083964', '#9e0000', '#0073e8', '#31379a', '#004f57'];
   const tmp = document.querySelector('#tmp-road');
   const divs = document.querySelectorAll('.defRoad');
   const callback = {
      default: (params) => {
         rDefAddPoint(params);
      },
      point: setPoint,
   };
   divs.forEach((div, i) => {
      const iconst = i;
      const clone = tmp.content.firstElementChild.cloneNode(true);
      const $board = clone.querySelector('.defRoadBoard');
      const btnAll = clone.querySelector('.btn-all');
      const id = 'defRoadBoard_' + i;
      $board.setAttribute('id', id);
      const boardSelect = div.dataset.board;
      const refArtifact = defBoards[boardSelect].artifact;

      clone.setAttribute("id", refArtifact);

      if (!defBoards[boardSelect]) {
         console.warn('<!> board undefined <!>');
         return;
      };
      let artifactDefault = {
         globalColor,
         firsPointsDefault: false,
         dataInteraction: { incorrect: 0, correct: 0 },
         curveMod: false,
         timeInteraction: 0,
         statusValidate: false,
         pointsData: [],
         samePoints: [[]],
         textAlert: null,
         maxCurves: 1,
         visible: true,
         memory: [],
         points: [[]],
         curves: [],
         other: [],
         debug: false,
         iMod2: [null, null],
         mode: 10,
         ...allDef[refArtifact],
         conditions: {
            road: {
               text: "Intenta de Nuevo",
               points: false,
               ...allDef[refArtifact].conditions.road,
               curve: {
                  board: null,
                  minFinishPoint: 3,
                  modNegative: null,
                  confirmCurve: false,
                  ...allDef[refArtifact].conditions.road.curve
               },
            },
            buttonsActive: {
               points: false,
               ...allDef[refArtifact].buttonsActive
            },
         },
      };
      const style = defBoards[boardSelect].style;
      div.appendChild(clone);
      const dataBoard = gBoard(artifactDefault, defBoards[boardSelect], id, style, callback, i, { globalColor, content: clone });
      artifactDefault.curveGenerate = dataBoard.resultObj.curves;
      const board = dataBoard.board;

      //referencias de los puntos generados
      if (dataBoard.resultObj.points) {
         artifactDefault.pointsData = [...dataBoard.resultObj.points.map((point, i) => {
            point.setAttribute({
               color: globalColor[i],
               size: (() => {
                  return (artifactDefault.mode != 3 && artifactDefault.mode != 1) || artifactDefault.iMod != point.iMod ? 2 : 4;
               }),
            });
            point.interactive = true;
            point.iMod = [i, 0];
            return [[[point, "eje_x"]]];
         }), []];
      };

      allDef[refArtifact] = artifactDefault;

      btnAll.addEventListener('click', (e) => {
         const button = e.target;
         if (button.classList.contains('check')) {
            rDefValidation(artifactDefault, defBoards[boardSelect], clone, refArtifact, board, iconst);
         } else if (button.classList.contains('reset')) {
            rDefReset(artifactDefault, board, clone, true);
         } else if (button.classList.contains('back')) {
            rDefReturn(artifactDefault, board);
         } else if (button.classList.contains('curve')) {
            if (artifactDefault.curveMod.interactive && artifactDefault.points.at(-1).length > 1) {
               const curve = gAddCurv(artifactDefault, board);
               curve.on('down', () => {
                  callback.default({ def: artifactDefault, board, attractor: curve, globalColor });
               });
               artifactDefault.other.push(curve);
            };
         } else if (button.classList.contains('road')) {
            gButtonToggle({ def: artifactDefault, button: button, mode: 1 });
            board.update();
         } else if (button.classList.contains('finishRoad')) {
            gButtonToggle({ def: artifactDefault, button, mode: 3 });
         } else if (button.classList.contains('pointClose')) {
            gButtonToggle({ def: artifactDefault, button: button, mode: 4 });
         } else if (button.classList.contains('visible')) {
            artifactDefault.visible = !artifactDefault.visible;
            gButtonToggle({ toggleResect: false, def: artifactDefault, button: button, buttonActive: "btnVisible", mode: artifactDefault.mode });
         };
         board.update();
      });

      if (artifactDefault.helpMsg) {
         gHelpMsg(artifactDefault, clone, refArtifact);
      };

      board.on("down", (e) => {
         if (artifactDefault.mode === 4) {
            gAddPoint(allDef[refArtifact], board);
         };
      });

      if (!artifactDefault.helpMsg) {
         btnAll.querySelector(".help").style.display = "none";
      };

      if (!artifactDefault.curveMod) {
         btnAll.querySelector(".curve").style.display = "none";
         btnAll.querySelector(".pointClose").style.display = "none";
      };

      if (true) {//provicionalmente se queda no visible este boton
         btnAll.querySelector(".back").style.display = "none";
      };


      clone.addEventListener("mouseenter", () => {
         gTime(artifactDefault);
      });

      clone.addEventListener("click", (e) => {
         if (!(e.target.classList.contains('check')) && e.target.tagName != "DIV") {
            artifactDefault.statusValidate = false;
         };
         gTime(artifactDefault);
      });

      clone.addEventListener("mouseleave", () => {
         gTime(artifactDefault, false, false);
      });
   });
};

// queda pendiente esto es engorroso llevar la estructura de creacion y el orden de los caminos a eliminar carlos del futuro 
// recomiendo quitarlos sin quitar el array y al validar solo limpia los array vacios en el array temporal que es el que vale para validar
function rDefReturn(def, board) {

   const endElement = def.memory.pop();
   const fila = endElement[0];
   const columna = endElement[1];
   board.removeObject(def.pointsData[fila].splice(columna, 1));
   /* if (def.pointsData[fila].length === 0) {
      def.pointsData.splice(fila, 1);// si el 
   }; */

   /*  let arraySelect1 = def.pointsData[def.iMod2[0]];
    let arraySelect2 = def.pointsData[def.iMod2[0]] ? def.pointsData[def.iMod2[0]][def.iMod2[1]] : null;
 
    if (arraySelect2 && arraySelect2.length > 1) {
       board.removeObject(arraySelect2.pop());
    } else {
       arraySelect1.pop();
       def.iMod2[1] = def.iMod2[1] == 0 ? 0 : def.iMod2[1] - 1;
    }; */
   board.update();
};

function rDefReset(def, board, content, option = true) {
   if (def.iMod2[0]) {
      if (def?.pointTarget) {
         def.pointTarget.setAttribute({ size: 2 });
      };
      setBtnColor(def, content, null);

   };

   let aux;
   if (option) {

      if (def.firsPointsDefault) {
         aux = def.pointsData.filter((p) => {
            if (p[0]) {
               return p[0][0].interactive;
            } else {
               return false;
            };
         }).map((p) => [p.shift()]);
      };
      board.removeObject(def.pointsData.flat());
      def.pointsData = aux ? [...aux, []] : [];
      def.memory = [];
      board.removeObject(def.samePoints);
      board.removeObject(def.points);
      board.removeObject(def.other.flat());

      def.points = [[]];
      def.samePoints = [[]];
      def.curves = [];

      board.update();
   };

   if (def.textAlert) {
      def.textAlert.remove();
      def.textAlert = null;
   };
   def.iMod2 = [null, null];
};

function rDefValidation(def, defBoard, content, refKey, board, i) {
   const roadData = def.pointsData;
   const dataClean = roadData.map((p1) => p1.map((x) => {
      if (Array.isArray(x[0])) {
         return x.map(x2 => [x2[0].X(), x2[0].Y()]);
      } else {
         return [x[0].X(), x[0].Y()];
      };
   }));
   if (!def.statusValidate) {
      if (rDefRoadValidation(def, defBoard, dataClean, def.conditions.road)) {
         def.dataInteraction.incorrect = 0;
         def.dataInteraction.correct = 1;
         if (!def.conditions?.road?.mod) {
            generateCurveFinish(def, board);
         };
         gAlerts(def, refKey, "Exelente", 1, 26);
      } else {
         def.dataInteraction.incorrect = 1;
         def.dataInteraction.correct = 0;
         gAlerts(def, refKey, def.conditions.road.text, 2, 26);
         setTimeout(() => {
            rDefReset(def, board, content, false, i);
         }, 1000);
      };

      if (def.debug) {
         console.table(cleanData(def, refKey));
      } else {
         sendData(cleanData(def, refKey));
      };
      gTime(def, false);
   };
   def.statusValidate = true;
};
//esta funcion toma los caminos de manera individual 
function discart(conditionArray = [], arrayIn = []) {
   if (conditionArray[0] && Array.isArray(conditionArray[0][0])) {
      // si es un array enviara las condiciones por parte hasta encontrar una valida
      resp = conditionArray.some((x) => discart(x, arrayIn));
      return resp;
   } else if (!Array.isArray(conditionArray) && typeof conditionArray == "object") {
      return conditionArray.forks.every((cond) => arrayIn.some((road) => discart(cond, road)));
   } else {
      // para las condiciones simples se validan cada una de las posiciones en el orden definido 
      return conditionArray.every((p, i) => {
         return gInterPoint(p[0], arrayIn[i][0], 0.2) && gInterPoint(p[1], arrayIn[i][1], 0.2) && arrayIn.length == conditionArray.length;
      });
   };
};
//toma las condiciones y todos los diferentes caminos del board los va eliminando dependiendo si coinciden con una condicion;
function rDefRoadValidation(def, defBoard, positions, condition) {
   let resp = null;
   // limpia los datos de todas las curvas generadas por el usuario
   const cleamP = def.points.slice(0, def.points.length - 1).map(c => c.map(p => [p.X(), p.Y()]));
   //puntos finales de todos los caminos
   const pointFinish = !condition.curve?.confirmCurve ? [] :
      def.pointsData.map(points => {

         return points.length > 0 ? Array.isArray(points.at(-1)[0]) ? points.map(p => gExtractCoords(p.at(-1)[0])) : gExtractCoords(points.at(-1)[0]) : [];
      }).filter(points => points.length > 0);

   // los puntos espejados con respecto a la bisectriz si todos concuerdan con la curva es que la curva es  inversa de si misma
   const samePoints = def.samePoints.map((c) => c.map((p) => [p.X(), p.Y()]));

   if (!condition.mod) {
      const condAux = condition.points.map((r) => r);
      const pos = positions.map((p) => p);
      if (pos.at(-1).length == 0) { pos.pop(); };
      for (let i = condAux.length - 1; i >= 0; i--) {
         const resp = pos.findIndex((mp) => { return discart(condAux[i], mp); });
         if (resp != -1) {
            condAux.splice(i, 1);
            pos.splice(resp, 1);
         };
      };
      //si al finalizar la funcion el largo de las condiciones y los caminos son iguales regresa true
      resp = condAux.length == 0 && pos.length == 0;
   } else {

      if (condition.curve?.modNegative && condition.curve?.modNegative.length > 0) {
         resp = condition.curve.modNegative.some(x => {
            return cleamP.every(p => { return !gCompareCurves(def.curveGenerate[x], p, true); });
         });
      };

      if (resp == false) {
         return false;
      };
   };

   // compara la curva con los puntos si estos puntos son iguales a la curva esto dara false ya que se supone que no puede ser la del ejercicio 2 
   // validadon que los puntos inversos/reflejados a la bisectriz estan sobre la curva para indicar que la curva es inversa a si misma esta estatico por ahora

   const respSame = !condition.curve?.same || samePoints[0].length > (condition.curve?.same?.minSamePoints ?? 1) && gCompareCurves(def.curves[0], samePoints[0], true);
   //validadon que los puntos finales  con respecto al a curva  creada por el usuario para indicar que es correcta
   const respConfirmCurve = !condition.curve?.confirmCurve || pointFinish.length >= !condition.curve?.minFinishPoint && gCompareCurves(def.curves[0], pointFinish.flat(), true);
   if (def.debug) {
      console.warn("< same: > ", respSame);
      console.warn("< respConfirmCurve: > ", respConfirmCurve);
   };
   return resp && respConfirmCurve && respSame;
};

function cleanData(refArtifact, refKey) {
   let auxResult = {};
   auxResult = { results: refArtifact.dataInteraction };
   auxResult.elementArtifact = {
      pointsData: [[]],
      samePoints: [[]],
      curves: [],
   };
   auxResult.artifact = Number(refKey.split("_").at(-1));
   auxResult.typeArtifact = "Standard";
   auxResult.seconds = refArtifact.timeInteraction;
   auxResult.idMoodle = !refArtifact.debug ? $idMoodle : "debug";
   if (refArtifact.yellow) {
      auxResult.typeArtifact = "Yellow";
      delete auxResult.results;
   };
   return auxResult;
};

function generateCurveFinish(def, board) {
   if (def.conditions.road?.curveReflex) {
      def.conditions.road?.curveReflex.forEach(options => {
         const axie = def.reflectionAxie[options.axie];
         options.index.forEach((x) => board.create('reflection', [def.curveGenerate[x], axie], { strokeWidth: 2, strokeColor: "#d5d5d6" }));
      });
   } else {
      console.warn("<!>No se definio una curva para este ejercicio<!>");
   };
};

function setBtnColor(def, content, color) {
   content.querySelector(".road").style.setProperty('--color', color);
   content.querySelector(".curve").style.setProperty('--color', color);
   content.querySelector(".finishRoad").style.setProperty('--color', color);
   content.querySelector(".back").style.setProperty('--color', color);
}

function setPoint({ def, point, content } = {}) {
   if (def.mode != 1) { return; };
   def.iMod2[0] = point.iMod[0];

   if (def?.pointTarget?.id != point.id) {
      if (def?.pointTarget) {
         def.pointTarget.setAttribute({ size: 2 });
      };
      point.setAttribute({ size: 4 });
      def.pointTarget = point;
   } else {
      point.setAttribute({ size: 2 });
      def.pointTarget = null;
      def.iMod2[0] = null;
   };
   const colorSet = (JSON.stringify(def.iMod2[0]) == JSON.stringify(point.iMod[0])) ? def.globalColor[def.iMod2[0]] : null;
   setBtnColor(def, content, colorSet);
}

function conectLine(def, board, arraySelect, point, last, color) {
   const lines = {
      interactive: true,
      strokeColor: color,
      firstArrow: true,
      points: [point, last],
      dash: 2,
      visible: () => {
         if (JSON.stringify(def.iMod2) != JSON.stringify(point.iMod)) {
            return (() => def.visible)();
         } else {
            return true;
         };
      },
   };
   const line = gLineDefault({ def, board, lines, iMod: def.iMod2 })[0];
   line.iMod = def.iMod2;
   line.on('down', () => {
      addFinishh({ def, board, line, iMod: line.iMod });
   });
   return line;
};

function addFinishh(params) {
   ({ def, board, iMod, line } = params);

   if (def.mode != 3) { return; };

   const arrayPoins = def.pointsData;
   const arraySelect = arrayPoins[iMod[0]][iMod[1]];

   const firstP = arraySelect[0][0];
   const last = arraySelect.at(-1)[0];
   let last2 = null;

   if (arraySelect.length > 1) {
      last2 = arraySelect.at(-2)[0];
   };

   let x, y;//cordenadas dodne se creara el punto final

   if (!gInterPoint(last.Y(), firstP.Y())) {//si el primer punto no esta a la misma altura
      if (gInterPoint(last2.X(), last.X(), 0.2)) {
         y = last.Y();
      } else {
         if (!gInterPoint(last2.X(), last.X(), 0.2)) {
            y = firstP.Y();
         };
      };
   } else {
      y = last.Y();
   };

   if (!gInterPoint(last.X(), firstP.X())) {//si el primer punto no esta a la misma cordenada x
      if (gInterPoint(last2.Y(), last.Y(), 0.2)) {
         x = last.X();
      } else {
         if (!gInterPoint(last2.Y(), last.Y(), 0.2)) {
            x = firstP.X();
         };
      };
   } else {
      x = last.X();
   };

   const color = def.globalColor[def.iMod2[0]];

   if (gInterPoint(last.X(), x) && gInterPoint(last.Y(), y)) {// si el ultimo punto es igual a la posicion donde se queire poner el punto final lo cambia

      last.setAttribute({
         strokeColor: 'green',
         fillcolor: color,
         size: 3,
      });
      arraySelect.at(-1)[1] = "finish";

   } else {
      const point = board.create('point', [x, y], {
         strokeColor: 'green',
         fillcolor: color,
         opacity: 0.8,
         size: 3,
         name: '',
         visible: () => {
            if (JSON.stringify(def.iMod2) != JSON.stringify(this.iMod)) {
               return (() => def.visible)();
            } else { return true; };
         },
      });
      point.iMod = iMod;
      arraySelect.push([point, 'finish']);
      if (arraySelect.length > 1) {
         const last = arraySelect.at(-2)[0];
         //si tiene mas de 2 elementos entonces los conecta
         conectLine(def, board, arraySelect, point, last, color);
      };
   }


   if (def.pointTarget) {
      def.pointTarget.setAttribute({ size: 2 });
      def.pointTarget = null;
   }
   def.iMod2 = [null, null];
};

function rDefAddPoint(p, params = { ...p }) {
   let { def, board, attractor, globalColor, content } = params;
   if (def.mode != 1) { return; };

   const coords = board.getUsrCoordsOfMouse();
   const elementIn = board.getAllUnderMouse();

   if (!def.mode == 1 || elementIn.findIndex(
      (p) => !Array.isArray(p) && ["glider", 'point'].includes(p.elType)) !== -1) {
      return;
   };

   const arrayPoints = def.pointsData;
   const pTarget = def.pointTarget;
   // accedo al array dentro del camino seria el bifurcado en su ultima position
   if (!def.iMod2[1] && pTarget) {
      // si el largo es 0 agrego uno y si el ultio elemento es un pnto final tambine

      if (arrayPoints[def.iMod2[0]]?.at(-1)?.at(-1)[1] == 'finish') {
         arrayPoints[def.iMod2[0]].push([arrayPoints[def.iMod2[0]][0][0]]);
      };

      if (arrayPoints[def.iMod2[0]].length == 0) {
         arrayPoints[def.iMod2[0]].push([]);
      };
      def.iMod2[1] = arrayPoints[def.iMod2[0]].length - 1;
   } else if (!pTarget) {
      arrayPoints.push([[]]);
      def.iMod2[0] = arrayPoints.length - 1;
      def.iMod2[1] = arrayPoints[def.iMod2[0]].length - 1;

   }

   arraySelect = arrayPoints[def.iMod2[0]][def.iMod2[1]];
   const color = def.iMod2[0] == null ? globalColor[arrayPoints.length - 1] : globalColor[def.iMod2[0]];
   const iConst = [...def.iMod2];

   const dataposition = [...coords, attractor];
   if (arraySelect.length > 0) {
      const last = arraySelect.at(-1)[0];
      if (last) {
         if (
            gInterPoint(last.X(), coords[0]) && !gInterPoint(last.Y(), coords[1])
            ||
            !gInterPoint(last.X(), coords[0]) && gInterPoint(last.Y(), coords[1])
         ) {
            last.setAttribute({ color });
         } else {
            if (def.mode == 1) {
               last.setAttribute({ color: "red" });
            };
            return;
         };
      };
   };




   const point = board.create('glider', dataposition, {

      strokeColor: color,
      fillcolor: color,
      opacity: 0.8,
      size: 2,
      name: '',
      visible: () => {
         if (JSON.stringify(def.iMod2) != JSON.stringify(iConst)) {
            return (() => def.visible)();
         } else { return true; };
      },
   });
   point.iMod = iConst;
   arraySelect.push([point, attractor.typeCurve]);
   def.memory.push(iConst);

   if (arraySelect.length > 1) {
      const last = arraySelect.at(-2)[0];
      //si tiene mas de 2 elemenetos entonces los conecta
      conectLine(def, board, arraySelect, point, last, color);
   } else {//en el caso de crear el punto inicial le agrega el evento para ser seleccionado y siempre sera visible
      point.on('down', () => setPoint({ def, point, content }));
      point.setAttribute({ visible: true });
   };
};
