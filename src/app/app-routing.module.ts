import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: "register",
    loadChildren:() =>
      import('./pages/register/register.module').then((m) => m.RegisterModule)
  },

  { path: '', component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'destination', pathMatch: 'full' },
      {
        path: 'destination',
        loadChildren: () => import('./pages/destination/destination.module').then((m) => m.DestinationModule)
      },
      {
        path: 'budget',
        loadChildren: () => import('./pages/budget/budget.module').then((m) => m.BudgetModule)
      },
      {
        path: 'summary',
        loadChildren: () => import('./pages/summary/summary.module').then((m) => m.SummaryModule)
      },
      {
        path: 'history',
        loadChildren: () => import('./pages/history/history.module').then((m) => m.HistoryModule)
      }
    ],
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
