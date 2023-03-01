//import RNFS from 'react-native-fs';

export default function getSelectedFeaturesFile(featureFiles) {
    

    const selectedFeatures = 
    {
        "GoogleSignIn.js": false,
        "ChatForum.js": false,
        "Weather.js": false
    };

    //Loop through requested features to assign booleans
    for (const element in selectedFeatures) {
        if (featureFiles.includes(element)) {
            selectedFeatures[element] = true;
        }
    }
    // define file content
    const fileContent = `
    // Sign in Feature
    export const include_sign_in = ${selectedFeatures["GoogleSignIn.js"]};

    // Chat Feature
    export const include_chat_forum = ${selectedFeatures["ChatForum.js"]};

    // Weather Feature
    export const include_weather = ${selectedFeatures["Weather.js"]};
    `;

    

    return fileContent;
}

    // // Careers Feature
    // export const include_careers    = ${include_careers};

    // // People Feature
    // export const include_people     = ${include_people};

    // // FAQ Feature
    // export const include_faq        = ${include_faq};