const translateBtn = document.querySelector(".translate-btn"),
selectLanguage = document.querySelectorAll("select"),
fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector("#exchange"),
icons = document.querySelectorAll(".icons i"),
countries = {
    "en-GB": "English",
    "th-TH": "Thai",
    "ar-SA": "Arabic",
    "am-ET": "Amharic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

//Add language into select language option
selectLanguage.forEach((language, id) => {
    for (const country_language in countries) {
        //Selected english to Thai by default
        let selectedDefault;
        if(id == 0 && country_language == "en-GB") {
            selectedDefault = "selected";
        } else if(id == 1 && country_language == "th-TH"){
            selectedDefault = "selected";
        }

        let option = `<option value="${country_language}">${countries[country_language]}</option>`;
        //insert what we create to select language option
        language.insertAdjacentHTML("beforeend", option)
    }
});

//click exchange icon to change text to translate field and change option language each other
exchangeIcon.addEventListener("click", () => {
    let changeText = fromText.value,
    changeLang = selectLanguage[0].value;
    fromText.value = toText.value;
    selectLanguage[0].value = selectLanguage[1].value;
    toText.value = changeText;
    selectLanguage[1].value = changeLang;
})

//translate-btn click and get translated
translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    translateFrom = selectLanguage[0].value,
    translateTo = selectLanguage[1].value;
    if(!text) return"";
    toText.setAttribute("placeholder", "Translating...")
    let translateApi = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    //fetching API response and returning it. and parsing it into JS
    fetch(translateApi).then(res => res.json().then(data =>{
        toText.value = data.responseData.translatedText;
    }))
});


//Let's do icons works
icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        //Copy buttons for both from-text and to-text,
        if(target.classList.contains("fa-copy")){
            if(target.id == "fromIcon"){
                navigator.clipboard.writeText(fromText.value);
            } else{
                navigator.clipboard.writeText(toText.value);
            }
            //Speech button
        } else {
            let utterance;
                if(target.id =="from"){
                    utterance = new SpeechSynthesisUtterance(fromText.value);
                    utterance.lang = selectLanguage[0].value;
                }else{
                    utterance = new SpeechSynthesisUtterance(toText.value);    
                    utterance.lang = selectLanguage[1].value;
                }
                speechSynthesis.speak(utterance); //speak the utterance      
            
            }
    })
})