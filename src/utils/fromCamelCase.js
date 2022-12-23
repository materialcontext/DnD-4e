// takes a string a dn returns a string with spaces between words
// and the first letter of each word capitalized
export default function fromCamelCase (str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1').trim()
}