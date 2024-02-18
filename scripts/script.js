const radioWidthTape = document.getElementById("width-tape-radio");
const radioPercentageOfFilling = document.getElementById("percentage-of-filling-radio");

radioWidthTape.addEventListener("click", () => {
  document.getElementById("widthTapeNumber").disabled = true;
  document.getElementById("widthTapeRange").disabled = true;

  document.getElementById("percentageOfFillingNumber").disabled = false;
  document.getElementById("percentageOfFillingRange").disabled = false;

});

radioPercentageOfFilling.addEventListener("click", () => {
  document.getElementById("widthTapeNumber").disabled = false;
  document.getElementById("widthTapeRange").disabled = false;

  document.getElementById("percentageOfFillingNumber").disabled = true;
  document.getElementById("percentageOfFillingRange").disabled = true;

});

const buttonCount = document.querySelector(".button_count");
const buttonClear = document.querySelector(".button_clear");
const result = document.querySelector(".result p");

// событие клавиши calcRun
buttonCount.addEventListener("click", () => {
  const pamCalc = {
    // диаметр прутка
    diameter: document.getElementById("diameter").value,
    // процетн заполнения
    percentageOfFilling: document.getElementById("percentageOfFillingNumber").disabled
                                 ? -1
                                 : document.getElementById("percentageOfFillingNumber").value,
    // ширина ленты
    widthTape: document.getElementById("widthTapeNumber").disabled
                       ? -1
                       : document.getElementById("widthTapeNumber").value,
    // толщина ленты
    thicknessTape: document.getElementById("thicknessTapeNumber").value

  }
  
  console.log(pamCalc);
  const result = calcRun(pamCalc);
  if (pamCalc.percentageOfFilling === -1) {
    document.getElementById("percentageOfFillingNumber").value = result.toFixed(2);
  }

  if (pamCalc.widthTape === -1) {
    document.getElementById("widthTapeNumber").value = result.toFixed(2);
  }

  console.log(result.textContent);

});

// событие клавиши clear
buttonClear.addEventListener("click", () => {
  // диаметр прутка
  document.getElementById("diameter").value = 1.75;
  document.querySelector(".diameter-range").value = 1.75;
  // процетн заполнения
  document.getElementById("percentageOfFillingNumber").value = 80;
  document.querySelector(".percentage-of-filling-range").value = 80;
  // ширина ленты
  document.getElementById("widthTapeNumber").value = 4.8;
  document.querySelector(".width-tape-range").value = 4.8;
  // толщина ленты
  document.getElementById("thicknessTapeNumber").value = 0.4;
  document.querySelector(".thickness-tape-range").value = 0.4;

});

function calcRun({diameter, percentageOfFilling, widthTape, thicknessTape}) {
  /**
   * Функция calcRun выполняет вычисления по расчету ширины ленты или процента заполнения.
   * ***
   * пример: есди необходимо вычислить ширину ленты, в пораметре "процента заполнения"(percentageOfFilling) необходимо передать -1
   * ***
   * @diameter [number] - деаметр заполнения прутка
   * @percentageOfFilling [number] - процент заполнения
   * @widthTape [number] - ширина ленты
   * @thicknessTape [number] - толщина ленты
   * ***
   * @return [number]
   */

  // площадь прутка
  const crossSectionalAreaNormal = Math.PI * Math.pow(diameter, 2) / 4;

  //вычисление ширины ленты
  if (widthTape === -1) {
    return crossSectionalAreaNormal * (percentageOfFilling / 100) / thicknessTape;

  }

  //вычисление процента заполнения
  if (percentageOfFilling === -1) {
    const crossSectionalArea = thicknessTape * widthTape; // площадь ленты

    return (crossSectionalArea / crossSectionalAreaNormal) * 100; // количество заполнения прутка в процентах

  }

}

syncingNumberAndRandge('.diameter-range', 'diameter');
syncingNumberAndRandge('.percentage-of-filling-range', 'percentageOfFillingNumber');
syncingNumberAndRandge('.width-tape-range', 'widthTapeNumber');
syncingNumberAndRandge('.thickness-tape-range', 'thicknessTapeNumber');

function syncingNumberAndRandge(classRange, idNumber) {
  const range = document.querySelector(classRange);
  const number = document.getElementById(idNumber);

  range.addEventListener('input', numberAndRange(number));
  number.addEventListener('input', numberAndRange(range));
  
  function numberAndRange(el) {
    return event => el.value = event.target.value;

  }

}

