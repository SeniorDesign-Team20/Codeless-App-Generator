import axios from 'axios';

export const processText = async (userRequests, fileNameMappings, boolMap) => {

    const options = {
        method: 'POST',
        url: 'https://api.cohere.ai/v1/classify',
        headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs',
        },
        data: {
        inputs: userRequests,
        truncate: 'END',
        model: 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft',
        },
    };

    try {
        const response = await axios.request(options);
        //console.log(response.data.classifications);
        const predictions = response.data.classifications.map((classification) => classification.prediction);
        //console.log(predictions)
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
        //console.log(response.data.classifications);
        const predictions = response.data.classifications.map((classification) => classification.prediction);
        //console.log(predictions)
        const mappedPredictions = predictions.map((prediction) => fileNameMappings[prediction]);
        const mappedBools = mappedPredictions.map((fileName) =>boolMap[fileName]);
        //console.log(mappedPredictions)
        return {predictions, mappedPredictions, mappedBools};
      } catch (error) {
        console.error(error);
      }
}





// import { CohereClient } from 'cohere-ai';

// const processText = async (userRequests) => {
//   const cohere = new CohereClient('LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs');
//   const inputs = ['Confirm your email address', 'hey i need u to send some $'];
//   const model = 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft';

//   try {
//     const response = await cohere.classifyCustom(model, inputs);
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default processText;

// const cohere = require("cohere-ai");

// const processText = async (userRequests) => {
//     cohere.init('LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs')

//     const response = await cohere.classify({
//         model: 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft',
//         inputs: ['Confirm your email address', 'hey i need u to send some $']
//     });
//     console.log(`The confidence levels are ${JSON.stringify(cresponse.body.classifications)}`)
//     return response;
// };

// export default processText;

// const apiKey = 'LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs';
// const modelId = 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft';
// const apiUrl = `https://api.cohere.ai/${modelId}`;

// const processText = async (userRequests) => {
//   const response = await fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({ inputs: { userRequests } }),
//   });
//   const data = await response.json();
//   console.log(`The confidence levels are ${JSON.stringify(data.body)}`);
//   return data;
// };

// export default processText;
// import axios from 'axios';

// const processText = async (userRequests) => {
//   const options = {
//     method: 'POST',
//     url: 'https://api.cohere.ai/custom',
//     model: 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft',
//     headers: {
//       accept: 'application/json',
//       'content-type': 'application/json',
//       authorization: 'Bearer LFR23e8GH8nJr5ll2tXYRYh0MFP28ShNTtIohwPs',
     
//     },
//     data: {
//       inputs: ['Confirm your email address', 'hey i need u to send some $'],
//       //model: 'ce2368da-c965-4bf2-8ba1-feae8bf94899-ft'
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export default processText;
