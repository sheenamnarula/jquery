var i=0;      //in loop of scroll to show a finite number of values 
var flag=0; //to remove scrolling error
var flag2=0; //to rermove scrolling while performing other buttons
//-------------------------scrolling callback fn-------------------------
$callback=function(arraypass){
	j=i;
	flag=1;
	flag2=1;
	for(i ; i<j+39 ; i++)
	{  

		
		$('#tabledata').append('<tr class='+arraypass[i].id+'><td>'+arraypass[i].id+'<td class="edit_name"><input type="text" class="edit_name1" name=person1  value="'+arraypass[i].Name+'"'+'</td>'+
			'<td class="edit_age"><input type="text" name=person2 class="edit_age" value="'+arraypass[i].Age+'"'+'</td>'+
			'<td class="edit_contact"><input type="text" name=person3 class="edit_contact" value="'+arraypass[i].Contact+'"'+'</td>'+
			'<td class="edit_designation"><input type="text" name=person4 class="edit_designation" value="'+arraypass[i].Company+'"'+'</td>'+
			'<td><button  data-id="'+arraypass[i].id+'" class="btn btn-primary remove">Delete</button>'+'</td>'+
			'<td><button  data-id="'+arraypass[i].id+'" class=" btn btn-primary edit">Edit</button>'+'</td>'+
			'<td><button  data-id="'+arraypass[i].id+'" class="btn btn-success save">Save</button>'+'</td>'+
			'</tr>');  
		$('.save').hide();
		$('.edit_name1').attr('disabled',true);
		$('.edit_age').attr('disabled',true);
		$('.edit_contact').attr('disabled',true);
		$('.edit_designation').attr('disabled',true);
		
	}
						}//fn ends arraypass
