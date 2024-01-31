import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PatientDisplayComponent } from "./patient-display.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // Import BrowserAnimationsModule if using animations
import { MatAutocompleteModule } from "@angular/material/autocomplete"; // Import MatAutocompleteModule if using autocomplete

describe("PatientDisplayComponent", () => {
  let component: PatientDisplayComponent;
  let fixture: ComponentFixture<PatientDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientDisplayComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSortModule,
        MatTableModule,
        MatInputModule,
        BrowserAnimationsModule, // Import BrowserAnimationsModule
        MatAutocompleteModule, // Import MatAutocompleteModule
      ],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid form initially", () => {
    expect(component.patientData_form.valid).toBeTruthy();
  });

  it("should display the patient name in the template", () => {
    const patientName = "John Doe";
    component.patient_filter = { name: patientName };

    fixture.detectChanges();

    const patientNameElement = fixture.nativeElement.querySelector(".patient");
    expect(patientNameElement.textContent).toContain(patientName);
  });

  it("should update the form control values when patient data changes", () => {
    const patientData = {
      name: "Jane Smith",
      bed: "101",
      age: 30,
    };
    component.patient_filter = patientData;

    fixture.detectChanges();

    expect(component.patientData_form.get("name").value).toEqual(
      patientData.name
    );
    expect(component.patientData_form.get("bed").value).toEqual(
      patientData.bed
    );
    expect(component.patientData_form.get("age").value).toEqual(
      patientData.age
    );
  });

  it("should filter departments based on user input", () => {
    const departments = [
      { id: 1, name: "Department A" },
      { id: 2, name: "Department B" },
      { id: 3, name: "Department C" },
    ];
    component.options = departments;

    const departmentInput = component.patientData_form.get("department");
    departmentInput.setValue("A"); // Simulate user input 'A'

    fixture.detectChanges();

    const departmentOptions =
      fixture.nativeElement.querySelectorAll(".mat-option-text");
    expect(departmentOptions.length).toBe(1); // Only 'Department A' should be displayed
  });

  it("should update the table data when historical data changes", () => {
    const historicalData = [
      {
        department: "Department X",
        bed: "102",
        patient: "Alice",
        alarm: "High Blood Pressure",
        priority: "High",
        type: "Alert",
        occurrence_date: new Date("2023-09-18T10:00:00"),
      },
    ];
    component.dataSource.data = historicalData;

    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll("tr.mat-row");
    expect(tableRows.length).toBe(1); // One row should be displayed
  });

  // Add more test cases for your component's behavior as needed
});
