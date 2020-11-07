import * as moment from 'moment';

moment.locale('pt-br');

export class MomentUtils {
  static DEFAULT_DATE_PATTERN = 'DD/MM/YYYY';
  static DEFAULT_TIME_PATTERN = 'HH:mm:ss';
  static DEFUALT_DATE_TIME_PATTERN = 'DD/MM/YYYY HH:mm:ss';
  static DEFUALT_TIME_PATTERN_OF: moment.unitOfTime.StartOf = 'day';

  static format(value: string | Date, pattern: string): string {
    if (value && typeof value === 'string') {
      return moment(String(value)).format(pattern);
    }

    return value ? moment(value).format(pattern) : String(value);
  }

  static formatDate(value: string | Date, pattern?: string): string {
    return MomentUtils.format(value, pattern || MomentUtils.DEFAULT_DATE_PATTERN);
  }

  static formatTime(value: string | Date, pattern?: string): string {
    return MomentUtils.format(value, pattern || MomentUtils.DEFAULT_TIME_PATTERN);
  }

  static formatDateTime(value: string | Date, pattern?: string): string {
    return MomentUtils.format(value, pattern || MomentUtils.DEFUALT_DATE_TIME_PATTERN);
  }

  static parse(value: string | Date, pattern: string): Date {
    if (value && typeof value === 'string') {
      return moment(String(value), pattern).toDate();
    }

    return value ? moment(value, pattern).toDate() : null;
  }

  static parseDate(value: string | Date, pattern?: string): Date {
    return MomentUtils.parse(value, pattern);
  }

  static parseTime(value: string | Date, pattern?: string): Date {
    return MomentUtils.parse(value, pattern || MomentUtils.DEFAULT_TIME_PATTERN);
  }

  static currentYear(): number {
    return moment().year();
  }

  static currentDateTime(): Date {
    return moment().toDate();
  }

  static currentDateTimeStartOf(pattern?: moment.unitOfTime.StartOf): Date {
    return moment()
      .startOf(pattern || MomentUtils.DEFUALT_TIME_PATTERN_OF)
      .toDate();
  }

  static currentDateTimeEndOf(pattern?: moment.unitOfTime.StartOf): Date {
    return moment()
      .endOf(pattern || MomentUtils.DEFUALT_TIME_PATTERN_OF)
      .toDate();
  }

  static isGreaterThanCurrentYear(value: number): boolean {
    return value > MomentUtils.currentYear();
  }

  static isPeriodGreaterThan(start: Date, end: Date, maxDays = 7): boolean {
    const difference = moment(end).diff(moment(start));
    const days = Math.floor(moment.duration(difference).asDays());

    return days > maxDays;
  }

  // tslint:disable-next-line: cognitive-complexity
  static calculateAge(value: string | Date, suffixed: boolean): number | string {
    if (!value) {
      return null;
    }

    const birthday: Date = MomentUtils.parseDate(value);

    let age = moment().diff(birthday, 'years');
    if (age >= 1) {
      return suffixed ? age + ' ' + (age > 1 ? 'anos' : 'ano') : age;
    }

    age = moment().diff(birthday, 'months');
    if (age >= 1) {
      return suffixed ? age + ' ' + (age > 1 ? 'meses' : 'mês') : age;
    }

    age = moment().diff(birthday, 'days');
    if (age >= 1) {
      return suffixed ? age + ' ' + (age > 1 ? 'dias' : 'dia') : age;
    }

    return 'Recém nascido';
  }
}
