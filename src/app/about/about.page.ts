import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { Branch } from "@services/branches/branch.model";
import { BranchesService } from "@services/branches/branches.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { OnDestroy } from "@angular/core";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  branches$: Observable<Branch[]>;
  defaultImage: string;
  subscription: Subscription;
  constructor(private branchesService: BranchesService, private router: Router,public loadingController: LoadingController) { }
 
  ngOnInit() {
    this.defaultImage = '/assets/img/info_branch.jpg';
    this.loadBranches();
  }
  async loadBranches() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
    this.branches$ = this.branchesService.getBranches();
    this.branches$.subscribe(res => {
      loading.dismiss();
    });  
  }

  getBranchDetail(branch) {
    this.router.navigate(['tabs/more/about', branch.id]);
  }
}
