import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import { CalendarEvent,CalendarMonthViewDay } from 'angular-calendar';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  setHours,
  setMinutes
} from 'date-fns';
import { colors } from '../utils/colors';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date:Date, amount: number): Date{
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);

}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date{
  return{
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  view: CalendarPeriod = 'week';

  viewDate: Date = new Date('2018-09-03');

  events: CalendarEvent[] = [    {
    start: setHours(setMinutes(new Date('2018-09-04'), 0), 15), //these are 1 day behind for some reason
    end: setHours(setMinutes(new Date('2018-09-04'), 0), 16),
    title: 'CSC263',
    color: colors.purple
  }];

  minDate: Date = subMonths(new Date('2018-09-02'), 1);

  maxDate: Date = addMonths(new Date('2018-09-08'), 1);

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;
  // exclude weekends
  excludeDays: number[] = [0, 6];

  constructor(){
    this.dateOrViewChanged();
  }

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if(this.viewDate < this.minDate){
      this.changeDate(this.minDate);
    }else if (this.viewDate > this.maxDate){
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

  skipWeekends(direction: 'back' | 'forward'): void {
    if (this.view === 'day') {
      if (direction === 'back') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = subDays(this.viewDate, 1);
        }
      } else if (direction === 'forward') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = addDays(this.viewDate, 1);
        }
      }
    }
  }
}
