import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstitutionService } from '../institution.service';

@Component({
  selector: 'app-recipient-modal',
  templateUrl: './recipient-modal.component.html',
  styleUrls: ['./recipient-modal.component.css']
})
export class RecipientModalComponent {
  recipientForm: FormGroup;
  totalUser:any;
  options: any[] = [];
  departments: any[];
  constructor(private institutionService:InstitutionService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<RecipientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private snackBar: MatSnackBar) {
    
    this.recipientForm = this.formBuilder.group({
      userId:[this.totalUser+1],
      userName:["none"],
      password:["none"],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      departmentId: ['', Validators.required],
      campus: ['', Validators.required],
      companyName: ['', Validators.required],
      accessLevel: ['', Validators.required],
      employeeType: ['', Validators.required],
      permanent: ['', Validators.required],
      userType: ['', Validators.required],
      emailReceiver: [0, Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.options = data || [];
  }
  ngOnInit() {
    this.institutionService.getTotalUser().subscribe({
      next: (res: number) => {
        this.totalUser = res;
        // ////console.log('Total User:',this.totalUser);
      },
      error: (error: any) => {
        console.error('Error fetching total users:', error);
      }
    });

    this.institutionService.getDepartmentDetails().subscribe({
      next:(res:any)=>{
        this.departments = res;
      },
      error:(error:any)=>{
        console.error('Error fetching departments:',error);
      }
    })
  }
  addNewUser() {
    if (this.recipientForm.valid) {
      // Extract values from the form
      const formValues = this.recipientForm.value;
  
      // For demonstration, log form values
      // ////console.log('Form Values:', formValues);
  
      // Call the service to add a new user and handle the response
      this.institutionService.addNewUser(formValues).subscribe({
        next: (response) => {
          // ////console.log('User added successfully:', response);
          // Optionally, provide feedback to the user
          this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
          // Reset the form if necessary
          this.recipientForm.reset();
        },
        error: (error) => {
          console.error('Error adding user:', error);
          // Optionally, provide feedback to the user
          this.snackBar.open('Failed to add user. Please try again.', 'Close', { duration: 3000 });
        }
      });
    } else {
      // If the form is not valid, mark all fields as touched to show validation errors
      this.recipientForm.markAllAsTouched();
      // Optionally, provide feedback to the user
      this.snackBar.open('Please fill out all required fields correctly.', 'Close', { duration: 3000 });
    }
  }
  
}
