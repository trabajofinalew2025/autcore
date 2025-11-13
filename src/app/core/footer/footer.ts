


/* import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  year = new Date().getFullYear();
}
 */




import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  year = new Date().getFullYear();
}