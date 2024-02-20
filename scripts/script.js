const buttonCalc = document.querySelector(".form__button__calcRun");
const buttonClear = document.querySelector(".form__button__clearRun");

const thicknessTapeMinNumber = document.getElementById("thicknessTapeMinNumber");
const thicknessTapeMinRange = document.querySelector(".thickness-tape-min-range");

const paramCalc = JSON.parse(localStorage.getItem("paramCalc"));
syncingNumberAndRandge('.diameter-range', 'diameterNumber');
syncingNumberAndRandge('.percentage-of-filling-range', 'percentageOfFillingNumber');
syncingNumberAndRandge('.thickness-tape-min-range', 'thicknessTapeMinNumber');
syncingNumberAndRandge('.thickness-tape-max-range', 'thicknessTapeMaxNumber');
syncingNumberAndRandge('.step-range', 'stepNumber');
syncingNumberAndRandge('.shrinkage-range', 'shrinkageNumber');



if (paramCalc === null) {
  onClickCalc();
} else {
  // диаметр прутка
  document.getElementById("diameterNumber").value = paramCalc.diameter;
  document.querySelector(".diameter-range").value = paramCalc.diameter;
  // процетн заполнения
  document.getElementById("percentageOfFillingNumber").value = paramCalc.percentageOfFilling;
  document.querySelector(".percentage-of-filling-range").value = paramCalc.percentageOfFilling;
  // толщина ленты минимальная
  document.getElementById("thicknessTapeMinNumber").value = paramCalc.thicknessTapeMin;
  document.querySelector(".thickness-tape-min-range").value = paramCalc.thicknessTapeMin;
  // толщина ленты максимальная
  document.getElementById("thicknessTapeMaxNumber").value = paramCalc.thicknessTapeMax;
  document.querySelector(".thickness-tape-max-range").value = paramCalc.thicknessTapeMax;
  // шаг
  document.getElementById("stepNumber").value = paramCalc.step;
  document.querySelector(".step-range").value = paramCalc.step;
  // усадка материала
  document.getElementById("shrinkageNumber").value = paramCalc.shrinkage;
  document.querySelector(".shrinkage-range").value = paramCalc.shrinkage;

}
// расчет по значениям установленных по умолчанию
onClickCalc();
// коректировка минимального зачиния
minMaxCorection();

// событие клавиши calc
buttonCalc.addEventListener("click", onClickCalc);
// событие клавиши clear
buttonClear.addEventListener("click", onClickClear);
// коректировка минимального зачиния в поле ввода толщины ленты максимальная
thicknessTapeMinNumber.addEventListener("change", minMaxCorection);
// коректировка минимального зачиния в значении ползунка толщины ленты максимальная
thicknessTapeMinRange.addEventListener("change", minMaxCorection);


function onClickCalc() {
  const paramCalc = {
    // диаметр прутка
    diameter: document.getElementById("diameterNumber").value,
    // процетн заполнения
    percentageOfFilling: document.getElementById("percentageOfFillingNumber").value,
    // толщина ленты минимальная
    thicknessTapeMin: document.getElementById("thicknessTapeMinNumber").value,
    // толщина ленты максимальная
    thicknessTapeMax: document.getElementById("thicknessTapeMaxNumber").value,
    // шаг расчета
    step: document.getElementById("stepNumber").value,
    // процент усадки
    shrinkage: document.getElementById("shrinkageNumber").value

  }

  const resultTable = calcRun(paramCalc);
  localStorage.setItem("paramCalc", JSON.stringify(paramCalc));

  let newTable = document.querySelector(".foorm__result__table");

  if( newTable != null) {
    document.querySelector(".foorm__result").removeChild(newTable);
  }

  newTable =  document.createElement("table");
  newTable.setAttribute("class", "foorm__result__table");

  const newRow = document.createElement("tr");

  newRow.innerHTML = `<th>Толщина(мм)</th> <th>Ширина(мм)</th>`;

  newTable.appendChild(newRow);

  document.querySelector(".foorm__result").appendChild(newTable);

  resultTable.forEach(el => addTable(el))

  document.querySelector(".foorm__result").style.display =  'flex';
}

