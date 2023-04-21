//initalizeee the game
kaboom({scale:3, pixelPerfect: true})

//create variables
const WOBBLESPEED = 1.5
const MAXWOBBLE = 8
const PLAYERSPEED = 80

//load the assets
loadBean()

loadRoot("/sprites/")

loadSprite("0","tile_0000.png")
loadSprite("1","tile_0001.png")
loadSprite("2","tile_0002.png")
loadSprite("3","tile_0003.png")
loadSprite("4","tile_0004.png")
loadSprite("5","tile_0005.png")
loadSprite("6","tile_0006.png")
loadSprite("7","tile_0007.png")
loadSprite("8","tile_0008.png")
loadSprite("9","tile_0009.png")
loadSprite("ö","tile_0010.png")
loadSprite("ü","tile_0011.png")
loadSprite("ó","tile_0012.png")
loadSprite("q","tile_0013.png")
loadSprite("w","tile_0014.png")
loadSprite("e","tile_0015.png")
loadSprite("r","tile_0016.png")
loadSprite("t","tile_0017.png")
loadSprite("z","tile_0018.png")
loadSprite("u","tile_0019.png")
loadSprite("i","tile_0020.png")
loadSprite("o","tile_0021.png")
loadSprite("p","tile_0022.png")
loadSprite("ő","tile_0023.png")
loadSprite("ú","tile_0024.png")
loadSprite("ű","tile_0025.png")
loadSprite("a","tile_0026.png")
loadSprite("s","tile_0027.png")
loadSprite("d","tile_0028.png")
loadSprite("f","tile_0029.png")
loadSprite("g","tile_0030.png")
loadSprite("h","tile_0031.png")
loadSprite("j","tile_0032.png")
loadSprite("k","tile_0033.png")
loadSprite("l","tile_0034.png")
loadSprite("é","tile_0035.png")
loadSprite("á","tile_0036.png")
loadSprite("í","tile_0037.png")
loadSprite("y","tile_0038.png")
loadSprite("x","tile_0039.png")
loadSprite("c","tile_0040.png")
loadSprite("v","tile_0041.png")
loadSprite("b","tile_0042.png")
loadSprite("n","tile_0043.png")
loadSprite("m","tile_0044.png")
loadSprite(",","tile_0045.png")
loadSprite(".","tile_0046.png")
loadSprite("-","tile_0047.png")
loadSprite("§","tile_0048.png")
loadSprite("'","tile_0049.png")
loadSprite("\"","tile_0050.png")
loadSprite("+","tile_0051.png")
loadSprite("!","tile_0052.png")
loadSprite("%","tile_0053.png")
loadSprite("/","tile_0054.png")
loadSprite("=","tile_0055.png")
loadSprite("(","tile_0056.png")
loadSprite(")","tile_0057.png")
loadSprite("Ö","tile_0058.png")
loadSprite("Ü","tile_0059.png")
loadSprite("Ó","tile_0060.png")
loadSprite("Q","tile_0061.png")
loadSprite("W","tile_0062.png")
loadSprite("E","tile_0063.png")
loadSprite("R","tile_0064.png")
loadSprite("T","tile_0065.png")
loadSprite("Z","tile_0066.png")
loadSprite("U","tile_0067.png")
loadSprite("I","tile_0068.png")
loadSprite("O","tile_0069.png")
loadSprite("P","tile_0070.png")
loadSprite("Ő","tile_0071.png")
loadSprite("Ú","tile_0072.png")
loadSprite("Ű","tile_0073.png")
loadSprite("A","tile_0074.png")
loadSprite("S","tile_0075.png")
loadSprite("D","tile_0076.png")
loadSprite("F","tile_0077.png")
loadSprite("G","tile_0078.png")
loadSprite("H","tile_0079.png")
loadSprite("J","tile_0080.png")
loadSprite("K","tile_0081.png")
loadSprite("L","tile_0082.png")
loadSprite("É","tile_0083.png")
loadSprite("Á","tile_0084.png")
loadSprite("Í","tile_0085.png")
loadSprite("Y","tile_0086.png")
loadSprite("X","tile_0087.png")
loadSprite("C","tile_0088.png")
loadSprite("V","tile_0089.png")
loadSprite("B","tile_0090.png")
// loadSprite("N","tile_0091.png")
// loadSprite("M","tile_0092.png")
// loadSprite("M","tile_0093.png")
// loadSprite("","tile_0094.png")
// loadSprite("","tile_0095.png")
// loadSprite("","tile_0096.png")
loadSprite("knight","tile_0097.png")
loadSprite("sword","tile_0104.png")
loadSprite("Y","tile_111.png")

