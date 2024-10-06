import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, debounceTime, map, firstValueFrom } from 'rxjs';
import { EmailService } from '../email-individual/email.service';
import { EmailMultipleService } from './email-multiple.service';

@Component({
  selector: 'app-email-multiple',
  templateUrl: './email-multiple.component.html',
  styleUrls: ['./email-multiple.component.css']
})
export class EmailMultipleComponent {
  emailForm: FormGroup;
  nextDocumentNumber: number;
  filteredEmails: Observable<string[]>[] = [];
  filteredThroughUsers: Observable<string[]>;
  filteredAttentionUsers: Observable<string[]>;
  filteredFromUsers: Observable<string[]>;
  attentionAddress: string;
  userIdAsEncoder:number;
  emailAddressThrough: string;
  senderDepartmentId:string;
  fromAddressEmail: string;
  loading = false;
  usersName: string[] = [];
  departmentId: any[] = [1];
  customGroupArray:any[]=[];
  showSelectField: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private emailMultipleService: EmailMultipleService,
    private cdr: ChangeDetectorRef,
    private emailService:EmailService,
    private snackBar:MatSnackBar
  ) {
    this.emailForm = this.formBuilder.group({
      documentNumber: ['',{ value: this.nextDocumentNumber}],
      dateOfLetter: ['', Validators.required],
      subject: ['', Validators.required],
      through: ['', Validators.required],
      type: ['', Validators.required],
      attention: this.formBuilder.array([]),
      from: ['', Validators.required],
      pageCount: [1, Validators.required],
      attachment: ['', Validators.required],
      campus: [4, Validators.required],
      cc: this.formBuilder.array([]),
      encoder: ['4', Validators.required],
      message: ['', Validators.required],
      departmentId: [''],
      username:[''],
      password:['']
    });
  }

  ngOnInit() {
    this.getNextDocumentNumber();
    this.getUsersName();
    this.setupAutocompleteFilters();
    this.getSenderDepartmentId();
    // ////console.log("aa")
    // ////console.log(this.senderDepartmentId);
    this.getAllCustomGroup();
  }
   getAllCustomGroup(){
    this.emailMultipleService.getAllCustomGroup().subscribe({
      next:((response:any)=>{
        this.customGroupArray = response;
        console.log(this.customGroupArray)
      }),error:((error:any)=>{
        console.error("An error occured while fetching the custom groups",error);
      })
    });
  }
  toggleCustomReceivers() {
    this.showSelectField = !this.showSelectField;
  }

 // Add custom group emails to attention array
 selectGroup(group: any) {
  if (group && group.emailsJson) {
    // Convert the emailsJson string into an array (assuming comma-separated)
    const emailArray = group.emailsJson.split(',').map((email: string) => email.trim()); // Trim to remove any extra spaces

    emailArray.forEach((email: string) => {
      // Add each email in the custom group to the attention array
      this.attentionArray.push(this.formBuilder.control(email));
    });

    console.log('Emails added:', emailArray);
  } else {
    console.error('Selected group does not contain valid emails:', group);
  }
}


  private setupAutocompleteFilters(): void {
    this.filteredThroughUsers = this.getControl('through').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._filter(value ?? ''))
    );

    this.filteredAttentionUsers = this.getControl('attention').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._filter(value ?? ''))
    );

    this.filteredFromUsers = this.getControl('from').valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._filter(value ?? ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.usersName.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private async getEmailByName(name: string): Promise<string> {
    try {
      const users: any = await firstValueFrom(this.emailMultipleService.getAllUserDetails());
      const matchedUser = users.find((user: any) => user.name === name);
      return matchedUser ? matchedUser.email : '';
    } catch (error) {
      console.error('Error fetching user details:', error);
      return '';
    }
  }

  

  private async getEmailThrough(): Promise<void> {
    try {
      const userInputName = this.emailForm.value.through;
      const users: any = await firstValueFrom(this.emailMultipleService.getAllUserDetails());
      const matchedUser = users.find((user: any) => user.name === userInputName);
      this.emailAddressThrough = matchedUser ? matchedUser.email : '';
    } catch (error) {
      console.error('Error fetching through email:', error);
    }
  }

  private async getEmailFrom(): Promise<void> {
    try {
      const userInputName = this.emailForm.value.from;
      const users: any = await firstValueFrom(this.emailMultipleService.getAllUserDetails());
      const matchedUser = users.find((user: any) => user.name === userInputName);
      this.fromAddressEmail = matchedUser ? matchedUser.email : '';
    } catch (error) {
      console.error('Error fetching from email:', error);
    }
  }

  private async getSenderDepartmentId(): Promise<void> {
    try {
      const userInputName = this.emailForm.value.from;
      const users: any = await firstValueFrom(this.emailMultipleService.getAllUserDetails());
      // ////console.log(users);
      const matchedUser = users.find((user: any) => user.name === userInputName);
      this.senderDepartmentId = matchedUser ? matchedUser.departmentId : 0;
    } catch (error) {
      console.error('Error fetching from email:', error);
    }
  }

  private async getAttentionEmails(): Promise<string> {
    try {
      const attentionEmails = await Promise.all(
        this.attentionArray.controls.map(async control => {
          const name = control.value;
          const email = await this.getEmailByName(name);
          return email;
        })
      );
      return attentionEmails.filter(email => email).join(', ');
    } catch (error) {
      console.error('Error fetching attention emails:', error);
      return '';
    }
  }

  private getUsersName() {
    this.emailMultipleService.getAllUserDetails().subscribe({
      next: (users) => {
        this.usersName = users.map(user => user.name);
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching users names:', error);
      }
    });
  }

  async sendEmail() {
    if (this.emailForm.valid) {
      const {
        subject,
        dateOfLetter,
        type,
        campus,
        through,
        from,
        pageCount,
        cc,
        encoder,
        message,
        departmentId,
      } = this.emailForm.value;
      const formData = new FormData();
      const files: FileList = this.emailForm.get('attachment')?.value;

    if (isNaN(pageCount) || isNaN(departmentId)) {
      console.error('pageCount or departmentId is invalid.');
      return;
    }

    Array.from(files).forEach(file => {
      formData.append('attachment', file);
    });

    this.loading = true;
      formData.append('documentNumber', this.nextDocumentNumber.toString());
      formData.append('subject', subject);
      formData.append('dateOfLetter', this.formatDate(dateOfLetter));
      formData.append('type', type);
      formData.append('campus', campus);
      await this.getUserIdAsEncoder();
      formData.append('encoder', '4');

      const attentionEmails = await this.getAttentionEmails();
      formData.append('attention', attentionEmails);

      await this.getEmailThrough();
      formData.append('through', this.emailAddressThrough);
      await this.getEmailFrom();
      formData.append('from', this.fromAddressEmail);
    
      formData.append('cc', cc);
      formData.append('pageCount', pageCount.toString());
      formData.append('message', message);
      await this.getSenderDepartmentId();
      formData.append('departmentId', this.senderDepartmentId);


      this.emailMultipleService.sendEmail(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.loading = false;
          this.snackBar.open("Document was sent successfully","Close",{
            duration:3000,
            horizontalPosition:'right',
            verticalPosition:'top'
          })
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
          });
          this.loading = false;
        },
      });
    } else {
      this.snackBar.open("Form is Invalid","Close",{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top'
      });
    }
  }

  get attentionArray(): FormArray {
    return this.emailForm.get('attention') as FormArray;
  }

  get ccArray(): FormArray {
    return this.emailForm.get('cc') as FormArray;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  addAttention(): void {
    const control = this.formBuilder.control('');
    this.attentionArray.push(control);
    this.filteredEmails.push(
      control.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        map(value => this._filter(value ?? ''))
      )
    );
  }

  removeAttention(index: number): void {
    this.attentionArray.removeAt(index);
    this.filteredEmails.splice(index, 1);
  }

  addCc(): void {
    this.ccArray.push(this.formBuilder.control('', Validators.email));
  }

  removeCc(index: number): void {
    this.ccArray.removeAt(index);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.emailForm.patchValue({ attachment: input.files });
    }
  }

   getControl(controlName: string): FormControl {
    return this.emailForm.get(controlName) as FormControl;
  }

  private getNextDocumentNumber() {
    this.emailMultipleService.getNextDocumentNumber().subscribe({
      next: (nextDocumentNumber) => {
        this.nextDocumentNumber = nextDocumentNumber;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error fetching next document number:', error);
      }
    });
  }

  async getUserIdAsEncoder(): Promise<void> {
    try {
      const userInputName = this.emailForm.value.from;
      const users: any = await firstValueFrom(this.emailService.getAllUser());
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
}
