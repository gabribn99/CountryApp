import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  placeholder = input<string>('Buscar');
  debounceTime = input(1000)
  initialValue = input<string>()

  value = output<string>();

  inputValue = linkedSignal(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeOut = setTimeout(() => {
      this.value.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeOut);
    })
  })
}
