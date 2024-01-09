import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import {FlaskService} from '../Services/flask.service'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  providers: [MessageService],
})
export class QuestionsComponent {
  menuItems: any[];
  searchQuery: string = '';
    currentQuestionIndex: number = 0;
  menuBarStyle: { [klass: string]: any } = {
    'direction': 'rtl'
  };

  constructor(private router: Router, private messageService: MessageService , private FlaskSrv: FlaskService) {
    this.menuItems = [
      {label: 'الصفحة الرئيسية', icon: 'pi pi-home', routerLink: [''] },
      { label: 'الأسئلة', icon: 'pi pi-question', routerLink: ['questions'] },
      { label: 'بحث', icon: 'pi pi-search', escape: false }
    ];
  }
  
  questions: string[] = [
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
  answers: string[] = ['', '', '', '', '', '', '', '', '', ''];
  grades : string[] = []

  messages: Message[] = [];



   
nextQuestion() {
  // Swal.fire({
  //   title: '<span style="color: #0e5344;">أنت بعيد عن الإجابة الصحيحة</span>',
  //   html: ':قبل المرور الى السؤال التالي اليك هذا التلميح<br><span style="color:  #d1ae0f; font-weight: bold;"> يمكنك إضافة هذا إلى إجابتك للاقتراب من الجواب الصحيح</span>',
  //   icon: 'info',
  //   timer: 5500,
  //   showConfirmButton: false,
  // });
    console.log(this.answers)
    this.FlaskSrv.Grade(this.answers[this.currentQuestionIndex],this.currentQuestionIndex).subscribe((res:any)=>{
      this.grades[this.currentQuestionIndex] = res.prediction
      console.log(this.grades,this.currentQuestionIndex)
      this.currentQuestionIndex++;

      if (this.currentQuestionIndex >= this.questions.length ) {
        this.router.navigate(['/result'],{ queryParams: { grades: JSON.stringify(this.grades),answers:JSON.stringify(this.answers) } });
      }

    },(error)=>{
      console.log("ERR while trying to get Grading from flask server",error)
    })
  }


  } 
