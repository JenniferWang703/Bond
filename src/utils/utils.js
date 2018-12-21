export function formatEndDatePretty(timeStampMilli){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    const date = new Date(timeStampMilli);
    return monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}

export function formatEndDate(timeStampMilli){
    const date = new Date(timeStampMilli);
    return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
}