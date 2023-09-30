import { saveAs } from "file-saver";

export default class Utilities {
    static getRandomInt() {
        return Math.floor(Math.random() * (2000 - 1000) + 1000);
    }
    
    static convertBase64(file) {
        if (!file) return;
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    static convertBase64ToFile(base64String, fileName) {
        let arr = base64String.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let uint8Array = new Uint8Array(n);
        while (n--) {
            uint8Array[n] = bstr.charCodeAt(n);
        }
        let file = new File([uint8Array], fileName, { type: mime });
        return file;
    }
    
    static openImage(src) {
        let image = new Image();
        image.src = src;

        let w = window.open("");
        w.document.write(image.outerHTML);
    };

    static downloadImage(src, name) {
        let file = Utilities.convertBase64ToFile(src, name);
        saveAs(file, name);
    };

    static downloadJson(json, name) {
        let file = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
        saveAs(file, name);
    }
}
    