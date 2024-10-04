import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstitutionService } from '../institution.service';

@Component({
  selector: 'app-edit-institution-modal',
  templateUrl: './edit-institution-modal.component.html',
  styleUrls: ['./edit-institution-modal.component.css']
})
export class EditInstitutionModalComponent {
  institution: any;
  userArray: any[];

  constructor(
    public dialogRef: MatDialogRef<EditInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private institutionService: InstitutionService,
    private snackBar: MatSnackBar
  ) {
    this.institution = { ...data };
    this.userArray = data.userArray; 
  }

  ngOnInit(): void {
    // ////console.log("Modal Data:", this.institution);
    // ////console.log("Department Id:", this.institution.department?.departmentId);
  }

  onSubmit(): void {
    if (this.institution.departmentCode && this.institution.departmentTitle && this.institution.emailReceiver) {
      const updatedDepartment = {
        departmentCode: this.institution.departmentCode,
        departmentTitle: this.institution.departmentTitle,
        emailReceiver: this.institution.emailReceiver,
        departmentId: this.institution.department?.departmentId // Ensure departmentId is present
      };
      const encryptedName = sessionStorage.getItem('username');
      let decryptedName = '';
      if(encryptedName){
        const bytes = CryptoJS.AES.decrypt(encryptedName, 'chmsu.edu.ph.secret-key.secret');
        decryptedName = bytes.toString(CryptoJS.enc.Utf8);
      }
      this.institutionService.editDepartmentDetails(updatedDepartment.departmentId, updatedDepartment,decryptedName).subscribe(
        (response: any) => {
          const snackBarRef = this.snackBar.open('Department updated successfully!', 'Close', {
            duration: 3000,
          });

          // Execute window.location.reload() after the snackbar is dismissed
          snackBarRef.afterDismissed().subscribe(() => {
            window.location.reload(); // Refresh the page
          });

          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating department', error);
          this.snackBar.open('Error updating department. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
