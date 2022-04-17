import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from "rxjs/internal/observable/of";
import { AppComponent } from "./app.component"
import { ApiService, JwtService, UserService } from "./core/services";

describe('App commponent', () => {
    let component: AppComponent
    let userService: UserService
    let jwtService: JwtService
    let apiService: ApiService
    let spy: any;
    beforeEach( () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            // provide the component-under-test and dependent service
            providers: [
              AppComponent,
              UserService,
              ApiService,
              JwtService
              //{ provide: UserService, useClass: MockUserService }
            ]
        });
        component = TestBed.inject(AppComponent)
        userService = TestBed.inject(UserService)
        jwtService = TestBed.inject(JwtService)
        apiService = TestBed.inject(ApiService)
        spyOn(jwtService, 'getToken').and.returnValue('token');
        spyOn(apiService, 'get').and.returnValue(of({
            user:{ 
                username: 'Test User',
                email: 'test@mail.com',
                token: 'token',
                bio: 'bio',
                image: 'image'
            }
        }));
    })
    afterEach(() => {
        userService = null
        component = null
        jwtService = null
        apiService = null
    });
    it('should create component', () => {
        expect(component).toBeDefined();
    });
    it('should retrieve logged in user informations after calls ngOnInit', () => {
        component.ngOnInit()
        expect(jwtService.getToken).toHaveBeenCalled();
        expect(apiService.get).toHaveBeenCalled();
        expect(userService.isAuthenticated).toBeTruthy()
        let user = userService.getCurrentUser();
        expect(user).not.toEqual(null)
        expect(user.username).toContain('Test User')
        expect(user.email).toEqual('test@mail.com')
        expect(jwtService.getToken()).toEqual('token')
    });
})