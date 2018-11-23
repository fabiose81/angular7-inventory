import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'machine',
  templateUrl: 'machine.component.html',
  styleUrls: ['machine.component.css']
})
export class MachineComponent implements OnInit {

  machineForm: FormGroup;
  error = false;
  machines = [];
  machine = {}
  brands = [];
  oss = [];
  localStorage;
  msg;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.machineForm = this.formBuilder.group({
      serie: ['', Validators.required],
      brand: ['', Validators.required],
      os: ['', Validators.required]
    });

    this.localStorage = window.localStorage;

    if (this.localStorage.getItem('machine') != null)
      this.machines = JSON.parse(this.localStorage.getItem('machine'));

    if (this.localStorage.getItem('brand') != null)
      this.brands = JSON.parse(this.localStorage.getItem('brand'));

    if (this.localStorage.getItem('os') != null)
      this.oss = JSON.parse(this.localStorage.getItem('os'));

  }


  add(): void {
    this.error = false;
    this.msg = null;

    if (this.machineForm.invalid) {
      this.error = true;
      return;
    } else {
      let serie = this.machineForm.value.serie;
      if (this.findMachine(serie)) {
        this.error = true;
        this.msg = serie + ' already exist';
      } else {
        this.machineForm.value.disabled = true;
        this.machineForm.value.hidden = true;
        this.machines.push(this.machineForm.value);
        this.localStorage.setItem('machine', JSON.stringify(this.machines));
        this.machineForm.reset();
      }
    }
  }

  edit(machine: Object): void {
    let index = this.machines.indexOf(machine);
    this.machine = JSON.parse(JSON.stringify(machine));
    this.machines[index].disabled = false;
    this.machines[index].hidden = false;
  }

  delete(machine: Object): void {
    let index = this.machines.indexOf(machine);
    this.machines.splice(index, 1);
    this.localStorage.setItem('machine', JSON.stringify(this.machines));
  }

  cancel(machine: Object): void {
    let index = this.machines.indexOf(machine);
    this.machines[index] = this.machine;
    this.machines[index].disabled = true;
    this.machines[index].hidden = true;
  }

  save(machine: Object): void {
    let index = this.machines.indexOf(machine);
    this.machines[index].disabled = true;
    this.machines[index].hidden = true;
    this.machines[index] = machine;
    this.localStorage.setItem('machine', JSON.stringify(this.machines));
  }

  findMachine(serie: string): boolean {
    let find = this.machines.find(m => m.serie === serie);
    if (find)
      return true;

    return false;
  }

}