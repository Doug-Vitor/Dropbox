class DropboxController {
    constructor() {
        this.btnSendFileEl = document.querySelector('#btn-send-file');
        this.inputFilesEl = document.querySelector('#files');
        this.snackModalEl = document.querySelector('#react-snackbar-root');
        this.progressBarEl = this.snackModalEl.querySelector('.mc-progress-bar-fg');
        this.nameFileEl = this.snackModalEl.querySelector('.filename');
        this.timeLeftEl = this.snackModalEl.querySelector('.timeleft');

        this.initEvents();
    }

    initEvents() {
        this.btnSendFileEl.addEventListener('click', () => {
            this.inputFilesEl.click();
        });

        this.inputFilesEl.addEventListener('change', event => {
            this.uploadFiles(event.target.files)
            this.modalShow();
            this.inputFilesEl.value = '';
        })
    }

    uploadFiles(files) {
        let promises = [];

        [...files].forEach(file => {
            promises.push(new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.open('POST', '/upload');
                request.onload = () => {
                    this.modalShow(false);
                    try {
                        resolve(JSON.parse(request.responseText));
                    } catch (error) {
                        reject(error);                        
                    }
                }

                request.onerror = () => {
                    this.modalShow(false);
                    reject(error);
                }

                request.upload.onprogress = event => {
                    console.log(event);
                    this.uploadProgress(event, file);
                }

                let formData = new FormData();
                formData.append('input-file', file);

                this.startUploadTime = Date.now();

                request.send(formData);
            }));
        });

        return Promise.all(promises);
    }

    uploadProgress(event, file) {
        let loaded = event.loaded;
        let total = event.total;
        let percent = parseInt((loaded / total) * 100);

        let elapsedTime = Date.now() - this.startUploadTime;
        let timeLeft = ((100 - percent) * elapsedTime) / percent;
    
        this.progressBarEl.style.width = `${percent}%`
        this.nameFileEl.innerHTML = file.name;
        this.timeLeftEl.innerHTML = this.formatTime(timeLeft);
    }

    formatTime(duration) {
        let seconds = parseInt((duration/1000) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    
        if (hours > 0)
            return `${hours} horas, ${minutes} minutos e ${seconds} segunds`;
        if (minutes > 0)
            return `${minutes} minutos e ${seconds} segunds`;
        if (seconds>0) 
            return `${seconds} segundos`;

        return '';
    }

    modalShow(show=true) {
        this.snackModalEl.style.display = (show) ? 'block' : 'none';
    }
}