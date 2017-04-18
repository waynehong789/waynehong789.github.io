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
		
		function Bumbles(){
			var Bumbles_h = "Bumbles Backpackers， only 300m from downtown Queenstown, just far enough away for some peace and quiet!";
			var Bumbles_txt = "If you are looking for an affordable, relaxed and friendly place to stay in Queenstown with spectacular views and a waterfront location, this is it! ";
			
			document.getElementById("intro-h").innerHTML=Bumbles_h;
			document.getElementById("intro_txt").innerHTML=Bumbles_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/Bumbles.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/backpackers/listing/bumbles-backpackers-queenstown";			
		}
		
		function YHAC(){
			var YHAC_h = "YHA Queenstown Central is the perfect base for your stay amidst stunning alpine scenery. ";
			var YHAC_txt = "The clean, comfortable rooms have ensuite and TV, some with their own private courtyard or lake view. The friendly staff and attractive facilities will make this a stay to remember. Queenstown's nightlife with bars, clubs and restaurants, is right outside the door.";
			
			document.getElementById("intro-h").innerHTML=YHAC_h;
			document.getElementById("intro_txt").innerHTML=YHAC_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/YHAC.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/backpackers/listing/yha-queenstown-central";			
		}
		
		function YHAL(){
			var YHAL_h = "YHA Queenstown Lakefront is a comfortable fully equipped hostel with magnificent views of Lake Wakatipu.";
			var YHAL_txt = "Right on the shores of the lake, it's the perfect place to sit and unwind. Lake beach and childrens playground are nearby. Friendly staff with vast amounts of local knowledge provide you with a travel booking service for all domestic land based travel, track and local activities.";
			
			document.getElementById("intro-h").innerHTML=YHAL_h;
			document.getElementById("intro_txt").innerHTML=YHAL_txt;
			document.getElementById("link").style.display = "block";
			document.getElementById("intro-img").src="pic/YHAL.jpg";
			document.getElementById("details-link").href="https://www.queenstownnz.co.nz/accommodation/backpackers/listing/yha-queenstown-lakefront";			
		}