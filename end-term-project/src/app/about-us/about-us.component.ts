import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule, FormsModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  pageTitle = 'About Us'
  aboutCompany = 'Welcome to online store, where you can find top-quality\n' +
    '      electronics and other products at the best prices.\n' +
    '      We are committed to providing a seamless shopping experience,\n' +
    '      excellent customer service, and amazing deals every day.'

  likes = 0;
  isAgesVisible = false;

  visitorName = '';
  visitorEmail = '';
  visitorMessage = '';
  formSubmitted = false;

  teamMembers = [
    {
      name: 'Nazarbaev Nursultan',
      position: 'Frontend Developer',
      age: 65
    },
    {
      name: 'Vladimir Putin',
      position: 'UI/UX Designer',
      age: 71
    },
    {
      name: 'Donald Trump',
      position: 'Backend Developer',
      age: 77
    },
    {
      name: 'Aleksandr Lukashenko',
      position: 'Devops Developer',
      age: 69
    },
    {
      name: 'Kim Jong Un',
      position: 'Product Manager',
      age: 40
    }
  ];

  onLike() {
    this.likes++;
    console.log(`Likes increased to: ${this.likes}`);
  }

  toggleAges() {
    this.isAgesVisible = !this.isAgesVisible;
    console.log(`is Ages Visible: ${this.isAgesVisible}`);
  }

  onSubmitForm() {
    this.formSubmitted = true;
    console.log('Form submitted:', {
      name: this.visitorName,
      email: this.visitorEmail,
      message: this.visitorMessage
    });
  }
}
