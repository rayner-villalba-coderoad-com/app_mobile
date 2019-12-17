import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, LoadingController } from '@ionic/angular';
import { ProfileService } from "@services/profile/profile.service";
import { Profile } from "@services/profile/profile.model";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  imageURL: string;
  profileForm: FormGroup;
  networks: any[];
  profile: Profile;
  myPhoto: string;

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private profileService:ProfileService,
    private formBuilder: FormBuilder,
    private camera: Camera) { }

  ngOnInit() {
    this.networks = [
      {value: 'rp10+', label: 'RP10+'}, 
      {value: 'rp15+', label: 'RP15+'}, 
      {value: 'rp18+', label: 'RP18+'}, 
      {value: 'rp26+', label: 'RP26+'}, 
      {value: 'rpm', label: 'RPM'},
      {value: 'rp65+', label: 'RP65+'}]
    this.myPhoto = '/assets/img/profle.png';
    this.profileForm = this.formBuilder.group({
      'name':  [null, Validators.compose([
        Validators.required])],
      'phone': [null, Validators.compose([])], 
      'email': [null, Validators.compose([Validators.email])],
      'age': [null, Validators.compose([])],       
      'network': [null, Validators.compose([])],       
    });
    this.loadProfile();
  }

  getAvatar() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
    };

    this.camera.getPicture(options).then(imageData => {
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;      
    }, error => {
      console.log(error);
    })
  }

  async loadProfile() {
    this.profile = await this.profileService.getProfile();  
    if (this.profile !== null) {
      const {name, phone, age, email, network, photoPath} = this.profile;
      this.myPhoto = photoPath;
      this.profileForm.setValue({
        name: name,
        phone: phone,
        age: age,
        email: email,
        network: network
      });
    } 
  }

  async saveProfile(profileForm: FormGroup) {
    const profile = profileForm.value;
    const loading = await this.loadingCtrl.create(
      {message: 'Guardando...'}
    );
    await loading.present();
    try {
      if (this.profile && this.profile.id) {
        await this.profileService.updateProfile(profile, this.profile.id, this.myPhoto);
      } else {
        await this.profileService.addProfile(profile, this.myPhoto);
      }
      
      loading.dismiss().then(() => {
        this.loadProfile();
        this.displayMessage('Tus datos han sido registrado correctamente!', 'primary');
      });
    } catch(error) {
      loading.dismiss().then(() => {
        this.displayMessage('No se han guardado tus datos!', 'danger');
      });
    }
  }

  async displayMessage(message, color) {
    const validationToast = await this.toastCtrl.create({
      showCloseButton: true,
      color: color,
      closeButtonText: 'Cerrar',
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    validationToast.present();
  }
}
