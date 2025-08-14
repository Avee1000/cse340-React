
export default function sort(list, sortedBy) {
    if (sortedBy === "Year") {
        list.sort((a, b) => (b.inv_year || 0) - (a.inv_year || 0));
    } else if (sortedBy === "Lowest Price") {
        list.sort((a, b) => (a.inv_price || 0) - (b.inv_price || 0));
    } else if (sortedBy === "Highest Price") {
        list.sort((a, b) => (b.inv_price || 0) - (a.inv_price || 0));
    } else if (sortedBy === "Name") {
        list.sort((a, b) =>
            `${a.inv_make ?? ""} ${a.inv_model ?? ""}`.localeCompare(
                `${b.inv_make ?? ""} ${b.inv_model ?? ""}`
            )
        );
    }
}