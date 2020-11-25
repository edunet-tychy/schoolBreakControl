/*jshint esversion: 6 */

const pn = document.querySelector("#pn");
const wt = document.querySelector("#wt");
const sr = document.querySelector("#sr");
const cz = document.querySelector("#cz");
const pt = document.querySelector("#pt");
const czas = document.querySelector("h3");

// Pusta tablica dyżurów
const tabDyzury = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

/*
  Przypisanie danych do tablicy dyżurów
  '1:II piętro' -> 1 - oznacza dyżur; : - oddzielenie części pierwszej od drugiej; II piętro - oznacza miejsce dyżuru
*/

// Poniedziałek
tabDyzury[0][6] = '1:Wejście';
// Wtorek
tabDyzury[1][2] = '1:II piętro';
tabDyzury[1][3] = '1:II piętro';
// Środa
tabDyzury[2][5] = '1:Wejście';
// Czwartek
tabDyzury[3][4] = '1:Wejście';
// Piątek
tabDyzury[4][0] = '1:II piętro';
tabDyzury[4][4] = '1:Patio';

// Tablica przerwy
const przerwy = [
    '7:05-7:10',
    '7:55-8:00',
    '8:45-8:50',
    '9:35-9:40',
    '10:25-10:35',
    '11:20-11:30',
    '12:15-12:30',
    '13:15-13:25',
    '14:10-14:20'
];

// Tablica dni
const tabDni = [
    [pn_1, pn_2, pn_3, pn_4, pn_5, pn_6, pn_7, pn_8, pn_9],
    [wt_1, wt_2, wt_3, wt_4, wt_5, wt_6, wt_7, wt_8, wt_9],
    [sr_1, sr_2, sr_3, sr_4, sr_5, sr_6, sr_7, sr_8, sr_9],
    [cz_1, cz_2, cz_3, cz_4, cz_5, cz_6, cz_7, cz_8, cz_9],
    [pt_1, pt_2, pt_3, pt_4, pt_5, pt_6, pt_7, pt_8, pt_9]
];

function dzienTyg(dz) {

    let dzien = "Niedziela";

    switch (dz) {
        case 0:
            dzien = "Niedziela";
            break;
        case 1:
            dzien = "Poniedziałek";
            pn.classList.add("dzien");
            break;
        case 2:
            dzien = "Wtorek";
            wt.classList.add("dzien");
            break;
        case 3:
            dzien = "Środa";
            sr.classList.add("dzien");
            break;
        case 4:
            dzien = "Czwartek";
            cz.classList.add("dzien");
            break;
        case 5:
            dzien = "Piątek";
            pt.classList.add("dzien");
            break;
        case 6:
            dzien = "Sobota";
            break;
    }
    return dzien;
}

function godzina() {
    let d = new Date(), dzien = d.getDay(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    
    if (s <= 9) s = "0" + s;
    if (m <= 9) m = "0" + m;
    czas.innerHTML = dzienTyg(dzien)+", godz. "+h+":"+m+":"+s;
    if (dzien > 0 && dzien < 6) dyzur(dzien, h, m);
}

function dyzur(dzien, h, m){

    godz_1.classList.remove("dyzur");
    godz_2.classList.remove("dyzur");
    godz_3.classList.remove("dyzur");
    godz_4.classList.remove("dyzur");
    godz_5.classList.remove("dyzur");
    godz_6.classList.remove("dyzur");
    godz_7.classList.remove("dyzur");
    godz_2.classList.remove("dyzur");
    godz_9.classList.remove("dyzur");

    if(h == 7){
        if (m >= 5 && m <= 10) {
            godz_1.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 0);
        }
        if (m >= 55 && m <= 59) {
            godz_2.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 1);
        }
    }

    if (h == 8) {
        if (m >= 45 && m <= 50) {
            godz_3.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 2);
        }
    }

    if (h == 9) {
        if (m >= 35 && m <= 40) {
            godz_4.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 3);
        }
    }

    if (h == 10) {
        if (m >= 25 && m <= 35) {
            godz_5.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 4);
        }
    }

    if (h == 11) {
        if (m >= 20 && m <= 30) {
            godz_6.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 5);           
        }
    }

    if (h == 12) {
        if (m >= 15 && m <= 30) {
            godz_7.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 6);              
        }
    }

    if (h == 13) {
        if (m >= 15 && m <= 25) {
            godz_8.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 7);
        }
    }

    if (h == 14) {
        if (m >= 10 && m <= 20) {
            godz_9.classList.add("dyzur");
            aktywnyDyzur(tabDyzury, dzien - 1, 8);
        }
    }
}

