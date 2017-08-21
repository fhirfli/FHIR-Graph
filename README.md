# FHIR-Graph
This is the folder for the fhir-graph npm package. This package is for reading FHIR files and generate a chart data for those FHIR files.

## Features

It allows you to read FHIR json files in a folder, sort them by issued date, and generate the char data of date and value. Then you can easily show it by using chart.js.

## How to download:

Use "npm install fhir-graph" or specify "fhir-graph" : "~1.1.1" (the current lastest version) in your node package.json dependencies.


## How to use:

After finishing download, put the folder that contains all your FHIR files into the node_modules/fhir_graph/fhir_files. For examples, put folder "steps" that contains 6 fhir files (they must be json files) into yourProjectName/node_modules/fhir_graph/fhir_files/. 

Then in your code (probably in your route js), use it like that:



        var FHIR_Graph = require('fhir-graph');
        var fhir_foldername = 'steps';

        FHIR_Graph.show_FHIR_Graph(fhir_foldername, function(err, data) {
            if (err) throw err;
            var fhir_data = data;
            res.render('home.ejs', {
                fhir_data : fhir_data,
                path      : 'dashboard.ejs',
                title     : 'Dashboard'
            });
        });
        
        
        
        
You must use a call back to get the data because it's synchronized.

Then just use the "fhir_data" in your ejs file like that:





                    <script src="/chartjs/js/vendor/modernizr-2.8.3.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

                    <div class="col-md-4">
                        <div class="card">
                            <div class="content">
                                <canvas id="stepsMonth" height="335"></canvas>
                                <script>
                                    const STEPSMONTH = document.getElementById("stepsMonth");
                                    Chart.defaults.scale.ticks.beginAtZero = true;
                                    var  stepsMonth = new Chart(STEPSMONTH, <%- JSON.stringify(testFhir) %>);
                                </script>
                            </div>
                        </div>
                    </div>
                    
                    
                               

Then you can see the graph from the page you specified:


