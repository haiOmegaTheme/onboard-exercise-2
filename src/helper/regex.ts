export class RegexConstant {
  static SPACE = /\s/;
  static LOWERCASE_LETTER = /[a-z]/;
  static ALPHANUMERIC_ONLY = /^[A-Za-z0-9]+$/;
  static EMOJI =
    /([\u263A-\u27B0]|\uD83C[\uDFFB-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFF\uDF00-\uDFFF]|\uD83E[\uDD10-\uDDFF]|\uD83C[\uDDE6-\uDDFF]|\uD83D[\uDC00-\uDCFF])+/g;
  static SINGLE_AND_DOUBLE_QUOTES = /["']/;
  static ONLY_DIGITS_AND_NEGATIVE = /[^0-9-]/g;
  static DIACRITICAL_MARKS_REGEX = /[\u0300-\u036f]/g;
}
