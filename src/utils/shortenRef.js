export default function shortenRef(ref) {
    // given a reference comma separated string of references, return just the first one
    if (ref) {
        return ref.split(',')[0];
    }
    return '';
}