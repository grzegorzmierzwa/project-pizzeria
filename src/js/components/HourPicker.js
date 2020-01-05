/* eslint-disable linebreak-style */
/* eslint-disable no-undef */

import utils from '../utils.js';
import BaseWidget from './BaseWidget.js';
import {select, settings} from '../settings.js';



class HourPicker extends BaseWidget{

  constructor(wrapper) {
    super(wrapper, settings.hours.open);
    // console.log(settings.hours.open); 
    // 12:00

    // console.log(wrapper);

    const thisWidget = this;
        
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.input);
    // console.log(thisWidget.dom.input);
    // <input>

    thisWidget.dom.output = thisWidget.dom.wrapper.querySelector(select.widgets.hourPicker.output);
    // console.log(thisWidget.dom.output);
    // div with thisWidget.value

    

    thisWidget.value = thisWidget.dom.input.value;
    // console.log(thisWidget.value);
    // 12:00

    thisWidget.value = 12;
    thisWidget.booked = {};
    thisWidget.date = '2019-01-01';
    thisWidget.open = 12;
    thisWidget.close = 24;
    thisWidget.table = 1;

    
    thisWidget.initPlugin();
    thisWidget.parseData();
    
    
  }

  updateBooking(booking){
    const thisWidget = this;

    thisWidget.events = booking;
    console.log('thisWidget.events', thisWidget.events);
  
  }

  initPlugin(){
    const thisWidget = this;

    rangeSlider.create(thisWidget.dom.input);

    thisWidget.dom.input.addEventListener('input', function(){
      thisWidget.value = thisWidget.dom.input.value;
    });
  }

  makeBooked(date, hour, duration, table) {
    const thisWidget = this;
    
    if (!thisWidget.booked[date]) {
      thisWidget.booked[date] = {};
    }

    let time = hour.split(':');
    if (time[1] === '30') hour = `${time[0]}.5`;
    else hour = time[0];

    if (!thisWidget.booked[date][hour]) {
      thisWidget.booked[date][hour] = [];
    }

    thisWidget.booked[date][hour].push(table);

    hour = hour - -duration;

    if (!thisWidget.booked[date][hour]) {
      thisWidget.booked[date][hour] = [];
    }

    thisWidget.booked[date][hour].push(table);
    console.log(thisWidget.booked);
  }

  parseData() {
    const thisWidget = this;

    console.log('thisWidget.data',thisWidget.data);
    for (let event of thisWidget.events) {
      thisWidget.makeBooked(event.date, event.hour, event.duration, event.table);
    }

    thisWidget.initTableAvailability();
  }

  initTableAvailability() {
    const thisWidget = this;
    
    // console.log(this.booked);

    const tableAvailability = [];
    for (let i = thisWidget.open; i < thisWidget.close; i += 0.5) {
      if (thisWidget.booked[thisWidget.date][i]) {
        thisWidget.booked[thisWidget.date][i].push[thisWidget.table];
      } else {
        thisWidget.booked[thisWidget.date][i] = [];
      }
      tableAvailability.push(thisWidget.booked[thisWidget.date][i].length);
    }

    for (let i = 0; i < tableAvailability.length; i++) {
      const divRangeSlider = document.createElement('div');
      divRangeSlider.classList.add('availability-div');
      if (tableAvailability[i] === 1 || tableAvailability[i] === 2) {
        divRangeSlider.classList.add('medium');
      } else if (tableAvailability[i] === 3) {
        divRangeSlider.classList.add('full');
      } else {
        divRangeSlider.classList.add('empty');
      }
      thisWidget.dom.availabilityRangeSlider.appendChild(divRangeSlider);
    }
  }

  parseValue(value) {
    const thisWidget = this;

    thisWidget.hours = utils.numberToHour(value);
    // console.log(thisWidget.hours); 
    // return set time value on slider

    return thisWidget.hours;
  }

  isValid() {
    return true; 
  }

  renderValue() {
    const thisWidget = this;
    
    thisWidget.dom.output.innerHTML = thisWidget.value;

    // console.log(thisWidget.dom.output.innerHTML);
    // return set time value on slider
  }


       
}

export default HourPicker;
