import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(formDetails: any) {
    console.log("submit works");
    console.log(formDetails.value)
    this.authService.login(formDetails.value).subscribe((result: any) => {
      
       console.log("result",result);
      //  console.log("result"+result.token);
      //  return


      // var token = (result as token).token
      console.log("token - ")
      console.log(result.data.api_token);
      // var error = (result as token).error

      localStorage.setItem('data', result.data.api_token);   //token saved in localstorage and jsonS converts -JavaScript value to a JSON string
      // if (result.data.api_token.length == 0) {
      //   //show popup with error-
      //   alert(error)
      // }
      // else {
        this.route.navigate(['/home'])
        // this.route.navigate(['/header'])
      // }
    },
      // console.log(result+"result works");
      // console.log(formDetails)
      (error: any) => {
        console.log(error);

      })
  }
}
// export class token {
//   token: string = ""
//   error: String = ""
// }
