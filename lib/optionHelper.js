"use strict";
class OptionHelper {
    constructor(name) {
        this.name = name;
        this.value = undefined;
    }
    set option(value) {
        this.value = value;
    }
    get option() {
        return this.value;
    }
    buildQueryParam(builder) {
        if (this.value !== undefined) {
            builder[this.name](this.value);
        }
    }
}
exports.OptionHelper = OptionHelper;

//# sourceMappingURL=optionHelper.js.map
