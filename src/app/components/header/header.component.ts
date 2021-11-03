import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() isAuthorized: boolean;
  @Output() signout = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSignOut(): void {
    this.signout.emit();
  }

}