scene("game", () => {
    //make the player
    const player = add([
        sprite("knight"),
        area(),
        pos(center()),
        anchor("center"),
        rotate(0),
        health(7),
        //this tells us which direction to rotate in the walk anim(wobble)
        { wobbledir: 1, positionlastframe: vec2(0, 0), ctween: null}
    ])

    player.on("hurt", () => {
        debug.log(player.hp())
    })

    //make the sword
    const sword = player.add([
        sprite("sword"),
        pos(0, 5),
        anchor("bot"),
        area(),
        rotate(player.pos.angle(mousePos())),
        { duration: 0.1, attack: false, rotationoffset: 240, swing: 90 }
    ])

    sword.flipX = true

    //rotate it towards the mouse
    sword.onUpdate(() => {
        if (toWorld(mousePos()).x < player.pos.x) {
            if (sword.rotationoffset > 0) sword.rotationoffset *= -1
            sword.anchor = "top"
            if (sword.swing > 0) sword.swing *= -1
            sword.pos.x = -5
            sword.flipY = true
        } else {
            if (sword.rotationoffset < 0) sword.rotationoffset *= -1
            if (sword.swing < 0) sword.swing *= -1
            sword.pos.x = 5
            sword.anchor = "bot"
            sword.flipY = false
        }
        sword.rotateTo((player.pos.angle(mousePos())) + sword.rotationoffset)
    })

    //do damage to objects colliding if attacking
    sword.onCollideUpdate("damageable", (obj) => {
        if (sword.attack && !obj.damaged) {
            obj.hurt(1)
            obj.damaged = true
        }
    })

    loop(2, () => {
        add([
            sprite("C"),
            pos(rand() * 500, rand() * 500),
            goblin(0, 50, 1),
            entity(),
            area(),
            health(3),
            "enemy",
            "damageable",
            {damaged: false}
        ])
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
            easings.easeOutBouce,
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
                easings.linear,
            )
            wait(sword.duration, () => {
                sword.attack = false
                curTween.cancel()
                get("damageable").forEach((obj) => obj.damaged = false)
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

    player.onUpdate(() => {
        if (toWorld(mousePos()).x < player.pos.x) {
            player.flipX = true
        } else {
            player.flipX = false
        }
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

    function goblin(damage, speed, attackspeed) {
        let tweenCur = null
        let lastattack = time()
        return {

            id: "goblin",
            require: ["pos", "area"],

            add() {
                this.on("death", () => {
                    destroy(this)
                })
                this.on("hurt", () => {
                    let duration = 0.7
                    let knockback = 15
                    if (tweenCur) tweenCur.cancel()
                    tweenCur = tween(
                        this.pos,
                        this.pos.add((this.pos.sub(player.pos)).unit().scale(knockback)),
                        duration,
                        (val) => this.pos = val,
                        easings.easeOutExpo
                    )
                })
            },

            update() {
                if (this.isColliding(player)) {
                    //decrease player's health
                    if (time() - lastattack > attackspeed) {
                        lastattack = time()
                        player.hurt(damage)
                        let duration = 0.5
                        let knockback = 25
                        if (player.ctween) player.ctween.cancel()
                        ctween = tween(
                            player.pos,
                            player.pos.add((player.pos.sub(this.pos)).unit().scale(knockback)),
                            duration,
                            (val) => player.pos = val,
                            easings.easeOutExpo
                        )
                    }
                } else {
                    this.moveTo(player.pos, speed)
                }
            },

            inspect() {
                return "I am a chunky goblin"
            },
        }
    }    
    function goblin(damage, speed, attackspeed) {
        let tweenCur = null
        let lastattack = time()
        return {

            id: "goblin",
            require: ["pos", "area"],

            add() {
                this.on("death", () => {
                    destroy(this)
                })
                this.on("hurt", () => {
                    let duration = 0.7
                    let knockback = 15
                    if (tweenCur) tweenCur.cancel()
                    tweenCur = tween(
                        this.pos,
                        this.pos.add((this.pos.sub(player.pos)).unit().scale(knockback)),
                        duration,
                        (val) => this.pos = val,
                        easings.easeOutExpo
                    )
                })
            },

            update() {
                if (this.isColliding(player)) {
                    //decrease player's health
                    if (time() - lastattack > attackspeed) {
                        lastattack = time()
                        player.hurt(1)
                        let duration = 0.5
                        let knockback = 25
                        if (player.ctween) player.ctween.cancel()
                        ctween = tween(
                            player.pos,
                            player.pos.add((player.pos.sub(this.pos)).unit().scale(knockback)),
                            duration,
                            (val) => player.pos = val,
                            easings.easeOutExpo
                        )
                    }
                } else {
                    this.moveTo(player.pos, speed)
                }
            },
            destroy() {

            },

            inspect() {
                return "I am a sneaky wizard"
            },
        }
    }

    function entity() {
        return {
            id: "entity",
            require: ["pos"],
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
                } else {
                    this.paused = false
                    this.hidden = false
                }
            },
        }
    }
})

go("game")