import { Component, ElementRef, Input, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './/table.component.html',
  styles: [
    `
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
    `,
  ],
})
export class TableComponent implements OnInit {
  items: any[] = [];
  timeInSeconds: any[] = [];
  timeInSeconds1: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  formData: any
  
  @Input() data: string[] = [];
  @Output() myEvent = new EventEmitter<string>();

  constructor(private apiService: ApiServiceService) {
    
   }

  @ViewChild('myTable') myTable!: ElementRef;
  @ViewChildren('myInput') myInputs!: QueryList<ElementRef>;

  ngOnInit() {
    for (let index = 0; index < 25; index++) {
      this.items.push({
          word: null,
          time: null,
          response: null,
          reproduction: null
      },)
      
    }
    //this.loadItems();
  }

  loadItems() {
    //this.items = this.data;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.items = this.data;
  }

  ngAfterViewInit() {

  }

  /*
  getData() {
    const data = this.items.map((item) => ({
      word: item.word,
      time: item.time,
      response: item.response,
    }));

    this.formData = data;
  }*/

  test() {

  }

  nextPage() {
  
  }
}