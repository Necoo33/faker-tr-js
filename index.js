let data = require("./data.js");

// türkçe sahte veri kütüphanesi

// türkiyede halk ve elitlere has sahte veriler üretmeye yarayacak olan faker kütüphanesi.

class FakeDataGenerator {
    constructor () {
        this.folkNames = null;
        this.marginalNames = null;
        this.unisexNames = null;
        this.surnames = null;
        this.sameNameSurname = null;
        this.goodBuzzwords = null;
        this.usualBuzzwords = null;
        this.sentences = null;
    }

    loadFolkNames(){
        if(this.folkNames === null) {
            this.folkNames = data.folkNames
        }

        return this;
    }

    loadMarginalNames(){
        if(this.marginalNames === null) {
            this.marginalNames = data.marginalNames
        }

        return this;
    }

    loadUnisexNames(){
        if(this.unisexNames === null) {
            this.unisexNames = data.unisexNames
        }

        return this;
    }

    loadSurnames(){
        if (this.surnames === null) {
            this.surnames = data.surnames;
        };

        return this;
    }

    // good buzzwords, hem dükkan ismi olarak hem de metin generate ederken kullanılabilecek buzzword'ler:
    loadGoodBuzzwords(){
        if(this.goodBuzzwords === null) {
            this.goodBuzzwords = data.goodBuzzwords
        }
    }

    loadUsualBuzzwords(){
        if(this.usualBuzzwords === null) {
            this.usualBuzzwords = data.usualBuzzwords
        }
    }

    loadSentences(){
        if(this.sentences === null) {
            this.sentences = data.sentences;
        }
    }

    generateRandomLowercaseAsciiChar(){
        let chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        return chars.sort(() => Math.random() - 0.5)[0];
    }

