class DropboxController {
    constructor() {
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files')
        this.progressBarEl = document.querySelector('#react-snackbar-root')

        this.initEvents();
    }

    initEvents() {
        this.btnSendFileEl.addEventListener('click', () => {
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event => {
            this.uploadFiles(event.target.files)
            this.progressBarEl.style.display = 'block';
        })
    }

    uploadFiles(files) {
        let promises = [];

        [...files].forEach(file => {
            promises.push(new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('POST', '/upload');
                request.onload = () => {
                    try {
                        resolve(JSON.parse(request.responseText));
                    } catch (error) {
                        reject(error);                        
                    }
                }

                request.onerror = () => {
                    reject(error);
                }

                let formData = new FormData();
                formData.append('input-file', file);

                request.send(formData);
            }));
        });

        return Promise.all(promises);
    }
}