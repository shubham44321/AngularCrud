import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataSaved = false;
  employeeForm: any;
  allEmployees: Observable<Employee[]>;
  employeeIdUpdate = 0;
  message = "";
  constructor(private formbulider: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Role: ['', [Validators.required]],
    });
    this.loadAllEmployees();
  }
  loadAllEmployees() {
    console.log('page load');
    this.allEmployees = this.employeeService.getAllEmployeeDetails();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const employee = this.employeeForm.value;
    this.CreateEmployee(employee);
    this.employeeForm.reset();
  }
  loadEmployeeToEdit(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(employee => {
      this.message = "";
      this.dataSaved = false;
      this.employeeIdUpdate = employee.Id;
      this.employeeForm.controls['Name'].setValue(employee.Name);
      this.employeeForm.controls['Role'].setValue(employee.Role);
    });
  }
  CreateEmployee(employee: Employee) {
    if (this.employeeIdUpdate == 0) {
      this.employeeService.createEmployee(employee).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Successfully';
          this.loadAllEmployees();
          this.employeeIdUpdate = 0;
          this.employeeForm.reset();
        }
      );
    } else {
      employee.Id = this.employeeIdUpdate;
      this.employeeService.editEmployee(employee).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.loadAllEmployees();
        this.employeeIdUpdate = 0;
        this.employeeForm.reset();
      });
    }
  }
  deleteEmployee(id: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.employeeService.deleteEmployeeById(id).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Deleted Succefully';
        this.loadAllEmployees();
        this.employeeIdUpdate = 0;
        this.employeeForm.reset();
      });
    }
  }
  resetForm() {
    this.employeeForm.reset();
    this.message = "";
    this.dataSaved = false;
  }
}
