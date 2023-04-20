//initalizeee the game
kaboom()

//create variables
const WOBBLESPEED = 1.5
const MAXWOBBLE = 8
const PLAYERSPEED = 100

//load the assets
loadBean()

loadRoot("/sprites")

loadSprite("0","tile_0000")
loadSprite("1","tile_0001")
loadSprite("2","tile_0002")
loadSprite("3","tile_0003")
loadSprite("4","tile_0004")
loadSprite("5","tile_0005")
loadSprite("6","tile_0006")
loadSprite("7","tile_0007")
loadSprite("8","tile_0008")
loadSprite("9","tile_0009")
loadSprite("ö","tile_0010")
loadSprite("ü","tile_0011")
loadSprite("ó","tile_0012")
loadSprite("q","tile_0013")
loadSprite("w","tile_0014")
loadSprite("e","tile_0015")
loadSprite("r","tile_0016")
loadSprite("t","tile_0017")
loadSprite("z","tile_0018")
loadSprite("u","tile_0019")
loadSprite("i","tile_0020")
loadSprite("o","tile_0021")
loadSprite("p","tile_0022")
loadSprite("ő","tile_0023")
loadSprite("ú","tile_0024")
loadSprite("ű","tile_0025")
loadSprite("a","tile_0026")
loadSprite("s","tile_0027")
loadSprite("d","tile_0028")
loadSprite("f","tile_0029")
loadSprite("g","tile_0030")
loadSprite("h","tile_0031")
loadSprite("j","tile_0032")
loadSprite("k","tile_0033")
loadSprite("l","tile_0034")
loadSprite("é","tile_0035")
loadSprite("á","tile_0036")
loadSprite("í","tile_0037")
loadSprite("y","tile_0038")
loadSprite("x","tile_0039")
loadSprite("c","tile_0040")
loadSprite("v","tile_0041")
loadSprite("b","tile_0042")
loadSprite("n","tile_0043")
loadSprite("m","tile_0044")
loadSprite(",","tile_0045")
loadSprite(".","tile_0046")
loadSprite("-","tile_0047")
loadSprite("§","tile_0048")
loadSprite("'","tile_0049")
loadSprite("\"","tile_0050")
loadSprite("+","tile_0051")
loadSprite("!","tile_0052")
loadSprite("%","tile_0053")
loadSprite("/","tile_0054")
loadSprite("=","tile_0055")
loadSprite("(","tile_0056")
loadSprite(")","tile_0057")
loadSprite("Ö","tile_0058")
loadSprite("Ü","tile_0059")
loadSprite("Ó","tile_0060")
loadSprite("Q","tile_0061")
loadSprite("W","tile_0062")
loadSprite("E","tile_0063")
loadSprite("R","tile_0064")
loadSprite("T","tile_0065")
loadSprite("Z","tile_0066")
loadSprite("U","tile_0067")
loadSprite("I","tile_0068")
loadSprite("O","tile_0069")
loadSprite("P","tile_0070")
loadSprite("Ő","tile_0071")
loadSprite("Ú","tile_0072")
loadSprite("Ű","tile_0073")
loadSprite("A","tile_0074")
loadSprite("S","tile_0075")
loadSprite("D","tile_0076")
loadSprite("F","tile_0077")
loadSprite("G","tile_0078")
loadSprite("H","tile_0079")
loadSprite("J","tile_0080")
loadSprite("K","tile_0081")
loadSprite("L","tile_0082")
loadSprite("É","tile_0083")
loadSprite("Á","tile_0084")
loadSprite("Í","tile_0085")
loadSprite("Y","tile_0086")
loadSprite("X","tile_0087")
loadSprite("C","tile_0088")
loadSprite("V","tile_0089")
loadSprite("B","tile_0090")
// loadSprite("N","tile_0091")
// loadSprite("M","tile_0092")
// loadSprite("M","tile_0093")
// loadSprite("","tile_0094")
// loadSprite("","tile_0095")
// loadSprite("","tile_0096")
// loadSprite("knight","tile_0097")
// loadSprite("","tile_0098")
// loadSprite("","tile_0099")

scene("game", () => {
    //make the player
    const player = add([
        sprite("bean"),
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
        rect(10, 50),
        pos(0, 0),
        anchor("bot"),
        area(),
        rotate(player.pos.angle(mousePos())),
        { duration: 0.1, attack: false, rotationoffset: 240, swing: 90 }
    ])

    //rotate it towards the mouse

    sword.onUpdate(() => {
        if (toWorld(mousePos()).x < player.pos.x) {
            if (sword.rotationoffset > 0) sword.rotationoffset *= -1
            sword.anchor = "top"
            if (sword.swing > 0) sword.swing *= -1
            sword.pos.x = - 10
        } else {
            console.log("negatif")
            if (sword.rotationoffset < 0) sword.rotationoffset *= -1
            if (sword.swing < 0) sword.swing *= -1
            sword.pos.x = 10
            sword.anchor = "bot"
        }
        sword.rotateTo((player.pos.angle(mousePos())) + sword.rotationoffset)
    })

    //do damage to objects colliding if attacking
    sword.onCollide("damageable", (obj) => {
        if (sword.attack) obj.hurt(1)
    })

    loop(2, () => {
        add([
            sprite("bean"),
            color(BLUE),
            pos(rand() * 500, rand() * 500),
            goblin(0, 50, 1),
            entity(),
            area(),
            health(3),
            "enemy",
            "damageable"
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
                    let duration = 1
                    let knockback = 22
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
                return "I am a chunky goblin"
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