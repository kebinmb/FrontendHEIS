import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, map, firstValueFrom } from 'rxjs';
import { EmailService } from '../email-individual/email.service';
import { EmailGroupService } from './email-group.service';

@Component({
  selector: 'app-email-group',
  templateUrl: './email-group.component.html',
  styleUrls: ['./email-group.component.css']
})
export class EmailGroupComponent {
  nextDocumentNumber: number;
  showDepartmentField: boolean = false;
  showDepartmentFieldFaculty: string;
  showDepartmentStaff: string;
  departmentNameValue: number;
  emailForm: FormGroup;
  userIdAsEncoder:number;
  departmentId: number[] = [];
  userFromDepartment: any[] = [];
  regularDepartmentStaff: any[] = [];
  regularDepartmentStaffEmail: string[] = [];
  jobOrderDepartmentStaff: any[] = [];
  jobOrderDepartmentStaffEmail: string[] = [];
  regularDepartmentFaculty: any[] = [];
  regularDepartmentFacultyEmail: string[] = [];
  partTimeDepartmentFaculty: any[] = [];
  partTimeDepartmentFacultyEmail: string[] = [];
  allStaffFromDepartment: any[] = [];
  allStaffFromDepartmentEmail: string[] = [];
  allFacultyFromDepartment: any[] = [];
  allFacultyFromDepartmentEmail: string[] = [];
  filteredThroughUsers: Observable<string[]>;
  filteredFromUsers: Observable<string[]>;
  loading: boolean = false;
  userFromCampus: any[] = [];
  usersName: string[] = [];
  allFaculty: string[] = [];
  regularFaculty: string[] = [];
  partTimeFaculty: string[] = [];
  allStaff: string[] = [];
  regularStaff: string[] = [];
  jobOrderStaff: string[] = [];

  departmentNames: string[] = [];

  userDetailsArray: any[] = [];
  facultyNamesAndEmail: any[] = [];
  staffNamesAndEmail: any[] = [];
  regularFacultyNamesAndEmail: any[] = [];
  partTimeFacultyNamesAndEmail: any[] = [];
  regularStaffNamesAndEmail: any[] = [];
  jobOrderStaffNamesAndEmail: any[] = [];

  departmentDetails: any[] = [];

  emailAddressThrough: string;
  fromAddressEmail: string;

  constructor(
    private emailGroupService: EmailGroupService,
    private emailServce:EmailService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar:MatSnackBar
  ) {
    this.emailForm = this.formBuilder.group({
      documentNumber: ['',{ value: this.nextDocumentNumber}],
      subject: ['', Validators.required],
      dateOfLetter: ['', Validators.required],
      type: ['', Validators.required],
      attention: [[], Validators.required],
      through: ['', Validators.required],
      from: ['', Validators.required],
      pageCount: [1, Validators.required],
      attachment: ['', Validators.required],
      campus: ['', Validators.required],
      cc: this.formBuilder.array([]),
      encoder: ['4', Validators.required],
      message: ['', Validators.required],
      departmentId: [''],
      username:[''],
      password:['']
    });
  }

