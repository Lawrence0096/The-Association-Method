import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TableComponent } from './components/table/table.component';
import autoTable from 'jspdf-autotable';
//@ts-ignore
import * as pdfMake from 'pdfmake/build/pdfmake';
//@ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
//@ts-ignore
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(TableComponent) TableComponent?: TableComponent;
  title = 'The_association_method';
  randomWords: string[] = [];
  wordObjects: any[] = [];
  valueHolder: any[] = [];
  fowardButtonCounter: number = 0;
  isButtonForwardDisabled: boolean = false;
  isButtonBackwardDisabled: boolean = true;
  isBtnGenerateDisabled: boolean = false;
  isTableEmpty: boolean = true;
  analysis?: any;
  formattedTodaysDate?: string;
  isMobile: boolean = false;
  isPDFGenerated: boolean = false;
  dataSource = words

  constructor(private breakpointObserver: BreakpointObserver) {
    this.wordObjects = this.dataSource.map((word: any) => {
      return {
        word: word,
        time: null,
        response: null,
        reproduction: null,
      };
    });
  }

  ngOnInit(): void {
    this.getTodayData();
    this.initBreakPointObserver();
  }

  ngAfterViewInit() {
    this.createPopUpDialogs();
  }

  getTodayData(): void{
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    this.formattedTodaysDate = day + '. ' + month + '. ' + year;
  }

  initBreakPointObserver(){
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
  }

  createPopUpDialogs(){
    var dialogLinks = document.querySelectorAll('.dialog-link');
    var dialogs = document.querySelectorAll('.dialog');
    var closeButtons = document.querySelectorAll('.dialog-close-button');

    dialogLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var dialogId = link.getAttribute('data-dialog-id');
        //@ts-ignore
        var dialog = document.getElementById(dialogId);
        toggleDialog(dialog);
      });
    });

    function toggleDialog(dialog: any) {
      dialogs.forEach(function (d) {
        if (d !== dialog) {
          //@ts-ignore
          d.style.display = 'none';
        }
      });

      if (dialog.style.display === 'block') {
        dialog.style.display = 'none';
      } else {
        dialog.style.display = 'block';
      }
    }

    dialogs.forEach(function (dialog: any) {
      dialog.addEventListener('click', function (event: any) {
        if (event.target === dialog) {
          //@ts-ignore
          dialog.style.display = 'none';
        }
      });
    });

    closeButtons.forEach((button: any) => {
      button.addEventListener('click', function (event: any) {

        //@ts-ignore
        dialogs.forEach((dialog: any) => {
          dialog.style.display = 'none';
        });
      });
    });
  }

  previousBtnClick(): void {
    //@ts-ignore
    if (this.TableComponent!.data[0].word !== null) {
      this.isBtnGenerateDisabled = true;
    }
    this.fowardButtonCounter -= 1;
    if (this.fowardButtonCounter === 0) {
      this.isButtonBackwardDisabled = true;
      this.isButtonForwardDisabled = false;
    }
    this.TableComponent!.items = this.valueHolder[this.fowardButtonCounter];
  }

  updatedWords() {
    if (this.TableComponent!.items[0].word === null) {
      this.isTableEmpty = false;
      this.isButtonForwardDisabled = true;
    } else {
      if (
        this.valueHolder[this.fowardButtonCounter] !==
        this.TableComponent!.data &&
        this.valueHolder.length <= 3
      ) {
        this.valueHolder.push(this.TableComponent!.data);
      }
      this.isButtonBackwardDisabled = false;
      this.TableComponent!.items = [];
      this.fowardButtonCounter += 1;

      if (!this.valueHolder[this.fowardButtonCounter]) {
        for (let index = 0; index < 25; index++) {
          this.TableComponent?.items.push({
            word: null,
            time: null,
            response: null,
            reproduction: null,
          });
        }
        this.isBtnGenerateDisabled = false;
      } else {
        this.TableComponent!.items = this.valueHolder[this.fowardButtonCounter];
      }
      if (this.fowardButtonCounter === 3) {
        this.isButtonForwardDisabled = true;
      }
    }
  }

  generateWords() {
    if (this.isTableEmpty === false) {
      this.isTableEmpty = true;
      this.isButtonForwardDisabled = false;
    }
    this.wordObjects = this.dataSource.map((word: any) => {
      return {
        word: word,
        time: null,
        response: null,
      };
    });

    const filteredArray = this.wordObjects.filter(
      (item) => !this.randomWords.includes(item)
    );
    this.randomWords = [];
    while (this.randomWords.length < 25) {
      const randomIndex = Math.floor(Math.random() * filteredArray.length);
      const randomWord = filteredArray[randomIndex];

      if (!this.randomWords.includes(randomWord)) {
        this.randomWords.push(randomWord);
      }
    }

    if (this.TableComponent?.items[0].word === null) {
      this.isBtnGenerateDisabled = true;
    }
  }

  generatePDF() {
    //@ts-ignore
    let pdfTableData: any = [];
    if (this.valueHolder.length === 0 && this.TableComponent?.items) {
      pdfTableData = [...this.TableComponent?.items]
    }

    else if ((this.valueHolder.length <= 3 && this.TableComponent?.items[0].word !== null)) {
      this.valueHolder.forEach((element) => {
        if (element !== null && element !== undefined) {
          pdfTableData.push(...element);
        }
      });
      this.TableComponent?.items.forEach((element) => {
        pdfTableData.push(element)
      })


    } else {
      console.log(this.valueHolder[0], this.TableComponent?.items[0]);
      pdfTableData = [];
    }

    const pdfTitle = 'The Association Method'
    var doc = new jsPDF();

    // Set the document properties
    doc.setProperties({
      title: 'Table Example',
      author: 'Your Name',
    });
    doc.setFontSize(9.5);
    //@ts-ignore
    doc.text(15, 27, 'Date: ' + this.formattedTodaysDate);
    //@ts-ignore
    doc.setFontSize(10);
    //@ts-ignore

    if (this.analysis !== undefined) {
      //@ts-ignore
      doc.text(15, 35, 'Analysis:');

    }

    doc.setFontSize(22);

    var titleWidth = doc.getTextWidth(pdfTitle); // Calculate width of the title text
    var titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Calculate the X position for center alignment
    //@ts-ignore
    doc.text(titleX, 20, pdfTitle);
    //@ts-ignore

    // Add long text section
    var maxWidth = 395;
    var startX = 15;

    var startY = 0

    if (this.analysis === undefined) {
      var startY = 30;
    } else {
      var startY = 45;
    }

    var lineHeight = 7;
    var lines = doc.splitTextToSize(this.analysis, maxWidth);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    if (this.analysis !== undefined) {
      for (var i = 0; i < lines.length; i++) {
        doc.text(lines[i], startX, startY + i * lineHeight);
      }
    }

    // Calculate the height of the long text section
    var longTextHeight = lines.length * lineHeight;

    // Add table
    var tableHeaders = [
      'Word',
      'Time - in seconds',
      'Response',
      'Reproduction',
    ];
    var tableRows = pdfTableData.map(function (item: any) {
      return [
        item.word,
        item.time || '',
        item.response || '',
        item.reproduction || '',
      ];
    });

    var tableStyle = {
      headStyles: { fillColor: [200, 200, 200] },
      margin: { top: 10 },
      styles: { overflow: 'linebreak' },
    };

    // Calculate the startY position for the table
    var tableStartY = startY + longTextHeight + 1;

    //@ts-ignore
    autoTable(doc, {
      head: [tableHeaders],
      body: tableRows,
      startY: tableStartY,
      ...tableStyle,
    });

    doc.save('table_example.pdf');

    this.isPDFGenerated = true;
  }
}

