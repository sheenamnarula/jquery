var faker = require('faker');
 
function generateProfiles()
{
	var profile = [];
	for(var id = 0;id<100000 ; id++)
	{
		var firstname = faker.name.firstName();
		var age = faker.random.number({min:23, max:70});
		var contact = faker.phone.phoneNumber();
		var company = faker.company.companyName();
		console.log(firstname);
		console.log(age);
		console.log(contact);
		console.log(company);
		profile.push({
			"id" : id,
			"Name" : firstname,
			"Age"  : age,
			"Contact" : contact,
			"Company" : company,
		})
	}
	return{"profile" : profile}
}
generateProfiles();
module.exports = generateProfiles
