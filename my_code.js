$(function () {

    $('#searchbar').prop('disabled',false) ;
     
	$('#searchbar').on('click',function(){
 

		var pathInput = $('#title').val();
        var path = 'http://www.omdbapi.com/?s='+ pathInput;
        console.log(path);
        var counter = 0;
		$.ajax ({
			type: 'GET',
			url: path,
			success: function(path){
				
				 //$('#searchbar').prop('disabled',false) ;
		    $.each(path,function(i,movies){
		    	console.log(movies);
				$.each(movies,function(index,item){
					
						$('#result').append('<li><strong>Title: </strong>'+item.Title+'</li>',
											'<li><strong>Type: </strong>'+item.Type+'</li>',
									        '<li><strong>Year: </strong>'+item.Year+'</li>',
											'<li><strong>IMDB-ID: </strong>'+item.imdbID+'</li>',
											'<li><img src = '+item.Poster+'</li>');
                         $('#searchbar').prop('disabled',true) ;                

				});

			});
		}

	    });


	    $('#title').on('click',function(){
	    	$('#result').empty();
	    	$('#searchbar').prop('disabled',false);
	    });

		
	});
});
