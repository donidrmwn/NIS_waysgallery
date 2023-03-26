export function ConvertFormatDate(date){
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let transDate  = new Date(date);
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(transDate)

    return formattedDate//date.toString("en-US",options)
}

export function ConvertFormatOnlyDate(date){
    let options = {  year: 'numeric', month: 'long', day: 'numeric' };
    let transDate  = new Date(date);
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(transDate)

    return formattedDate//date.toString("en-US",options)
}