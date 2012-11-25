$(function(){
	var button=$('#send');
	button.click(function(){
		var value=$('.url').val();
		var key=$('.key').val();
		$.ajax({
			type:'POST',
			url:'/sendUrl',
			data:{'url':value,'key':key}
			
		}).done(function(msg){
				$('.result').html(msg);
			});
	});
});
