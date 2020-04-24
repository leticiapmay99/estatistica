$("#calculate").click(function(){
	var teste = []
	var file = document.getElementById("file").files[0];
	if (file) {
	    var reader = new FileReader();
	    reader.readAsText(file, "UTF-8");
	    reader.onload = function(){
          var valores = reader.result.split(',');
          calculate(valores);
        };
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
		mediaGeo(numeros)
		desvioPadrao(numeros);
		varianciaAmostra(numeros);
		varianciaPopulacao(numeros);
		coeficiente(numeros);
		somaDesvioPadrao(numeros)
	}
}
function media(numeros){
	var media = math.mean(numeros);
	$('#media').append(media)
}
function mediaGeo(numeros){
	var prod = math.prod(numeros);
	var mediaGeo = Math.pow(prod, 1/numeros.length);
	$('#mediaGeo').append(mediaGeo)
}
function mediana(numeros){
	var mediana = math.median(numeros);
	$('#mediana').append(mediana)
}
function moda(numeros){
	var moda = math.mode(numeros);
	$('#moda').append(moda)
}
function desvioPadrao(numeros){
	var desvioPadrao = math.variance(numeros);
	$('#desvioPadrao').append(desvioPadrao)
}
function varianciaAmostra(numeros){
	var varianciaAmostra = math.std(numeros);
	$('#varianciaAmostra').append(varianciaAmostra)
}
function varianciaPopulacao(numeros){
	var varianciaPopulacao = math.mad(numeros);
	$('#varianciaPopulacao').append(varianciaPopulacao)
}
function coeficiente(numeros){
	var coeficiente = math.std(numeros);
	$('#coeficiente').append(coeficiente)
}
function somaDesvioPadrao(numeros){
	var media = math.mean(numeros);
	var desvio = []
	for(var i = 0; i < numeros.length; i++) {
		desvio.push(Math.pow(numeros[i] - media,2));
	}
	$('#somaDesvioPadrao').append(math.sum(desvio));
}