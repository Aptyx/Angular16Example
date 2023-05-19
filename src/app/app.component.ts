import { Component, ViewChild, ElementRef } from '@angular/core';
declare var CrComLib: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular16App';

    // Find our button in the HMTL rendered view and create a local reference.
    @ViewChild('myButton') myButton!: ElementRef;

    // Tasks to perform when our app (component) loads
    ngAfterViewInit() {
      // Obtain the feedback Join number that was set as an HTML Attribute
      let fbJoin = this.myButton.nativeElement.getAttribute('fbJoin');
      // On initialisation get the current state of the button from the Control System.
      this.btnFb(CrComLib.getState('b', String(fbJoin)));
      // Subscribe for future changes to the button state.
      CrComLib.subscribeState('b', String(fbJoin), (v: any) => { this.btnFb(v); } );
    }
  
    // Digital press function
    btnPress(join: any) {
      CrComLib.publishEvent('b', String(join), true);
      CrComLib.publishEvent('b', String(join), false);
    }
  
    // Digital feedback function.
    btnFb(fb:boolean) {
      let button = this.myButton.nativeElement;
      if(fb){
        if(!button.classList.contains('active')){
          button.classList.add('active');
        }
      }
      else{
        if(button.classList.contains('active')){
          button.classList.remove('active');
        }
      }
    }
}