const words = [
  'Afraid',
  'Alone',
  'Catastrophe',
  'Caution',
  'Crazy',
  'Crisis',
  'Danger',
  'Dark',
  'Deadly',
  'Destroy',
  'Failure',
  'Fooled',
  'Hack',
  'Hate',
  'Humiliation',
  'Hurricane',
  'Invasion',
  'Meltdown',
  'Mistake',
  'Nightmare',
  'Painful',
  'Panic',
  'Played',
  'Poison',
  'Poor',
  'Revenge',
  'Risky',
  'Scary',
  'Shame',
  'Shocked',
  'Silly',
  'Stress',
  'Stupid',
  'Tank',
  'Torture',
  'Toxic',
  'Tragedy',
  'Trap',
  'Victim',
  'Vulnerable',
  'Warning',
  'Worry',
  'Ashamed',
  'Assaulted',
  'Attack',
  'Betrayed',
  'Captive',
  'Chaos',
  'Chilling',
  'Conflicted',
  'Corrupted',
  'Cursed',
  'Dangerous',
  'Defeated',
  'Delusional',
  'Depressed',
  'Discarded',
  'Disoriented',
  'Divided',
  'Doomed',
  'Double-crossed',
  'Emotionless',
  'Entrapped',
  'Eradicated',
  'Excluded',
  'Exploited',
  'Exposed',
  'False',
  'Fascinated',
  'Fatigued',
  'Feared',
  'Feeble',
  'Fierce',
  'Forsaken',
  'Frail',
  'Freezing',
  'Frozen',
  'Guilty',
  'Haunted',
  'Helpless',
  'Hollow',
  'Hopeless',
  'Horrified',
  'Humiliated',
  'Hungry',
  'Hurt',
  'Hysterical',
  'Imprisoned',
  'In danger',
  'In pain',
  'Injured',
  'Insecure',
  'Insulted',
  'Intimidated',
  'Invalidated',
  'Kicked down',
  'Kidnapped',
  'Left out',
  'Lonely',
  'Lost',
  'Manipulated',
  'Misguided',
  'Mocked',
  'Murdered',
  'Nauseous',
  'Needy',
  'Nervous',
  'Numb',
  'Outraged',
  'Overpowered',
  'Overwhelmed',
  'Paralyzed',
  'Powerless',
  'Predatory',
  'Prisoner',
  'Punished',
  'Reckless',
  'Rejected',
  'Robbed',
  'Ruined',
  'Savage',
  'Scarred',
  'Screwed up',
  'Separated',
  'Starved',
  'Storm',
  'Time',
  'Year',
  'People',
  'Way',
  'Day',
  'Man',
  'Thing',
  'Woman',
  'Life',
  'Child',
  'World',
  'School',
  'State',
  'Family',
  'Student',
  'Group',
  'Country',
  'Problem',
  'Hand',
  'Place',
  'Week',
  'Company',
  'System',
  'Program',
  'Question',
  'Work',
  'Government',
  'Number',
  'Night',
  'Point',
  'Home',
  'Water',
  'Room',
  'Mother',
  'Area',
  'Money',
  'Story',
  'Fact',
  'Month',
  'Right',
  'Study',
  'Book',
  'Eye',
  'Job',
  'Word',
  'Business',
  'Issue',
  'Kind',
  'Head',
  'House',
  'Service',
  'Friend',
  'Father',
  'Power',
  'Hour',
  'Game',
  'End',
  'Member',
  'Law',
  'Car',
  'City',
  'Community',
  'President',
  'Team',
  'Minute',
  'Idea',
  'Body',
  'Information',
  'Back',
  'Parent',
  'Face',
  'Others',
  'Level',
  'Office',
  'Door',
  'Health',
  'Person',
  'Art',
  'War',
  'History',
  'Party',
  'Result',
  'Change',
  'Morning',
  'head',
  'Green',
  'To sing',
  'Dead',
  'Long',
  'Ship',
  'To pay',
  'Window',
  'Friendly',
  'To cook',
  'To ask',
  'Cold',
  'Stem',
  'To dance',
  'Village',
  'Lake',
  'Sick',
  'Pride',
  'Angry',
  'To swim',
  'Voyage',
  'Blue',
  'Lamp',
  'To sin',
  'Bread',
  'Rich',
  'Tree',
  'Pity',
  'Yellow',
  'Mountain',
  'To die',
  'Salt',
  'New',
  'Custom',
  'To pray',
  'Foolish',
  'Despise',
  'Finger',
  'Expensive',
  'Bird',
  'To fall',
  'Unjust',
  'Frog',
  'To part',
  'Hunger',
  'White',
  'To take care',
  'Sad',
  'Plum',
  'To marry',
  'Dear',
  'Glass',
  'To quarrel',
  'Fur',
  'Big',
  'Carrot',
  'To paint',
  'Old',
  'Flower',
  'To beat',
  'Box',
  'Wild',
  'To wash',
  'Cow',
  'Luck',
  'Lie',
  'Deportment',
  'Narrow',
  'Brother',
  'To fear',
  'Stork',
  'Anxiety',
  'To kiss',
  'Bride',
  'Pure',
  'To choose',
  'Hay',
  'Contented',
  'Ridicule',
  'To sleep',
  'Nice',
  'To abuse',
  'Food',
  'Love',
  'Sing',
  'Pay',
  'Cook',
  'Ask',
  'Dance',
  'Swim',
  'Sin',
  'Prick',
  'Die',
  'Pray',
  'Fall',
  'Take care',
  'Marry',
  'Paint',
  'Wash',
  'Fear',
  'Kiss',
  'Choose',
  'Sleep',
  'Smile',
  'Joy',
  'Happiness',
  'Laugh',
  'Delight',
  'Cheer',
  'Bliss',
  'Euphoria',
  'Excitement',
  'Thrill',
  'Gratitude',
  'Hope',
  'Optimism',
  'Peace',
  'Harmony',
  'Comfort',
  'Blessing',
  'Pleasure',
  'Satisfaction',
  'Wonder',
  'Amusement',
  'Ecstasy',
  'Rejoice',
  'Radiant',
  'Vibrant',
  'Enthusiasm',
  'Glorious',
  'Sunshine',
  'Inspire',
  'Celebrate',
  'Uplift',
  'Thriving',
  'Positive',
  'Grateful',
  'Fantastic',
  'Hopeful',
  'Bubbly',
  'Charmed',
  'Bright',
  'Delighted',
  'Energetic',
  'Blissful',
  'Cheerful',
  'Sunny',
  'Ecstatic',
  'Alive',
  'Smiling',
  'Enchanting',
  'Wonderful',
  'Optimistic',
  'Laughter',
  'Heavenly',
  'Content',
  'Pleased',
  'Excited',
  'Enthusiastic',
  'Thrilled',
  'Cherish',
  'Satisfied',
  'Harmonious',
  'Comfortable',
  'Pleasant',
  'Heartwarming',
  'Spirit',
  'Wholesome',
  'Rejuvenated',
  'Rejoicing',
  'Blessed',
  'Smiles',
  'Apple',
  'Bicycle',
  'Car',
  'Dog',
  'Eat',
  'Friend',
  'Green',
  'Happy',
  'Internet',
  'Jump',
  'Kitchen',
  'Love',
  'Monday',
  'Nice',
  'Orange',
  'Pencil',
  'Quiet',
  'Run',
  'Smile',
  'Table',
  'Umbrella',
  'Very',
  'Window',
  'Yellow',
  'Zebra',
  'Air',
  'Book',
  'Chair',
  'Door',
  'Elephant',
  'Family',
  'Good',
  'Hat',
  'Island',
  'Journey',
  'Key',
  'Lamp',
  'Money',
  'Night',
  'Open',
  'Paper',
  'Queen',
  'Read',
  'Street',
  'Tea',
  'Umbrella',
  'Vegetable',
  'Water',
  'Yoga',
  'Zoo',
];
