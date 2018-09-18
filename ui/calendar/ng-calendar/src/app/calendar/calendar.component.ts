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
import { Scheduler } from 'rxjs';

type CalendarPeriod = 'day' | 'week' | 'month';
type scheduleView = 'fall' | 'winter';

//days are one off for some reason
const MON = '2018-09-04';
const TUE = '2018-09-05';
const WED = '2018-09-06';
const THU = '2018-09-07';
const FRI = '2018-09-08';

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
  semester: scheduleView = 'winter';
  viewDate: Date = new Date('2018-09-03');

  fallEvents: CalendarEvent[] = [    {
    start: setHours(setMinutes(new Date(MON), 0), 15), 
    end: setHours(setMinutes(new Date(MON), 0), 16),
    title: 'CSC263',
    color: colors.purple
  }];

  winEvents: CalendarEvent[] = [ {
    start: setHours(setMinutes(new Date(TUE), 0),12),
    end: setHours(setMinutes(new Date(TUE), 0),13),
    title: 'CSC258',
    color: colors.green
  }
  ];

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

  changeSemester(semester: scheduleView): void{
    this.semester = semester;
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
