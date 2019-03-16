export class OptionHelper<OptionType> {
  constructor(private name: string, private value?: OptionType) { }

  public set option(value: OptionType) {
    this.value = value;
  }

  public get option(): OptionType {
    return this.value;
  }

  public buildQueryParam(builder: any) {
    if (this.value !== undefined) {
      builder[this.name](this.value);
    }
  }
}

export type StdOptionValues = 0 | 1 | undefined;
export type SafeSearchValues = 1 | -1 | -2;
