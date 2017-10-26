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
  
  dziemba_levenshtein(a, b){
    var tmp;
    if (a.length === 0) { return b.length; }
    if (b.length === 0) { return a.length; }
    if (a.length > b.length) { tmp = a; a = b; b = tmp; }
  
    var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
    for (i = 0; i <= alen; i++) { row[i] = i; }
  
    for (i = 1; i <= blen; i++) {
      res = i;
      for (j = 1; j <= alen; j++) {
        tmp = row[j - 1];
        row[j - 1] = res;
        res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
      }
    }
    return res;
  }

  soundex (s) {
    var a = s.toLowerCase().split(''),
        f = a.shift(),
        r = '',
        codes = {
            a: '', e: '', i: '', o: '', u: '',
            b: 1, f: 1, p: 1, v: 1,
            c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
            d: 3, t: 3,
            l: 4,
            m: 5, n: 5,
            r: 6
        };

    r = f +
        a
        .map(function (v, i, a) { return codes[v] })
        .filter(function (v, i, a) {
            return ((i === 0) ? v !== codes[f] : v !== a[i - 1]);
        })
        .join('');

    return (r + '000').slice(0, 4).toUpperCase();
  };
}
