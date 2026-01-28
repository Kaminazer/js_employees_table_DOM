'use strict';

const tHeaderTitles = document.querySelectorAll('thead tr th');
const tBody = document.querySelector('tbody');

tHeaderTitles.forEach((title, colIndex) => {
  title.addEventListener('click', () => {
    const tRows = tBody.querySelectorAll('tr');
    const rowArray = Array.from(tRows);

    rowArray.sort((rowA, rowB) => {
      const cellA = rowA.cells[colIndex].textContent;
      const cellB = rowB.cells[colIndex].textContent;
      const textA = cellA.replace('$', '').replace(',', '').trim();
      const textB = cellB.replace('$', '').replace(',', '').trim();
      const numA = parseFloat(textA);
      const numB = parseFloat(textB);

      if (!isNaN(numA) && !isNaN(numB)) {
        return numA - numB;
      }

      return textA.localeCompare(textB);
    });

    if (title.ascSorted === true) {
      rowArray.reverse();
      title.ascSorted = false;
    } else {
      title.ascSorted = true;
    }

    tBody.append(...rowArray);
  });
});
