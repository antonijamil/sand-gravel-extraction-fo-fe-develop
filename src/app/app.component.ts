import {Component, DoCheck, OnInit} from '@angular/core';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {
  BuildInformationService,
  ConfigProvider,
  CurrentUserService,
  ErrorService,
  HeaderService,
  SidebarService
} from '@bang/common';
import {ActivatedRoute, Router} from '@angular/router';
//import {build} from '@config/build-information';
import {appRoutesLinks} from '@app/app.routes.links';
import {map} from 'rxjs/operators';
// import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {AuthenticationService} from '@bang/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  private currentLang: string;

  private isAdmin: boolean;
  private canActivate: boolean;

  constructor(private translate: TranslateService,
              private router: Router,
              private headerService: HeaderService,
              private sidebarService: SidebarService,
              private route: ActivatedRoute,
              private errorService: ErrorService,
              private buildInformationService: BuildInformationService,
              private authService: AuthenticationService,
              // private localizeService: LocalizeRouterService,
              private currentUserService: CurrentUserService,
              private configProvider: ConfigProvider) {
  }

  ngOnInit(): void {
    // this.configureAuth();
    this.configureLanguages();
    //this.configureBuildInformation();
    this.configureErrors();
    this.configureSidebar();
  }

  private configureAuth(): void {
    this.authService.initiateSsoSequence(this.router.routerState.snapshot.url);
    this.authService.canActivateProtectedRoute$.subscribe(canActivate => {
      this.canActivate = canActivate;
      // this.configureSidebar();
    });

    this.currentUserService.hasRoleWithAnyContext('BTA_Admin').subscribe(isAdmin => this.isAdmin = isAdmin);
  }

  ngDoCheck(): void {
    this.handleMenuChange();
  }

  private handleMenuChange() {
    this.getCurrentRoute()
      .data
      .pipe(
        map(data => data.category)
      )
      .subscribe(category => this.changeMenu(category));
  }

  private getCurrentRoute() {
    let childRoute = this.route;

    while (childRoute.firstChild) {
      childRoute = childRoute.firstChild;
    }

    return childRoute;
  }

  private changeMenu(category) {
    this.headerService.setMenuItems([
      {
        label: this.translate.instant('menu.sandGravelExtractionForm'),
        icon: 'edit',
        visible: this.canActivate && this.isAdmin,
        action: () => this.navigate(appRoutesLinks.SANDGRAVELEXTRACTIONFORM_CREATE),
      },
      {
        label: this.translate.instant('menu.listViewCaptain'),
        icon: 'list',
        visible: this.canActivate && this.isAdmin,
        action: () => this.navigate(appRoutesLinks.LISTVIEW_CAPTAIN),
      },
      {
        label: this.translate.instant('menu.listViewConcession'),
        icon: 'list',
        visible: this.canActivate && this.isAdmin,
        action: () => this.navigate(appRoutesLinks.LISTVIEW_CONCESSION),
      },
      {
        label: 'menu.settings',
        icon: 'settings',
        items: [
          {
            label: 'common.nl',
            icon: 'language',
            visible: this.isCurrentLanguage('fr'),
            action: ($event) => this.useLanguage($event, 'nl')
          },
          {
            label: 'common.fr',
            icon: 'language',
            visible: this.isCurrentLanguage('nl'),
            action: ($event) => this.useLanguage($event, 'fr')
          },
          {
            label: 'common.action.logout',
            icon: 'exit_to_app',
            action: () => this.authService.logout()
          },
        ]
      }
    ]);
  }

  useLanguage(event, language: string) {
    this.translate.use(language);
    event.preventDefault();
  }

  isCurrentLanguage(language: string) {
    return this.translate.currentLang === language;
  }

  private configureSidebar() {
    this.sidebarService.setMenuItems([
      {
        label: this.translate.instant('menu.sandGravelExtractionForm'),
        icon: 'edit',
        visible: this.canActivate && this.isAdmin,
        action: () => this.navigate(appRoutesLinks.SANDGRAVELEXTRACTIONFORM_CREATE),
      },
      {
        label: this.translate.instant('menu.listViewCaptain'),
        icon: 'list',
        visible: this.canActivate && this.isAdmin,
        action: () => this.navigate(appRoutesLinks.LISTVIEW_CAPTAIN),
      }
    ]);
  }

  private navigate(url: any[]) {
    /* const translatedRoute = this.localizeService.translateRoute(url) as any[];

    return this.router.navigate(translatedRoute); */
    return this.router.navigate(url);
  }

  private configureLanguages(): void {
    this.translate.addLangs(['nl', 'fr']);
    this.translate.setDefaultLang('nl');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.translate.getBrowserLang().match(/nl|fr/) ? browserLang : 'nl');
  }

  private configureBuildInformation(): void {
    //this.buildInformationService.setBuild(`v${build.version} (${build.revision})`);
    this.buildInformationService.setEnvironment(this.configProvider.config().identifier);
  }

  private configureErrors(): void {
    this.errorService.configure([
      this.createError('400001')
    ]);
  }

  private createError(code) {
    return {
      code,
      title: `error.${code}.title`,
      message: `error.${code}.message`
    };
  }
}
