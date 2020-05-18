var frequencias = [] ;
var id = 0;
var facTotal = 0;
function Frequencia(id, valor1, valor2, fi) {
	this.id = id;
	this.valor1 = valor1;
	this.valor2 = valor2;
	this.fi = fi;
}
$(".calculate").click(function(){
	if($("#arquivo").hasClass("active")){
		var file = document.getElementById("file").files[0];
		if (file) {
		    var reader = new FileReader();
		    reader.readAsText(file, "UTF-8");
		    reader.onload = function(){
	          var valores = reader.result.split(',');
	          calculate(valores);
	        };
		}
	}else{
		var valores = $("#valores-media").val().split(',');
		calculate(valores);
	}
});
function calculate(valores){
	var valido = true;
	var numeros = [];
	for(var i = 0; i < valores.length; i++) {
		valor = valores[i];
		if(isNaN(valor)){
			valido = false;
		}else{
			numeros.push(parseFloat(valor));
		}
	}
	if(valido){
		limpar();
		media(numeros);
		mediana(numeros);
		moda(numeros);
		mediaGeo(numeros);
		somaDesvioPadrao(numeros);
		desvioAmostra(numeros);
		varianciaAmostra(numeros);
		varianciaPopulacao(numeros);
		desvioPopulacao(numeros);
		coeficiente(numeros);
		distribuirValores(numeros);
		calcularTabela();
	}
}
function distribuirValores(numeros){
	var R = math.max(numeros) - math.min(numeros);
	var K = Math.round(1 + 3.22 * Math.log10(numeros.length));
	var H = parseInt(R/K) + 1;
	var aux = math.min(numeros);
	for (var i = 0; i < K; i++) {
		var min = Math.round(aux);
		var max = Math.round(aux + H);
		var Fi = calcularFi(min, max, numeros);
		facTotal = facTotal + Fi;
		var frequencia = new Frequencia(id, min, max, Fi);
		id ++;
		frequencias.push(frequencia);
		aux += H;
	}
  console.log(frequencias);
}
function calcularFi(min, max, numeros){
	var fi = 0;
	for(var r = 0; r < numeros.length; r++){
		if(numeros[r] >= min && numeros[r] < max){
			fi++;
		}
	}
	return fi;
}
function media(numeros){
	var media = math.mean(numeros);
	$('#media').append(media.toFixed(2))
}
function mediaGeo(numeros){
	var prod = math.prod(numeros);
	var mediaGeo = Math.pow(prod, 1/numeros.length);
	$('#mediaGeo').append(mediaGeo.toFixed(2))
}
function mediana(numeros){
	var mediana = math.median(numeros);
	$('#mediana').append(mediana.toFixed(2))
}
function moda(numeros){
	var moda = math.mode(numeros);
	if(moda < Math.max(numeros)){
		$('#moda').append(moda)
	}else{
		$('#moda').append("amodal")
	}
}
function desvioAmostra(numeros){
	var desvioAmostra = math.std(numeros);
	$('#desvioAmostra').append(desvioAmostra.toFixed(2))
}
function varianciaAmostra(numeros){
	var varianciaAmostra = math.variance(numeros);
	$('#varianciaAmostra').append(varianciaAmostra.toFixed(2))
}
function desvioPopulacao(numeros){
	var desvioPopulacao = Math.sqrt(parseFloat($('#varianciaPopulacao').text()));
	$('#desvioPopulacao').append(desvioPopulacao.toFixed(2))
}
function varianciaPopulacao(numeros){
	var varianciaPopulacao = parseFloat($('#somaDesvioPadrao').text())/numeros.length;
	$('#varianciaPopulacao').append(varianciaPopulacao.toFixed(2))
}
function coeficiente(numeros){
	var coeficiente = (100 * math.std(numeros))/math.mean(numeros);
	$('#coeficiente').append(coeficiente.toFixed(2))
}
function somaDesvioPadrao(numeros){
	var media = math.mean(numeros);
	var desvio = []
	for(var i = 0; i < numeros.length; i++) {
		desvio.push(Math.pow(numeros[i] - media,2));
	}
	$('#somaDesvioPadrao').append(math.sum(desvio).toFixed(2));
}
function calcularTabela(){
	var fac = 0;
	var xifiTotal = 0;
	$('#values').html("");
	$("#freq-media").html("");
	for(var i=0; i < frequencias.length; i++){
		var xi = (frequencias[i].valor1 + frequencias[i].valor2) / 2;
		fac = fac + frequencias[i].fi;
		xifiTotal = xifiTotal + xi * frequencias[i].fi;

		$("#values").append(
		"<tr><td>"+ frequencias[i].valor1 + "├" + frequencias[i].valor2 + 
		"</td><td>" + frequencias[i].fi + 
		"</td><td>" + xi.toFixed(2) + 
		"</td><td>" + fac + 
		"</td><td>" + ((frequencias[i].fi * 100)/facTotal).toFixed(2) + 
		"</td><td>" + (xi * frequencias[i].fi).toFixed(2) + 
		"</td></tr>");
	}
	$("#values").append(
	"<tr class='format'><td>Total</td><td>" + fac + 
	"</td><td>-</td><td>-</td><td>100.00</td><td>" + 
	(xifiTotal).toFixed(2) + "</td></tr>");
	$("#freq-media").append("<div  class='alert alert-success' role='alert'>Média: " + (xifiTotal/fac).toFixed(2) + "</div>");
}

$("#arquivo").click(function(){
	$("#arquivo").addClass("active");
	$("#texto").removeClass("active");
	$("#card-texto").css("display", "none");
	$("#card-arquivo").css("display", "block");
});
$("#texto").click(function(){
	$("#texto").addClass("active");
	$("#arquivo").removeClass("active");
	$("#card-texto").css("display", "block");
	$("#card-arquivo").css("display", "none");
});
function limpar(){
	id = 0;
	frequencias = [];
	facTotal = 0;
	$('#media').html("");
	$('#mediaGeo').html("");
	$('#mediana').html("");
	$('#moda').html("");
	$('#desvioAmostra').html("");
	$('#varianciaAmostra').html("");
	$('#desvioPopulacao').html("");
	$('#varianciaPopulacao').html("");
	$('#somaDesvioPadrao').html("");
	$('#coeficiente').html("");
	$('#values').html("");
	$("#freq-media").html("");
}