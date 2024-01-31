/* eslint-disable no-useless-escape */
import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";
import { StorageService } from "src/app/services/storage/storage.service";
import { UsersService } from "src/app/services/users/users.service";
import { MessageComponent } from "../message/message.component";
import { IUser } from "src/app/models/user";

@Component({
  selector: "app-password-recovery",
  templateUrl: "./password-recovery.component.html",
  styleUrls: ["./password-recovery.component.scss"],
})
export class PasswordRecoveryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PasswordRecoveryComponent>,
    private snackbar: SnackbarService,
    private route: ActivatedRoute,
    public router: Router,
    public dialog: MatDialog,
    private storage: StorageService,
    private userService: UsersService,
    private authService: AuthService,

    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {}

  recovery_form = this.fb.group({
    password: [""],
    confirmed_password: [""],
    validate_code: [""],
    email: ["", Validators.required],
  });

  loading = false;
  view_pass = false;
  authClose = false;

  ngOnInit(): void {
    this.recovery_form.patchValue({ email: this.data.email });
    // this.awaitRemember();
  }

  async emailRecoverySubmitHandler() {
    if (this.recovery_form.invalid) return;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/i;
    const numberCPF = this.recovery_form.value.email?.replace(/\D/g, "");
    if (
      numberCPF?.length !== 11 &&
      !emailRegex.test(this.recovery_form.value.email || "")
    ) {
      this.recovery_form.get("email")?.setErrors({ cpf: true });
      return;
    }

    this.loading = true;

    const email: string = this.recovery_form.value.email as string;
    // const password: string = this.recovery_form.value.password as string;
    // const token = "7c73402079ef7964eda17bf0bd0b367cc057d789";

    await this.userService.resetPass(email).subscribe({
      next: () => {
        this.loading = false;
        this.authClose = true;
        this.snackbar.success("E-mail de recuperação enviado!");
        this.close();
      },
      error: () => {
        this.snackbar.error("E-mail não encontrado!");
        this.authClose = false;
        this.loading = false;
      },
    });
  }

  close(action = false) {
    if (!this.authClose) {
      const dialogRef = this.dialog.open(MessageComponent, {
        ...MSG_CONFIG,
        disableClose: true,
        data: {
          title: "Deseja continuar?",
          description: "Se fechar você perderá todas as informações.",
          confirmText: "Fechar",
          cancellText: "Cancelar",
        },
      });

      dialogRef.afterClosed().subscribe({
        next: (value: any) => {
          if (value.action === "yes") {
            this.dialogRef.close(action);
          }
        },
      });
    } else {
      this.dialogRef.close(action);
    }
  }
}

export const MSG_CONFIG = {
  maxWidth: "600px",
  width: "100%",
};
