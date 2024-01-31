import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { interval, map } from "rxjs";
import { AuthService } from "src/app/services/auth/auth.service";
import { SystemSettingsService } from "src/app/services/system-settigns/system-settings.service";
import { LevelAccessService } from "../../services/global/level-access.service";
import { StorageService } from "./../../services/storage/storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  @ViewChild("navbar") navbar: ElementRef<HTMLElement> | undefined;

  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router,
    private systemSettingsService: SystemSettingsService,
    private levelAccessService: LevelAccessService
  ) {}

  @HostListener("document:fullscreenchange", ["$event"])
  onFullScreenChange(event: Event): void {
    this.isFullScreen = !!document.fullscreenElement;
  }

  loading = true;
  hidden = false;
  config = this.storage.mysetting;
  user = this.storage.myself;
  isFullScreen = false;

  now = interval(1000).pipe(
    map(() => {
      return new Date();
    })
  );

  ngOnInit(): void {
    this.getMe();
    this.getSettings();
    this.storage.watchUser().subscribe({
      next: () => {
        this.getMe();
      },
    });

    this.storage.watchNavbar().subscribe({
      next: (value?: boolean) => {
        if (typeof value === "boolean") {
          this.hidden = value;
          return;
        }
        this.hidden = !this.hidden;
        this.toggleFullScreen();
      },
    });

    this.router.events.subscribe({
      next: () => {
        if (!this.router.url.includes("/monitoring")) {
          this.storage.changeNavbar(false);
        }
      },
    });
  }

  toggleFullScreen(): void {
    if (!this.isFullScreen) {
      const docElm = document.documentElement as any;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }

  requestFullScreen(element: any) {
    // Supports most browsers and their versions.
    const requestMethod =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullScreen;

    if (requestMethod) {
      // Native full screen.
      requestMethod.call(element);
    }
    // else if (typeof window.ActiveXObject !== "undefined") {
    //   // Older IE.
    //   const wscript = new ActiveXObject("WScript.Shell");
    //   if (wscript !== null) {
    //     wscript.SendKeys("{F11}");
    //   }
    // }
  }

  logout() {
    this.storage.logout();
  }

  getMe() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.storage.myself = user;
        this.user = user;
      },
      error: (error) => {
        if (error?.status === 401) {
          this.storage.logout();
        }
      },
    });
  }

  getSettings() {
    this.systemSettingsService.getSettings().subscribe({
      next: (data) => {
        this.config = data;
        this.storage.mysetting = data;
        this.loading = false;
      },
    });
  }

  checkAccess(path: string) {
    return this.levelAccessService.checkLevelAccess(path).includes("read");
  }
}
