		var slideIndex = 0;
		showSlides();

		function showSlides() {
			var i;
			var slides = document.getElementsByClassName("mySlides");
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none"; 
			}
			slideIndex++;
			if (slideIndex> slides.length) {slideIndex = 1} 
			slides[slideIndex-1].style.display = "block"; 
			var text=document.getElementsByClassName("slide-text");
			text[slideIndex-1].style.color = getRandomColor();
			setTimeout(showSlides, 2000); // Change image every 3 seconds
		}
		
		function getRandomColor(){
			var letters = '0123456789ABCDEF';
			var color ='#';
			for(var i=0;i<6;i++){
				color+=letters[Math.floor(Math.random()*16)];
			}
			return color;
		}
		
		function submit(){
			var fName=document.getElementById("firstname").value;
			var lName=document.getElementById("lastname").value;
			var email=document.getElementById("email").value;
			var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			
			if(document.getElementById("agree").checked){
				if(fName.length>=3){
					if(lName.length>=5){
						if(email.match(mailformat)){
							alert("Congratulations! "+fName+", you have registered successfully.");
						}
						else{alert("You have entered an invalid email address!");}
					}
					else{alert('Last name must be at least 5 letters');}
				}
				else{alert('First name must be at least 3 letters');}
			}
			else{ alert('Please check the box of agree with the term of service!');}
		}