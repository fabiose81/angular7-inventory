import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MachineComponent }  from './components/machine.component';
import { BrandComponent }   from './components/brand.component';
import { OSComponent }   from './components/operatingsystem.component';

const routes: Routes = [
  { path: 'machine', component: MachineComponent},
  { path: 'brand', component: BrandComponent},
  { path: 'os', component: OSComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
