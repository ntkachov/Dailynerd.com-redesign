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
		return {
			twitter: (function(){
				var twitterURL = 'https://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=ntkachov&count=1&callback=?';
				$.getJSON(twitterURL, function(data){
					$("#tweet").prepend(data[0].text);
				});
			})(),
			header:(function(){
		/*		$("#backbutton").click(function(){
					location.hash = "home";
				});*/
			})(),
			getPosts:(function(){
				
				var nodeURL = "/node/getList";
				return function(from, to){
					$.post(nodeURL, '["'+from +'","'+to +'"]', function(data){
						$(".blogPost").html("");
						var data = JSON.parse(data);	
						for(var d in data){
							if(data[d]!=undefined){
								$(".blogPost").append("<a href=#" + data[d].time + "> <li>"+ data[d].title + "</li></a>");
							}
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
						location.hash=data.time;
						$(".fullpost").html("<h1>" + data.title + "</h1> <p>" + data.blurb + "</p><p>"+ data.body + "</p>");
						$(".blogLinks").hide();
						$(".fullpost").show();
						
					});
				}
			})(),
			changeHash: function(hash){
				location.hash = hash;
			}


		}
		
	})();	
	window.onhashchange = function(){
		if(location.hash == "#home"){
			thedailynerd.getPosts(0,10);
		}
		else{
			thedailynerd.getBody(location.hash.substring(1,location.hash.length));
		}
		
	};	
	if(location.hash != "#home" && location.hash != ""){
		thedailynerd.getBody(location.hash.substring(1,location.hash.length));
	}
	else{
		thedailynerd.getPosts(0,10);	
	}
	window.scrollTo(0,1);
});
