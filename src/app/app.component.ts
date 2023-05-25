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
  data = [
    'Afraid',
    'Agony',
    'Alone',
    'Apocalypse',
    'Assault',
    'Backlash',
    'Beware',

    'Catastrophe',
    'Caution',
    'Collapse',
    'Crazy',
    'Crisis',
    'Danger',
    'Dark',
    'Deadly',
    'Destroy',
    'Devastating',
    'Doom',
    'Failure',
    'Fooled',
    'Frightening',
    'Gullible',
    'Hack',
    'Hate',
    'Hazardous',
    'Horrific',
    'Humiliation',
    'Hurricane',
    'Invasion',
    'Lurking',
    'Meltdown',
    'Mistake',
    'Nightmare',
    'Painful',
    'Panic',
    'Pitfall',
    'Played',
    'Plummet',
    'Poison',
    'Poor',
    'Revenge',
    'Risky',
    'Scary',
    'Scream',
    'Shame',
    'Shocked',
    'Silly',
    'Stress',
    'Stupid',
    'Tank',
    'Targeted',
    'Torture',
    'Toxic',
    'Tragedy',
    'Trap',
    'Victim',
    'Vulnerable',
    'Warning',
    'Worry',
    'Wounded',
    'Abandoned',
    'Alienated',
    'Anxious',
    'Apprehensive',
    'Ashamed',
    'Assaulted',
    'Attack',
    'Awe',
    'Betrayed',
    'Brutal',
    'Captive',
    'Chaos',
    'Chilling',
    'Conflicted',
    'Consumed',
    'Corrupted',
    'Crumbling',
    'Cursed',
    'Dangerous',
    'Defeated',
    'Delusional',
    'Demolished',
    'Depressed',
    'Devoured',
    'Dire',
    'Discarded',
    'Disfigured',
    'Disillusioned',
    'Disoriented',
    'Disrupted',
    'Divided',
    'Doomed',
    'Double-crossed',
    'Drowned',
    'Emotionless',
    'Entrapped',
    'Eradicated',
    'Excluded',
    'Exiled',
    'Exploited',
    'Exposed',
    'False',
    'Fascinated',
    'Fatigued',
    'Feared',
    'Feeble',
    'Ferocious',
    'Fierce',
    'Forsaken',
    'Frail',
    'Freaked out',
    'Freezing',
    'Frozen',
    'Gaping',
    'Grief-stricken',
    'Gruesome',
    'Guilty',
    'Haunted',
    'Helpless',
    'Hollow',
    'Hopeless',
    'Horrified',
    'Humiliated',
    'Hungry',
    'Hunted',
    'Hurt',
    'Hysterical',
    'Imprisoned',
    'In agony',
    'In danger',
    'In pain',
    'Injured',
    'Insecure',
    'Insulted',
    'Intimidated',
    'Invalidated',
    'Isolated',
    'Jeopardized',
    'Joyless',
    'Kicked down',
    'Kidnapped',
    'Killed',
    'Left behind',
    'Left out',
    'Lethal',
    'Lonely',
    'Lost',
    'Lured',
    'Mad',
    'Manipulated',
    'Miserable',
    'Misguided',
    'Mistreated',
    'Mocked',
    'Murdered',
    'Nauseous',
    'Needy',
    'Nervous',
    'Numb',
    'Obsessed',
    'Offended',
    'Oppressed',
    'Orphaned',
    'Outraged',
    'Overpowered',
    'Overrun',
    'Overwhelmed',
    'Pained',
    'Panic-stricken',
    'Paralyzed',
    'Parched',
    'Powerless',
    'Predatory',
    'Preyed upon',
    'Prisoner',
    'Punished',
    'Pursued',
    'Reckless',
    'Rejected',
    'Repressed',
    'Resentful',
    'Resigned',
    'Robbed',
    'Ruined',
    'Rushed',
    'Sacrificed',
    'Sadistic',
    'Savage',
    'Scarred',
    'Screwed over',
    'Screwed up',
    'Seized',
    'Separated',
    'Shackled',
    'Shattered',
    'Shunned',
    'Sidelined',
    'Sluggish',
    'Starved',
    'Stolen',
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
    'Part',
    'Place',
    'Case',
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
    'Lot',
    'Right',
    'Study',
    'Book',
    'Eye',
    'Job',
    'Word',
    'Business',
    'Issue',
    'Side',
    'Kind',
    'Head',
    'House',
    'Service',
    'Friend',
    'Father',
    'Power',
    'Hour',
    'Game',
    'Line',
    'End',
    'Member',
    'Law',
    'Car',
    'City',
    'Community',
    'Name',
    'President',
    'Team',
    'Minute',
    'Idea',
    'Kid',
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
    'Head',
    'Green',
    'Water',
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
    'Ink',
    'Angry',
    'Needle',
    'To swim',
    'Voyage',
    'Blue',
    'Lamp',
    'To sin',
    'Bread',
    'Rich',
    'Tree',
    'To prick',
    'Pity',
    'Yellow',
    'Mountain',
    'To die',
    'Salt',
    'New',
    'Custom',
    'To pray',
    'Money',
    'Foolish',
    'Pamphlet',
    'Despise',
    'Finger',
    'Expensive',
    'Bird',
    'To fall',
    'Book',
    'Unjust',
    'Frog',
    'To part',
    'Hunger',
    'White',
    'Child',
    'To take care',
    'Lead pencil',
    'Sad',
    'Plum',
    'To marry',
    'House',
    'Dear',
    'Glass',
    'To quarrel',
    'Fur',
    'Big',
    'Carrot',
    'To paint',
    'Part',
    'Old',
    'Flower',
    'To beat',
    'Box',
    'Wild',
    'Family',
    'To wash',
    'Cow',
    'Friend',
    'Luck',
    'Lie',
    'Deportment',
    'Narrow',
    'Brother',
    'To fear',
    'Stork',
    'False',
    'Anxiety',
    'To kiss',
    'Bride',
    'Pure',
    'Door',
    'To choose',
    'Hay',
    'Contented',
    'Ridicule',
    'To sleep',
    'Month',
    'Nice',
    'Woman',
    'To abuse',
    'Food',
    'Love',
    'Time',
    'Year',
    'Way',
    'Day',
    'Man',
    'Thing',
    'Life',
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
    'Case',
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
    'Room',
    'Mother',
    'Area',
    'Money',
    'Story',
    'Fact',
    'Lot',
    'Right',
    'Study',
    'Eye',
    'Job',
    'Word',
    'Business',
    'Issue',
    'Side',
    'Kind',
    'Service',
    'Power',
    'Hour',
  ];

  randomWords: string[] = [];
  wordObjects: any[] = [];
  valueHolder: any[] = [];
  fowardButtonCounter: number = 0;
  isButtonForwardDisabled: boolean = false;
  isButtonBackwardDisabled: boolean = true;
  isBtnGenerateDisabled: boolean = false;
  isTableEmpty: boolean = true;
  analysis?: any;
  formattedDate?: string;
  isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.wordObjects = this.data.map((word: any) => {
      return {
        word: word,
        time: null,
        response: null,
        reproduction: null,
      };
    });
  }

  ngOnInit(): void {
    var today = new Date();
    // Extract day, month, and year
    var day = today.getDate();
    var month = today.getMonth() + 1; // Note: January is 0, so we add 1 to get the correct month
    var year = today.getFullYear();

    // Format the date
    this.formattedDate = day + ". " + month + ". " + year;

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        console.log(Breakpoints);
        this.isMobile = result.matches;
      });

   
  }

  ngAfterViewInit(){
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

    console.log(closeButtons);

    closeButtons.forEach((button: any) => {
      button.addEventListener('click', function (event: any) {
        console.log(
          '🚀 ~ file: app.component.ts:78 ~ AppComponent ~ dialog.addEventListener ~ dialog:',
          event
        );
        //@ts-ignore
        dialogs.forEach((dialog: any) => {
          dialog.style.display = 'none';
        });
      });
    });
  }

  previousBtnClick() {
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
    this.wordObjects = this.data.map((word: any) => {
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
    var data = [
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      {
        word: 'Dismal',
        time: '1s',
        response: 'hello world',
        reproduction: 'ass',
      },
      // ... (other objects)
    ];
    //@ts-ignore
    let pdfTableData:any = [];

    console.log(this.valueHolder.length > 0, this.TableComponent?.items[0].word !== null);
    

    if(this.valueHolder.length > 0, this.TableComponent?.items[0].word !== null){
      //@ts-ignore
      pdfTableData = [...this.valueHolder[0], ...this.valueHolder[1], ...this.valueHolder[2], ...this.TableComponent?.items];
    } else {
      pdfTableData = []
    }
    const pdfTitle = 'The Association Method';
    const longText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque mi sit amet risus tristique, nec tristique orci interdum. Vestibulum vestibulum erat at lectus viverra, sit amet congue orci lacinia. Nam pulvinar finibus mauris, at volutpat justo aliquet a. Sed ut ullamcorper purus. Duis vel posuere ex. Suspendisse eu ex ipsum. Proin quis nulla elit. Quisque condimentum lectus eget metus rhoncus, eget aliquet dui dapibus. Sed aliquet nisl ut nisl ultrices, ac scelerisque eros hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque mi sit amet risus tristique, nec tristique orci interdum. Vestibulum vestibulum erat at lectus viverra, sit amet congue orci lacinia. Nam pulvinar finibus mauris, at volutpat justo aliquet a. Sed ut ullamcorper purus. Duis vel posuere ex. Suspendisse eu ex ipsum. Proin quis nulla elit. Quisque condimentum lectus eget metus rhoncus, eget aliquet dui dapibus. Sed aliquet nisl ut nisl ultrices, ac scelerisque eros hendrerit.';

    var doc = new jsPDF();

    // Set the document properties
    doc.setProperties({
      title: 'Table Example',
      author: 'Your Name',
    });
    doc.setFontSize(9.5);
    //@ts-ignore
    doc.text(15, 27, 'Date: ' + this.formattedDate);
    //@ts-ignore
    // Add title to the PDF
    doc.setFontSize(10);
    //@ts-ignore
    doc.text(15, 35, 'Analysis:');
    doc.setFontSize(22);

    var titleWidth = doc.getTextWidth(pdfTitle); // Calculate width of the title text
    var titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Calculate the X position for center alignment
    //@ts-ignore
    doc.text(titleX, 20, pdfTitle);
    //@ts-ignore

    // Add long text section
    var maxWidth = 395;
    var startX = 15;
    var startY = 45;
    var lineHeight = 7;
    var lines = doc.splitTextToSize(this.analysis, maxWidth);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    for (var i = 0; i < lines.length; i++) {
      doc.text(lines[i], startX, startY + i * lineHeight);
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
  }
}

interface WordObject {
  word: any;
  time: any | null;
  response: any | null;
}
