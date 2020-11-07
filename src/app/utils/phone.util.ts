export class PhoneUtils {
    static PHONE_REGEX: RegExp = /^\(*([\d]{2})\)*\s*([\d]{4,5})-*([\d]{4})/;
  
    static format(value: string): string {
      const newValue = value && value.trim();
      if (!newValue) {
        return value;
      }
  
      return PhoneUtils.PHONE_REGEX.test(newValue) ? newValue.replace(PhoneUtils.PHONE_REGEX, '($1) $2-$3') : newValue;
    }
  
    static validate(value: string): boolean {
      return PhoneUtils.PHONE_REGEX.test(value);
    }
  }
  