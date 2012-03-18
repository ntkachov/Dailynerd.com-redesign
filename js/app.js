var thedailynerd = {};
$(function() { 
	function isTouch(){
		try{
			document.createEvent("TouchEvent");
			return true;
		}catch(e){
			return false;
		}
	};
	thedailynerd = {
		carosel: (function(){

		})(),
		twitter: (function(){
			var twitterURL = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=ntkachov&count=1&callback=?';
			$.getJSON(twitterURL, function(data){
				console.log(data[0].text);
				$("#tweet").prepend(data[0].text);
			});
		})(),
		header:(function(){
			var isFull = false;
			$("header").toggle(function(){
				if(isFull){return};
				var header = $(this);
				header.removeClass("min");
				isFull = true;
			},function(){
				var header = $(this);
				header.addClass("min");
				isFull=false;
			});
		})(),
		getPosts:(function(){
			var nodeURL = "/node/getList";
			$.post(nodeURL, {
		})();


/*
		content:(function(){
			//This code goes around a bug inside android browser where it
			//will ignore overflow auto and overflow scroll. this tries to
			//replicate the scrolling and scrolling velocity that is used
			//by iOS.
			if(isTouch()){ 
				var scrollStartPos = 0;	
				var elem = document.getElementById("noelem");
				var velocity = 0;
				var prevDate = Date.now();
				var prevScrollTop = elem.scrollTop;;
				var intervalID;
				var deltaT = 0; 
				var deltaY = 0;
				var nowDate = Date.now();
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
					nowDate = Date.now();
					deltaY = (this.scrollTop - prevScrollTop);
					deltaT = (nowDate - prevDate);
					prevDate = nowDate;
					prevScrollTop = this.scrollTop;
				//	event.preventDefault();
				},false);

				elem.addEventListener("touchend", function(event) {
					var t = this;
					velocity = deltaY / deltaT;
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
		})()*/
	}
	window.scrollTo(0,1);
});
