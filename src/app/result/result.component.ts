import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  menuItems: any[];
  questions: string[]=[];
  correctAnswers: string[] = [];
  userAnswers: string[] = [];
  grades: number[] = [];
  totalGrade: number = 0;


  constructor(private router: Router , private route: ActivatedRoute) {
    this.menuItems = [
      {label: 'الصفحة الرئيسية', icon: 'pi pi-home', routerLink: [''] },
      { label: 'الأسئلة', icon: 'pi pi-question', routerLink: ['questions'] },
      { label: 'بحث', icon: 'pi pi-search', escape: false }
    ];
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    const grade = this.route.snapshot.queryParamMap.get('grades');
    const answer = this.route.snapshot.queryParamMap.get('answers');


    if (grade && answer) {
      this.grades = JSON.parse(grade);
      this.userAnswers = JSON.parse(answer)
      console.log(this.grades,this.userAnswers);
    }else {
      this.router.navigate(['/'])
    }

    this. questions= [
      'كم كان عمر النبي صلى الله عليه وسلم عندما توفيت أمه وأين دفنت؟',
      'من الذي أنزل الوحي على النبي صلى الله عليه وسلم؟',
      'ما أول ما نزل من القرآن الكريم على الرسول صلى الله عليه وسلم؟',
      'من أوَّل من آمن بالنَّبيِّ وصدّقه؟',
      'لماذا أخلى النبي صلى الله عليه وسلم مكة؟',
      'ما اسم الصَّلاة التي يصلَّى فيها ركوعين وسجودين من كلِّ ركعةٍ؟',
      'ماذا لُقِّب عثمان بن عفان رضي الله عنه؟ ولماذا؟',
      'ما هي أسباب غزوة بدر؟',
      ' ما هي أسباب وقوع غزوة أحد؟',
      'ما هي مهنة النَّبيِّ صلّى الله عليه وسلّم قبل البعثة؟',
  
    ];
    this.totalGrade = this.grades.reduce((total, grade:any) => total + parseInt(grade), 0); // Calculate total grade
  }
  messages: Message[][] = [];

  statuses: string[] = ["success", "warn",
    "error", "success", "warn", "error", "success", "warn", "error","success"];

    statusMessages: { [status: string]: string } = {
      'success': 'إجابتك صحيحة',
      'warn': 'إجابتك تكاد تكون صحيحة',
      'error': 'إجابتك خاطئة'
    };

    toStructre : { [ grade: number]: string } = {
    2: 'success',
    1: 'warn',
    0: 'error'
  };

    showMessage(grade: number,answer:string) {
      const status = this.toStructre[grade];
      const messageText = this.statusMessages[status] +" " + answer;
      console.log(this.toStructre[0])


      if (messageText) {
        const message: Message[] = [{ severity: status, summary: '', detail: messageText }];
        console.log(message);
        this.messages.push(message);
      } else {
        console.error('Invalid status:', status);
      }
    }

    ngAfterViewInit() {
      for (let i = 0; i < 10 ; i++) {
        this.showMessage(this.grades[i],this.userAnswers[i]);
      };
    }

    redirectToResultPage() {
      this.router.navigate(['/result']);
    }
    redirectToQuestionPage() {
      this.router.navigate(['/questions']);
    }
}