function onClickClear() {
    // диаметр прутка
    document.getElementById("diameterNumber").value = "1.75";
    document.querySelector(".diameter-range").value = "1.75";
    // процетн заполнения
    document.getElementById("percentageOfFillingNumber").value = "100";
    document.querySelector(".percentage-of-filling-range").value = "100";
    // толщина ленты минимальная
    document.getElementById("thicknessTapeMinNumber").value = "0.2";
    document.querySelector(".thickness-tape-min-range").value = "0.2";
    // толщина ленты максимальная
    document.getElementById("thicknessTapeMaxNumber").value = "0.4";
    document.querySelector(".thickness-tape-max-range").value = "0.4";
    // шаг
    document.getElementById("stepNumber").value = "0.05";
    document.querySelector(".step-range").value = "0.05";
    // усадка материала
    document.getElementById("shrinkageNumber").value = "0";
    document.querySelector(".shrinkage-range").value = "0";
    onClickCalc();
}

function calcRun({diameter, percentageOfFilling, thicknessTapeMin, thicknessTapeMax, step, shrinkage}) {
  /**
   * Функция calcRun выполняет вычисления по расчету ширины ленты в деопозоне толшин ленты.
   * ***
   * @diameter [number] - деаметр заполнения прутка
   * @percentageOfFilling [number] - процент заполнения
   * @thicknessTapeMin [number] - минимальная толщина ленты
   * @thicknessTapeMax [number] - максимальная толщина ленты
   * @step [number] - шаг расчета ширины ленты
   * @shrinkage [number] - процент усадки материала ленты
   * ***
   * @return [number]
   */

  // площадь прутка
  const crossSectionalAreaNormal = Math.PI * Math.pow(diameter, 2) / 4;

  // вычисление процента заполнения
  percentageOfFilling = percentageOfFilling * 0.01 ;

  // вычисления процента усадки материала
  if (shrinkage == 0) {
    shrinkage = 1;
  } else {
    shrinkage = (100 - shrinkage) / 100;

  }

  let result = new Array();

  for (let i = thicknessTapeMax; i >= thicknessTapeMin; i -= step) {
    let crossSectionalAreaShrinkage = crossSectionalAreaNormal * shrinkage;
    let widthTape = crossSectionalAreaShrinkage * percentageOfFilling / i;
    let thicknessTape = i;

    result.push({thicknessTape, widthTape});
  }

  return result;

}

function minMaxCorection() {
  const thicknessTapeMaxNumber = document.querySelector(".thickness-tape-max-number");
  const thicknessTapeMaxRange = document.querySelector(".thickness-tape-max-range");

  thicknessTapeMaxNumber.min = thicknessTapeMinNumber.value;
  thicknessTapeMaxRange.min = thicknessTapeMinNumber.value;

  if(thicknessTapeMaxNumber.value <= thicknessTapeMinNumber.value) {
    thicknessTapeMaxNumber.value = thicknessTapeMinNumber.value;
    thicknessTapeMaxNumber.value = thicknessTapeMinNumber.value;

  }

}

function addTable({thicknessTape, widthTape}) {
  thicknessTape = Number.parseFloat(thicknessTape).toFixed(2);
  widthTape =  Number.parseFloat(widthTape).toFixed(2);

  const table = document.querySelector(".foorm__result__table");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `<td>${thicknessTape}</td> <td>${widthTape}</td>`;
  table.appendChild(newRow);
}

function syncingNumberAndRandge(classRange, idNumber) {
  const range = document.querySelector(classRange);
  const number = document.getElementById(idNumber);

  range.addEventListener('input', numberAndRange(number));
  number.addEventListener('input', numberAndRange(range));

  function numberAndRange(el) {
    return event => el.value = event.target.value;

  }

}
