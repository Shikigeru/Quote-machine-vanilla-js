var btn = document.getElementById("quoteBtn");
var quoteP = document.getElementsByClassName("quote")[0];
var author = document.getElementsByClassName("author")[0];
var twitIcon = document.getElementsByClassName("twitter")[0].children[0];
var twitBtn = document.getElementsByClassName("twitter")[0];
var body = document.body;

function getRandomColor() {
	var colors = ["#333", "rgb(22, 160, 133)", "rgb(52, 34, 36)", "rgb(155, 89, 182)", "rgb(189, 187, 153)", "rgb(71, 46, 50)", "rgb(251, 105, 100)", "rgb(243, 156, 18)", "#26C6DA", "#009688"];
	return colors[Math.floor(Math.random()*colors.length)];
}
function setColor() {
	body.style.backgroundColor = getRandomColor();
	btn.style.backgroundColor = body.style.backgroundColor;
	quoteP.style.color = body.style.backgroundColor;
	author.style.color = body.style.backgroundColor;
	twitIcon.style.backgroundColor = body.style.backgroundColor;
}

function getQuote() {
	// Создаем XHR запрос
	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://andruxnet-random-famous-quotes.p.mashape.com/', true);
	xhr.setRequestHeader('X-Mashape-Key', "hQotQmXzEFmshvqOU8mdSTRTtNCpp1NBHlpjsnhsByBU5HZF8T");

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return; //Если запрос не завершен возрващаемся

		//btn.innerHTML = "Готово!";

		if (xhr.status != 200) {
			//alert ('error: ' + (xhr.status ? xhr.statusText : 'Query failed'));
			quoteP.innerHTML = xhr.statusText;
		} 
		else {
			try {
				var quotes = JSON.parse(xhr.responseText); //Парсим полученный JSON
			}
			catch(e) {
				alert("Некорректный ответ " + e.message);
			}
			quoteP.innerHTML = '<i class="fa fa-quote-left" aria-hidden="true"></i>' + quotes[0].quote;
			author.innerHTML = "- " + quotes[0].author;
			setColor();
		}
		twitBtn.href = "https://twitter.com/intent/tweet?text=" + '"' +quoteP.innerHTML.substring(51) + '"' + " " + author.innerHTML.substr(2);
		//alert(xhr.responseText);
	}

	xhr.send();
}
getQuote();