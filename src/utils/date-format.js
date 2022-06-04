export function dateToJS(dateString) {
    let dateObject
    if (dateString) {
        let dateParts = dateString?.split("/");
        // month is 0-based, that's why we need dataParts[1] - 1
        dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    } else {
        dateObject = null
    }
    return (dateObject)
}