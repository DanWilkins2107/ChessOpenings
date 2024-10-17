export default function getDifferenceOfDays(date1, date2) {
    // Get the calendar date for both dates (year, month, day)
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    // Get the difference in time (milliseconds)
    const msDifference = d2 - d1;

    // Convert to days (milliseconds in a day = 1000 * 60 * 60 * 24)
    const daysDifference = msDifference / (1000 * 60 * 60 * 24);

    // If they're on different calendar days, return at least 1 day, otherwise return 0
    return Math.max(0, Math.ceil(daysDifference));
}