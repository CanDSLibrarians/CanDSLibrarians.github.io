const renderTable = ({ data }) => {
  const [header, ...rows] = data;
  const table = document.createElement("table");
  const headerHtml = `<thead><tr>${header
    .map((val) => `<th>${val}</th>`)
    .join("")}</tr></thead>`;
  const bodyHtml = `<tbody>${rows
    .map((row) => {
      return `<tr>${row.map((val) => `<td>${val}</td>`).join("")}</tr>`;
    })
    .join("")}</tbody>`;
  table.insertAdjacentHTML("beforeend", `${headerHtml}${bodyHtml}`);
  return table;
};

/**
 * Insert line break opportunities into a URL
 * Taken with thanks from https://css-tricks.com/better-line-breaks-for-long-urls/
 */
const formatUrl = (url) => {
  // Split the URL into an array to distinguish double slashes from single slashes
  const doubleSlash = url.split("//");
  // Format the strings on either side of double slashes separately
  const formatted = doubleSlash
    .map(
      (str) =>
        // Insert a word break opportunity after a colon
        str
          .replace(/(?<after>:)/giu, "$1<wbr>")
          // Before a single slash, tilde, period, comma, hyphen, underline, question mark, number sign, or percent symbol
          .replace(/(?<before>[/~.,\-_?#%])/giu, "<wbr>$1")
          // Before and after an equals sign or ampersand
          .replace(/(?<beforeAndAfter>[=&])/giu, "<wbr>$1<wbr>")
      // Reconnect the strings with word break opportunities after double slashes
    )
    .join("//<wbr>");
  return formatted;
};

const handleTable = (table) => {
  const parent = table.parentElement;
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table__container");
  parent.insertAdjacentElement("beforeend", tableContainer);
  tableContainer.insertAdjacentElement("beforeend", table);
  table.querySelectorAll("td").forEach((td) => {
    const text = td.innerText;
    if (/^https?:\/\//gi.test(text)) {
      td.innerHTML = `<a href="${text}">${formatUrl(text)}</a>`;
    }
  });
};

const init = () => {
  document.querySelectorAll("table").forEach(handleTable);
  document.querySelectorAll(".embed").forEach((div) => {
    const loader = div.querySelectorAll(".loader");
    const src = div.getAttribute("data-src");
    const url = `https://docs.google.com/spreadsheets/d/e/${src}/pub?output=csv`;
    Papa.parse(url, {
      download: true,
      complete: (results) => {
        const table = renderTable(results);
        if (table) {
          div.insertAdjacentElement("beforeend", table);
          handleTable(table);
          loader.forEach((loader) => (loader.style.display = "none"));
        }
      },
    });
  });
};

document.addEventListener("DOMContentLoaded", init);
