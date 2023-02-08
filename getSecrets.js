import { Octokit } from '@octokit/core';

const getSecrets = async () => {

    const octokit = new Octokit({
        auth: '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'
    });

    try
    {
        const {response} = await octokit.request('GET /orgs/{org}/actions/secrets/{secret_name}', {
            org: encodeURIComponent('BU Engineering Senior Design - Team 20'),
            secret_name: 'FIREBASEAPIKEY'
    });
    console.log(response);
    }
    catch(error)
    {
    console.error(error);
    }
    return reponse;

}

export default getSecrets; 