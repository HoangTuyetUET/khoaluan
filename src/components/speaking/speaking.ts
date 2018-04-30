import { Component,  ViewChild, ElementRef, OnInit, NgZone, EventEmitter, Output, Input, OnChanges, SimpleChange } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
// import { NativeService } from '../../providers/native-service';
import { HelperService } from '../../providers/helper-service';

import { Learning } from '../../pages/learning/learning';
import *as metaphone from 'metaphone';

@Component({
  selector: 'speaking-page',
  templateUrl: 'speaking.html'
})

export class Speaking implements OnInit, OnChanges {
  @Output() onCorrect = new EventEmitter<boolean>();
  @Input() curWord: Object;
  // texts: String = 'ios-mic-outline';
  speaking: String;
  // isRecording: Boolean = false;
  percent: Number;
  // recognition: any;

  private mic_off: any = {
    icon: 'mic',
    color: 'balance'
  };
  private mic_on: any = {
    icon: 'mic',
    color: 'danger'
  };
  private mic: any = this.mic_off;
  private recognition: any;
  private recognizing: Boolean;
  @ViewChild('recognitionResult') recognitionResult: ElementRef;

  private initializeRecognition = () => {
    if (!this.recognition) {
      return;
    }
    this.percent = 0;
    this.recognition.lang = "es-ES";
    this.recognition.continuous = true;
    this.recognition.interimResults = true;

    this.recognition.onstart = () => {
      console.log('[SpeechRecognition]', 'start');
      this.recognizing = true;
      this.recognitionResult.nativeElement.innerText = '';
    };

    this.recognition.onresult = (event) => {
      let results = Array.prototype.slice.call(event.results);
      let result = results.find((e) => {
        return !!e.isFinal || !!e[0].final;
      });

      if (result) {
        let resultText = result[0].transcript;
        console.log('[SpeechRecognition]', 'result', resultText);
        this.recognitionResult.nativeElement.innerText = resultText;
      }
      console.log('result', result);
//cham diem
      if (result.length>0) {
      this.percent = this.helperService.countPoint(metaphone(result[0].transcript), metaphone(this.curWord['content']));
      console.log('word',metaphone(result[0].transcript) , ' ',metaphone(this.curWord['content'] ));
      console.log('temp', this.percent);

      if(this.recognizing) this.checkAnswer();
      this.recognizing = false;
      this.zone.run(() => { });
      }
    };

    this.recognition.onerror = (event) => {
      console.error(event);
    };

    this.recognition.onend = () => {
      console.log('[SpeechRecognition]', 'end');
      this.recognizing = false;
      this.mic = this.mic_off;
    };
  };

  constructor(private navCtrl: NavController, private zone: NgZone, private helperService: HelperService, public platform: Platform) {
    this.recognition = null;
    this.recognizing = false;

    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      let _window = (<any>window);

      if (this.platform.is('cordova')) {
        this.recognition = new _window.SpeechRecognition();
        this.initializeRecognition();
      } else {
        if (!('webkitSpeechRecognition' in window)) {
          alert('¡API SpeechRecognition no soportada!');
          return;
        }

        this.recognition = new _window.webkitSpeechRecognition();
        this.initializeRecognition();
      }
    });
  }

  ngOnInit() { }

  ngOnChanges(changes:{[propKey: string]: SimpleChange}) {
    this.percent = 0;
    // // this.recognition = new SpeechRecognition();
    //
    // this.recognition.onresult = (event: Event) => {
    //   if (event['results'].length > 0) {
    //
    //     var temp = 0;
    //     for(let i = 0; i < 3; i++) {
    //       temp = this.helperService.dziemba_levenshtein(event['results'][i][0].transcript, this.curWord['content']);
    //
    //       if(temp > this.percent) {
    //         this.percent = temp;
    //         this.speaking = event['results'][i][0].transcript.toLowerCase();
    //       }
    //     }
    //
    //     if(this.isRecording) this.checkAnswer();
    //
    //     this.isRecording = false;
    //     // this.texts = 'ios-mic-outline';
    //
    //     this.zone.run(() => { });
    //   }
    // };
    //
    // this.recognition.onspeechstart = (event: Event) => {
    //   this.isRecording = true;
    //   // this.texts = 'ios-square-outline'
    //   this.zone.run(() => { });
    // }
  }
  processSpeech() {
   if (this.recognizing == false) {
     this.recognition.start();
     this.recognizing = true;
     this.mic = this.mic_on;
   } else {
     this.recognition.stop();
     this.recognizing = false;
     this.mic = this.mic_off;
   }
 }
  // record() {
  //   if(!this.isRecording) {
  //     this.recognition.startListening();
  //   } else {
  //     this.isRecording = false;
  //     this.texts = 'ios-mic-outline';
  //     this.recognition.abort();
  //   }
  // }
  // record() {
  //   let options = {
  //   language: 'en-US'
  //  }
  //   if(!this.isRecording) {
  //   this.speechRecognition.startListening(options)
  //     .subscribe(
  //       (matches: Array<string>) => console.log(matches),
  //       (onerror) => console.log('error:', onerror)
  //     )
  //   } else {
  //      this.isRecording = false;
  //      this.texts = 'ios-mic-outline';
  //      this.recognition.abort();
  //    }
  // }

  skip() {
    this.percent = 0;
    this.checkAnswer();
  }

  checkAnswer() {
    if(this.percent >= 80) {
      this.onCorrect.emit(true);
    } else {
      this.onCorrect.emit(false);
      setTimeout(() => {
        this.navCtrl.push(Learning, {
          word: this.curWord
        });
      }, 1000);
    }
    this.percent = 0;
  }
}
