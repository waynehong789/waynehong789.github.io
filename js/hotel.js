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
		
		function Novotel(){
			var Novotel_h = "Novotel Queenstown Lakeside is the perfect hotel to start your Queenstown experience.";
			var Novotel_txt = "The hotel offers 273 accommodation rooms with a selection of spectacular alpine rooms, garden rooms and lakeside rooms. Novotel ensures the comfort of your stay with a concierge service, ski storage facilities, spa pool, guest laundry and valet car parking. ";
			
			document.getElementById("intro-h").innerHTML=Novotel_h;
			document.getElementById("intro_txt").innerHTML=Novotel_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Novotel.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/hotels-and-resorts/listing/novotel-queenstown-lakeside";			
		}
		
		function Penthouse(){
			var Penthouse_h = "The Penthouse adorns the top of the brand new Eichardt’s building.";
			var Penthouse_txt = "With 240m2 of spacious living areas, indoor and outdoor kitchens, two large bedrooms, marble bathrooms, sauna, spa and Queenstown’s largest private terrace, The Penthouse is the ultimate in luxury accommodation.";
			
			document.getElementById("intro-h").innerHTML=Penthouse_h;
			document.getElementById("intro_txt").innerHTML=Penthouse_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Penthouse.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/hotels-and-resorts/listing/the-penthouse";			
		}
		
		function Millennium(){
			var Millennium_h = "The Millennium Hotel Queenstown offers world class accommodation in a beautiful alpine setting.";
			var Millennium_txt = "The tranquil inner courtyard is a haven of peace and beauty in which to relax.They also offer a health club with spa, sauna and gymnasium, complimentary shuttle to town, a range of laundry services and a covered underground car park. ";
			
			document.getElementById("intro-h").innerHTML=Millennium_h;
			document.getElementById("intro_txt").innerHTML=Millennium_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Millennium.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/hotels-and-resorts/listing/millennium-hotel-queenstown";			
		}