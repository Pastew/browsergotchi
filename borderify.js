document.body.style.border = "5px solid red";

function showRedBorder(){
	DURATION = 400
    var div = $('body');
    $({alpha:0}).animate({alpha:1}, {
        duration: DURATION,
        step: function(){
            div.css('border-color','rgba(255,0,0,'+this.alpha+')');
        }
    });
	
	setTimeout(function(){
		$({alpha:1}).animate({alpha:0}, {
			duration: DURATION*3,
			step: function(){
				div.css('border-color','rgba(255,0,0,'+this.alpha+')');
			}
		});
	}, DURATION*4);
}

function showMonsterWindow(){
	document.body.innerHTML += '<div style="position:fixed;top:0; right:0;width:150px;height:150px;opacity:0.8;z-index:100;background:#000;">wwwwwww</div>';
}
showRedBorder();
showMonsterWindow();
