		var slideIndex = 0;
		showSlides();

		function showSlides() {
			var i;
			var slides = document.getElementsByClassName("mySlides");
			var text=document.getElementsByClassName("slide-text");
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none"; 
			}
			slideIndex++;
			if (slideIndex> slides.length) {slideIndex = 1} 
			slides[slideIndex-1].style.display = "block"; 
			text[slideIndex-1].style.color = getRandomColor();
			setTimeout(showSlides, 3000); // Change image every 3 seconds
		}
		
		function getRandomColor(){
			var letters = '0123456789ABCDEF';
			var color ='#';
			for(var i=0;i<6;i++){
				color+=letters[Math.floor(Math.random()*16)];
			}
			return color;
		}
		
		function Arrowtown(){
			var Arrowtown_h = "Arrowtown Viking Lodge Motel is the great family accommodation.";
			var Arrowtown_txt = "All with full kitchen facilities, own washing machines, guest select Sky, free WiFi, heat pump/aircon in most units and off street parking.";
			
			document.getElementById("intro-h").innerHTML=Arrowtown_h;
			document.getElementById("intro_txt").innerHTML=Arrowtown_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Arrowtown.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/motels/listing/arrowtown-viking-lodge-motel";			
		}
		
		function Alexis(){
			var Alexis_h = "Alexis Queenstown offers a variety of beautifully appointed studio units and apartments, all serviced daily.";
			var Alexis_txt = "Enjoy amazing views of Lake Wakatipu and the stunning Remarkables mountain range from all our accommodation options.";
			
			document.getElementById("intro-h").innerHTML=Alexis_h;
			document.getElementById("intro_txt").innerHTML=Alexis_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Alexis.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/motels/listing/alexis-motels-and-apartments";			
		}
		
		function Autoline(){
			var Autoline_h = "Autoline Motel, just a 600 metre stroll to town, and located off the main road, boasts some of the most spectacular mountain and lake views Queenstown has to offer.";
			var Autoline_txt = "Relax and take in the views after an action packed day in and around Queenstown on your very own private balcony.";
			
			document.getElementById("intro-h").innerHTML=Autoline_h;
			document.getElementById("intro_txt").innerHTML=Autoline_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Autoline.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/motels/listing/autoline-motel";			
		}