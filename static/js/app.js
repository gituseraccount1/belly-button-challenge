// STEP 1. Use D3 library to read in API from the API URL
// Constant to hold the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Initializes the page with a default plot
function init() {
  d3.json(url).then(function(data) {
  // console.log(data);
  // console.log(data.samples[0].id)

  // Loop through all the name list and add all the names to the dropdown menu
    for (let i = 0; i < data.names.length; i++) {
      let dropdownNameList = d3.select('#selDataset');
      let addOption = dropdownNameList.append("option").text(data.names[i]);
    };

    let id = data.names[0];
    displayThings(id);
  });
}

function displayThings(subjectID) {
  // console.log(subjectID);

  d3.json(url).then(function(data) {
    
    // Displaying the metadata for the selected subjectID, which is in an array. Code lines 28-41
    let metadata = data.metadata 
    let metadataForSubjectID = metadata.filter(item => item.id == subjectID);

    //To get the first item in the array, which is the metadata in a dictionary
    let metadataInfo = metadataForSubjectID[0];
    
    // This is the blank out the sample-metadata id area in the HTML code before the select subject id metadata is displayed. Without this, 
    // each time you select a new subject ID from the dropdown menu, the newdata will be added to this area --- not what we want
    d3.select("#sample-metadata").html("");

    // Adding the key pair value into the sample-metadata id in the HTML code. 
    Object.entries(metadataInfo).forEach(([key,value]) => {
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });

    //Getting data for the bar and bubble chart. Code lines 44 - 63
    function getSubjectData(subjectID, allData) {
      let matchArray = allData.find(item => item.id === subjectID);
      let subjectData = matchArray;
      // console.log(subjectData);
      return subjectData;
    }

    // let metadata = getSubjectData(subjectID, data.metadata);
    let subjectSamples = getSubjectData(subjectID, data.samples);
    let sampleValues = Object.values(subjectSamples.sample_values);
    let otuIDs = Object.values(subjectSamples.otu_ids);
    let outLabels = Object.values(subjectSamples.otu_labels);

    let slicedS = sampleValues.slice(0,10);
    let slicedO = otuIDs.map(subjectID => `OTU ${subjectID}`).slice(0, 10);
    let slicedL = outLabels.slice(0, 10);

    let reversedDataS = slicedS.reverse();
    let reversedDataO = slicedO.reverse();
    let reversedDataL = slicedL.reverse();
    
    // Default Bar Chart
    let defaultBarChart = [{
      x: reversedDataS,
      y: reversedDataO,
      text: reversedDataL,
      type: "bar",
      orientation: "h"
    }];

    // Default Bar Chart Layout
    let layoutBar = { 
      title: "Top 10 OTU for Test Object ID " + subjectID,
      width: 400,
      height: 500,
    };

    // Default Bubble Chart
    let defaultBubbleChart = [{
      x: otuIDs,
      y: sampleValues,
      text: outLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        opacity: .70
      }
    }];

    // Default Bubble Chart Layout
    let layoutBubble = { 
      title: "All OTUs Found in Test Object " + subjectID,
      showlegend: false,
      width: 1100,
      height: 500
    };

    // Default Metadata Layout
    let layoutMetadata = { 
      title: "All OTUs Found in Test Object " + subjectID,
      showlegend: false,
      width: 1100,
      height: 500
    };
    
    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", defaultBarChart, layoutBar);
    Plotly.newPlot("bubble", defaultBubbleChart, layoutBubble);
  });
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", optionChanged);

// Function called by DOM changes
function optionChanged() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a letiable
  let dataset = dropdownMenu.property("value");
  console.log(dataset); // Testing - see what dataset variable is saving, it is saving the ID choosen in the dropdown menu

  // Update the Top 10 OTU for the selected ID from the dropdown menu
  d3.json(url).then(function(data) {
    let test = Object.values(data.samples[1]);
    // console.log(`line 109 ${test}`)
  });

  displayThings(dataset);
};


init();