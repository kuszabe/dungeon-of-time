//initalizeee the game
kaboom()

//create variables
const WOBBLESPEED = 1.5
const MAXWOBBLE = 8
const PLAYERSPEED = 100

//load the assets
loadBean()
scene("game", () => {
    //make the player
    const player = add([
        sprite("bean"),
        pos(center()),
        anchor("center"),
        rotate(0),
        //this tells us which direction to rotate in the walk anim(wobble)
        { wobbledir: 1, positionlastframe: vec2(0, 0), }
    ])

    let enemy = add([
        pos(0,0),
        goblin(0,50)
    ])

    //make the sword
    const sword = player.add([
        rect(10, 50),
        pos(0, 0),
        anchor("bot"),
        rotate(player.pos.angle(mousePos())),
        { duration: 0.1, attack: false, rotationoffset: 240, swing:90}
    ])

    //rotate it towards the mouse

    sword.onUpdate(() => {
        if (toWorld(mousePos()).x < player.pos.x) {
            if (sword.rotationoffset > 0) sword.rotationoffset *= -1
            console.log("posititve")
            sword.anchor = "top"
            if (sword.rotationoffset > 0) sword.rotationoffset *= -1
            if (sword.swing > 0) sword.swing *= -1
        } else {
            console.log("negatif")
            if (sword.rotationoffset < 0) sword.rotationoffset *= -1
            if (sword.swing < 0) sword.swing *= -1
            sword.anchor = "bot"
        }
        sword.rotateTo((player.pos.angle(mousePos()))  + sword.rotationoffset)
    })

    let curTween = null

    onClick(() => {
        attack()
    })

    function attack() {
        if (sword.attack) return
        sword.attack = true
        // start the tween
        curTween = tween(
            // start value (accepts number, Vec2 and Color)
            sword.rotationoffset,
            // destination value
            sword.rotationoffset + sword.swing,
            // duration (in seconds)
            sword.duration,
            // how value should be updated
            (val) => sword.rotationoffset = val,
            // interpolation function (defaults to easings.linear)
            easings.bounceOut,
        )

        wait(sword.duration, () => {
            if (curTween) curTween.cancel()
            // start the tween
            curTween = tween(
                // start value (accepts number, Vec2 and Color)
                sword.rotationoffset,
                // destination value
                sword.rotationoffset - sword.swing,
                // duration (in seconds)
                sword.duration,
                // how value should be updated
                (val) => sword.rotationoffset = val,
                // interpolation function (defaults to easings.linear)
                easings.easeIn,
            )
            wait(sword.duration, () => {
                sword.attack = false
                curTween.cancel()
            })
        })
    }

    //make him wobble
    player.onUpdate(() => {
        if (player.positionlastframe != player.pos) {
            player.rotateBy(WOBBLESPEED * player.wobbledir)
            if (Math.abs(player.angle) > MAXWOBBLE) player.wobbledir *= -1
        } else {
            player.angle = 0
        }
        player.positionlastframe = player.pos
    })

    //this moves the player
    onKeyDown("d", () => {
        player.move(PLAYERSPEED, 0)
    })

    onKeyDown("a", () => {
        player.move(-PLAYERSPEED, 0)
    })

    onKeyDown("s", () => {
        player.move(0, PLAYERSPEED)
    })

    onKeyDown("w", () => {
        player.move(0, -PLAYERSPEED)
    })

    function goblin(damage, speed) {
        return {
    
            id: "funky",
            require: [ "scale", "color" ],
    
            add() {
    
            },
    
            update() {
                this.move(player.pos.subt(his.pos).unit(), speed)
            },
            destroy() {
    
            },
    
            inspect() {
                return "I am a chunky goblin"
            },
        }
    }
    
    function entity() {
        return {
            id: "entity",
            require: [ "pos" ],
            update() {
                const spos = this.screenPos()
                if (
                    spos.x < 0 ||
                    spos.x > width() ||
                    spos.y < 0 ||
                    spos.y > height()
                ) {
                    // triggers a custom event when out
                    this.paused = true;
                    this.hidden = true;
                    this.trigger("out")
                } else {
                    this.paused = false
                    this.hidden = false
                }
            },
        }
    }
})