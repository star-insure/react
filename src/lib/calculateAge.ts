/**
 * Calculate someone's age from a date of birth.
 * @param date YYYY-MM-DD
 */
 export function calculateAge(date: string): number {
    const today = new Date();

    const birthDate = new Date(date);

    const age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }

    return age;
}
