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
  customGroupArray:any[]=[];
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
    if (emailsArray) {
      emailsArray.valueChanges.subscribe((emails) => {
        console.log('Emails updated:', emails);
      });
    } else {
      console.error('emailsArray is undefined');
    }


    this.customGroupService.getAllUserDetails().subscribe({
      next: (response: any) => {
        this.userArray = response;
        console.log(this.userArray);
      },
      error: (error: any) => {
        console.error("An error occurred while retrieving user list", error);
      },
    });

    this.customGroupService.getAllCustomGroup().subscribe({
      next:((response:any)=>{
        this.customGroupArray = response;
        console.log(this.customGroupArray)
      }),error:((error:any)=>{
        console.error("An error occured while fetching the custom groups",error);
      })
    })
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

      groupData.append('emails', JSON.stringify(emails)); // Ensure emails are properly formatted
      groupData.append('groupName', groupName);

      if(this.groupNameExists()){
        console.log("Group Name Exists");
      }else{
        this.customGroupService.createCustomGroup(groupData).subscribe({
          next: (response: any) => {
            console.log(response);
          },
          error: (error: any) => {
            console.error('An error occurred', error);
          }
        });
      }
      
    }
  }

  get emailsArray(): FormArray {
    return this.customGroup.get('emails') as FormArray;
  }

  addEmail(): void {
    this.emailsArray.push(this.formBuilder.control('', Validators.email));

    // Update the filteredUsers observable for new input
    const lastEmail = this.emailsArray.at(this.emailsArray.length - 1);
    this.filteredUsers = lastEmail.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
  }

  removeEmail(index: number): void {
    this.emailsArray.removeAt(index);
  }
  

}
