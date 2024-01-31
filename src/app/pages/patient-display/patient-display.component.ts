/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Location } from "@angular/common";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { Observable, map, startWith } from "rxjs";
import { IAlarmResults } from "src/app/models/alarms";
import { IBed } from "src/app/models/beds";
import { IDepartmentData } from "src/app/models/department";
import { IHistoric } from "src/app/models/historic";
import { IMonitoring } from "src/app/models/monitoring";
import { AlarmsService } from "src/app/services/alarms/alarms.service";
import { BedsService } from "src/app/services/beds/beds.service";
import { DepartmentService } from "src/app/services/department/department.service";
import { HistoricsService } from "src/app/services/historics/historics.service";
import { ConfigMonitoringChannelService } from "src/app/services/monitoring/config-monitoring-channel.service";
import { MonitoringService } from "src/app/services/monitoring/monitoring.service";
import { PatientsService } from "src/app/services/patients/patients.service";
import {
  IPatientData,
  IPatientDisplay,
  PatientData,
} from "./../../models/patients";
import { StorageService } from "src/app/services/storage/storage.service";
import { LevelAccessService } from "src/app/services/global/level-access.service";

@Component({
  selector: "app-patient-display",
  templateUrl: "./patient-display.component.html",
  styleUrls: ["./patient-display.component.scss"],
})
export class PatientDisplayComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private patientServise: PatientsService,
    private historicsService: HistoricsService,
    private bedsService: BedsService,
    private departmentService: DepartmentService,
    private monitoringService: MonitoringService,
    private alarmsService: AlarmsService,
    private location: Location,
    private configMC: ConfigMonitoringChannelService,
    public storage: StorageService,
    private levelAccessService: LevelAccessService
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
        setTimeout(() => {
          this.monitoring_id = Number(
            this.route.snapshot.paramMap.get("id") || 0
          );
          // this.getBedsById(true);
        }, 100);
      }
    });
  }

  levelAccess = this.levelAccessService.checkLevelAccess(
    this.router.url.split("/")[1]
  );

  monitoring_id: any = -1;
  monitoring: IMonitoring = { id: -1 } as IMonitoring;

  patientData_form = this.fb.group({
    id: [{ value: "", disabled: true }],
    is_active: [
      { value: new FormControl<boolean | null>(null), disbled: true },
    ],
    name: [{ value: "", disabled: true }],
    birth_date: [{ value: "", disabled: true }],
    age: [{ value: "", disabled: true }],
    blood_type: [{ value: "", disabled: true }],
    gender: [{ value: "", disabled: true }],
    bed: [{ value: "", disabled: true }],
    doctor_name: [{ value: "", disabled: true }],
    admission_date: [{ value: "", disabled: true }],
    type: [{ value: "", disabled: true }],
    height: [{ value: "", disabled: true }],
    weight: [{ value: "", disabled: true }],
    cpf: [{ value: "", disabled: true }],
    created_by_obj: [{ value: "", disabled: true }],
    created_by: [{ value: "", disabled: true }],
    created_at: [{ value: "", disabled: true }],
    department: new FormControl<IDepartmentData | string>(""),
  });

  alarms_forms = this.fb.group({
    department: new FormControl<IDepartmentData | string>(""),
    bed: [""],
    alarm: [""],
    priority: [""],
    type: [""],
    occurrence_date: new FormControl<null | null>(null),
  });

  search_form = this.fb.group({
    department: new FormControl<IDepartmentData | string>(""),
    bed: [""],
    alarm: [""],
    priority: [""],
    type: [""],
    occurrence_date: new FormControl<Date | null>(null),
  });

  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(Object) teste = Object();

  displayedColumns: string[] = [
    "department",
    "bed",
    "patient",
    "alarm",
    "priority",
    "type",
    "occurrence_date",
    "occurrence_end",
  ];

  // #region variables
  displayedAlarmColumns: string[] = ["alarm"];

  dataSource = new MatTableDataSource<IHistoric>([]);
  dataBackup: IHistoric[] = [];
  handleAlarmClass = this.alarmsService.handleAlarmClass;

  dataAlarmSource = new MatTableDataSource<IAlarmResults>([]);
  dataAlarmBackup: IAlarmResults[] = [];
  monitorings: IMonitoring[] = [];

  options: IDepartmentData[] = [];
  filteredDepartmentOptions: Observable<IDepartmentData[]> | undefined;

  patient_filter: IPatientDisplay = new PatientData();

  _filtered_patient: IPatientData | any = new PatientData();

  beds: IMonitoring[] = [];
  first_get = true;

  _bed: IBed = {} as IBed;

  age: number | undefined;
  page = 1;

  // Pagination
  total_page = 1;
  current_page = 1;
  count_page = 1;
  prev = false;
  next = false;

  loading = true;

  is_list_visible_beds = true;

  linkWebSocket = `ws://54.207.148.13/wave_simulator/`;
  socket = new WebSocket(this.linkWebSocket);
  res_socket: any;
  // #endregion

  ngOnInit(): void {
    // this.storage.getPermitions(this.router.url.split("/")[1]);

    this.monitoring_id = Number(this.route.snapshot.paramMap.get("id") || 0);
    this.socket.addEventListener("message", (event: MessageEvent) => {
      this.res_socket = JSON.parse(event.data);
      this.configMC.changeSocket(this.res_socket);
    });
    this.getExibitionData(this.monitoring_id);
    this.getMonitorings();
    this.getAlarms(1);
    this.getHistorics(1);

    this.route.queryParams.subscribe({
      next: (value) => {
        this.search_form.patchValue({
          ...value,
          occurrence_date:
            value["occurrence_date"] && new Date(`${value["occurrence_date"]}`),
        });
      },
    });
  }

  getMonitorings() {
    this.monitoringService.getMonitoringsAll().subscribe(
      (data: any) => {
        // console.log(data);

        const bed_filter: any = data.filter(
          (b: any) => this.patient_filter.id === b.patient.id
        );
        // console.log(bed_filter);

        // Tratamento da lista de monitores
        const array: IMonitoring[] =
          this.configMC.changeMonitorStatusToOffline(bed_filter, 0) || [];
        // console.log(array);

        this.monitorings = data.filter(
          (b: any) => this.patient_filter.id === b.patient.id
        );

        // console.log(this.monitorings);

        //  Cria o typeView na lista inicializando como false.
        if (!this.first_get) {
          this.monitorings = this.monitorings.map((el: any) => {
            el.typeView = false;
            return el;
          });

          this.first_get = false;
        }

        // Atualizar os itens da lista Alterados
        this.monitorings = array;

        // Salva no projeto a lista.
        this.monitoringService.setMonitoring(this.monitorings);
        this.monitoringService.changeMonitoring();

        setTimeout(() => {
          this.loading = false;
        }, 250);
      },
      () => {
        this.loading = false;
      }
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(deparment: IDepartmentData): string {
    return deparment && deparment.name ? deparment.name : "";
  }

  backOrNextPage(event: any) {
    this.loading = true;
    this.current_page = event;
    this.getHistorics(this.current_page);
  }

  filterListener() {
    const value = this.search_form.value;
    const keys = Object.keys(value);
    keys.forEach((key) => {
      if (!value[key as keyof typeof value]) {
        delete value[key as keyof typeof value];
      }
    });
    this.router.navigate([`/patient-display/${this.monitoring_id}`], {
      queryParams: {
        ...value,
        department: this.getDepartmentValue(), // ? Para o caso de ser um objeto, pegar apenas o id, se não, enviar o valor que já está no campo - Kauã Landi
        occurrence_date:
          value.occurrence_date &&
          new Date(value.occurrence_date)?.toISOString().split("T")[0],
      },
    });
  }

  getAlarms(page: number) {
    if (this.patient_filter.bed?.name) {
      this.alarmsService
        .getAlarms(page, this.patient_filter.bed?.beds as any)
        .subscribe({
          next: (value) => {
            const _alarms = value.results.filter(
              (al: any) =>
                !this.patient_filter.id &&
                this.patient_filter.id === al.patient.id
            );
            this.dataAlarmSource = new MatTableDataSource<IAlarmResults>(
              _alarms
            );
            this.dataAlarmBackup = _alarms;
            this.page = page;
          },
        });
    }
  }

  getHistorics(page: number) {
    const filters = {
      priority: this.search_form.value.priority || "",
      bed: this.search_form.value.bed || "",
      alarm: this.search_form.value.alarm || "",
      department:
        typeof this.search_form.value.department === "object"
          ? this.search_form.value.department?.id + "" || ""
          : "",
      type: this.search_form.value.type || "",
      occurrence_date:
        this.search_form.value.occurrence_date instanceof Date
          ? this.search_form.value.occurrence_date.toISOString()
          : this.search_form.value.occurrence_date || "",
    };

    Object.keys(filters).forEach((key) => {
      if (!filters[key as keyof typeof filters]) {
        delete filters[key as keyof typeof filters];
      }
    });

    this.historicsService.getHistoric(page, filters).subscribe({
      next: (value) => {
        const data = value.results.filter((item) => {
          return item.patient && item.patient.id === this.monitoring_id;
        });
        this.dataSource = new MatTableDataSource(data);
        this.current_page = page;
        this.next = value.next != null;
        this.prev = value.previous != null;
        this.count_page = Math.ceil(value.count / 10);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getExibitionData(id: number) {
    const _id: number = id;

    this.patientServise.getPatientById(_id).subscribe(
      (value: any) => {
        this.patient_filter = value;
        // console.log(this.patient_filter);
        this.getAlarms(this.page);
        this.getDepartments();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.fillFields(this.patient_filter!);
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  fillFields(value: IPatientDisplay) {
    this.patientData_form.patchValue(Object(this.patient_filter));
    if (value.admission_date) {
      const admition = String(
        this.patient_filter.admission_date.split("T")[0] +
          " " +
          this.patient_filter.admission_date.split("T")[1]
      );
      this.patientData_form.patchValue({
        admission_date: admition,
      });
    }
    if (value.bed) {
      this.patient_filter!.bed = value.bed;
      this.patientData_form.patchValue({ bed: value.bed.name });

      if (!value.bed.department_obj) return;

      const department_input = value.bed.department;
      if (department_input) {
        this.patient_filter!.sector = department_input.name;
      }
    }

    if (this.patient_filter!.id === 0) {
      this.patientData_form.patchValue({
        id: undefined,
      });
    }
    if (this.patient_filter!.birth_date) {
      this.age = this.patientServise.setPatientAge(
        this.patient_filter!.birth_date
      );
      this.patientData_form.patchValue({
        age: String(this.age),
      });
    }
  }

  eventComponent(event: any) {
    console.log(1);
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (value) => {
        this.options = value;
        this.filteredDepartmentOptions = this.patientData_form
          .get("department")
          ?.valueChanges.pipe(
            startWith(""),
            map((value) => {
              if (typeof value === "string") {
                return this._filter(value);
              } else {
                return this.options;
              }
            })
          );
      },
    });
  }

  getDepartmentsForTbale() {
    this.departmentService.getDepartments().subscribe({
      next: (value) => {
        this.options = value;

        this.filteredDepartmentOptions = this.search_form
          .get("department")
          ?.valueChanges.pipe(
            startWith(""),
            map((value) => {
              if (typeof value === "string") {
                return this._filter(value);
              } else {
                return this.options;
              }
            })
          );

        this.setDepartmentValue();
      },
    });
  }

  setDepartmentValue() {
    if (!this.options.length) return;

    const department_input = this.search_form.value.department;
    // ? Para o caso de vir um id de departamento na url, já setar o objeto inteiro no campo - Kauã Landi
    if (department_input && !isNaN(+department_input)) {
      const department = this.options.find(
        (el) => el.id === +department_input
      ) as IDepartmentData;

      this.search_form.patchValue(
        {
          department,
        },
        { emitEvent: false }
      );
    }
  }

  orderList(list: any[]) {
    return list.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  onClickNavigate(bed: IPatientDisplay) {
    if (bed.bed?.id) {
      this.router.navigate(["/monitoring/detail", bed.bed?.id]);
    }
  }

  getDepartmentValue() {
    const department = this.search_form.value.department;

    if (!department) return undefined;

    if (typeof department === "string") {
      return department;
    } else {
      return department?.id;
    }
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    console.log("");
    // this.patientService.getPatientInformation(1, 0);
  }

  back() {
    this.location.back();
  }
}
