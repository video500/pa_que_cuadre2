import "purecss";
import "./styles.css";

let result = [];
let resultados = [];
let valores = [63, 65, 65, 70, 80, 70, 56, 55, 63];
let valor = 138;

function combine(input, len, start, longitud_resultado) {
  if (len === 0) {
    var total = result.reduce(reducer);
    //console.log( result.join("+")+" = " + total  ); //process
    var resultado = {
      valores: result.slice(),
      total: total
    };
    if (total <= valor) {
      resultados.push(resultado);
    }
    return;
  }
  for (var i = start; i <= input.length - len; i++) {
    result[longitud_resultado - len] = input[i];
    combine(input, len - 1, i + 1, longitud_resultado);
  }
}

function compare(a, b) {
  if (a.total > b.total) return -1;
  if (b.total > a.total) return 1;

  return 0;
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

var procesar = function () {
  console.debug("click");
  valores = document
    .getElementById("txt_valores")
    .value.replace(/,/g, ".")
    .replace(/\r\n/g, "\n")
    .split("\n");
  // Convertir texto a numero
  valores.forEach((numero, index) => {
    valores[index] = parseInt(valores[index], 10);
  });
  valor = document.getElementById("i_total").value;

  console.debug("valores:" + valores + ", total: " + valor);

  resultados = [];

  result = [];

  for (let i = 2; i < valores.length; i++) {
    //	console.debug("GRUPOS DE "+i);
    combine(valores, i, 0, i);
  }
  // Ordenar arreglo resultados

  resultados.sort(compare);
  // mostrar resultados
  document.getElementById("txt_resultados").innerHTML = "";
  resultados.forEach((resultado, index) => {
    console.debug(resultado.valores.join(" + ") + " = " + resultado.total);
    var taResultados = document.getElementById("txt_resultados");
    taResultados.innerHTML +=
      resultado.valores.join(" + ") + " = " + resultado.total + "\n";
    taResultados.style.height = calcHeight(taResultados.value) + "px";
  });
};

document.getElementById("btn_procesar").addEventListener("click", procesar);

//

// Dealing with Textarea Height
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
  return newHeight;
}

let textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", () => {
  textarea.style.height = calcHeight(textarea.value) + "px";
});
