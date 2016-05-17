// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const exec = require('child_process').exec;
const $ = require('jquery');


let showPackage = $('.open-project');
let searchPackages = $('#search-packages');
let packageDetails = document.getElementById('package-details');
let searchDetails = document.getElementById('search-details');

showPackage.on('click', function() {
	let packageData, list;
	fs.readFile('package.json', 'utf8', function (err, data) {
	  	if (err) throw err;

	  	packageData = JSON.parse(data);
	  	list = createList(packageData.dependencies);
	  	$('#dependancies').html(list);
	});
});

$('#dependancies').on('click', '.uninstall-package',  function() {
	let name = $(this).parent().attr('package');
	console.log(name);

	npmit(`npm uninstall ${name} --save`, () => {
		console.log(`${name} package was uninstalled successfully`);
	});
});

searchPackages.on('click', function() {
	npmit('npm search angular');
});

function npmit(command, fn) {
	exec(command, function (error, stdout, stderr) {
     	console.log('stdout: ' + stdout);
     	console.log('stderr: ' + stderr);
     	if (error !== null) {
          	console.log('exec error: ' + error);
     	}

     	fn();
 	});
}

function createList(obj) {
	let list;

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			list += `<li package="${key}">${key} <button class="uninstall-package btn-xs btn btn-primary">Uninstall</button></li>`;
		}
	}

	return `<ul>${list}</ul>`;
}