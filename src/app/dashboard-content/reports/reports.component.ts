import { Component, ViewChild } from '@angular/core';
import { ReportsService } from './reports.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadDailyReports, loadUserList } from './daily-reports-state-manager/daily-report.actions';
import { DailyReportState } from './daily-reports-state-manager/daily-report.reducer';
import { selectAllReports, selectReportsLoading, selectReportsError } from './daily-reports-state-manager/daily-report.selectors';
import { formatDateToYYYYMMDD } from './dateFormater';
import { loadDepartmentList } from './department-list-state-manager/department-list.actions';
import { DepartmentState } from './department-list-state-manager/department-list.reducer';
import { selectDepartmentList, selectDepartmentLoading, selectDepartmentError } from './department-list-state-manager/department-list.selector';
import { loadDepartmentNames } from './department-state-manager/departmentname.actions';
import { DepartmentNamesState } from './department-state-manager/departmentname.reducer';
import { selectFinalMonthlyReports } from './department-state-manager/departmentname.selector';
import { loadDepartmentUserNames } from './external-report-department-username-state-manager/external-report-department-username.actions';
import { selectFinalExternalMonthyReports } from './external-report-department-username-state-manager/external-report-department-username.selector';
import { loadExternalReports } from './external-reports-state-manager/external-report.actions';
import { selectAllExternalReports } from './external-reports-state-manager/external-report.selectors';
import { loadMonthlyReports } from './monthly-reports-state-manager/monthly-reports.actions';
import { MonthlyReportsState } from './monthly-reports-state-manager/monthly-reports.reducer';
import { selectAllMonthlyReports, selectMonthlyReportsLoading, selectMonthlyReportsError } from './monthly-reports-state-manager/monthly-reports.selectors';
import { UserState } from './user-list-state-manager/userlist.reducer';
import { selectUserList, selectUserLoading, selectUserError } from './user-list-state-manager/userlist.selector';
import { loadUserNames } from './user-name-state-manager/userName.actions';
import { UserNameState } from './user-name-state-manager/userName.reducer';
import { selectUserName, selectUserNameLoading, selectedUserNameError, selectFinalDailyReports } from './user-name-state-manager/userName.selector';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  @ViewChild('paginatorDaily', { static: true }) paginatorDailyReports: MatPaginator;
  @ViewChild('sortDaily', { static: true }) sortDailyReports: MatSort;
  @ViewChild('paginatorMonthly', { static: true }) paginatorMonthlyReports: MatPaginator;
  @ViewChild('sortMonthly', { static: true }) sortMonthlyReports: MatSort;
  @ViewChild('paginatorExternal', { static: true }) paginatorExternalMonthlyReports: MatPaginator;
  @ViewChild('sortExternal', { static: true }) sortExternalMonthlyReports: MatSort;

  // Daily Reports
  dailyReportsArray$: Observable<any[]>;
  loadingReports$: Observable<boolean>;
  errorReports$: Observable<any>;

  // Monthly Reports
  monthlyReportsArray$: Observable<any[]>;
  loadingMonthlyReports$: Observable<boolean>;
  errorMonthlyReports$: Observable<any>;

  // User List
  userListArray$: Observable<any[]>;
  loadingUserList$: Observable<boolean>;
  errorUserList$: Observable<any>;

  // User Names
  userNamesArray$: Observable<any[]>;
  loadingUserNames$: Observable<boolean>;
  errorUserNames$: Observable<any>;
  finalDailyReports$: Observable<any[]>;

  finalDailyReportsArray: any[] = [];
  finalMonthlyReportsArray: any[] = [];
  finalExternalMonthlyReportsArray: any[] = [];

  // External Monthly Reports
  externalMonthlyReportsArray$: Observable<any[]>;
  loadingExternalMonthlyReports$: Observable<boolean>;
  errorExternalMonthlyReports$: Observable<any[]>;
  finalExternalMonthlyReports$: Observable<any[]>;

  // Department Names
  departmentListArray$: Observable<any[]>;
  loadingDepartmentListArray$: Observable<boolean>;
  errorDepartmentListArray$: Observable<any[]>;
  finalMonthlyReports$: Observable<any[]>;

  // Date
  currentDate: string;

  // Table Columns
  displayedColumnsDaily: string[] = [
    'documentNumber',
    'letterType',
    'from',
    'subject',
    'timeStamp',
  ];
  displayedColumnsMonthly: string[] = [
    'documentNumber',
    'letterType',
    'from',
    'subject',
    'timestamp'
  ];
  displayedColumnsExternal:string[] = [
    'documentNumber',
    'letterType',
    'from',
    'subject',
    'timestamp'
  ]
  dataSourceDailyReports: MatTableDataSource<any>;
  dataSourceMonthlyReports: MatTableDataSource<any>;
  dataSourceExternalMonthlyReports: MatTableDataSource<any>;


  // Month Year Editor
  selectedMonth: string;
  selectedYear: number;
  selectedMonthExternal: string;
  selectedYearExternal: number;
  selectedDate: Date = new Date();
  months = [
    { value: '01', viewValue: 'January' },
    { value: '02', viewValue: 'February' },
    { value: '03', viewValue: 'March' },
    { value: '04', viewValue: 'April' },
    { value: '05', viewValue: 'May' },
    { value: '06', viewValue: 'June' },
    { value: '07', viewValue: 'July' },
    { value: '08', viewValue: 'August' },
    { value: '09', viewValue: 'September' },
    { value: '10', viewValue: 'October' },
    { value: '11', viewValue: 'November' },
    { value: '12', viewValue: 'December' },
  ];
  years: number[] = [];

  constructor(
    private store: Store<{
      dailyReport: DailyReportState;
      userList: UserState;
      userNames: UserNameState;
      monthlyReports: MonthlyReportsState;

      departmentList: DepartmentState;
      departmentName: DepartmentNamesState;
    }>
  ) {
    this.dailyReportsArray$ = this.store.pipe(select(selectAllReports));
    this.loadingReports$ = this.store.pipe(select(selectReportsLoading));
    this.errorReports$ = this.store.pipe(select(selectReportsError));

    this.userListArray$ = this.store.pipe(select(selectUserList));
    this.loadingUserList$ = this.store.pipe(select(selectUserLoading));
    this.errorUserList$ = this.store.pipe(select(selectUserError));

    this.userNamesArray$ = this.store.pipe(select(selectUserName));
    this.loadingUserNames$ = this.store.pipe(select(selectUserNameLoading));
    this.errorUserNames$ = this.store.pipe(select(selectedUserNameError));
    this.finalDailyReports$ = this.store.pipe(select(selectFinalDailyReports));

    this.externalMonthlyReportsArray$ = this.store.pipe(select(selectAllExternalReports));
    this.finalExternalMonthlyReports$ = this.store.pipe(select(selectFinalExternalMonthyReports));

    this.monthlyReportsArray$ = this.store.pipe(
      select(selectAllMonthlyReports)
    );
    this.loadingMonthlyReports$ = this.store.pipe(
      select(selectMonthlyReportsLoading)
    );
    this.errorMonthlyReports$ = this.store.pipe(
      select(selectMonthlyReportsError)
    );



    this.departmentListArray$ = this.store.pipe(select(selectDepartmentList));
    this.loadingDepartmentListArray$ = this.store.pipe(
      select(selectDepartmentLoading)
    );
    this.errorDepartmentListArray$ = this.store.pipe(
      select(selectDepartmentError)
    );
    this.finalMonthlyReports$ = this.store.pipe(
      select(selectFinalMonthlyReports)
    );

    // Initialize years for dropdown
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i);
    }
  }

  ngOnInit(): void {
    this.formattedDate();
    this.selectedDate = new Date();
    const currentDate = new Date();
    this.selectedMonth = (currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0'); // Months are 0-based, so add 1 and pad with zero if necessary
    this.selectedYear = currentDate.getFullYear();
    this.selectedMonthExternal = (currentDate.getMonth() + 1)
    .toString()
    .padStart(2, '0');
    this.selectedYearExternal = currentDate.getFullYear();
    this.loadReports();
  }

  formattedDate() {
    const currentDate = new Date();
    this.currentDate = formatDateToYYYYMMDD(currentDate);
  }

  loadReports() {
    const formattedDate = this.formatDate(this.selectedDate);
    this.loadMonthlyReports(this.selectedMonth, this.selectedYear.toString());
    this.loadDailyReports(formattedDate);
    this.loadDepartmentList();
    this.loadExternalMonthlyReports(this.selectedMonthExternal, this.selectedYearExternal);
  }

  updateReports() {
    this.loadReports();
  }


  loadDailyReports(date: string) {
    this.store.dispatch(loadDailyReports({ date }));
    this.loadUserList();
    this.loadUserNamesList();
  }

  loadMonthlyReports(month: string, year: string) {
    this.store.dispatch(loadMonthlyReports({ month, year }));
    this.loadDepartmentList();
    this.loadDepartmentNamesList();
  }

  loadUserList() {
    this.store.dispatch(loadUserList());
  }

  loadDepartmentList() {
    this.store.dispatch(loadDepartmentList());
  }

  loadUserNamesList() {
    this.dailyReportsArray$.subscribe((dailyReportsArray) => {
      this.finalDailyReportsArray = dailyReportsArray;
      this.store.dispatch(
        loadUserNames({ dailyReportsArray: this.finalDailyReportsArray })
      );
    });

    this.finalDailyReports$.subscribe((finalDailyReports) => {
      this.finalDailyReportsArray = finalDailyReports;
      this.dataSourceDailyReports = new MatTableDataSource(
        this.finalDailyReportsArray
      );
      this.dataSourceDailyReports.sort = this.sortDailyReports;
      this.dataSourceDailyReports.paginator = this.paginatorDailyReports;
    });
  }

  loadDepartmentNamesList() {
    this.monthlyReportsArray$.subscribe((monthlyReportsArray) => {
      this.finalMonthlyReportsArray = monthlyReportsArray;
      this.store.dispatch(
        loadDepartmentNames({
          monthlyReportsArray: this.finalMonthlyReportsArray,
        })
      );
    });

    this.finalMonthlyReports$.subscribe((finalMonthlyReports) => {
      this.finalMonthlyReportsArray = finalMonthlyReports;
      this.dataSourceMonthlyReports = new MatTableDataSource(
        this.finalMonthlyReportsArray
      );
      this.dataSourceMonthlyReports.sort = this.sortMonthlyReports;
      this.dataSourceMonthlyReports.paginator = this.paginatorMonthlyReports;
    });
  }

  loadExternalMonthlyReports(month: string, year: number) {
    this.store.dispatch(loadExternalReports({ month, year }));
    this.loadDepartmentUserNames();
  }

  loadDepartmentUserNames() {
    this.externalMonthlyReportsArray$.subscribe((externalMonthlyReportsArray) => {
      this.finalExternalMonthlyReportsArray = externalMonthlyReportsArray;
      this.store.dispatch(
        loadDepartmentUserNames({
          externalMonthlyReportsArray: this.finalExternalMonthlyReportsArray,
        })
      );
      // ////console.log('External Reports:', externalMonthlyReportsArray)
    });

    this.finalExternalMonthlyReports$.subscribe((finalExternalMonthlyReports) => {
      this.finalExternalMonthlyReportsArray = finalExternalMonthlyReports;
      this.dataSourceExternalMonthlyReports = new MatTableDataSource(
        this.finalExternalMonthlyReportsArray
      );
      //console.log("External Reports",this.dataSourceExternalMonthlyReports);
      this.dataSourceExternalMonthlyReports.sort = this.sortExternalMonthlyReports;
      this.dataSourceExternalMonthlyReports.paginator = this.paginatorExternalMonthlyReports;
    });
    // ////console.log('Final External Reports:', this.finalExternalMonthlyReportsArray)
  }


  applyFilterDailyReports(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDailyReports.filter = filterValue.trim().toLowerCase();
  }

  applyFilterMonthlyReports(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceMonthlyReports.filter = filterValue.trim().toLowerCase();
  }
  applyFilterExternalMonthlyReports(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceExternalMonthlyReports.filter = filterValue.trim().toLowerCase();
  }

  onMonthChange(month: string) {
    this.selectedMonth = month;
  }

  onYearChange(year: number) {
    this.selectedYear = year;
  }

  onMonthChangeExternal(month: string) {
    this.selectedMonthExternal = month;
  }

  onYearChangeExternal(year: number) {
    this.selectedYearExternal = year;
  }

  onDateChange(event: MatDatepickerInputEvent<Date | null>) {
    if (event.value) {
      this.selectedDate = event.value;
    }
  }

  onChangeDate() {
    this.loadReports();
  }

  // Method to check if there are Memos
  hasMemo(): boolean {
    return this.finalDailyReportsArray.some((report) => report.type === 1);
  }

  // Method to check if there are letters
  hasLetters(): boolean {
    return this.finalDailyReportsArray.some((report) => report.type === 2);
  }

  hasSpecialOrder(): boolean {
    return this.finalDailyReportsArray.some((report) => report.type === 3);
  }

  hasPresidentsMemo(): boolean {
    return this.finalDailyReportsArray.some((report) => report.type === 4);
  }

  hasOtherMemo(): boolean {
    return this.finalDailyReportsArray.some((report) => report.type === 5);
  }

  // Method to count Memos
  countMemo(): number {
    return this.finalDailyReportsArray.filter((report) => report.type === 1)
      .length;
  }

  // Method to count letters
  countLetters(): number {
    return this.finalDailyReportsArray.filter((report) => report.type === 2)
      .length;
  }

  // Method to count Special Order
  countSpecialOrder(): number {
    return this.finalDailyReportsArray.filter((report) => report.type === 3)
      .length;
  }

  // Method to count Presidents Memo
  countPresidentsMemo(): number {
    return this.finalDailyReportsArray.filter((report) => report.type === 4)
      .length;
  }

  // Method to count Other Memo
  countOtherMemo(): number {
    return this.finalDailyReportsArray.filter((report) => report.type === 5)
      .length;
  }

  

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
