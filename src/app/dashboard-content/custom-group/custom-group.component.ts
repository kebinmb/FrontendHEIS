import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomGroupService } from './custom-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-custom-group',
  templateUrl: './custom-group.component.html',
  styleUrls: ['./custom-group.component.css'],
})
export class CustomGroupComponent {
    customGroup: FormGroup;
    loading = false;
    userArray: any[] = [];
    customGroupArray: any[] = [];
    filteredUsers: Observable<any[]> | undefined;
  
    constructor(
      private formBuilder: FormBuilder,
      private customGroupService: CustomGroupService,
      private snackBar: MatSnackBar,
      private router: Router
    ) {
      // Initialize the form with validation
      this.customGroup = this.formBuilder.group({
        groupId: [''],
        emails: this.formBuilder.array([]), // Initialize as FormArray
        groupName: [''],
      });
    }
  
    ngOnInit() {
      // Ensure emails FormArray is initialized and subscribe to valueChanges
      const emailsArray = this.emailsArray;
  
      // Subscribe to valueChanges safely
      // if (emailsArray) {
      //   emailsArray.valueChanges.subscribe((emails) => {
      //     this.snackBar.open('Emails updated: ' + emails.join(', '), 'Close', {
      //       duration: 3000,
      //     });
      //   });
      // } else {
      //   this.snackBar.open('emailsArray is undefined', 'Close', {
      //     duration: 3000,
      //   });
      // }
  
      this.customGroupService.getAllUserDetails().subscribe({
        next: (response: any) => {
          this.userArray = response;
          this.snackBar.open('User list retrieved', 'Close', {
            duration: 3000,
          });
        },
        error: (error: any) => {
          this.snackBar.open('An error occurred while retrieving user list', 'Close', {
            duration: 3000,
          });
        },
      });
  
      this.customGroupService.getAllCustomGroup().subscribe({
        next: (response: any) => {
          this.customGroupArray = response;
          this.snackBar.open('Custom groups fetched successfully', 'Close', {
            duration: 3000,
          });
        },
        error: (error: any) => {
          this.snackBar.open('An error occurred while fetching the custom groups', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  
    private _filterUsers(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.userArray.filter(user => user.name.toLowerCase().includes(filterValue));
    }
  
    // When a user is selected from the autocomplete, update the corresponding email field
    onOptionSelected(event: any, index: number): void {
      const selectedEmail = event.option.value;
      this.emailsArray.at(index).setValue(selectedEmail);
    }
  
    // Method to check if groupName exists in customGroupArray
    groupNameExists(): boolean {
      const groupNameControl = this.customGroup.get('groupName')?.value;
      return this.customGroupArray.some(group => group.groupName === groupNameControl);
    }
  
    async createNewGroup() {
      if (this.customGroup.valid) {
        const { emails, groupName } = this.customGroup.value;
        const groupData = new FormData();
  
        groupData.append('emails', emails); // Ensure emails are properly formatted
        groupData.append('groupName', groupName);
  
        if (this.groupNameExists()) {
          this.snackBar.open('Group Name Exists', 'Close', {
            duration: 3000,
          });
        } else {
          this.customGroupService.createCustomGroup(groupData).subscribe({
            next: (response: any) => {
              this.snackBar.open('Custom group created successfully', 'Close', {
                duration: 3000,
              });
            },
            error: (error: any) => {
              this.snackBar.open('An error occurred while creating the group', 'Close', {
                duration: 3000,
              });
            },
          });
        }
      }
    }
  
    get emailsArray(): FormArray {
      return this.customGroup.get('emails') as FormArray;
    }
  
    addEmail(): void {
      this.emailsArray.push(this.formBuilder.control('', Validators.required));
  
      // Update the filteredUsers observable for new input
      const lastEmail = this.emailsArray.at(this.emailsArray.length - 1);
      this.filteredUsers = lastEmail.valueChanges.pipe(
        startWith(''),
        map(value => this._filterUsers(value))
      );
    }
  
    removeEmail(index: number): void {
      this.emailsArray.removeAt(index);
      this.snackBar.open('Email removed', 'Close', {
        duration: 3000,
      });
    }
  

}
