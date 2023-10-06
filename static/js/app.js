// STEP 1. Use D3 library to read in API from the API URL
// Constant to hold the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// STEP 2. Create horizontal bar chart with a dropdown menu to display 
// the top 10 OTUs found in that individual
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.


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
                        //"ID" : data.samples[0].id,
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

          
