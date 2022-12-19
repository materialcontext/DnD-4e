// take a string and convert it to camel case with the first letter of the first word not capitalized
export default function toCamelCase(str) {
    let output = str.split(' ').map((word, index) => {
        if (index === 0) {
            return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join('');
    return output;
};