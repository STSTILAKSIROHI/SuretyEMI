import * as cryptoJs from "crypto-js";
const secretkey = "dfgdhdbvnfghtr54654bnvbbm";

// --- Internal Helper ---
const decryptingData = () => {
    const userItem = sessionStorage.getItem("_user_");
    let decryptedUserData = null;

    if (userItem) {
        try {
            const userBytes = cryptoJs.AES.decrypt(userItem, secretkey);
            decryptedUserData = JSON.parse(userBytes.toString(cryptoJs.enc.Utf8));
        } catch (e) {
            console.error("Error decrypting user data", e);
        }
    }

    const tokenItem = sessionStorage.getItem("_token_");
    let decryptedToken = null;

    if (tokenItem) {
        try {
            const tokenBytes = cryptoJs.AES.decrypt(tokenItem, secretkey);
            decryptedToken = JSON.parse(tokenBytes.toString(cryptoJs.enc.Utf8));
        } catch (e) {
            console.error("Error decrypting token data", e);
        }
    }

    return { decryptedUserData, decryptedToken };
};

// --- Exported Encryption/Decryption Utils ---

// Encrypt any value
export function encryptValue(val: any): string | null {
    if (!val) return null;
    return cryptoJs.AES.encrypt(JSON.stringify(val), secretkey).toString();
}

// Decrypt value
export function decryptValue(val: string | null): any {
    if (!val) return null;
    try {
        const data = cryptoJs.AES.decrypt(val, secretkey);
        return JSON.parse(data.toString(cryptoJs.enc.Utf8));
    } catch (error) {
        console.error("Decryption failed", error);
        return null;
    }
}

// --- Session Management ---

export const removeLoginSession = () => {
    sessionStorage.removeItem("resendOtpFlag");
    sessionStorage.removeItem("_user_");
    sessionStorage.removeItem("_token_");
    sessionStorage.removeItem("_profileImg_");
    sessionStorage.removeItem("_bank_");
    sessionStorage.removeItem("_accesstknexp_");
    sessionStorage.removeItem("_refreshtkn_");
    sessionStorage.removeItem("_refreshtknexp_");
};

// --- Getters ---

export const getUserData = () => {
    try {
        const { decryptedUserData } = decryptingData();
        return decryptedUserData;
    } catch (error) {
        return null;
    }
};

export const getBankData = () => {
    try {
        const bankItem = sessionStorage.getItem("_bank_");
        if (!bankItem) return null;

        const bankBytes = cryptoJs.AES.decrypt(bankItem, secretkey);
        const decryptedBankData = JSON.parse(
            bankBytes.toString(cryptoJs.enc.Utf8)
        );
        return decryptedBankData;
    } catch (error) {
        return null;
    }
};

export const getToken = () => {
    try {
        const { decryptedToken } = decryptingData();
        return decryptedToken;
    } catch (error) {
        return null;
    }
};

export const getIdentityData = () => {
    const getLocaldentity = localStorage.getItem("_identityData");
    if (!getLocaldentity) return null;
    try {
        return JSON.parse(getLocaldentity);
    } catch (e) {
        return null;
    }
};

// --- Setters ---

export const setLocalUserData = (val: any) => {
    const cipherUserText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_user_", cipherUserText);
};

export const setLocalBankData = (val: any) => {
    const cipherBankText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_bank_", cipherBankText);
};

export const setLocalToken = (val: any) => {
    const cipherUserText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_token_", cipherUserText);
};

export const setLocalAccessTknTime = (val: any) => {
    const cipherUserText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_accesstknexp_", cipherUserText);
};

export const setLocalRefreshTkn = (val: any) => {
    const cipherUserText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_refreshtkn_", cipherUserText);
};

export const setLocalRefreshTknTime = (val: any) => {
    const cipherUserText = cryptoJs.AES.encrypt(
        JSON.stringify(val),
        secretkey
    ).toString();
    sessionStorage.setItem("_refreshtknexp_", cipherUserText);
};

export const setIdentityData = async () => {
    try {
        const response = await fetch("https://4.tnedi.me/json");
        const ipV4 = await response.json();
        if (ipV4) {
            localStorage.setItem("_identityData", JSON.stringify(ipV4));
            return ipV4;
        }
    } catch {
        try {
            const response = await fetch("https://ident.me/json");
            const ipdata = await response.json();
            if (ipdata) {
                localStorage.setItem("_identityData", JSON.stringify(ipdata));
                return ipdata;
            }
        } catch (error) {
            console.log("Error of set identity data : ", error);
            return null;
        }
    }
};

// --- File & Location Utils ---

export const converToBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = reject;
    });
};

export const reverseGeocode = async (
    latitude: number | string,
    longitude: number | string
) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok && data.display_name) {
            return data.display_name;
        } else {
            throw new Error("Reverse geocoding failed");
        }
    } catch (error) {
        return null;
    }
};