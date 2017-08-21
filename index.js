// show_FHIR_Graph is the only function you need to generate graphs.
// Due to synchronize problem, we need to use a callback instead of return.
exports.show_FHIR_Graph = function(fhir_files, callback) {
	// This charData structure is for chart.js, you can change it to others
	var chartData = {
	  type: 'line',
	  data: {
	    labels: [],
	    datasets: [{
		    label: '',
		    backgroundColor: '#9368E9',
		    borderColor: '#6B49AF',
		    borderWidth: 2,
		    data: []
		}]
	  }
	};
	// Require this module since we need to read all files in a folder
	var read_dir_files = require('read-dir-files');
	var path = require('path');
	var tmpDir = path.join(__dirname, 'fhir_files');
	// After this one, we get the path of the target directionary
	var targetDir = path.join(tmpDir, fhir_files);
	var files;
	// Read all files in this directionary
	read_dir_files.list(targetDir, function (err, filenames) {
	  if (err) return console.dir(err);
	  var valueByDate = [];
	  for (var fhir_file of filenames) {
	  	// We only care about json files, which has FHIR objects inside
	  	if (fhir_file.slice(-5) == '.json') {
	  		// Read the FHIR object
	  		var fhir_object = require(fhir_file);
	  		// Set the Chart name into the FHIR object ID
	  		chartData.data.datasets[0].label = [fhir_object.id];
	  		// Push the value and time into a array for sorting
	  		valueByDate.push({value: fhir_object.valueQuantity.value, date: fhir_object.issued});
	  	}
	  }
	  // Sort this array based on the issued date
	  valueByDate.sort(function(a, b) {
	  	var keyA = new Date(a.date), keyB = new Date(b.date);
	  	if (keyA < keyB) return -1;
	  	if (keyA > keyB) return 1;
	  	return 0;
	  });
	  // Add the sorted data into the gragh
	  for (var record of valueByDate) {
	  	chartData.data.labels.push(record.date.slice(0,10));
	  	chartData.data.datasets[0].data.push(record.value);
	  }
	  // Return the chartData
	  callback(null, chartData);
	});
}