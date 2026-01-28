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

const rows = tBody.querySelectorAll('tr');

rows.forEach((row) => {
  row.addEventListener('click', () => {
    const previousActive = document.querySelectorAll('tr.active');

    if (previousActive) {
      previousActive.forEach((activeRow) => {
        activeRow.classList.remove('active');
      });
    }

    row.classList.add('active');
  });
});

const form = document.createElement('form');

form.classList.add('new-employee-form');

const inputNameLabel = document.createElement('label');

inputNameLabel.textContent = 'Name: ';

const inputName = document.createElement('input');

inputNameLabel.append(inputName);
inputName.type = 'text';
inputName.name = 'name';
inputName.required = true;
inputName.dataset.qa = 'name';

const inputPositionLabel = document.createElement('label');

inputPositionLabel.textContent = 'Position: ';

const inputPosition = document.createElement('input');

inputPositionLabel.append(inputPosition);
inputPosition.type = 'text';
inputPosition.name = 'position';
inputPosition.dataset.qa = 'position';

const selectOfficeLabel = document.createElement('label');

selectOfficeLabel.textContent = 'Office: ';

const selectOffice = document.createElement('select');

selectOfficeLabel.append(selectOffice);
selectOffice.name = 'office';
selectOffice.required = true;
selectOffice.dataset.qa = 'office';

const offices = [
  'Tokyo',
  'Singapore',
  'London',
  'New York',
  'Edinburgh',
  'San Francisco',
];

offices.forEach((office) => {
  const option = document.createElement('option');

  option.value = office;
  option.textContent = office;
  selectOffice.append(option);
});

const inputAgeLabel = document.createElement('label');

inputAgeLabel.textContent = 'Age: ';

const inputAge = document.createElement('input');

inputAgeLabel.append(inputAge);
inputAge.type = 'number';
inputAge.name = 'age';
inputAge.required = true;
inputAge.dataset.qa = 'age';

const inputSalaryLabel = document.createElement('label');

inputSalaryLabel.textContent = 'Salary: ';

const inputSalary = document.createElement('input');

inputSalaryLabel.append(inputSalary);
inputSalary.type = 'number';
inputSalary.name = 'salary';
inputSalary.required = true;
inputSalary.dataset.qa = 'salary';

const submitButton = document.createElement('button');

submitButton.type = 'submit';
submitButton.textContent = 'Save to table';

form.append(
  inputNameLabel,
  inputPositionLabel,
  selectOfficeLabel,
  inputAgeLabel,
  inputSalaryLabel,
  submitButton,
);

document.body.append(form);

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputName.value.length < 4) {
    showNotification('Name must be at least 4 characters long.', 'error');

    return;
  }

  const newRow = document.createElement('tr');

  const nameCell = document.createElement('td');

  nameCell.textContent = inputName.value;
  newRow.append(nameCell);

  if (inputPosition.value === '') {
    showNotification('Position cannot be empty.', 'error');

    return;
  }

  const positionCell = document.createElement('td');

  positionCell.textContent = inputPosition.value;
  newRow.append(positionCell);

  const officeCell = document.createElement('td');

  officeCell.textContent = selectOffice.value;
  newRow.append(officeCell);

  if (inputAge.value < 18 || inputAge.value > 90) {
    showNotification('Age must be between 18 and 90.', 'error');

    return;
  }

  const ageCell = document.createElement('td');

  ageCell.textContent = inputAge.value;
  newRow.append(ageCell);

  const salaryCell = document.createElement('td');

  salaryCell.textContent = `$${parseFloat(inputSalary.value).toLocaleString()}`;
  newRow.append(salaryCell);

  tBody.append(newRow);

  const notification = document.createElement('div');

  showNotification('All data saved successfully.', 'success');

  setTimeout(() => {
    notification.remove();
  }, 3000);

  form.reset();
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.textContent = message;
  notification.classList.add('notification', type);
  notification.dataset.qa = 'notification';
  document.body.append(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
