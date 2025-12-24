const express = require('express');
const app = express();

const employees = [
	{
		id: 101,

		name: 'John Doe',

		salary: 65000,

		city: 'New York',

		department: 'Engineering',

		role: 'Software Developer',

		experience: 3,

		email: 'john.doe@example.com',

		isActive: true,
	},

	{
		id: 102,

		name: 'Emma Watson',

		salary: 72000,

		city: 'San Francisco',

		department: 'Engineering',

		role: 'Senior Software Engineer',

		experience: 5,

		email: 'emma.watson@example.com',

		isActive: true,
	},

	{
		id: 103,

		name: 'Michael Smith',

		salary: 54000,

		city: 'Chicago',

		department: 'Marketing',

		role: 'Marketing Executive',

		experience: 2,

		email: 'michael.smith@example.com',

		isActive: true,
	},

	{
		id: 104,

		name: 'Sophia Johnson',

		salary: 60000,

		city: 'Austin',

		department: 'Human Resources',

		role: 'HR Manager',

		experience: 4,

		email: 'sophia.johnson@example.com',

		isActive: false,
	},

	{
		id: 105,

		name: 'David Miller',

		salary: 80000,

		city: 'Seattle',

		department: 'Finance',

		role: 'Financial Analyst',

		experience: 6,

		email: 'david.miller@example.com',

		isActive: true,
	},
];

app.get('/findAllEmployees', (req, res) => {
	res.json(employees);
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
