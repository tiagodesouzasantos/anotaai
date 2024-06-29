import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ds-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
   providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputTextComponent),
    multi: true
  }]
})
export class InputTextComponent implements ControlValueAccessor{
  @Input() icon: string;
  @Input() iconPosition: 'left'|'right' = 'right';
  @Input() size: 'sm'|'md'|'lg' = 'md';
  @Input() id: string;

  public value: string = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onInput(value: string) {
    this.value = value;
    this.onChange(value);
    this.onTouch();
  }

}
