const timer = document.querySelector('.timer')
const calculator = document.querySelector('.calculator')
const outDefused = document.querySelectorAll('.output-text')

let time = 60
let code = []
const wraithCode = ['5', '2', '5', '4']

setInterval(() => {
    time--;
    timer.textContent = `00:${String(time % 60).padStart(2, '0')}`
    console.log(time);
    if (time === 0) {
        document.querySelector('.lose').style.display = 'flex'
        document.querySelector('body').style.backgroundColor = 'gray'
    }
    clearInterval(time + 1)
}, 1000)

const defuseValues = (arr) => {
    outDefused.forEach((item, index) => {
        item.textContent = arr[index]
        if (arr.length === 4) {
            let count = 0
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === wraithCode[i]) {
                    outDefused[i].style.backgroundColor = "green"
                    count++
                } else {
                    outDefused[i].style.backgroundColor = "red"
                }
            }
            if (count === 4) {
                document.querySelector('.win').style.display = "flex"
                document.querySelector('body').style.backgroundColor = 'gray'
                document.querySelector('.time-defused').textContent = `You had ${time} seconds to spare`
            } else {
                setTimeout(reset, 500)
                code = []
            }
        }
    })
}

calculator.addEventListener("click", (event) => {
    const data = event.target.textContent
    if (event.target.classList.contains("num")) {
        code.push(data)
        defuseValues(code)
    }
})

const reset = () => {
    outDefused.forEach(item => {
        item.style.backgroundColor = "gray"
        item.textContent = '0'
    })
}