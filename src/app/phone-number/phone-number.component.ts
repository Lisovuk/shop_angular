import { Component } from '@angular/core';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.css'],
})
export class PhoneNumberComponent {
  makeCall() {
    const phoneNumber = '097-97-64-132';

    window.open(`tel:${phoneNumber}`, '_self');
  }
}
