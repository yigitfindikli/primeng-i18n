import { Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ConfirmationService]
})
export class AppComponent implements OnDestroy {

    lang: string = "en";

    date: any;

    uploadedFiles: any[] = [];

    password: string = "";

    subscription: Subscription;

    customers = [
        { "name": "Yancey" },
        { "name": "Chilton" },
        { "name": "Angelo" },
        { "name": "Carita" },
        { "name": "Wernher" }
    ]

    constructor(public translate: TranslateService, public primeNGConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {
        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        let lang = browserLang.match(/en|fr/) ? browserLang : 'en';
        this.changeLang(lang);

        this.subscription = this.translate.stream('primeng').subscribe(data => {
            this.primeNGConfig.setTranslation(data);
        });
    }

    changeLang(lang: string) {
        this.translate.use(lang);
    }

    onUpload(event: any) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    confirm(event: any) {
        this.confirmationService.confirm({
            target: event.target,
            message: this.translate.instant('demo.message'),
            icon: 'pi pi-exclamation-triangle'
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
