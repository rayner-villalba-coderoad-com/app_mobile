import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { Area } from "@services/areas/area.model";
import { AreasService } from "@services/areas/areas.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { OnDestroy } from "@angular/core";

@Component({
  selector: 'app-areas',
  templateUrl: './areas.page.html',
  styleUrls: ['./areas.page.scss'],
})
export class AreasPage implements OnInit {
  areas$: Observable<Area[]>;
  subscription: Subscription;
  
  constructor(private areasService: AreasService, private router: Router, public loadingController: LoadingController) { }

  ngOnInit() {
    this.loadAreas();
  }

  async loadAreas() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.areas$ = this.areasService.getAreas();
    this.subscription = this.areas$.subscribe(res => {
      loading.dismiss();
    });  
  }

  getAreaDetail(area) {
    this.router.navigate(['tabs/more/areas', area.id]);
  }
}
