import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { IAlarmResults } from "src/app/models/alarms";
import { AlarmsService } from "src/app/services/alarms/alarms.service";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";

export const CONFIG = {
  maxWidth: "900px",
  width: "100%"
};

@Component({
  selector: "app-alarm-config-edit",
  templateUrl: "./alarm-config-edit.component.html",
  styleUrls: ["./alarm-config-edit.component.scss"]
})
export class AlarmConfigEditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private alarmService: AlarmsService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  loading = false;
  alarms: any = [];

  edit_form = this.fb.group({
    id: [0],
    priority: [""],
    name: [""],
    min: [0],
    max: [0],
    equipment: [0],
    param: [0]
  });

  ngOnInit(): void {
    this.alarms = this.data.alarm_obj;
    this.edit_form.patchValue(this.data.alarm_obj);
    this.getParams(this.alarms);
  }

  getParams(form: IAlarmResults) {
    this.alarmService.getParamsByEquipment(form.equipment.id);
    console.log(form.equipment.id);
  }

  editAlarm() {
    this.loading = true;
    const editAlarm: any = this.edit_form.value;
    this.alarmService.patchAlarm(editAlarm).subscribe({
      next: (value) => {
        this.loading = false;
        this.snackbar.success("Parâmetros do alarme alterados com sucesso!");
        this.dialog.closeAll();
        window.location.reload();
        this.getParams(this.alarms);
      },
      error: (err) => {
        console.error(err);
        this.snackbar.error("Ocorreu algum erro, tente novamente");
      }
    });
  }
}
