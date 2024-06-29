import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  styleUrls: ['./tag.component.scss'],
  template: `
    <span class="tag weight--bold" [ngClass]="'tag__'+color">{{label}}</span>
  `
})
export class TagComponent{
  @Input() label: string;
  @Input() color: string;
}
