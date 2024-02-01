export function parseElementsListToTextsList(elementList) {
    console.log(elementList)
    return [...elementList].map((element) =>
        element.textContent.trim().replace('  ', ' ')
    );
}