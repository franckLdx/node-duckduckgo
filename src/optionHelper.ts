export type optionType = 0|1|undefined;

export class OptionHelper {
  private value: optionType = undefined;

  constructor(private name: string) {

  }

  set option(value: optionType) {
    this.value = value;
  }

  get option() {
    return this.value;
  }

  buildQueryParam(builder: any) {
    if (this.value !== undefined) {
      builder[this.name](this.value);
    }
  }
}
