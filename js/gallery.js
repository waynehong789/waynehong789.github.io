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
		
		//Gallery
		var length = 9;                //the total number of images
		var current = 1;               //the current slide number
		var slide_tray = new Array();  //an array to hold the uploaded images
		var slideshow_interval;
		
		//the function to populate slide tray	
		function load_slide(place,file) {
			slide_tray[place] = new Image();
			slide_tray[place].src = file;
		}
   
		//This loop is executed when the page is loaded to initialise the image array
		for (i=1; i<=length;  i++)
		{
			var file_name = "pic/" + i + ".jpg";	//Generate current iamge file name
			load_slide(i, file_name);
		}
		
		//Load next image
		function goforward(e) {
		
		//get the target image element
			var targetElement = document.getElementById('fullImage');

		//stop a slide show
			slideshow(targetElement, 0);

		//I stop event propagation so that it will not 
		//trigger event handler in a parent element or a child element
			e.stopPropagation();
		
		//increase current image number	
			current = current + 1;
		//if the increased value is bigger than the total number of images
		// we reset it the first image
			if( current > length ) {
				current = 1;
			}
	  
	   
		//assign a new image source
			targetElement.src=slide_tray[current].src; //update current image
							
			fade_in(targetElement,100); 
	 	 //start again
			slideshow(targetElement, 8000);	
		}

		//Load previous image
		function gobackward(e) {
		//get the target image element
			var targetElement = document.getElementById('fullImage');
		//stop a slide show
			slideshow(targetElement, 0);
			e.stopPropagation();
			current = current - 1;
		//if the decreased value is less than the first image number
		// we reset it the last image

			if( current < 1 ) {
				current = length;
			} 
			//assign a new image source
			targetElement.src=slide_tray[current].src; //update current image						
			fade_in(targetElement,100); 	
			//start again
			slideshow(targetElement, 8000);		 
		}

		function displayFullImage(ImageElement)
		{
		
			var containerElement = document.getElementById('lightbox');
			var targetElement = document.getElementById('fullImage');
			var left_arrow = document.getElementById('left_button');
			var right_arrow = document.getElementById('right_button');
			 //need to set new current image
		  for (var i = 1; i < slide_tray.length; i++)
		  {
		     var source = ImageElement.src;
		    if(source.search(slide_tray[i].src) != -1)
				{	
				   current = i;
				}   
		   }
		   
		   fade_in(containerElement,70);	  
		   targetElement.style.transition = "width 1s,height 1s";
		   targetElement.src = ImageElement.src;
		    fade_in(targetElement,70);
		    
		    setTimeout(function(){
				targetElement.style.width = "800px";
		    	targetElement.style.height = "450px";	   
			}, 100);
 
		   setTimeout(function(){
				right_arrow.style.display = "inline-block";
				left_arrow.style.display = "inline-block";		   
		   }, 1000);

		   //Once Everything set, start slide show 
		   slideshow(targetElement, 8000);
		
		}
		
		
		
		function removeFullImage(ContainerElement)
		{
		
			var targetElement = document.getElementById('fullImage');
			var left_arrow = document.getElementById('left_button');
			var right_arrow = document.getElementById('right_button');
			
				left_arrow.style.display = "none";
				right_arrow.style.display = "none";

				targetElement.style.width = "200px";
		    	targetElement.style.height = "112px";
		   //stop a slide show 
			slideshow(targetElement, 0);
 
			fade_out(targetElement,70);	

			fade_out(ContainerElement,70);				
		}

		function fade_in(element,millisecond)
		{
			element.style.opacity=0.1;
			element.style.display = "inline-block";
			var op = parseInt(element.style.opacity);
	
			var myInterval = setInterval( function(){ 

						if(element.style.opacity < 1)
						 {
						 	
						 	op += 0.1; 
							element.style.opacity = op;
							
						 }
						 else
						 {
						
							clearInterval(myInterval);

				
						 }
						 
						 
						 }, millisecond);

		}

		function fade_out(element,millisecond)
		{	
			element.style.opacity = "1";
			var op = parseInt(element.style.opacity);	
			var myInterval = setInterval( function(){ 

			             if(element.style.opacity > 0.1)
						 {
						 	op-= 0.1;
							element.style.opacity = op;
						 }
						 else
						 {													
							element.style.display = "none";
							clearInterval(myInterval);									
						 }
						 						 
						 },millisecond);
	
		}

		function slideshow(imageElement, millisecond)
		{

			if(millisecond > 0)
			{	
				slideshow_interval = setInterval(function(){

				current = current + 1;

				if( current > length ) {
				current = 1;
				}

				imageElement.src = slide_tray[current].src;

				fade_in(imageElement,100); 	
				}, millisecond );

			}
			else
			{

				clearInterval(slideshow_interval);

			}
		}