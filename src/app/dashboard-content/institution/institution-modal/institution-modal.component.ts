import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstitutionService } from '../institution.service';

@Component({
  selector: 'app-institution-modal',
  templateUrl: './institution-modal.component.html',
  styleUrls: ['./institution-modal.component.css']
})
export class InstitutionModalComponent {
  departmentForm: FormGroup;
  options: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<InstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private institutionService: InstitutionService,
    private snackBar: MatSnackBar
  ) {
    // Initialize options with the data passed into the dialog
    this.options = data || [];
  }

  ngOnInit(): void {
    // Initialize the form
    this.createForm();
  }

  private createForm() {
    this.departmentForm = this.fb.group({
      departmentCode: ['', Validators.required],
      departmentTitle: ['', Validators.required],
      emailReceiver: ['', Validators.required],
      campus: [4],  // Adjust default value or remove if not needed
      departmentId: [1]  // Adjust default value or remove if not needed
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDepartment(): void {
    if (this.departmentForm.valid) {
      const formData = new FormData();
      const { departmentCode, departmentTitle, emailReceiver, campus, departmentId } = this.departmentForm.value;

      formData.append('departmentCode', departmentCode);
      formData.append('departmentTitle', departmentTitle);
      formData.append('emailReceiver', emailReceiver);
      formData.append('campus', campus);
      formData.append('departmentId', departmentId);

      this.institutionService.addNewDepartment(formData).subscribe({
        next: (response) => {
          this.departmentForm.reset();
          const snackBarRef = this.snackBar.open('Department added successfully!', 'Close', {
            duration: 3000
          });
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload();
          });

          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error adding new department:', error);
          this.snackBar.open('An error occurred while adding the new department. Please try again later.', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'Close', {
        duration: 3000
      });
    }
  }
  
}
