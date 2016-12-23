export type allowedOptionValue = 0|1|undefined;

export class OptionHelper {
  private value: allowedOptionValue = undefined;

  constructor(private name: string) {

  }

  set option(value: allowedOptionValue) {
    this.value = value;
  }

  buildQueryParam(builder: any) {
    if (this.value !== undefined) {
      builder[this.name](this.value);
    }
  }
}
