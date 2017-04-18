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
		
		function jet(){
			var jet_h = "Queenstown is well known for its iconic jet boating!";
			var jet_txt = "Experience the thrill of a high speed Queenstown jet boat ride: skim across the water, whizz round corners and shoot through narrow rocky gorges! In Queenstown you can choose from a number of world famous jet boat operators.";
			
			document.getElementById("intro-h").innerHTML=jet_h;
			document.getElementById("intro_txt").innerHTML=jet_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/jet.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/things-to-do/adventure-activities/water-adventures/jet-boating/";			
		}
		
		function boat(){
			var boat_h = "Surrounded by beautiful lakes, rivers and fiords, Queenstown is an ideal destination for all your favourite water activities, and some you may not have discovered yet.";
			var boat_txt = "Meanwhile, parasailing lifts you high above the lake as you sail along behind a boat, enjoying the thrill of the ride and the beautiful scenery from above. With a few hours to spare you could enjoy a relaxing canoeing or kayaking trip down a pristine river, across a sparkling lake or on a remote fiord.";
			
			document.getElementById("intro-h").innerHTML=boat_h;
			document.getElementById("intro_txt").innerHTML=boat_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/boat.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/things-to-do/sightseeing/scenic-cruises/boat-cruises/";			
		}
		
		function ski(){
			var ski_h = "Queenstown is nestled in the heart of the Southern Alps, boasting magnificent mountains for skiers and snowboarders of all levels.";
			var ski_txt = "The enviously long ski season in Queenstown welcomes skiers and snowboarders from June to October.";
			
			document.getElementById("intro-h").innerHTML=ski_h;
			document.getElementById("intro_txt").innerHTML=ski_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/ski.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/things-to-do/skiing-and-snowboarding/";			
		}
		
		function wine(){
			var wine_h = "The wineries in Queenstown and nearby Gibbston, and it’s easy to while away a day exploring cellar doors and restaurants to find your favourite vintage.";
			var wine_txt = "In Queenstown you can choose from tour companies to ferry you around Gibbston and further afield Central Otago wineries, leaving you to indulge in as many tastings as you wish before being whisked to the next destination.";
			
			document.getElementById("intro-h").innerHTML=wine_h;
			document.getElementById("intro_txt").innerHTML=wine_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/wine.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/things-to-do/wineries/";			
		}
		
		function walk(){
			var walk_h = "Queenstown and the surrounding region’s geography, flora and fauna are incredibly diverse and can be explored on a range of stunning hiking trails.";
			var walk_txt = "A number of short scenic walks start right from Queenstown’s town centre whilst the dramatically beautiful Fiordland and Mount Aspiring national parks, home to the Routeburn and Greenstone tracks, are within easy reach for a day trip or the full multi-day hiking expedition.";
			
			document.getElementById("intro-h").innerHTML=walk_h;
			document.getElementById("intro_txt").innerHTML=walk_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/walk.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/things-to-do/outdoor-activities/walking-and-hiking/";			
		}