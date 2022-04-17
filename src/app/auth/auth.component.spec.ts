import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterModule, UrlSegment } from "@angular/router";
import { Observable, of } from "rxjs";
import { ApiService, JwtService, UserService } from "../core/services";
import { AuthComponent } from "./auth.component";
import { AuthModule } from "./auth.module";

class Page {
    constructor(private fixture: ComponentFixture<AuthComponent>) {}
    get submitButton() {
        return this.fixture.nativeElement.querySelector('button');
    }
    get usernameInput() {
        return this.fixture.debugElement.nativeElement.querySelector('#username');
    }
    get emailInput() {
        return this.fixture.debugElement.nativeElement.querySelector('#email');
    }
    get passwordInput() {
        return this.fixture.debugElement.nativeElement.querySelector('#password');
    }
    public updateValue(input: HTMLInputElement, value: string) {
        input.value = value;
        input.dispatchEvent(new Event('input'));
    }
    
}

describe('AuthComponent', () => {
    // tester que le composant se crée
    // tester que l'authentification se fait si le username et le password sont renseingner
    // tester les cas d'erreur
    let component: AuthComponent
    let fixture: ComponentFixture<AuthComponent>;

    let userService: UserService;
    let userServiceSpy: { attemptAuth: jasmine.Spy };
    let routerSpy: { navigateByUrl: jasmine.Spy };
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let page: Page;

    beforeEach(() => {
        userServiceSpy = jasmine.createSpyObj(UserService, ['attemptAuth']);
        routerSpy = jasmine.createSpyObj(Router, ['navigateByUrl']);
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule, FormsModule],
            declarations:[AuthComponent],
            providers:[
                { provide: UserService, useValue: userServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: { url: of([{path: 'login'}]) } }
            ]
        });
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UserService);
        router = TestBed.inject(Router);
        activatedRoute = TestBed.inject(ActivatedRoute);
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

})