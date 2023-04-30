import axios from 'axios';

export const processText = async (predictions, fileNameMappings, boolMap) => {
    try {
        const mappedPredictions = predictions.map((prediction) => fileNameMappings[prediction]);
        const mappedBools = mappedPredictions.map((fileName) =>boolMap[fileName]);
        //console.log(mappedPredictions)
        return {predictions, mappedPredictions, mappedBools};
    } catch (error) {
        console.error(error);
    }
};

export const makePrediction = async (entry, fileNameMappings, boolMap) => {
  const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/classify',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs',
      },
      data: {
        inputs: [entry],
        truncate: 'END',
        model: 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft',
      },
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data.classifications);//[0].labels["Calculator"]);
      const prediction = response.data.classifications[0].prediction;//.map((classification) => classification.prediction);       
      const classes = response.data.classifications;
      delete classes[0].labels[prediction]

      // Create an array from the labels object
      const labelsArray = Object.entries(classes[0].labels);

      // Sort the labels by confidence in descending order
      labelsArray.sort((a, b) => b[1].confidence - a[1].confidence);
      
      // Get the top 4 categories
      const topFour = labelsArray.slice(0, 2);

      // Create a new dictionary with the top 4 categories
      const topFourDict = Object.fromEntries(topFour);
      
      console.log(topFourDict);
      const result = {'prediction': prediction, 'topFour': topFourDict}
      console.log(result)
      return result;
    } catch (error) {
      console.error(error);
    }
}