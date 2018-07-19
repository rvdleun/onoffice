import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ElectronService} from 'ngx-electron';

@Component({
    selector: 'app-sky',
    styleUrls: ['./sky.component.css'],
    templateUrl: './sky.component.html',
})
export class SkyComponent implements OnInit {
    @ViewChild('upload') uploadInput: ElementRef;

    backgroundImage: string;

    constructor(public changeDetectorRef: ChangeDetectorRef, public electronService: ElectronService) { }

    public ngOnInit() {
        this.electronService.remote.getGlobal('getSky')((sky) => {
            this.setImage(sky);
        });
    }

    public onClick() {
        this.uploadInput.nativeElement.click();
    }

    public onFileChange() {
        const files = this.uploadInput.nativeElement.files;
        if(files.length === 0) {
            return;
        }

        const file = files[0];

        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const image = new Image();
        image.onload = () => {
            canvas.setAttribute('width', '4096');
            canvas.setAttribute('height', '2048');

            context.drawImage(image, 0, 0, 4096, 2048);

            const result = canvas.toDataURL('jpg');
            this.electronService.remote.getGlobal('setSky')(result);
            this.setImage(result);
        };
        image.src = URL.createObjectURL(file);
    }

    private setImage(image: string) {
        this.backgroundImage = `url(${image})`;

        this.changeDetectorRef.detectChanges();
    }
}
