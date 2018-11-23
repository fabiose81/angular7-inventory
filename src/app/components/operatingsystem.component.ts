import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'os',
  templateUrl: 'operatingsystem.component.html',
  styleUrls: ['operatingsystem.component.css']
})
export class OSComponent implements OnInit {

  osForm: FormGroup;
  errorFields = false;
  error = false;
  oss = [];
  osTemp: any;
  localStorage;
  msg;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.osForm = this.formBuilder.group({
      description: ['', Validators.required]
    });

    this.localStorage = window.localStorage;

    if (this.localStorage.getItem('os') != null)
      this.oss = JSON.parse(this.localStorage.getItem('os'));
  }

  add(): void {
    this.errorFields = false;
    this.error = false;
    this.msg = null;

    if (this.osForm.invalid) {
      this.errorFields = true;
      return;
    } else {
      let description = this.osForm.value.description;
      if (this.findOS(description)) {
        this.error = true;
        this.msg = description + ' already exist';
      } else {
        this.osForm.value.disabled = true;
        this.osForm.value.hidden = true;
        this.oss.push(this.osForm.value);
        this.localStorage.setItem('os', JSON.stringify(this.oss));
        this.osForm.reset();
      }
    }
  }

  edit(os: Object): void {
    let index = this.oss.indexOf(os);
    this.osTemp = JSON.parse(JSON.stringify(os));
    this.oss[index].disabled = false;
    this.oss[index].hidden = false;
  }

  delete(os: any): void {
    var machine = null;
    this.error = false;
    this.msg = null;

    if (this.localStorage.getItem('machine') != null) {
      let machines = JSON.parse(this.localStorage.getItem('machine'));

      for (let i = 0; i < machines.length; i++) {
        if (os.description == machines[i].os) {
          machine = machines[i].serie;
          break;
        }
      }
    }

    if (machine) {
      this.error = true;
      this.msg = machine + ' is associated with this operating system. Cannot be delete it';
    } else {
      let index = this.oss.indexOf(os);
      this.oss.splice(index, 1);
      this.localStorage.setItem('os', JSON.stringify(this.oss));
    }
  }

  cancel(os: Object): void {
    let index = this.oss.indexOf(os);
    this.oss[index] = this.osTemp;
    this.oss[index].disabled = true;
    this.oss[index].hidden = true;
  }

  save(os: Object): void {
    let index = this.oss.indexOf(os);
    this.oss[index].disabled = true;
    this.oss[index].hidden = true;
    this.oss[index] = os;
    this.localStorage.setItem('os', JSON.stringify(this.oss));

    this.updateMachine(os);
  }

  findOS(description: string): boolean {
    let find = this.oss.find(o => o.description === description);
    if (find)
      return true;

    return false;
  }

  updateMachine(os: any): void {
    if (this.localStorage.getItem('machine') != null) {
      let machines = JSON.parse(this.localStorage.getItem('machine'));

      for (let i = 0; i < machines.length; i++) {
        if (this.osTemp.description == machines[i].os) {
          machines[i].os = os.description;
        }
      }

      this.localStorage.setItem('machine', JSON.stringify(machines));
    }
  }
}