  async sendEmail() {
    if (this.emailForm.valid) {
      try {
        const {
          subject,
          dateOfLetter,
          type,
          campus,
          attention,
          through,
          from,
          pageCount,
          cc,
          encoder,
          message,
          departmentId,
        } = this.emailForm.value;

        const files: FileList = this.emailForm.get('attachment')?.value;

       

        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('attachment', file);
        });
        formData.append('documentNumber', this.nextDocumentNumber.toString());
        formData.append('subject', subject);
        formData.append('dateOfLetter', this.formatDate(dateOfLetter));
        formData.append('type', type);
        formData.append('campus', campus);
        await this.getUserIdAsEncoder();
        formData.append('encoder', '4');
        formData.append('attention', attention);

        await this.getEmailThrough();
        formData.append('through', this.emailAddressThrough);

        await this.getEmailFrom();
        formData.append('from', this.fromAddressEmail);

        formData.append('cc', cc);
        formData.append('pageCount', pageCount.toString());
        formData.append('message', message);
        formData.append('departmentId', this.departmentId[0].toString());
        this.loading = true;

        this.emailGroupService.sendEmail(formData).subscribe({
          next: (response) => {
            this.loading = false;
            // ////console.log('Document sent and file uploaded successfully:', response);
            this.snackBar.open("Document was sent successfully","Close",{
              duration:3000,
              horizontalPosition:'right',
              verticalPosition:'top'
            });
            this.emailForm.reset();
            this.router.navigate(['/dashboard/archives'], { skipLocationChange: true }).then(() => {
              window.location.reload();
            });
          },
          error: (error) => {
            console.error('Error sending document:', error);
           this.snackBar.open("Error sending document","Close",{
            duration:3000,
            horizontalPosition:'right',
            verticalPosition:'top'
           })
            this.loading = false;
          },
        });
      } catch (error) {
        console.error('Error during email sending process:', error);
        this.snackBar.open("An unexpected error occurred while sending the email","Close",{
          duration:3000,
          horizontalPosition:'right',
          verticalPosition:'top'
        })
        this.loading = false;
      }
    } else {
      this.snackBar.open("Form is invalid","Close",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      })
    }
  }

  ngOnInit() {
    this.initializeData();
  }

  initializeData() {
    this.getAllUserDetails();
    // this.getAllDepartmentDetails();
    this.getNextDocumentNumber();
    this.getUsersName();
    this.getDepartmentName();

    this.filteredThroughUsers = this.emailForm.get('through')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );

    this.filteredFromUsers = this.emailForm.get('from')!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  onDepartmentChange(event: any) {
    const selectedDepartment = event.value;
    this.showDepartmentField =
      selectedDepartment && selectedDepartment.toLowerCase().includes('college');
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.emailForm.patchValue({ attachment: input.files });
    }
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  get ccArray(): FormArray {
    return this.emailForm.get('cc') as FormArray;
  }

  addCc(): void {
    this.ccArray.push(this.formBuilder.control('', Validators.email));
  }

  removeCc(index: number): void {
    this.ccArray.removeAt(index);
  }

  getSpecificDepartmentId(event: any) {
    const departmentName = event.value;
    const selectedDepartment = event.value;
    this.showDepartmentFieldFaculty =
      selectedDepartment && selectedDepartment.toLowerCase().includes('college');
    this.showDepartmentStaff =
      selectedDepartment && !selectedDepartment.toLowerCase().includes('college');

    const department = this.departmentDetails.find(dept => dept.departmentTitle === departmentName);
    if (department) {
      this.departmentId = [department.departmentId];
      this.getAllUserFromDepartment();
    }
  }

  getUserFromCampusAndDepartment(event: any) {
    const campusValue = event.value;
    this.userFromCampus = this.userDetailsArray
      .filter(user => user.campus === campusValue)
      .map(user => ({
        name: user.name,
        departmentId: user.departmentId,
        employeeType: user.employeeType,
        designation: user.designation,
        email: user.email,
      }));
  }
  async getUserIdAsEncoder(): Promise<void> {
    try {
      const userInputName = this.emailForm.value.from;
      const users: any = await firstValueFrom(this.emailServce.getAllUser());
      const matchedUser = users.find(
        (user: any) => user.name === userInputName
      );
      if (matchedUser) {
        this.userIdAsEncoder = matchedUser.userId;
       
      } else {
        console.error('No user found with the provided name');
      }
    } catch (error) {
      console.error('Error fetching users from attention column: ', error);
    }
  }

  getAllUserFromDepartment() {
    const departmentId = this.departmentId;
    this.userFromDepartment = this.userFromCampus.filter(user =>
      departmentId.includes(user.departmentId)
    );

    this.getRegularStaffFromDepartment();
    this.getJobOrderStaffFromDepartment();
    this.getRegularFacultyFromDepartment();
    this.getPartTimeFacultyFromDepartment();
    this.getAllStaff();
    this.getAllFaculty();
  }

  getRegularStaffFromDepartment() {
    this.regularDepartmentStaff = this.userFromDepartment.filter(
      user => user.employeeType.toLowerCase() === 'staff' && user.designation.toLowerCase() !== 'job order'
    );
    this.regularDepartmentStaffEmail = this.regularDepartmentStaff.map(user => user.email);
  }

  getJobOrderStaffFromDepartment() {
    this.jobOrderDepartmentStaff = this.userFromDepartment.filter(
      user => user.employeeType.toLowerCase() === 'staff' && user.designation.toLowerCase() === 'job order'
    );
    this.jobOrderDepartmentStaffEmail = this.jobOrderDepartmentStaff.map(user => user.email);
  }

  getRegularFacultyFromDepartment() {
    this.regularDepartmentFaculty = this.userFromDepartment.filter(
      user => user.employeeType.toLowerCase() === 'faculty' && user.designation.toLowerCase() !== 'part time'
    );
    this.regularDepartmentFacultyEmail = this.regularDepartmentFaculty.map(user => user.email);
  }

  getPartTimeFacultyFromDepartment() {
    this.partTimeDepartmentFaculty = this.userFromDepartment.filter(
      user => user.employeeType.toLowerCase() === 'faculty' && user.designation.toLowerCase() === 'part time'
    );
    this.partTimeDepartmentFacultyEmail = this.partTimeDepartmentFaculty.map(user => user.email);
  }

  getAllStaff() {
    this.allStaffFromDepartment = this.regularDepartmentStaff.concat(this.jobOrderDepartmentStaff);
    this.allStaffFromDepartmentEmail = this.allStaffFromDepartment.map(user => user.email);
  }

  getAllFaculty() {
    this.allFacultyFromDepartment = this.regularDepartmentFaculty.concat(this.partTimeDepartmentFaculty);
    this.allFacultyFromDepartmentEmail = this.allFacultyFromDepartment.map(user => user.email);
  }

  getAllUserDetails() {
    this.emailGroupService.getAllUserDetails().subscribe({
      next: response => {
        this.userDetailsArray = response;
      },
      error: error => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  getDepartmentName() {
    this.emailGroupService.getDepartmentDetails().subscribe({
      next: response => {
        this.departmentDetails = response;
        this.departmentNames = response.map(dept => dept.departmentTitle);
      },
      error: error => {
        console.error('Error fetching department details:', error);
      }
    });
  }

  getNextDocumentNumber() {
    this.emailGroupService.getNextDocumentNumber().subscribe({
      next: response => {
        this.nextDocumentNumber = response;
      },
      error: error => {
        console.error('Error fetching next document number:', error);
      }
    });
  }

  getUsersName() {
    this.emailGroupService.getAllUserDetails().subscribe({
      next: response => {
        this.usersName = response.map(user => user.name);
      },
      error: error => {
        console.error('Error fetching users name:', error);
      }
    });
  }

  getControl(controlName: string): FormControl {
    return this.emailForm.get(controlName) as FormControl;
  }

  async getEmailThrough(): Promise<void> {
    const userInputName = this.emailForm.value.through;
    const users: any = await firstValueFrom(
      this.emailGroupService.getAllUserDetails()
    );
    const matchedUser = users.find((user: any) => user.name === userInputName);
    if (matchedUser) {
      this.emailAddressThrough = matchedUser.email;
      // ////console.log(this.emailAddressThrough);
    } else {
      console.error('No user found with the provided name');
    }
  }

  async getEmailFrom(): Promise<void> {
    const userInputName = this.emailForm.value.from;
    const users: any = await firstValueFrom(
      this.emailGroupService.getAllUserDetails()
    );
    const matchedUser = users.find((user: any) => user.name === userInputName);
    if (matchedUser) {
      this.fromAddressEmail = matchedUser.email;
      // ////console.log(this.fromAddressEmail);
    } else {
      console.error('No user found with the provided name');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.usersName.filter(option => option.toLowerCase().includes(filterValue));
  }
}
