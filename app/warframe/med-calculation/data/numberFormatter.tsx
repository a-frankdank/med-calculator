

// france uses spaces, good enough
// 1 000 000 000
let browserLang = "fr-FR";

export const floatingPointFormatter: Intl.NumberFormat = new Intl.NumberFormat(browserLang, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const numberFormatter: Intl.NumberFormat = new Intl.NumberFormat(browserLang);