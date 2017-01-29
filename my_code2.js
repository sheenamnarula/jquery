	$(function () {
		var   name1 = $('#person_name');
			var  age = $('#age');
			var contact = $('#contact');
			var designation = $('#designation');
		console.log("hahaha");
		$('#add').prop('disabled',true);
//-----------------------------------search records-------------------------------------	     
		$('#search').on('click',function(){
			var person = $('#title').val();
			//console.log(person);
	        var path = 'http://localhost:3000/profile/'+ Number(person);
	       // console.log(path);
			$.ajax ({
				type: 'GET',
				url: path,
				success: function(path,item){
					console.log(path);
					console.log(path.id);

						     console.log(item);
							$('#tabledata').append('<tr>'+'<td><strong>Name: </strong>'+path.Name+'</td>'+
												'<td><strong>Age: </strong>'+path.Age+'</td>'+
										        '<td><strong>Contact Number: </strong>'+path.Contact+'</td>'+
												'<td><strong>Designation : </strong>'+path.Designation+'</td>'+
												'<td><button type="delete" data-id="'+path.id+'" class="remove">Delete</button>'+'</td>'+
												'<td><button type="edit" data-id="'+path.id+'" class="edit">Edit</button>'+'</td>'+
												'<td><button type="save" data-id="'+path.id+'" class="save">Save</button>'+'</td>'+
                '</tr>');  
                        $(".save").hide();     
			
	     }
	     
		    });


		     $('#search').on('click',function(){
		     	$('#tabledata').empty();
		     	$('#title').val("");
		    
		     });

			
		});
		// ---------------------------------SEARCH ENDS-------------------------------------------
		//----------------------------add records-----------------------------------------------
		$('#person_name').on('click',function(){
			$('#add').prop('disabled',false);
		});
		
		$('#add').on('click',function(){
			console.log("adding records")
			$('#tabledata').empty();
		var addrecord = {
			Name : name1.val(),
			Age  : age.val(),
			Contact : contact.val(),
			Designation : designation.val(),
		};
		$.ajax ({
				type: 'POST',
				url: "http://localhost:3000/profile",
				data : addrecord,
				success: function(addrecord){
					
							$('#tabledata').append('<tr>'+'<td><strong>Name: </strong>'+addrecord.Name+'<td>',
												'<td><strong>Age: </strong>'+addrecord.Age+'<td>',
										        '<td><strong>Contact Number: </strong>'+addrecord.Contact+'<td>',
												'<td><strong>Designation : </strong>'+addrecord.Designation+'<td>'+'</tr>');
												//$('#add').prop("disabled",true); 
												$('#person_name').val("");
												$('#age').val("");
												$('#contact').val("");
												$('#designation').val("");

			
	     }

	    
		    });
	});
	
		//----------------------------ADD RECORDS ENDS-------------------------------------------------
  //----------------------------DELETE RECORDS-------------------------------------------

	
	$('#tabledata').delegate('.remove','click',function(){	
		var  tr=$(this).closest('tr'); 
         var idpath= $(this).attr('data-id');
		console.log(tr);
  $.ajax({
        type:'DELETE',
        url:'http://localhost:3000/profile/'+ idpath,
        success:function(){
        	
            tr.remove();
        },
         error:function()
        {
        	//console.log(url);
            alert('Error loading page');
        }
    });
  });
	//------------------------delete ends-----------------------------------------
	//-----------------------edit starts---------------------------------------
  $('#tabledata').delegate('.edit','click',function(){

       $('#tabledata2').show();
       $('.edit').hide();
       $('.save').show();
        edit_id = $(this).attr('data-id');
        //console.log(edit_id);
  }); //EDIT ENDS
   $('#tabledata').delegate('.save','click',function(){
   	var  tr=$(this).closest('tr');
   	//$("#tabledata").find("tr:not(:first)").remove();
   	    $('#tabledata2').hide();

         var edit_name = $('#edit_name').val();
       var edit_age = $('#edit_age').val();
       var edit_contact = $('#edit_contact').val();
       var edit_designation = $('#edit_designation').val();
        editedObject = {
       	"Name" : edit_name,
       	"Age" : edit_age ,
       	"Contact" : edit_contact ,
       	"Designation" : edit_designation ,
       	"id" : edit_id,
       } ;
         
       $.ajax({
        type:'PATCH',
        url:'http://localhost:3000/profile/'+ edit_id,
         data : editedObject ,
        success:function(){ 
        	tr.remove();
        	console.log(edit_id);
            $('#tabledata').append('<tr>'+'<td><strong>Name: </strong>'+editedObject.Name+'<td>',
												'<td><strong>Age: </strong>'+editedObject.Age+'<td>',
										        '<td><strong>Contact Number: </strong>'+editedObject.Contact+'<td>',
												'<td><strong>Designation : </strong>'+editedObject.Designation+'<td>'+
												'</tr>');
               $('#edit_name').val("");
               $('#edit_age').val("");
               $('#edit_contact').val("");
               $('#edit_designation').val("");

}            
        
        
    });
   });
   //-------------------------------SAVE ENDS----------------------------------------------

	});
        
        
