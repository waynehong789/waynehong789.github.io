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
		
		function Stratosfare(){
			var Stratosfare_h = "Stratosfare Restaurant and Bar is a must for any visitor to Queenstown.";
			var Stratosfare_txt = "Enjoy sumptuous cuisine at Stratosfare Restaurant, serving iconic New Zealand fare infused with international influences; whether it's fresh seafood, tender Southland beef or delicious vegetarian dishes - there is something to suit every taste.";
			
			document.getElementById("intro-h").innerHTML=Stratosfare_h;
			document.getElementById("intro_txt").innerHTML=Stratosfare_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/food_2.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/places-to-eat-and-drink/restaurants/listing/skyline-queenstown-restaurant";			
		}
		
		function walter(){
			var walter_h = "Cruise across Lake Wakatipu on board the TSS Earnslaw Vintage Steamship to Walter Peak High Country Farm.";
			var walter_txt = "The Colonel's Homestead Restaurant has a unique ambience and is the perfect place to enjoy our new menu which includes an expansive array of New Zealand and local produce.";
			
			document.getElementById("intro-h").innerHTML=walter_h;
			document.getElementById("intro_txt").innerHTML=walter_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/walter.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/places-to-eat-and-drink/restaurants/listing/walter-peak-evening-dining-real-journeys";			
		}
		
		function finz(){
			var finz_h = "Finz Seafood & Grill offers casual relaxed waterfront dining right in the heart of Queenstown.";
			var finz_txt = "Finz is a delightful bustling seafood bistro where you can enjoy the wholesome flavours of New Zealand including succulent seafood, premium steaks, New Zealand Lamb and the popular daily Fresh Fish Specials";
			
			document.getElementById("intro-h").innerHTML=finz_h;
			document.getElementById("intro_txt").innerHTML=finz_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/finz.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/places-to-eat-and-drink/restaurants/listing/finz-seafood-and-grill-queenstown";			
		}
		
		function Bazaar(){
			var Bazaar_h = "Bazaar Interactive Marketplace & Reds Bar";
			var Bazaar_txt = "Bazaar chefs provide a theatrical and thoroughly interactive dining experience to create both an ocular and gastronomic experience for guests like no other.";
			
			document.getElementById("intro-h").innerHTML=Bazaar_h;
			document.getElementById("intro_txt").innerHTML=Bazaar_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/bazaar.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/places-to-eat-and-drink/restaurants/listing/ben-lomond-restaurant";			
		}
		
		function fergburger(){
			var fergburger_h = "Fergburger is a hamburger restaurant located in Queenstown.";
			var fergburger_txt = "Fergburger specialises in gourmet hamburgers, and is quite well known internationally despite not being a chain and only having one location.";
			
			document.getElementById("intro-h").innerHTML=fergburger_h;
			document.getElementById("intro_txt").innerHTML=fergburger_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/fergburger.jpg";
			document.getElementById("details-link").href="http://www.fergburger.com/fullscreen.html";			
		}