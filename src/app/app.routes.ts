import { Routes } from '@angular/router';
import { LoginComponent } from './form-login/login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RegisterComponent } from './form-login/register/register.component';
import { MenuComponent } from './form-login/menu/menu.component';

export const routes: Routes = [
    { path: '', component: MenuComponent, },
    {path: "chat", component: ChatComponent,},
];