//-----------------------------------table function------------------
$tablefn= function(path)
{
$('#tabledata').append('<tr><th>id</th><th>Name</th><th>Age</th><th>Contact</th><th>Company</th></tr><tr class='+path.id+'><td>'+path.id+'<td class="edit_name"><input type="text" class="edit_name1" name=person1  value="'+path.Name+'"'+'</td>'+
	'<td class="edit_age"><input type="text" name=person2 class="edit_age" value="'+path.Age+'"'+'</td>'+
	'<td class="edit_contact"><input type="text" name=person3 class="edit_contact" value="'+path.Contact+'"'+'</td>'+
	'<td class="edit_designation"><input type="text" name=person4 class="edit_designation" value="'+path.Company+'"'+'</td>'+
	'<td><button  data-id="'+path.id+'" class="btn btn-primary remove">Delete</button>'+'</td>'+
	'<td><button  data-id="'+path.id+'" class=" btn btn-primary edit">Edit</button>'+'</td>'+
	'<td><button  data-id="'+path.id+'" class="btn btn-success save">Save</button>'+'</td>'+
	'</tr>');  
}
//--------------------------------------table fn ends---------------------------------------							
$(function () {
var   name1 = $('#person_name');
var  age = $('#age');
var contact = $('#contact');
var designation = $('#designation');
console.log("hahaha");

$('#add').prop('disabled',true);
		//--------------autocomplete starts--------------------------
		arr2=[];
		$.ajax ({
			type: 'GET',
			url: 'http://localhost:3000/profile',
			success: function(path){
				
				$.each(path,function(i,movies){
						    	//console.log(movies);
						    	arr2.push(movies.Name);
						    	//console.log(arr2);
						    	
						    });	
			}
		});

		//-----autocomplete ends---------------------------------
//-----------------------------------search records-------------------------------------	     
$('#search').on('click',function(){
	var person = $('#title').val();
	flag2=0;
			//console.log(person);
			var path = 'http://localhost:3000/profile/'+person;
	       // console.log(path);
	       $('#tabledata').empty();
	       if(!(person===""))
	       {
	       	$.ajax ({
	       		type: 'GET',
	       		url: path,
	       		success: function(path,item){
	       			
	       			$tablefn(path);
	       			$(".save").hide();     
	       			
	       		}
	       	});
		}//if ends
	});
$('#title').on('click',function(){
	$('#tabledata').empty();
	$('#title').val("");
	
});
		// ---------------------------------SEARCH ENDS-------------------------------------------
		//----------------------------add records-----------------------------------------------
		$('#person_name').on('click',function(){
			$('#add').prop('disabled',false);
		});
		
		$('#add').on('click',function(){
			flag2=0;
			console.log("adding records")
			$('#tabledata').empty();
			if(name1.val()!="" && age.val()!="" && contact.val()!="" && designation.val()!=""){
				var addrecord = {
					Name : name1.val(),
					Age  : age.val(),
					Contact : contact.val(),
					Company : designation.val(),
				};
				$.ajax ({
					type: 'POST',
					url: "http://localhost:3000/profile",
					data : addrecord,
					success: function(addrecord){
						$tablefn(addrecord);
						$('.save').hide();
						
						$('#person_name').val("");
						$('#age').val("");
						$('#contact').val("");
						$('#designation').val("");
					}
				});
			}
			else
			{
				alert("PLEASE ENTER REQUIRED FIELDS");
			}
		});
		
		//----------------------------ADD RECORDS ENDS-------------------------------------------------
  //----------------------------DELETE RECORDS-------------------------------------------
  $('#tabledata').delegate('.remove','click',function(){	
  	var  tr=$(this).closest('tr'); 
  	var idpath= $(this).attr('data-id');
		//console.log(tr);

		$.ajax({
			type:'DELETE',
			url:'http://localhost:3000/profile/'+ idpath,
			success:function(){
				
				tr.remove();
				alert('deleted');
			},
			error:function()
			{
				
				alert('Error loading page');
			}
		});
	});
	//------------------------delete ends-----------------------------------------
	//-----------------------edit starts---------------------------------------
	$('#tabledata').delegate('.edit','click',function(){
		
		edit_id = $(this).attr('data-id');
		$('.edit').hide();
		$('.save').show();
		$('table tr.'+edit_id+' td.edit_name input').attr('disabled',false);
		$('table tr.'+edit_id+' td.edit_age input').attr('disabled',false);
		$('table tr.'+edit_id+' td.edit_contact input').attr('disabled',false);
		$('table tr.'+edit_id+' td.edit_designation input').attr('disabled',false);
		
  }); //EDIT ENDS
	$('#tabledata').delegate('.save','click',function(){
		
		saveid=$(this).attr('data-id');
		
		var edit_name = $('table tr.'+edit_id+' td.edit_name input').val();
		var edit_age = $('table tr.'+edit_id+' td.edit_age input').val();
		var edit_contact = $('table tr.'+edit_id+' td.edit_contact input').val();
		var edit_designation =$('table tr.'+edit_id+' td.edit_designation input').val();
		editedObject = {
			"Name" : edit_name,
			"Age" : edit_age ,
			"Contact" : edit_contact ,
			"Company" : edit_designation ,
			"id" : edit_id,
		} ;
		console.log(edit_id);
		$.ajax({
			type:'PATCH',
			url:'http://localhost:3000/profile/'+ edit_id,
			data : editedObject ,
			success:function(){ 
				console.log(editedObject);
				
				$tablefn(editedObject);
				
				$('.save').hide();					
				$('.edit').show();
			}            
		});
	});
   //-------------------------------SAVE ENDS----------------------------------------------
//--------------------------------------search by name------------------------------------
$('#search').on('click',function(){
	
			//console.log(person);
			flag2=0;
			var person1 = $('#title').val();

			var path = 'http://localhost:3000/profile';
	       // console.log(path);
	       $.ajax ({
	       	type: 'GET',
	       	url: path,
	       	success: function(path){
	       		
	       		$.each(path,function(i,movies){
	       			
	       			if(movies.Name === person1)
	       			{

	       				
	       				$tablefn(movies);
	       				$(".save").hide();      

                        }  //IF ENDS
                    });
	       		
	       	},
	       	error:function()
	       	{
	       		
	       		alert('NO SUCH RECORD');
	       	}

	       	
	       });


	       $('#search').on('click',function(){
	       	$('#tabledata').empty();
	       	$('#title').val("");
	       	
	       });

	       
	   });
$('#search').on('click',function(){
	var person = $('#title').val();
			//console.log(person);
			flag2=0;
			var path = 'http://localhost:3000/profile';
	       // console.log(path);
	       $.ajax ({
	       	type: 'GET',
	       	url: path,
	       	success: function(path){
	       		
	       		$.each(path,function(i,movies){
						    	//console.log("in fn");
						    	if(movies.Company === person)
						    	{

						    		$tablefn(movies);
						    		$(".save").hide();      

                        }  //IF ENDS
                    });
	       		
	       	},
	       	error:function()
	       	{
	       		
	       		alert('NO SUCH RECORD');
	       	}
	       	
	       });
	       $('#search').on('click',function(){
	       	$('#tabledata').empty();
	       	$('#title').val("");
	       	
	       });
	   });
//------------------------------display all records----------------------------------------
$('#displayall').on('click',function(){
	flag2=1;
	var person = $('#title').val();
			//console.log(person);
			$('#tabledata').empty();
			$('#tabledata').append('<tr><th>id</th><th>Name</th><th>Age</th><th>Contact</th><th>Company</th></tr>');
			var path = 'http://localhost:3000/profile';
			console.log("hahahah");
			$.ajax ({
				type: 'GET',
				url: path,
				success: function(path){
					arr = path;
					$callback(arr);
				}
				
			});

		});

var win = $(window);
console.log(flag2+"outside displayall")
    // Each time the user scrolls
    win.scroll(function() {
    	console.log(flag2+"inside window")
        // End of the document reached?
        if (flag===1 && $(document).height() - win.height() == win.scrollTop()) {
        	if(flag2===1)
        	{
        		$callback(arr);	
        	}

        }
    });
    $( '#title' ).autocomplete({
    	source: arr2,
    	minLength: 3
    });
    
});