    generateRandomUppercaseAsciiChar(){
        let chars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        return chars.sort(() => Math.random() - 0.5)[0];
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    // cinsiyet'e göre tercih. Eğer erkek ismi isteniyorsa 1, 
    // kadın ismi isteniyorsa 0, farketmez ise null değeri verilsin.
    generateFolkName(gender) {
        this.loadFolkNames();

        switch(gender) {
            case undefined: return this.folkNames.sort(() => Math.random() - 0.5)[0];
            case 0: return this.folkNames.filter(param => param.gender === 0).sort(() => Math.random() - 0.5)[0];
            case 1: return this.folkNames.filter(param => param.gender === 1).sort(() => Math.random() - 0.5)[0];
        }
    }

    generateMarginalName(gender) {
        this.loadMarginalNames();

        switch(gender) {
            case undefined: return this.marginalNames.sort(() => Math.random() - 0.5)[0];
            case 0: return this.marginalNames.filter(param => param.gender === 0).sort(() => Math.random() - 0.5)[0];
            case 1: return this.marginalNames.filter(param => param.gender === 1).sort(() => Math.random() - 0.5)[0];
        }
    }

    generateUnisexName() {
        this.loadUnisexNames();

        return this.unisexNames.sort(() => Math.random() - 0.5)[0];
    };

    generateSurname(withSon) {
        this.loadSurnames();

        let name = this.surnames.sort(() => Math.random() - 0.5)[0];

        if(withSon === true) {
            name += "oğlu";
        };

        return name;
    }

    generateNameWithSameSurname() {
        if (this.sameNameSurname === null) {
            this.sameNameSurname = [
                { gender: 1, name: "Ünal", origin: "tr" }, { gender: 1, name: "Ünsal", origin: "tr" }, { gender: 1, name: "Erdoğan", origin: "tr" },
                { gender: 1, name: "Erkan", origin: "ar" }, { gender: 1, name: "Ercan", origin: "tr" }, { gender: 1, name: "Cengiz", origin: "mon" }, 
                { gender: 1, name: "Timur", origin: "uz"}, { gender: 1, name: "Demir", origin: "tr" }, { gender: 1, name: "Önder", origin: "tr" },
                { gender: 1, name: "Ertuğrul", origin: "tr" }, { gender: 1, name: "Şahin", origin: "tr" }, { gender: 1, name: "Kartal", origin: "tr" },
                { gender: 1, name: "Coşkun", origin: "tr" }, { gender: 1, name: "Can", origin: "per" }, { gender: 1, name: "Özcan", origin: "tr" },
                { gender: 1, name: "Özkan", origin: "tr" }
            ]
        }

        let name = this.sameNameSurname.sort(() => Math.random() - 0.5)[0];

        return name.name + " " + name.name;
    }

    generateCompleteName(nameType){
        switch(nameType){
            case "folk": return `${this.generateFolkName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "marginal": return `${this.generateMarginalName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "unisex": return `${this.generateUnisexName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "same": return this.generateNameWithSameSurname();
            default: return `${this.generateFolkName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
        };
    };

    generateCompleteMaleName(nameType){
        switch(nameType){
            case "folk": return `${this.generateFolkName(1).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "marginal": return `${this.generateMarginalName(1).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "unisex": return `${this.generateUnisexName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "same": return this.generateNameWithSameSurname();
            default: return `${this.generateFolkName(1).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
        };
    };

    generateCompleteFemaleName(nameType){
        switch(nameType){
            case "folk": return `${this.generateFolkName(0).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "marginal": return `${this.generateMarginalName(0).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "unisex": return `${this.generateUnisexName().name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
            case "same": return this.generateNameWithSameSurname();
            default: return `${this.generateFolkName(0).name} ${Math.random() > 0.5 ? this.generateSurname(false) : this.generateSurname(true)}`;
        };
    };

    generateDummyEmail(domain, extension) {
        if(domain !== undefined && !domain && typeof domain !== "string") {
            throw new Error("email domain must be a string")
        }

        if(extension !== undefined && !extension && typeof extension !== "string") {
            throw new Error("email extension must be a string")
        }

        let marks = [".", "-", "_"];
        let famousDomains = ["gmail", "hotmail", "yahoo", "bing", "outlook", "icloud", "mynet"];
        let famousExtensions = [".com", ".co", ".net", ".biz"]
        let email = "";

        let randomNum = Math.floor(Math.random() * 10);

        switch(randomNum){
            case 1: randomNum += 3;
            case 2: randomNum += 2;
            case 3: randomNum += 1;
            default: randomNum;
        };

        for(let i = 0; i < randomNum; i++){
            email += this.generateRandomLowercaseAsciiChar();
        }

        email += marks.sort(() => Math.random() - 0.5)[0];

        for(let i = 0; i < 2; i++){
            email += `${this.generateRandomNumber()}`
        }

        email += "@";

        if(domain) {
            email += domain;
        } else {
            email += famousDomains.sort(() => Math.random() - 0.5)[0];
        }

        if(extension) {
            email += extension;
        } else {
            email += famousExtensions.sort(() => Math.random() - 0.15)[0];
        }

        return email;
    }

    generateRealisticEmail(domain, extension){
        if(domain !== undefined && !domain && typeof domain !== "string") {
            throw new Error("email domain must be a string");
        };

        if(extension !== undefined && !extension && typeof extension !== "string") {
            throw new Error("email extension must be a string");
        };

        let marks = [".", "-", "_"];
        let famousDomains = ["gmail", "hotmail", "yahoo", "bing", "outlook", "icloud", "mynet"];
        let famousExtensions = [".com", ".co", ".net", ".biz"]
        let email = this.generateFolkName().name;

        email += marks.sort(() => Math.random() - 0.5)[0];

        for(let i = 0; i < 2; i++){
            email += `${this.generateRandomNumber()}`
        }

        email += "@";

        if(domain) {
            email += domain;
        } else {
            email += famousDomains.sort(() => Math.random() - 0.5)[0];
        }

        if(extension) {
            email += extension;
        } else {
            email += famousExtensions.sort(() => Math.random() - 0.15)[0];
        }

        return email;
    }

    generateTurkishTelNum(withCountryCode){
        let telNum = "";
        let telPrefixes = ["501", "505", "506", "507", "530", "531", "532", "533", "534", "535", 
                           "536", "537", "538", "539", "541", "542", "543", "544", "545", "549", 
                           "551", "552", "553", "555"];

        telNum += telPrefixes.sort(() => Math.random() - 0.5)[0];

        for(let i = 0; i < 7; i++){
            let randomNum = this.generateRandomNumber();

            telNum += randomNum;
        }

        switch(withCountryCode){
            case true: return `90${telNum}`;
            case false: return telNum;
        }
    }

    generateParagraphWithWords(wordAmount){
        let text = "";
        
        this.loadUsualBuzzwords();
        this.loadGoodBuzzwords();
        
        let i = 0;
        
        while(i < wordAmount){
            let randomNum = this.generateRandomNumber();
            let wordsAdded = 0;
        
            for(let p = 0; p < wordAmount && i < wordAmount; p++){
                if(Math.random() < 0.5){
                    if(wordsAdded === 0){
                        let word = this.usualBuzzwords.sort(() => Math.random() - 0.5)[0];
                        let capitalizedWord = word.charAt(0).toLocaleUpperCase("tr") + word.slice(1);
                        text += capitalizedWord;
                    } else {
                        text += this.usualBuzzwords.sort(() => Math.random() - 0.5)[0];
                    }
                } else {
                    if(wordsAdded === 0){
                        let word = this.goodBuzzwords.sort(() => Math.random() - 0.5)[0];
                        let capitalizedWord = word.charAt(0).toLocaleUpperCase("tr") + word.slice(1);
                        text += capitalizedWord;
                    } else {
                        text += this.goodBuzzwords.sort(() => Math.random() - 0.5)[0];
                    }
                }
                    
                i++;
                wordsAdded++;
        
                if(wordsAdded === randomNum){
                    text += ". ";
                    wordsAdded = 0;
                    randomNum = this.generateRandomNumber();
                } else {
                    text += " ";
                }
            }
        }
        
        let ourText = text.trim();
        
        if(!ourText.endsWith(".")){
            ourText += ".";
        }
        
        return ourText;
    }

    generateParagraphWithSentences(sentenceAmount){
        let text = "";

        this.loadSentences();

        for(let i = 0; i < sentenceAmount; i++){
            text += this.sentences.sort(() => Math.random() - 0.5)[0];
            text += " ";
        };

        return text;
    }

    generateShopName(){
        let jobName = "";
        let jobs = ["Züccaciye", "Tuhafiye", "Nalbur", "Butik", "Market", "Şarküteri", "Erkek Kuaförü", "Kuaför",
            "Lojistik", "Döner", "İskender", "Restaurant", "İnternet Cafe", "Cafe", "Emlak", "Danışmanlık", "Hukuk Bürosu",
            "İletişim", "Bilgisayar", "Beyaz Eşyacılık", "Patiseri", "Kırtasiye", "Kuruyemiş", "Çiğköfte", "Piliç", "Kasap",
            "Taksi", "Tantuni", "Kebap", "Pastanesi", "Fırın", "Spor Kulübü", "Eczanesi", "Nakliyecilik", "Mühendislik", "Yazılım",
            "Boyacılık", "Hırdavat", "Mobilyacılık", "Otomotiv", "Petshop", "Elektrik", "Elektronik", "Tekstil", "Ticaret", "Kuyumculuk"
        ]

        this.loadGoodBuzzwords();
        this.loadFolkNames();

        if(Math.random() > 0.5){
            jobName += this.goodBuzzwords.sort(() => Math.random() - 0.5)[0];
            jobName += " ";
            jobName += jobs.sort(() => Math.random() - 0.5)[0];
        } else {
            jobName += this.folkNames.sort(() => Math.random() - 0.5)[0].name;
            jobName += " ";
            jobName += jobs.sort(() => Math.random() - 0.5)[0];
        }

        return jobName.charAt(0).toLocaleUpperCase("tr") + jobName.slice(1);
    }
}

module.exports = {
    FakeDataGenerator
}