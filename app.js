const puzzleBoard = document.querySelector('#puzzle')
const solveBtn = document.querySelector('#solve-button')
const solutionDisplay = document.querySelector('#solution')
const squares = 81
const submition = []

for (let i = 0; i < squares; i++) {
  const inputEl = document.createElement('input')
  inputEl.setAttribute('type', 'number')
  inputEl.setAttribute('min', '1')
  inputEl.setAttribute('max', '9')
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputEl.classList.add('color-section')
  }
  puzzleBoard.appendChild(inputEl)
}

const joinValues = () => {
  const inputs = document.querySelectorAll('input')
  inputs.forEach((input) => {
    if (input.value) {
      submition.push(input.value)
    } else {
      submition.push('.')
    }
  })
  console.log(submition)
}

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll('input')
  if (isSolvable && solution) {
    inputs.forEach((input, i) => {
      input.value = solution[i]
    })
    solutionDisplay.innerHTML = 'Solved!'
  } else {
    solutionDisplay.innerHTML = 'Can not solve'
  }
}
const solve = () => {
  joinValues()
  const data = { numbers: submition.join('') }
  console.log('data', data)
  fetch('http://localhost:4000/solve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      populateValues(data.solvable, data.solution)
    })
    .catch((error) => {
      console.error(error)
    })
}
solveBtn.addEventListener('click', solve)