let stan = setInterval(godzina, 1000);

for (let i = 1; i <= 9; i++) {
    const godz_i = document.querySelector("#godz_" + i);
    godz_i.setAttribute("data-toggle", "tooltip");
    godz_i.setAttribute("title", przerwy[i-1]);
}

for(let i=1; i<=9; i++){
    const pn_i = document.querySelector("#pn_"+i);
}

for(let i=1; i<=9; i++){
    const wt_i = document.querySelector("#wt_"+i);
}

for (let i = 1; i <= 9; i++) {
    const sr_i = document.querySelector("#sr_" + i);
}

for (let i = 1; i <= 9; i++) {
    const cz_i = document.querySelector("#cz_" + i);
}

for (let i = 1; i <= 9; i++) {
    const pt_i = document.querySelector("#pt_" + i);
}

function ustawienia(){
    if (window.innerWidth <= 500) {

        godz_1.innerHTML = "1";
        godz_2.innerHTML = "2";
        godz_3.innerHTML = "3";
        godz_4.innerHTML = "4";
        godz_5.innerHTML = "5";
        godz_6.innerHTML = "6";
        godz_7.innerHTML = "7";
        godz_8.innerHTML = "8";
        godz_9.innerHTML = "9";

        pn.innerHTML = "PN";
        wt.innerHTML = "WT";
        sr.innerHTML = "SR";
        cz.innerHTML = "CZ";
        pt.innerHTML = "PT";

    } else {

        godz_1.innerHTML = "7:05-7:10";
        godz_2.innerHTML = "7:55-8:00";
        godz_3.innerHTML = "8:45-8:50";
        godz_4.innerHTML = "9:35-9:40";
        godz_5.innerHTML = "10:25-10:35";
        godz_6.innerHTML = "11:20-11:30";
        godz_7.innerHTML = "12:15-12:30";
        godz_8.innerHTML = "13:15-13:25";
        godz_9.innerHTML = "14:10-14:20";

        pn.innerHTML = "Poniedziałek";
        wt.innerHTML = "Wtorek";
        sr.innerHTML = "Środa";
        cz.innerHTML = "Czwartek";
        pt.innerHTML = "Piątek";
    }
}

// Wyróżnienie zaplanowanych dyżurów
function statusDyzur() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 9; j++) {
            if (Number(String(tabDyzury[i][j]).substring(0, 1)) == 1) {
                tabDni[i][j].classList.add("status");
                tabDni[i][j].innerHTML = String(tabDyzury[i][j]).substring(2);
                tabDni[i][j].setAttribute("data-toggle", "tooltip");
                tabDni[i][j].setAttribute("title", przerwy[j]);
            }
            
        }
    }
}

// Zaznaczenie aktywnych dyżurów
function aktywnyDyzur(tabDyzury, dzien, h){
    for(let i=0;i<5;i++){
        for(let j=0;j<9;j++){
            if (Number(String(tabDyzury[i][j]).substring(0, 1)) == 1){
                if(dzien == i && h == j){
                    tabDni[i][j].classList.add("dyzur"); 
                }
            }
        }
    }
}

// Reakcja na zmiany rozmiaru okna
window.addEventListener("resize", function () {
    ustawienia();
});

// Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Uruchomione funkcje
ustawienia();
godzina();
statusDyzur();