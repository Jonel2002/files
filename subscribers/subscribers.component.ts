import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {
  subscribers: any[] = [];
  filteredSubscribers: any[] = [];
  searchTerm: string = '';

  showCreateFormFlag: boolean = false;
  showUpdateFormFlag: boolean = false;
  selectedSubscriber: any;

  constructor(private http: HttpClient, private elementRef: ElementRef) {}

  ngOnInit() {
    this.getSubscriberData();
  }

  getSubscriberData() {
    this.http.get<any[]>('./assets/subscriber.json').subscribe((data) => {
      this.subscribers = data;
      this.filterSubscribers();
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterSubscribers();
  }

  filterSubscribers() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredSubscribers = this.subscribers;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredSubscribers = this.subscribers.filter((subscriber) =>
        this.searchInSubscriber(subscriber, searchTermLower)
      );
    }
  }

  cancelCreateForm() {
    this.showCreateFormFlag = false;
  }

  cancelUpdateForm() {
    this.showUpdateFormFlag = false;
  }

  searchInSubscriber(subscriber: any, searchTermLower: string): boolean {
    if (!subscriber) {
      return false;
    }
  
    const id = subscriber.id?.toString() || '';
    const firstName = subscriber.firstName?.toLowerCase() || '';
    const lastName = subscriber.lastName?.toLowerCase() || '';
    const idCard = subscriber.idCard?.toString() || '';
    const email = subscriber.email?.toLowerCase() || '';
    const phone = subscriber.phone?.toString() || '';
    const plateNumber = subscriber.plateNumber?.toString() || '';
    const isDeleted = subscriber.isDeleted?.toString() || '';
  
    return (
      id.includes(searchTermLower) ||
      firstName.includes(searchTermLower) ||
      lastName.includes(searchTermLower) ||
      idCard.includes(searchTermLower) ||
      email.includes(searchTermLower) ||
      phone.includes(searchTermLower) ||
      plateNumber.includes(searchTermLower) ||
      isDeleted.includes(searchTermLower)
    );
  }
  

  onDelete(id: number) {
    const index = this.subscribers.findIndex((subscriber) => subscriber.id === id);
    if (index !== -1) {
      this.subscribers[index].isDeleted = true;
    }
  }

  toggleCreateForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
  }

  showUpdateForm(subscriber: any) {
    this.showUpdateFormFlag = true;
    this.selectedSubscriber = subscriber;
  }

  onSubmitCreateForm(firstName: string, lastName: string, idCardInput: string, email: string, phoneInput: string, plateNumber: string) {
    const newSubscriber = {
      id: this.subscribers.length + 1,
      firstName: firstName,
      lastName: lastName,
      idCard: Number(idCardInput),
      email: email,
      phone: Number(phoneInput),
      plateNumber: plateNumber,
      isDeleted: false,
    };

    this.subscribers.push(newSubscriber);
    this.filterSubscribers();

    this.showCreateFormFlag = false;
  }

  onSubmitUpdateForm(firstName: string, lastName: string, idCardInput: string, email: string, phoneInput: string, plateNumber: string) {
    this.selectedSubscriber.firstName = firstName;
    this.selectedSubscriber.lastName = lastName;
    this.selectedSubscriber.idCard = Number(idCardInput);
    this.selectedSubscriber.email = email;
    this.selectedSubscriber.phone = Number(phoneInput);
    this.selectedSubscriber.plateNumber = plateNumber;

    this.showUpdateFormFlag = false;
  }
}
