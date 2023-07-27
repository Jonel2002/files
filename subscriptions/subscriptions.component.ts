import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {
  subscriptions: any[] = [];
  filteredSubscriptions: any[] = [];
  searchTerm: string = '';

  showCreateFormFlag: boolean = false;
  showUpdateFormFlag: boolean = false;
  updating: boolean = false;
  code: number = 0;
  subscriberId: number = 0;
  price: number = 0;
  discountValue: number = 0;
  startDate: string = '';
  endDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getSubscriptionData();
  }

  getSubscriptionData() {
    this.http.get<any[]>('./assets/subscription.json').subscribe((data) => {
      this.subscriptions = data;
      this.filterSubscriptions();
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.filterSubscriptions();
  }

  filterSubscriptions() {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.filteredSubscriptions = this.subscriptions;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredSubscriptions = this.subscriptions.filter((subscription) =>
        this.searchInSubscription(subscription, searchTermLower)
      );
    }
  }

  searchInSubscription(subscription: any, searchTermLower: string): boolean {
    return (
      subscription.code.toString().includes(searchTermLower) ||
      subscription.subscriber.firstName.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.lastName.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.idCard.toString().includes(searchTermLower) ||
      subscription.subscriber.email.toLowerCase().includes(searchTermLower) ||
      subscription.subscriber.phone.toString().includes(searchTermLower) ||
      subscription.subscriber.plateNumber.toString().includes(searchTermLower) ||
      subscription.isDeleted.toString().includes(searchTermLower)
    );
  }

  onDelete(code: number) {
    // Find the index of the subscription to be deleted
    const index = this.subscriptions.findIndex((subscription) => subscription.code === code);
    if (index !== -1) {
      // Update the isDeleted property of the subscription
      this.subscriptions[index].isDeleted = true;
    }
  }

  showCreateForm() {
    this.showCreateFormFlag = true;
    this.code = 0;
    this.subscriberId = 0;
    this.price = 0;
    this.discountValue = 0;
    this.startDate = '';
    this.endDate = '';
  }

  onCancelCreate() {
    this.showCreateFormFlag = false;
  }

  onCreate() {
    // Create a new subscription object
    const newSubscription = {
      code: this.code,
      subscriberId: this.subscriberId,
      price: this.price,
      discountValue: this.discountValue,
      startTime: this.startDate,
      endTime: this.endDate,
      isDeleted: false,
    };

    // Add the new subscription to the list
    this.subscriptions.push(newSubscription);
    this.filterSubscriptions(); // Update the filtered list

    // Reset form variables
    this.showCreateFormFlag = false;
  }

  showUpdateForm(subscription: any) {
    this.showUpdateFormFlag = true;
    this.updating = true;
    this.code = subscription.code;
    this.subscriberId = subscription.subscriberId;
    this.price = subscription.price;
    this.discountValue = subscription.discountValue;
    this.startDate = subscription.startTime;
    this.endDate = subscription.endTime;
  }

  onCancelUpdateSubscription() {
    this.showUpdateFormFlag = false;
    this.updating = false;
  }

  onUpdateSubscription() {
    // Find the index of the subscription to be updated
    const index = this.subscriptions.findIndex((subscription) => subscription.code === this.code);

    if (index !== -1) {
      // Update the subscription object with new values
      this.subscriptions[index].code = this.code;
      this.subscriptions[index].subscriberId = this.subscriberId;
      this.subscriptions[index].price = this.price;
      this.subscriptions[index].discountValue = this.discountValue;
      this.subscriptions[index].startTime = this.startDate;
      this.subscriptions[index].endTime = this.endDate;
    }

    // Reset form variables
    this.showUpdateFormFlag = false;
    this.updating = false;
  }

  toggleCreateSubscriptionForm() {
    this.showCreateFormFlag = !this.showCreateFormFlag;
    this.code = 0;
    this.subscriberId = 0;
    this.price = 0;
    this.discountValue = 0;
    this.startDate = '';
    this.endDate = '';
  }
}
