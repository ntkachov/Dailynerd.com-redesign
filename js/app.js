var thedailynerd = {};
$(function() { 
	function formatHTML(title, blurb, time){
		var d = new Date(time).toDateString();
		return "<a href=#" + time + "> <li> <h1 class=\"title\">"+title + "</h1><p class=\"blurb\">" + blurb + "</p><p class=\"time\">"+ d +"</p></li></a>"

	}
	thedailynerd = (function(){
		return {
			twitter: (function(){
				var twitterURL = 'http://api.twitter.com/1/statuses/user_timeline.json?include_entities=true&include_rts=false&screen_name=ntkachov&count=1&callback=?';
				$.getJSON(twitterURL, function(data){
					$("#tweet").prepend(data[0].text);
				});
				//Load the image so we have a faster first view
				var twitterimagescr ="http://si0.twimg.com/images/dev/cms/intents/bird/bird_blue/bird_32_blue.png";
				$("#twitterimage").attr("src", twitterimagescr);
			})(),
			header:(function(){
				var id = "#headermore";
				$("#headerTitle").toggle(function(){
					$(id).addClass("headerMore");
					$(id).removeClass("headerArrow");
				}, function(){
					$(id).removeClass("headerMore");
					$(id).addClass("headerArrow");
				});
			})(),
			getPosts:(function(type){
				
				var nodeURL = "/node/getList";
				return function(from, to){
					$[type](nodeURL, '["'+from +'","'+to +'"]', thedailynerd.renderJSON); 
				}
			})("get"),
			getBody: (function(type){
				var nodeURL = "/node/getPost";	
				return function(posttime){
					$[type](nodeURL,	'{"posttime":' + posttime + '}', function(data){
						console.log(data);
						var data = JSON.parse(data);
						location.hash=data.time;
						$(".fullpost").html("<h1>" + data.title + "</h1> <p>" + data.blurb + "</p><p>"+ data.body + "</p>");
						$(".blogLinks").hide();
						$(".fullpost").show();
						
					});
				}
			})("get"),
			renderJSON: function(data){
					$(".blogPost").html("");
					var data = JSON.parse(data);	
					for(var d in data){
						if(data[d]!=undefined){
							$(".blogPost").append( formatHTML(data[d].title, data[d].blurb, data[d].time)  );
						}
					}
					//Change site back to home page.
					$(".blogLinks").show();
					$(".fullpost").hide();
			},
			
			changeHash: function(hash){
				location.hash = hash;
			}


		}
		
	})();	
	window.onhashchange = function(){
		if(location.hash == "#home" || location.hash == ""){
			thedailynerd.getPosts(0,10);
		}
		else{
			thedailynerd.getBody(location.hash.substring(1,location.hash.length));
		}
		
	};	
	typeof(thedailynerd_blog_data) == "undefined"? thedailynerd_blog_data = "" : false;
	if( thedailynerd_blog_data == "" ){
		if(location.hash != "#home" && location.hash != ""){
			thedailynerd.getBody(location.hash.substring(1,location.hash.length));
		}
		else{
			thedailynerd.getPosts(0,10);	
		}
	}
	else{	
		thedailynerd.renderJSON(thedailynerd_blog_data);
	}
	window.scrollTo(0,1);


});
