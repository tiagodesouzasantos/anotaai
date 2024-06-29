import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() img: string;
  @Input() tag: string;
  @Input() tagColor: string;
  @Input() showDelete: boolean = true;
  @Output() $deleteCard:EventEmitter<null> = new EventEmitter();
  
  public onDeleteCard(){
    this.$deleteCard.next(null);
  }
}
