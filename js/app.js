$(function(){
	function isTouch(){
		try{
			document.createEvent("TouchEvent");
			return true;
		}catch(e){
			return false;
	}
	};
	var app = {
		carosel: (function(){

		})(),
		twitter: (function(){
			var twitterURL = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=ntkachov&count=1&callback=?';
			$.getJSON(twitterURL, function(data){
				console.log(data[0].text);
				$("#tweet").append(data[0].text);
			});
		})(),
		header:(function(){
			var isFull = false;
			$("header").click(function(){
				if(isFull){return};
				var header = $(this);
				header.removeClass("min");
				var height = header.outerHeight();
				header.css("height","45px");
				header.animate({height:height+"px"}, 200);
				isFull = true;
	
				$(document).scroll(function(e){
					console.log("scrollFired");
					header.addClass("min");
					isFull=false;
					$(document).off('scroll');
					
					header.animate({height:"45px"},600, function(){header.css({height:""})});
					
				});
			});
		})(),
		content:(function(){
			if(isTouch()){ //if touch events exist...
				var scrollStartPos = 0;	
				var elem = document.getElementById("content");
				var velocity = 0;
				var prevDate = Date.now();
				console.log(prevDate);
				var prevScrollTop = elem.scrollTop;;
				var intervalID;
				elem.addEventListener("touchstart",function(event) {
					scrollStartPos=this.scrollTop+event.touches[0].pageY;
					velocity = 0;
					if(intervalID){
						clearInterval(intervalID);
					}
					event.preventDefault();
				},false);
 
				elem.addEventListener("touchmove", function(event) {
					this.scrollTop=scrollStartPos-event.touches[0].pageY;
					velocity = (this.scrollTop - prevScrollTop)/(Date.now() - prevDate);
					prevDate = Date.now();
					prevScrollTop = this.scrollTop;
					event.preventDefault();
				},false);

				elem.addEventListener("touchend", function(event) {
					var t = this;
					intervalID = setInterval(function(){
						t.scrollTop = t.scrollTop + (velocity * 10);
						velocity = velocity * 0.97;
						if(Math.abs(velocity) < 0.1){ 
							velocity = 0;
							clearInterval(intervalID);	
							intervalID = undefined;
						};
					}, 17);	
				});
				
			}
		})()
	}
	window.scrollTo(0,1);
});
