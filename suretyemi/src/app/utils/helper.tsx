import { ChangeEvent } from "react";


export const convertMinutesSeconds = (time: number) => {
    const minutes = time / 60;
    const convertMinutesTostring = minutes.toString()?.split(".")[0];
    const mualtipleableValue = minutes.toString()?.split(".").length > 1 ? Number(convertMinutesTostring) : Number(convertMinutesTostring) - 1
    const second = time - (mualtipleableValue * 60);

    return { convertedminutes: mualtipleableValue, convertedseconds: second }
}

// Help to Download Files
export const downloadFiles = (base64Data: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = base64Data;
    link.setAttribute("download", fileName); //or any other extension
    document.body.appendChild(link);
    link.click();
};


export const searchFilter = (data: any[], searchText: string) => {
    return data.filter((item) =>
        Object.values(item).some((value) => {
            if (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean'
            ) {
                return value.toString().toLowerCase().includes(searchText.toLowerCase());
            }
            return false;
        }))
}

export const autoFocusOnOtp = (id: string) => {
    const nextfield: HTMLInputElement | null = document.querySelector(`input[id=${id}]`);
    if (nextfield !== null) {
        nextfield.focus();
    }
}


type EventInput = ChangeEvent<HTMLInputElement>;

type SimpleSetter = (date: Date) => void;
type FormikSetter = (field: string, date: Date) => void;
type ArraySetter<T> = (updater: (prev: T[]) => T[]) => void;

export function handleDateInputAndConvert<T>(
    e: EventInput,
    setter: SimpleSetter | FormikSetter | ArraySetter<T>,
    fieldOrIndex?: string | number,
    fieldKey?: keyof T
) {
    const input = e.target.value;

    if (/^\d{8}$/.test(input)) {
        const day = input.substring(0, 2);
        const month = input.substring(2, 4);
        const year = input.substring(4, 8);

        const parsedDate = new Date(`${year}-${month}-${day}`);

        if (typeof fieldOrIndex === 'string') {
            (setter as FormikSetter)(fieldOrIndex, parsedDate);
        } else if (typeof fieldOrIndex === 'number' && fieldKey) {
            (setter as ArraySetter<T>)(prev => {
                const updated = [...prev];
                updated[fieldOrIndex] = {
                    ...updated[fieldOrIndex],
                    [fieldKey]: parsedDate,
                };
                return updated;
            });
        } else {
            (setter as SimpleSetter)(parsedDate);
        }
    }
}



export function checkArraysChangeVal<T>(a: T, b: T) {
    if (a === b) return true;

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (!checkArraysChangeVal(a[i], b[i])) return false;
        }
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!keysB.includes(key) || !checkArraysChangeVal(a[key as keyof T], b[key as keyof T])) return false;
    }

    return true;
}

export const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};