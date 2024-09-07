 var window = {}
    const toLangShort = (lang) => {
        if (typeof lang !== 'string') return 1;
        if (lang.length > 2) lang = lang.substring(0, 2);

        switch (lang.toUpperCase()) {
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
                return 1;
        }
    };
    const currentApartmendId = (url) => {

        url = url || window.location.href;
        console.log('urlin:', url)
        if (url.indexOf('apartment-eggeri') !== -1) {
            return 12;
        }
        if (url.indexOf('chalet-firnrot') !== -1) {
            return 13;
        }
        if (url.indexOf('kornstadel-arida-prata') !== -1) {
            return 15;
        }
        if (url.indexOf('das-versteck') !== -1) {
            return 14;
        }
        if (url.indexOf('chalet-schinkenheim') !== -1) {
            return 17;
        }
        if (url.indexOf('maisonette-gentiana') !== -1) {
            return 16;

        }if (url.indexOf('eggeri') !== -1) {
            return 21;
        }
        if (url.indexOf('mona-lisa') !== -1) {
            return 22;
        }
        if (url.indexOf('bambi') !== -1) {
            return 23;
        }

        if(url.endsWith('/')  || url.endsWith('.ch')) {
            return 11;
        }

        throw 'APARTMENT NOT FOUND IN URL: ' + url;
    };

    const createJuliaLinkV2 = (_userId, _langId, _appartmentId) => {
        return `https://www.easy-booking.at/bookingengine2/${_userId}/${_langId}/category/${_appartmentId}`;
    };

     const embedJulia = (url) => {


       // const lang = window.navigator.language || window.navigator.languages[0] || window.navigator.userLanguage || 'DE';
        //const langshort = toLangShort(lang);
        const userId = '#7233';
        const appartmentId = currentApartmendId(url);
        const lang = window.navigator.language || window.navigator.languages[0] || window.navigator.userLanguage || 'DE';   
       
        var lang_num
        if (typeof lang !== 'string') return 1;
        if (lang.length > 2) lang = lang.substring(0, 2);

        switch (lang.toUpperCase()) {
            case 'EN':
                lang_num =  1;
            case 'DE':
                lang_num =   2;
            case 'NL':
                lang_num =   3;
            case 'IT':
                lang_num =   4;
            case 'FR':
                lang_num =   5;
            case 'HU':
                lang_num =  6;
            case 'RU':
                lang_num =   10;
            default:
                lang_num =   1;
        }
        
        const link = `https://www.easy-booking.at/bookingengine2/${userId}/${lang_num}/category/${appartmentId}`;

        window.open(link, '_blank');
        
    };



    embedJulia('.ch')
    embedJulia('bambi')   
    embedJulia('mona-lisa')
    // window.open('https://www.easy-booking.at/bookingengine2/#7233/2/category/11', '_blank');