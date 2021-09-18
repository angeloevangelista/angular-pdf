import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
  ];

  elementToPrint?: HTMLElement;

  public ngOnInit(): void {
    this.elementToPrint = document.querySelector('body') as HTMLElement;

    for (let i = 0; i < 4; i++) this.users.push(...this.users);
  }

  handleClick = this.printPdf;

  private async printAsImage(): Promise<void> {
    const canvas = await html2canvas(this.elementToPrint as HTMLElement);

    const imageWidth = 208;
    const pageHeight = 295;

    const imageHeight = (canvas.height * imageWidth) / canvas.width;
    const heightLeft = imageWidth;

    const imageData = canvas.toDataURL('image/jpeg', 1.0);

    const contentDataUrl = canvas.toDataURL('image/png');

    window.open(contentDataUrl);
  }

  private async printPdf(): Promise<void> {
    const valueUsedPerPage = 295;
    const documentWidth = 208;

    const canvas = await html2canvas(this.elementToPrint as HTMLElement);

    const documentHeight = (canvas.height * documentWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');

    const imageData = canvas.toDataURL('image/png', 1.0);

    const pageCount = Math.floor(documentHeight / valueUsedPerPage);

    for (let i = pageCount; i >= 0; i--) {
      const position = -(i * valueUsedPerPage);

      pdf.addImage(
        imageData, //imageData
        'PNG', //format
        0, //x
        position, //y
        documentWidth, //w
        documentHeight, //h
        undefined, //alias
        undefined, //compression
        undefined //rotation
      );

      if (i !== 0) pdf.insertPage(1);
    }

    // window.open(URL.createObjectURL(pdf.output('blob')));
    pdf.save('download.pdf');
  }
}
