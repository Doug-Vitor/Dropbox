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

        this.inputFilesEl.addEventListener('change', () => {
            this.progressBarEl.style.display = 'block';
        })
    }
}