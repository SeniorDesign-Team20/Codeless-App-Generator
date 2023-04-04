export default function setSelectedFeatures(featureFiles) {
    // const fileNameMappings = {
    //     "Google Sign-In": "Google_Login",
    //     "Weather": "Weather",
    //     "Calender" : "Calender",
    //     "People Page": "People",
    //     "FAQ Page": "FAQs.js"
    //   };
    const selectedFeatures = {
        "googleLogin": false,
        "weather": false,
        "calendar": false,
        "people": false,
        "faq": false,
         "about": false,
         "activityFeed": false,
         "apply": false,
         "calculator": false,
         "chatbot": false,
         "contact": false,
         "chat": false,
         "fileUpload": false,
         "careers": false,
         "map": false,
        //"Menu": "": false,
        "products": false,
        "people": false,
        "photoBooth": false,
        "privacy": false,
        "qr": false,
        "reviews": false,
        //"Store Hours": "hours": false,
      };


    //Loop through requested features to assign booleans
    for (const element in selectedFeatures) {
        if (featureFiles.includes(element)) {
            selectedFeatures[element] = true;
        }
        if (featureFiles.includes("FAQs"))
        {
            selectedFeatures["faq"] = true;
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
