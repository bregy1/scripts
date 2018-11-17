


function getLang(short) {
    if(!short || typeof short !== 'string') return 1;
    if(short.length > 2) short = short.substring(0, 2);

    switch(short.toUpperCase()) {
        case 'EN':
            return 1;
        case 'DE':
            return 2;
        case 'NL':
            return 3;
        case 'IT':
            return 4;
        case 'FR': 
            return 5;
        case 'HU': 
            return 6;
        case 'RU':
            return 10;
        default: 
            return 1
    }
}

/*

ID	Sprache
1	Englisch en
2	Deutsch de
3	Niederländisch nl
4	Italienisch it
5	Französisch fr
6	Ungarisch hu
10	Russisch ru

*/