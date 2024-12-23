import { SelectOption } from '@shopify/polaris';
import { CalendarLayoutEnum, LayoutEnum, WeekdaysEnum } from './enum';
import { TreeNode } from '@/types';

export const WEEKDAYS_OPTIONS: SelectOption[] = [
  {
    label: 'Monday',
    value: WeekdaysEnum.monday
  },
  {
    label: 'Tuesday',
    value: WeekdaysEnum.tuesday
  },
  {
    label: 'Wednesday',
    value: WeekdaysEnum.wednesday
  },
  {
    label: 'Thursday',
    value: WeekdaysEnum.thursday
  },
  {
    label: 'Friday',
    value: WeekdaysEnum.friday
  },
  {
    label: 'Saturday',
    value: WeekdaysEnum.saturday
  },
  {
    label: 'Sunday',
    value: WeekdaysEnum.sunday
  }
];

export const LAYOUT_OPTIONS = [
  {
    label: 'Default',
    value: LayoutEnum.default
  }
];

export const CALENDAR_LAYOUT_OPTIONS = [
  {
    label: 'Calendar',
    value: CalendarLayoutEnum.calendar
  },
  {
    label: 'Date list',
    value: CalendarLayoutEnum.dateList
  }
];

export const LANGUAGE_CODES = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
  german: 'de',
  chinese: 'zh',
  japanese: 'jp',
  korean: 'ko',
  italian: 'it',
  portuguese: 'pt',
  russian: 'ru'
};

export const LANGUAGE_OPTIONS = [
  { label: 'English', value: LANGUAGE_CODES.english },
  { label: 'Spanish', value: LANGUAGE_CODES.spanish },
  { label: 'French', value: LANGUAGE_CODES.french },
  { label: 'German', value: LANGUAGE_CODES.german },
  { label: 'Chinese', value: LANGUAGE_CODES.chinese },
  { label: 'Japanese', value: LANGUAGE_CODES.japanese },
  { label: 'Korean', value: LANGUAGE_CODES.korean },
  { label: 'Italian', value: LANGUAGE_CODES.italian },
  { label: 'Portuguese', value: LANGUAGE_CODES.portuguese },
  { label: 'Russian', value: LANGUAGE_CODES.russian }
];

export const USER_SATISFACTION_ICONS = {
  veryPoor: {
    active: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-very-poor-active.png?v=1728380660',
    inactive: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-very-poor-inactive.png?v=1728380799'
  },
  poor: {
    active: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-poor-active.png?v=1728380660',
    inactive: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-poor-inactive.png?v=1728380798'
  },
  good: {
    active: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-good-active.png?v=1728380660',
    inactive: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-good-inactive.png?v=1728380798'
  },
  average: {
    active: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-average-active.png?v=1728380660',
    inactive: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-average-inactive.png?v=1728380799'
  },
  excellent: {
    active: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-excellent-active.png?v=1728380660',
    inactive: 'https://cdn.shopify.com/s/files/1/0790/2373/4977/files/feedback-excellent-inactive.png?v=1728380798'
  }
};

export const EMOJI_RATING_ARRAY = [
  USER_SATISFACTION_ICONS.veryPoor,
  USER_SATISFACTION_ICONS.poor,
  USER_SATISFACTION_ICONS.average,
  USER_SATISFACTION_ICONS.good,
  USER_SATISFACTION_ICONS.excellent
];

export const mockData: TreeNode[] = [
  {
    id: '1',
    label: 'Electronics',
    children: [
      {
        id: '1-1',
        label: 'Smartphones',
        children: [
          { id: '1-1-1', label: 'iPhone' },
          { id: '1-1-2', label: 'Samsung' },
          { id: '1-1-3', label: 'Google Pixel' }
        ]
      },
      {
        id: '1-2',
        label: 'Laptops',
        children: [
          { id: '1-2-1', label: 'MacBook' },
          { id: '1-2-2', label: 'Dell XPS' },
          { id: '1-2-3', label: 'Lenovo ThinkPad' }
        ]
      },
      {
        id: '1-3',
        label: 'Accessories',
        children: [
          { id: '1-3-1', label: 'Headphones' },
          { id: '1-3-2', label: 'Chargers' },
          { id: '1-3-3', label: 'Cases' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'Clothing',
    children: [
      {
        id: '2-1',
        label: 'Men',
        children: [
          { id: '2-1-1', label: 'Shirts' },
          { id: '2-1-2', label: 'Pants' },
          { id: '2-1-3', label: 'Shoes' }
        ]
      },
      {
        id: '2-2',
        label: 'Women',
        children: [
          { id: '2-2-1', label: 'Dresses' },
          { id: '2-2-2', label: 'Skirts' },
          { id: '2-2-3', label: 'Accessories' }
        ]
      },
      {
        id: '2-3',
        label: 'Children',
        children: [
          { id: '2-3-1', label: 'Boys' },
          { id: '2-3-2', label: 'Girls' }
        ]
      }
    ]
  },
  {
    id: '3',
    label: 'Home & Garden',
    children: [
      {
        id: '3-1',
        label: 'Furniture',
        children: [
          { id: '3-1-1', label: 'Living Room' },
          { id: '3-1-2', label: 'Bedroom' },
          { id: '3-1-3', label: 'Dining Room' }
        ]
      },
      {
        id: '3-2',
        label: 'Appliances',
        children: [
          { id: '3-2-1', label: 'Refrigerators' },
          { id: '3-2-2', label: 'Washing Machines' },
          { id: '3-2-3', label: 'Dishwashers' }
        ]
      },
      {
        id: '3-3',
        label: 'Garden',
        children: [
          { id: '3-3-1', label: 'Plants' },
          { id: '3-3-2', label: 'Tools' },
          { id: '3-3-3', label: 'Outdoor Furniture' }
        ]
      }
    ]
  },
  {
    id: '4',
    label: 'Sports & Outdoors',
    children: [
      {
        id: '4-1',
        label: 'Team Sports',
        children: [
          { id: '4-1-1', label: 'Football' },
          { id: '4-1-2', label: 'Basketball' },
          { id: '4-1-3', label: 'Soccer' }
        ]
      },
      {
        id: '4-2',
        label: 'Outdoor Recreation',
        children: [
          { id: '4-2-1', label: 'Camping' },
          { id: '4-2-2', label: 'Hiking' },
          { id: '4-2-3', label: 'Fishing' }
        ]
      },
      {
        id: '4-3',
        label: 'Exercise & Fitness',
        children: [
          { id: '4-3-1', label: 'Yoga' },
          { id: '4-3-2', label: 'Weightlifting' },
          { id: '4-3-3', label: 'Cardio Equipment' }
        ]
      }
    ]
  }
];

export const UNICODE_NORMALIZATION_FORM_NFKD = 'NFKD';
