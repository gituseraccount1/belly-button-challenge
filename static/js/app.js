// STEP 1. Use D3 library to read in API from the API URL
// Constant to hold the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// STEP 2. Create horizontal bar chart with a dropdown menu to display 
// the top 10 OTUs found in that individual
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.


// function init () {
        d3.json(url).then(function(data) {
                console.log(data);
                // let nameList = data.names;
                // console.log(nameList); // prints out the names array

                // created a loop to add in all the names to the dropdown menu
                for (let i = 0; i < data.names.length; i++) {
                        let dropdownNameList = d3.select('#selDataset');
                        let addOption = dropdownNameList.append("option").text(data.names[i]);
                        addOption.attr("value", data.names[i]);
                };
                
                
                let barData = [];
                for (let i = 0; i < data.samples[0].otu_ids.length; i++) {
                        // let id = console.log('ID:', data.samples[0].id);
                        // let otuID = console.log('otu id', data.samples[i].otu_ids[i]);
                        // let sampleValue = console.log('Sample value:', data.samples[i].sample_values[i]); 
                        // let otuLabels = console.log('otu labels:', data.samples[i].otu_labels[i]);
                        
                        let newDictionary = {
                              //  "ID" : data.samples[0].id,
                                otuID : data.samples[0].otu_ids[i],
                                SampleValue : data.samples[0].sample_values[i],
                                outLabels : data.samples[0].otu_labels[i]    
                        };

                        barData.push(newDictionary);
                };    
                
                console.log(barData);

                // Sort the data by Greek search results descending
                // let sortedBar = barData.sort((a, b) => b.SampleValue - a.SampleValue);
                // console.log(sortedBar);
                // Slice the first 10 objects for plotting
                let slicedData = barData.slice(0, 10);
                console.log(slicedData);
                // Reverse the array to accommodate Plotly's defaults
                let reversedData = slicedData.sort((a, b) => b.SampleValue - a.SampleValue);
                console.log(reversedData);

                // Trace1 
                let trace1 = [{
                        x: reversedData.map(row => row.SampleValue),
                        y: reversedData.map(row => row.otuID),
                        text: reversedData.map(row => row.outLabels),
                        type: "bar",
                        orientation: "h"
                }];

                // Render the plot to the div tag with id "bar"
                Plotly.newPlot("bar", trace1);
        });


        
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 940) {
      data = australia;
  }
  else if (dataset == 941) {
      data = brazil;
  }
  else if (dataset == 942) {
      data = uk;
  }
  else if (dataset == 943) {
    data = mexico;
  }
  else if (dataset == 944) {
      data = singapore;
  }
  else if (dataset == 945) {
    data = southAfrica;
  }
// Call function to update the chart
  updatePlotly(data);
}

// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("bar", x, y, text, [newdata]);
}

//init();

//};

// let perID = d3.json(url).then(function(data) {
//         console.log('ID:', data.samples[1].id);      
// });

// let otuID = d3.json(url).then(function(data) {
//         console.log('out ID:', data.samples[1].otu_ids[1]);      
// });

// let sampleValues = d3.json(url).then(function(data) {
//         console.log('Sample value:', data.samples[1].sample_values[1]);      
// });

// let otuLabels= d3.json(url).then(function(data) {
//         console.log('out labels:', data.samples[1].otu_labels[1]);      
// });




// let names= d3.json(url).then(function(data) {
//         console.log('# of names:', data.names);      
// }); // how can we add a whole line of sccript for each of the names above. put it in a loop.


// // You can also define the click handler inline
// button.on("click", function() {
//         console.log("Hi, a button was clicked!");
//         console.log(d3.event.target);
//       });

// STEP 3. Create a bubble chart that displays each sample
// Use otu_ids for the x values.
// Use sample_values for the y values.
// Use sample_values for the marker size.
// Use otu_ids for the marker colors.
// Use otu_labels for the text values.


// STEP 4 and 5. Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.


// STEP 6. Display the sample metadata, i.e., an individual's demographic information.
// Display each key-value pair from the metadata JSON object somewhere on the page.

          
