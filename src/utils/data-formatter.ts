/**
 * @param id {number}  - An id.
 * @return {string}
 * @description A function that returns gender male or female.
 *
 */

export function returnGender(id: number) {
    if (id === 1) {
        return "Female";
    } else if (id === 2) {
        return "Male";
    } else {
        return "Other";
    }
}
