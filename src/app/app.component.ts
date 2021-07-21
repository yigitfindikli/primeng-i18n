import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService]
})
export class AppComponent {

  lang: string = "en";

  date: any;

  uploadedFiles: any[] = [];

  password: string = "";

  constructor(public translate: TranslateService, public primeNGConfig: PrimeNGConfig, private confirmationService: ConfirmationService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    let lang = browserLang.match(/en|fr/) ? browserLang : 'en';
    this.changeLang(lang);
  }

  changeLang(lang: string) {
    this.translate.getTranslation(lang).subscribe(value => {
      this.translate.use(lang);
      this.primeNGConfig.setTranslation(value.primeng)
    })
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

  customers = [
    { "name": "Yancey" },
    { "name": "Chilton" },
    { "name": "Angelo" },
    { "name": "Carita" },
    { "name": "Wernher" }
  ]
}
