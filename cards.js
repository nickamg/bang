const bang = {
    name: 'Bang',
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
    name: 'Fallaste',
    image: '/stillNoUri'
}

const cards = {
    deck: [
        bang,
        bang,
        bang,
        fallaste,
        fallaste,
        fallaste
    ],
    played: []
}