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
		
		function Alpine(){
			var Alpine_h = "Alpine Suites is truly located at the heart of the worlds adventure capital and New Zealand's number one resort destination - Queenstown. ";
			var Alpine_txt = "Created by Colin and Yolanda Jenner, Alpine Suites is a friendly, family owned and operated accommodation facility, with quality at an affordable price.";
			
			document.getElementById("intro-h").innerHTML=Alpine_h;
			document.getElementById("intro_txt").innerHTML=Alpine_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Alpine.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/bed-and-breakfasts/listing/alpine-suites";			
		}
		
		function Larch(){
			var Larch_h = "Lesley and Chris offer you a warm welcome to Larch Hill B&B in beautiful Queenstown.";
			var Larch_txt = "As featured in 'National Geographic Traveler' magazine, all rooms in our comfortable and relaxing homestay have spectacular lake and mountain views, with tea/coffee making facilities.";
			
			document.getElementById("intro-h").innerHTML=Larch_h;
			document.getElementById("intro_txt").innerHTML=Larch_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Larch.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/bed-and-breakfasts/listing/larch-hill-homestay-bed-and-breakfast";			
		}
		
		function Lake(){
			var Lake_h = "Lake Vista Bed & Breakfast, located on Queenstown hill, 5 minutes from the airport and just 2 minutes from downtown Queenstown.";
			var Lake_txt = "Make the region where The Lord of the Rings was filmed the location of your next Bed & Breakfast vacation in Queenstown, New Zealand.";
			
			document.getElementById("intro-h").innerHTML=Lake_h;
			document.getElementById("intro_txt").innerHTML=Lake_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Lake.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/bed-and-breakfasts/listing/lake-vista-bed-and-breakfast";			
		}