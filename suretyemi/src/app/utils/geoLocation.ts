import toastNotify from "./tostNotify";
interface geolocationPosition {
    coords: {
        latitude: number;
        longitude: number;
        altitude?: number | null;
        accuracy: number;
        altitudeAccuracy?: number | null;
        heading?: number | null;
        speed?: number | null;
    };
    timestamp: number;
}

// Get Lat & Long of user
export const getGeoLocation = async () => {
    try {
        // Check permission and detact to GPS in System
        if (navigator.geolocation) {
            const position = await getCurrentPosition() as geolocationPosition;

            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        } else {
            toastNotify('Geolocation is not supported by browser.', "error");
            return {
                latitude: "",
                longitude: "",
            };
        }
    } catch (error) {
        console.log("Error in fetch geolocation time", error);
        return {
            latitude: '',
            longitude: '',
        }
    }
};

// This Also help to Get Lat & Long  
const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        const options = {
            timeout: 5000
        }
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
}

// This function is set Locatio in local Storange
export const setGeoLocation = async () => {
    // Remove location form Local storange
    localStorage.removeItem('location');

    // Get Location 
    const location = await getGeoLocation();

    // Check Permission
    if (!location) {
        return toastNotify('Location permission denied. Please reload', "error");
    }

    // Return Location and store data in local storange 
    return localStorage.setItem('location', JSON.stringify(location));
};