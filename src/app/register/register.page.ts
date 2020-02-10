import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 // registerForm: FormGroup;

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  register = {}

  registerForm() {

    console.log(this.register);

    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }
    /* Donées en POST */
    let postData = {
      "email": this.register['email'],
      "password": this.register['password']
    }

    /* Requete */
    this.http.post("http://localhost:8000/api/register", postData, httpOptions)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });

  }

  getData(){

    /* Paramètrage du header */
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : 'BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzY3OTUyNTksImV4cCI6MTU3Njc5ODg1OSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZGV6aXR0ZXJ4YXZpZXJAZ21haWwuY29tIn0.oQf_tjCU9i4TF1lIOS3U75JXbukzLaa2Fs6ndqZxdUcLxKC9Q0t9Ju6jjwA50IUYwAJM1eKqeVH367zohMJTNmQs6Ah2-d_kVYRFoX628dr9Up-6TOtUk2l4yrpyoBfzVqDyHE3vY4HSxbs_BNgapw5L9wanYs77QRnKpfdAxXu3l4YdGrkH0pZWYPig7c3dcgn7nJCczShhH-SsHqTIMsW7v7MVV8VzKibJbq4kjpncM0XBVdv2APKk38X6Cdj10o4c9sqzbtpa0Qv3LpovTO9kfl1kOPLC2uYoTfGkk1PooyisC-yns9L9TcUdroZH0_nJMIOliIAFkC2xuJBfrIXkM6hN_mLkUciKzAwznOE5scR_-fyGr5uR30nbK8xy6Yt6peaWONzQex7rdWRMrlrcAL1Q40oyUt2eyBQ2AvxaPKMuO7sz87OFjulsppzDohPuIy4GtLp81NDvsXIxorVrUgewr7o9HZczvNS01fB7FHwyUSWz-oS8-SKHexMyWG737s02BoITybDe5Gnop0QGKJaDsvk-IgnOaPi0lCv-BtICguD40mAnTiuheMVPrDTAcJ9eS49XQBKpYnvUzAE9JFOoeISV8RM7ylm7e8AvN2rlGxhTHYBSH9bS62xrq1TwD5sbY4Y-PmvUoR4T9EpUZ8U-RiL2eCooJ0l_4p8'
      })
    }
    
    /* Requete */
    this.http.get("http://localhost:8000/api/categories", httpOptions)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
