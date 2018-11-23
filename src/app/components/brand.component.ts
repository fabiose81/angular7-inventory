import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'brand',
  templateUrl: 'brand.component.html',
  styleUrls: ['brand.component.css']
})
export class BrandComponent implements OnInit {

  brandForm: FormGroup;
  errorFields = false;
  error = false;
  brands = [];
  brandTemp: any;;
  localStorage;
  msg;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.localStorage = window.localStorage;

    if (this.localStorage.getItem('brand') != null)
      this.brands = JSON.parse(this.localStorage.getItem('brand'));
  }

  add(): void {
    this.errorFields = false;
    this.error = false;
    this.msg = null;

    if (this.brandForm.invalid) {
      this.errorFields = true;
      return;
    } else {
      let name = this.brandForm.value.name;
      if (this.findBrand(name)) {
        this.error = true;
        this.msg = name + ' already exist';
      } else {
        this.brandForm.value.disabled = true;
        this.brandForm.value.hidden = true;
        this.brands.push(this.brandForm.value);
        this.localStorage.setItem('brand', JSON.stringify(this.brands));
        this.brandForm.reset();
      }
    }
  }

  edit(brand: Object): void {
    let index = this.brands.indexOf(brand);
    this.brandTemp = JSON.parse(JSON.stringify(brand));
    this.brands[index].disabled = false;
    this.brands[index].hidden = false;
  }

  delete(brand: any): void {
    var machine = null;
    this.error = false;
    this.msg = null;

    if (this.localStorage.getItem('machine') != null) {
      let machines = JSON.parse(this.localStorage.getItem('machine'));

      for (let i = 0; i < machines.length; i++) {
        if (brand.name == machines[i].brand) {
          machine = machines[i].serie;
          break;
        }
      }
    }

    if(machine){
      this.error = true;
      this.msg = machine + ' is associated with this brand. Cannot be delete it';
    }else{
      let index = this.brands.indexOf(brand);
      this.brands.splice(index, 1);
      this.localStorage.setItem('brand', JSON.stringify(this.brands));
    }  
  }

  cancel(brand: Object): void {
    let index = this.brands.indexOf(brand);
    this.brands[index] = this.brandTemp;
    this.brands[index].disabled = true;
    this.brands[index].hidden = true;
  }

  save(brand: Object): void {
    let index = this.brands.indexOf(brand);
    this.brands[index].disabled = true;
    this.brands[index].hidden = true;
    this.brands[index] = brand;
    this.localStorage.setItem('brand', JSON.stringify(this.brands));

    this.updateMachine(brand);

  }

  findBrand(name: string): boolean {
    let find = this.brands.find(b => b.name === name);
    if (find)
      return true;

    return false;
  }

  updateMachine(brand: any): void {
    if (this.localStorage.getItem('machine') != null) {
      let machines = JSON.parse(this.localStorage.getItem('machine'));

      for (let i = 0; i < machines.length; i++) {
        if (this.brandTemp.name == machines[i].brand) {
          machines[i].brand = brand.name;
        }
      }

      this.localStorage.setItem('machine', JSON.stringify(machines));
    }
  }

}