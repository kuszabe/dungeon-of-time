//initalizeee the game
kaboom()

//create variables
const WOBBLESPEED = 1.5
const MAXWOBBLE = 8
const PLAYERSPEED = 50

//load the assets
loadBean()

//make the player
const player = add([
    sprite("bean"),
    pos(0,0),
    anchor("center"),
    rotate(0),
    //this tells us which direction to rotate in the walk anim(wobble)
    {wobbledir: 1, positionlastframe: vec2(0,0),}
])

//make the sword
const sword = player.add([
    rect(10,50),
    pos(0,0),
    anchor("bot"),
    rotate(player.pos.angle(mousePos()))
])

//rotate it towards the mouse

sword.onUpdate(() => {
    sword.rotateTo(player.pos.angle(toWorld(mousePos()))-90)
})

function attack() {
    
}

player.rotateTo(8)

//make him wobble
player.onUpdate(() => {
    if (player.positionlastframe != player.pos) {
        console.log("mozognom kéne")
        player.rotateBy(WOBBLESPEED * player.wobbledir)
        if (Math.abs(player.angle) > MAXWOBBLE) player.wobbledir *= -1
    } else {
        player.angle = 0
    }
    player.positionlastframe = player.pos
})

//this moves the player

onKeyDown("right", () => {
    player.move(PLAYERSPEED,0)
})

onKeyDown("left", () => {
    player.move(-PLAYERSPEED,0)
})

onKeyDown("down", () => {
    player.move(0,PLAYERSPEED)
})

onKeyDown("up", () => {
    player.move(0,-PLAYERSPEED)
})