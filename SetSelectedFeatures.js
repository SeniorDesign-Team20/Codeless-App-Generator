export default function setSelectedFeatures(featureFiles) {
    

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

    return selectedFeatures;
}

    // // Careers Feature
    // export const include_careers    = ${include_careers};

    // // People Feature
    // export const include_people     = ${include_people};

    // // FAQ Feature
    // export const include_faq        = ${include_faq};
