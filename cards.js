const bang = {
    name: 'bang',
    image: '/stillNoUri',
    effect: function(socket, targetPlayer) {
        if(targetPlayer.handCards.includes(fallaste)) {
            socket.emit('bangResponse', { bangAttack: true })
        } else {
            targetPlayer.life = targetPlayer.life - 1;
        }
    }
}

const fallaste = {
    name: 'fallaste',
    image: '/stillNoUri'
}

const cards = {
    deck: [
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        bang,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
        fallaste,
    ],
    played: []
}

module.exports = cards;