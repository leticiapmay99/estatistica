$(".calculate").click(function(){
	if($("#arquivo").hasClass("active")){
		console.log("04");
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
		
	}
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

var frequencias = [] ;
var id = 1;
var facTotal = 0;
function Frequencia(id, valor1, valor2, fi) {
	this.id = id;
	this.valor1 = valor1;
	this.valor2 = valor2;
	this.fi = fi;
}

$("#frequencias").click(function(){
	var frequencia = new Frequencia(id, parseInt($("#valor1").val()), parseInt($("#valor2").val()), parseInt($("#fi").val()));
	facTotal = facTotal + parseInt($("#fi").val());
	frequencias.push(frequencia);
	calcularTabela();
});

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
	xifiTotal + "</td></tr>");
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
$("#limpar").click(function(){
	$('#values').html("");
	$("#freq-media").html("");
	id = 1;
	frequencias = [];
	$("#valor1").val("");
	$("#valor2").val("");
	$("#fi").val("");
});