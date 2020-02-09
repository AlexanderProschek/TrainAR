const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

const torchLinks = {
    1: 'https://home.torch.app/webar/bIUd2Tdd9VnoptnzCxXU',
    2: 'https://home.torch.app/webar/9dETPQrJlR7On0NfMkXr',
    3: 'https://home.torch.app/webar/rclGCufHLmPonOV6PdKy',
}

var users = [
]

app.use(cookieParser())

app.use(express.static(__dirname + '/public'))

app.get('/m/:id', (req, res) => {
    console.log(users)
    if (users.includes(req.cookies.trainID)) {
        // User has a workout plan
        res.sendFile(__dirname + `/public/m${req.params.id}.html`)
    } else {
        res.redirect(torchLinks[req.params.id])
    }
})

app.get('/auth', (req, res) => {
    if (users.includes(req.cookies.trainID)) {
        res.send('Already Authenticated')
    } else {
        let trainID = Math.random().toString(36)
        users.push(trainID)
        res.cookie('trainID', trainID, { expires: new Date(Date.now() + 900000) })
        res.send({ msg: 'User successfully athenticated', status: 0 })
    }
})

app.get('/deauth', (req, res) => {
	users = []
	res.send({ msg: 'User successfully deathenticated', status: 0 })
})

app.listen(80)
