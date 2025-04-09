import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fintech-form-buidler';

  form = new FormGroup({});
  model = { email: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      props: {
        label: 'Username',
        required: true,
      },
    },
    {
      key: 'password',
      type: 'input',
      props: {
        label: 'Password',
        required: true,
        type: 'password',
      },
    },
    {
      key: 'confirm_password',
      type: 'input',
      props: {
        label: 'Confirm Password',
        required: true,
        type: 'password',
      },
    },
  ];

  onSubmit(model: any) {
    console.log(this.form, model);
  }
}
