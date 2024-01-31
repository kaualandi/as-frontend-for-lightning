import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IDialogActions, IDialogData } from "src/app/models/models";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"]
})
export class MessageComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) {}

  title = "";
  description = "";
  confirmText = "Fechar";
  cancellText = "Deletar";

  ngOnInit(): void {
    this.title = this.data?.title || "";
    this.description = this.data?.description || "";
    this.confirmText = this.data?.confirmText || "";
    this.cancellText = this.data?.cancellText || "";
  }

  chance(chance: "yes" | "no"): void {
    this.dialogRef.close({ action: chance });
  }
}
