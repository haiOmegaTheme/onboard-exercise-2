import { SelectOption } from "@shopify/polaris";
import { CalendarLayoutEnum, LayoutEnum, WeekdaysEnum } from "./enum";

export const WEEKDAYS_OPTIONS: SelectOption[] = [
  {
    label: "Monday",
    value: WeekdaysEnum.monday,
  },
  {
    label: "Tuesday",
    value: WeekdaysEnum.tuesday,
  },
  {
    label: "Wednesday",
    value: WeekdaysEnum.wednesday,
  },
  {
    label: "Thursday",
    value: WeekdaysEnum.thursday,
  },
  {
    label: "Friday",
    value: WeekdaysEnum.friday,
  },
  {
    label: "Saturday",
    value: WeekdaysEnum.saturday,
  },
  {
    label: "Sunday",
    value: WeekdaysEnum.sunday,
  },
];

export const LAYOUT_OPTIONS = [
  {
    label: "Default",
    value: LayoutEnum.default,
  },
];

export const CALENDAR_LAYOUT_OPTIONS = [
  {
    label: "Calendar",
    value: CalendarLayoutEnum.calendar,
  },
  {
    label: "Date list",
    value: CalendarLayoutEnum.dateList,
  },
];

export const LANGUAGE_CODES = {
  english: "en",
  spanish: "es",
  french: "fr",
  german: "de",
  chinese: "zh",
  japanese: "jp",
  korean: "ko",
  italian: "it",
  portuguese: "pt",
  russian: "ru",
};

export const LANGUAGE_OPTIONS = [
  { label: "English", value: LANGUAGE_CODES.english },
  { label: "Spanish", value: LANGUAGE_CODES.spanish },
  { label: "French", value: LANGUAGE_CODES.french },
  { label: "German", value: LANGUAGE_CODES.german },
  { label: "Chinese", value: LANGUAGE_CODES.chinese },
  { label: "Japanese", value: LANGUAGE_CODES.japanese },
  { label: "Korean", value: LANGUAGE_CODES.korean },
  { label: "Italian", value: LANGUAGE_CODES.italian },
  { label: "Portuguese", value: LANGUAGE_CODES.portuguese },
  { label: "Russian", value: LANGUAGE_CODES.russian },
];

export const USER_SATISFACTION_ICONS = {
  veryPoor: {
    active:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-very-poor-active.png?v=1728380660",
    inactive:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-very-poor-inactive.png?v=1728380799",
  },
  poor: {
    active:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-poor-active.png?v=1728380660",
    inactive:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-poor-inactive.png?v=1728380798",
  },
  good: {
    active:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-good-active.png?v=1728380660",
    inactive:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-good-inactive.png?v=1728380798",
  },
  average: {
    active:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-average-active.png?v=1728380660",
    inactive:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-average-inactive.png?v=1728380799",
  },
  excellent: {
    active:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-excellent-active.png?v=1728380660",
    inactive:
      "https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-excellent-inactive.png?v=1728380798",
  },
};

export const EMOJI_RATING_ARRAY = [
  USER_SATISFACTION_ICONS.veryPoor,
  USER_SATISFACTION_ICONS.poor,
  USER_SATISFACTION_ICONS.average,
  USER_SATISFACTION_ICONS.good,
  USER_SATISFACTION_ICONS.excellent,
];
