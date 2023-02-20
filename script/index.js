const timer = document.querySelector('.timer')
const calculator = document.querySelector('.calculator')
const outDefused = document.querySelectorAll('.output-text')
const btn = document.querySelectorAll('button')

let time = 60
let defuseCode = []
let usedCodes = []
const randomCode = () => {
    for (let i = 0; i < 4; i++) {
        usedCodes.push(Math.floor(Math.random() * 10))
    }
    return usedCodes
}
console.log(randomCode());

setInterval(() => {
    time--;
    timer.textContent = `00:${String(time % 60).padStart(2, '0')}`
    if (time === 0) {
        document.querySelector('.lose').style.display = 'flex'
        document.querySelector('body').style.backgroundColor = 'gray'
    }
    clearInterval(time + 1)
}, 1000)

const set_color = (resultColor, code, defuse) => {
    let count = 0
    for (let i = 0; i < code.length; i++) {
        if (code[i] === defuse[i]) {
            resultColor[i].classList.add('green')
            count++
        } else {
            resultColor[i].classList.add('red')
        }

    }
    win(count)
}

const defuseValues = (testedCode) => {
    outDefused.forEach((item, index) => {
        item.textContent = testedCode[index]
    })
    if (testedCode.length === 4) {
        set_color(outDefused, usedCodes, defuseCode)
    }
}

const win = (counter) => {
    if (counter === 4) {
        document.querySelector('.win').style.display = "flex"
        document.querySelector('body').style.backgroundColor = 'gray'
        document.querySelector('.time-defused').textContent = `You had ${time} seconds to spare`
    } else {
        setTimeout(reset, 500)
        defuseCode = []
    }
}

calculator.addEventListener("click", (event) => {
    const data = event.target.textContent
    if (event.target.classList.contains("num")) {
        defuseCode.push(+data)
        defuseValues(defuseCode)
    }
})

const reset = () => {
    outDefused.forEach(item => {
        item.textContent = '0'
        if (item.classList.contains('green') || item.classList.contains('red')) {
            item.classList.remove('green')
            item.classList.remove('red')
        }
    })
}

btn.forEach(item => {
    item.addEventListener("click", () => {
        location.reload()
    })
})
