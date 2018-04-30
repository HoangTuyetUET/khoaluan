import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class HelperService {
  constructor(public toastCtrl: ToastController) { }

  random(range): number {
    return Math.floor(Math.random() * range);
  }

  presentToast(txt) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 5000,
      position: 'bottom',
      showCloseButton: true,
      // closeButtonText: 'Got it!',
      dismissOnPageChange: true
    });

    toast.present();
  }
  countPoint(a,b){
    var count=0;
    var char1 = b.split('');
    var char2 = a.split('');
    var leg;
    if (a == b) return 100;
    if (a.length == 1 && b.length == 1) return 0;
    count += Math.abs(a.length - b.length);
    if (a.length > b.length) leg = b.length;
    else leg = a.length;
    for (let i=0; i<b.length; i++) {
      if(char1[i] != char2[i]) count++;
    }
    var ss = Math.round(a.length/2.0);
    if(count >ss) return 0;
    if((ss - count) == 0) return 50;
    if((ss - count) == 1) return 70;
    if((ss - count) == 2) return 80;
    if((ss - count) == 3) return 90;
    return 0;

  }

  // dziemba_levenshtein(a, b){
  //   var tmp;
  //   if (a.length === 0) { return b.length; }
  //   if (b.length === 0) { return a.length; }
  //   if (a.length > b.length) { tmp = a; a = b; b = tmp; }
  //
  //   var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
  //   for (i = 0; i <= alen; i++) { row[i] = i; }
  //
  //   for (i = 1; i <= blen; i++) {
  //     res = i;
  //     for (j = 1; j <= alen; j++) {
  //       tmp = row[j - 1];
  //       row[j - 1] = res;
  //       res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
  //     }
  //   }
  //   return res;
  // }
  //
  // soundex (s) {
  //   var a = s.toLowerCase().split(''),
  //       f = a.shift(),
  //       r = '',
  //       codes = {
  //           a: '', e: '', i: '', o: '', u: '', w: '', h: '', y: '',
  //           b: 1, f: 1, p: 1, v: 1,
  //           c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
  //           d: 3, t: 3,
  //           l: 4,
  //           m: 5, n: 5,
  //           r: 6
  //       };
  //
  //   r = f + a
  //       .map(function (v, i, a) { return codes[v] })
  //       .filter(function (v, i, a) {
  //           return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
  //       })
  //       .join('');
  //
  //   return (r + '000').slice(0, 4).toUpperCase();
  // };
}
