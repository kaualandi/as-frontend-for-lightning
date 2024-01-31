import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth/auth.service";
import { StorageService } from "src/app/services/storage/storage.service";
import { HttpService } from "src/app/services/http/http.service";
import { HttpParams } from "@angular/common/http";
import { Md5 } from "md5-typescript";
import { IToken } from "src/app/models/user";
import { MessageComponent } from "../message/message.component";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";

export const MSG_CONFIG = {
  maxWidth: "600px",
  width: "100%",
};

@Component({
  selector: "app-operational-auth",
  templateUrl: "./operational-auth.component.html",
  styleUrls: ["./operational-auth.component.scss"],
})
export class OperationalAuthComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public storage: StorageService,
    private snackbar: SnackbarService,
    private authService: AuthService,
    public router: Router,
    private http: HttpService,
    private dialogRef: MatDialogRef<OperationalAuthComponent>
  ) {}

  loading = false;
  view_pass = false;

  login_form = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
    // remember: [false],
  });

  confirmed_token = "";

  ngOnInit(): void {
    this.awaitRemember();
    this.login_form.patchValue({ email: this.storage.myUser.email });
  }

  async loginSubmitHandler() {
    if (this.login_form.invalid) return;

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,4}$/i;
    const numberCPF = this.login_form.value.email?.replace(/\D/g, "");
    if (
      numberCPF?.length !== 11 &&
      !emailRegex.test(this.login_form.value.email || "")
    ) {
      this.login_form.get("email")?.setErrors({ cpf: true });
      return;
    }

    this.loading = true;

    const email: string = this.login_form.value.email as string;
    const password: string = this.login_form.value.password as string;

    await this.authService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        this.confirmed_token = response.token;
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log(error)
        this.loading = false;
      },
    });
  }

  awaitRemember() {
    this.login_form.get("remember")?.valueChanges.subscribe((value) => {
      if (!value) return;

      return value;
    });
  }

  getToken() {
    const body = new HttpParams()
      .set("username", "a@a.com")
      .set("password", Md5.init("a").toUpperCase());

    return this.http.post<IToken>("core/auth/", body).subscribe({
      next: (response) => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.log(error);
        console.error(error);
        this.loading = false;
      },
    });
  }

  close(action = false) {
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
  }
}
