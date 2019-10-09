import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { AddComponent } from './add/add.component';
import { AllAnimalsComponent } from './all-animals/all-animals.component';


const appRoutes: Routes = [
  { path: 'all', component: AllAnimalsComponent },
  { path: ':id', component: AnimalComponent },
  { path: '', pathMatch: 'full', component: AddComponent }
];

export const routing = RouterModule.forRoot(appRoutes);