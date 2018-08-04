export type optionType = 0 | 1 | undefined;

export class OptionHelper {
  private value: optionType = undefined;

  constructor(private name: string) { }

  public set option(value: optionType) {
    this.value = value;
  }

  public get option() {
    return this.value;
  }

  public buildQueryParam(builder: any) {
    if (this.value !== undefined) {
      builder[this.name](this.value);
    }
  }
}
