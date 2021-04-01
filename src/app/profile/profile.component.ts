import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from '../helpers/must-match.validator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  list: any = [];
  visible: Boolean = true;


  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
      contact: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    if (localStorage.getItem("form-data") != null) {
      this.list = JSON.parse(localStorage.getItem('form-data') || '{}');
      console.log(this.list);
    }

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.list.push(this.registerForm.value);
    localStorage.setItem('form-data', JSON.stringify(this.list));
    //   this.registerForm.reset();
    //This jkj
  }

  delete(index: any) {
    this.list.splice(index);
    localStorage.setItem('form-data', JSON.stringify(this.list));
  }

  array_Ind = 0
  update(index: any) {
    this.array_Ind = index
    this.registerForm.controls['firstName'].setValue(this.list[index].firstName)
    this.registerForm.controls['lastName'].setValue(this.list[index].lastName)
    this.registerForm.controls['address'].setValue(this.list[index].address)
    this.registerForm.controls['email'].setValue(this.list[index].email)
    this.registerForm.controls['password'].setValue(this.list[index].password)
    this.registerForm.controls['confirmPassword'].setValue(this.list[index].confirmPassword)
    this.registerForm.controls['pincode'].setValue(this.list[index].pincode)
    this.registerForm.controls['contact'].setValue(this.list[index].contact)
    this.list[index] = this.registerForm.value;
    this.visible = false;
  }

  update_btn() {
    this.list[this.array_Ind] = this.registerForm.value;
    console.log("updated" + JSON.stringify(this.list[this.array_Ind]));
    localStorage.setItem('form-data', JSON.stringify(this.list));
    this.registerForm.reset();
  }

  // reset(){
  //   this.registerForm.reset();
  // }
}
