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
	thedailynerd = (function(){
		window.onhashchange = function(){
			if(location.hash == "home"){
				getBody(0,10);

			}
		};	
		return {
			twitter: (function(){
				var twitterURL = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=ntkachov&count=1&callback=?';
				$.getJSON(twitterURL, function(data){
					console.log(data[0].text);
					$("#tweet").prepend(data[0].text);
				});
			})(),
			header:(function(){
				$("#backbutton").click(function(){
					location.hash = "home";
				});
			})(),
			getPosts:(function(){
				
				var nodeURL = "/node/getList";
				return function(from, to){
					$.post(nodeURL, '["'+from +'","'+to +'"]', function(data){
						console.log(data);
						var data = JSON.parse(data);	
						for(var d in data){
							console.log(d);
							$(".blogPost").append("<li onclick=\"thedailynerd.getBody(" + data[d].time + ")\">" + data[d].title + "</li>");
						}
						//Change site back to home page.
						$(".blogLinks").show();
						$(".fullpost").hide();
					}); 
				}
			})(),
			getBody: (function(){
				var nodeURL = "/node/getPost";	
				return function(posttime){
					$.post(nodeURL,	'{"posttime":' + posttime + '}', function(data){
						
						console.log(data);
						var data = JSON.parse(data);
						location.hash=data.title;
						$(".fullpost").html("<h1>" + data.title + "</h1> <p>" + data.blurb + "</p><p>"+ data.body + "</p>");
						$(".blogLinks").hide();
						
					});
				}
			})()


		}
		
	})();	
	thedailynerd.getPosts(0,10);	
	window.scrollTo(0,1);
});
