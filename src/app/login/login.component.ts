import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Router } from "@angular/router";
// import { FirebaseUIModule } from "firebaseui-angular";


@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  // imports:[FirebaseUIModule],
  // providers: [
  //   {
  //     provide: 'firebaseUIAuthConfig',
  //     useValue: firebaseUiAuthConfig,
  //   },
  // ]
})
export class LoginComponent implements OnInit, OnDestroy {
  // fireAuth = inject(AngularFireAuth);
  router = inject(Router);
  // ui: firebaseui.auth.AuthUI;
  isLoading = signal<boolean>(true);


  ngOnDestroy(): void {
    // void this.ui.delete();
    console.log('destroy');
  }

  ngOnInit() {
    console.log('ngOnInit');
    // return this.fireAuth.app.then((app) => {
    //   const uiConfig = {
    //     signInOptions: [
    //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //     ],
    //     callbacks: {
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //       signInSuccessWithAuthResult: this.onLoginSuccess.bind(this),
    //       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //       uiShown: this.uiShown.bind(this),
    //     },
    //   };
    //   // this.ui = new firebaseui.auth.AuthUI(app.auth());
    //   // this.ui.start("#firebaseui-auth-container", uiConfig);
    //   // this.ui.disableAutoSignIn();
    // });
  }

  onLoginSuccess(authResult: { user: never }) {
    console.log("User logged in:", authResult.user);
    return this.router.navigateByUrl("/courses");
  }

  uiShown() {
    this.isLoading.set(false);
    document.getElementById("loader").style.display = "none";
  }
}


