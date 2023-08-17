import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.modal';
import { ApiService } from '../shared/api.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-restaurant-dash-board',
  templateUrl: './restaurant-dash-board.component.html',
  styleUrls: ['./restaurant-dash-board.component.css'],
})
export class RestaurantDashBoardComponent {
  formValue!: FormGroup;
  restaurantModelObject:RestaurantData=new RestaurantData;
  allRestaurantData: any;
  isEdit:boolean=false;

  constructor(private formBuilder: FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: [''],
    });
    this.getallData();
  }

  reset(){
    this.formValue.reset();
  }

  addRestaurant(){
    this.restaurantModelObject.name=this.formValue.value.name;
    this.restaurantModelObject.mobile=this.formValue.value.mobile;
    this.restaurantModelObject.email=this.formValue.value.email;
    this.restaurantModelObject.address=this.formValue.value.address;
    this.restaurantModelObject.services=this.formValue.value.service;

    this.api.postRestaurant(this.restaurantModelObject).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      alert("Restaurant Added Successfully")
      let ref=document.getElementById('clear');
      ref?.click();
      this.getallData();
    },
    err=>{
      console.log(err);
      alert("something went wrong")
    })
  }

  getallData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res;
    })
  }

  deleteRestaurant(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("record delete succesully")
      this.getallData();
    })
  }
  

  editRestaurant(data:any){
    this.isEdit=true
    this.restaurantModelObject.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['service'].setValue(data.services);
  }

  updateRestaurant(){
    this.restaurantModelObject.name=this.formValue.value.name;
    this.restaurantModelObject.mobile=this.formValue.value.mobile;
    this.restaurantModelObject.email=this.formValue.value.email;
    this.restaurantModelObject.address=this.formValue.value.address;
    this.restaurantModelObject.services=this.formValue.value.service;

    this.api.updateRestaurant(this.restaurantModelObject,this.restaurantModelObject.id).subscribe(res=>{
      alert("restaurat updated succesfully")
      let ref=document.getElementById('clear');
      ref?.click();
      this.getallData();
      this.isEdit=false;
    })
  }
  
  isEDit(){
    this.isEdit=false;

  }

}
