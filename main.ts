info.player1.onScore(1, function () {
    pause(100)
    end = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    scene.centerCameraAt(0, 0)
    tiles.setCurrentTilemap(tilemap`level6`)
    game.splash("Red player wins!")
    pause(500)
    game.reset()
})
sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    if (!(end)) {
        reprize = sprites.create(assets.image`myImage0`, SpriteKind.Food)
        prizeLoc.push(newPrizeLoc(prizeLoc))
        tiles.placeOnTile(reprize, prizeLoc.pop())
    }
})
function newPrizeLoc (list: tiles.Location[]) {
    pathTiles = [tiles.getTilesByType(assets.tile`myTile`)]
    prizePosHolder = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    while (true) {
        col = randint(0, 23)
        row = randint(0, 17)
        tiles.placeOnTile(prizePosHolder, tiles.getTileLocation(col, row))
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(col, row), assets.tile`myTile`)) {
            if (prizePosHolder.tilemapLocation() != p1.tilemapLocation() && prizePosHolder.tilemapLocation() != p2.tilemapLocation()) {
                count2 = 0
                for (let value of list) {
                    if (value == prize.tilemapLocation()) {
                        count2 += 1
                    }
                }
                if (count2 == 0) {
                    return prizePosHolder.tilemapLocation()
                }
            }
        }
    }
}
function locPossibilities () {
    adjLoc = []
    currentLoc = cursor.tilemapLocation()
    if (currentLoc.row > 0 && cursor.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column, currentLoc.row - 1))
    }
    if (currentLoc.row < 14 && cursor.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column, currentLoc.row + 1))
    }
    if (currentLoc.column > 0 && cursor.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column - 1, currentLoc.row))
    }
    if (currentLoc.column < 18 && cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column + 1, currentLoc.row))
    }
    return adjLoc
}
info.player2.onScore(1, function () {
    pause(1000)
    end = true
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Food)
    scene.centerCameraAt(0, 0)
    tiles.setCurrentTilemap(tilemap`level4`)
    game.splash("Blue player wins!")
    pause(500)
    game.reset()
})
function createMaze () {
    tiles.setCurrentTilemap(tilemap`level1`)
    cursor = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    tiles.placeOnTile(cursor, tiles.getTileLocation(0, 0))
    visitLoc = [cursor.tilemapLocation()]
    while (visitLoc.length > 0) {
        currentTile = visitLoc.pop()
        tiles.placeOnTile(cursor, currentTile)
        tiles.setTileAt(currentTile, assets.tile`myTile`)
        possibleLocs = locPossibilities()
        temp = cursor.tilemapLocation()
        while (possibleLocs.length > 0) {
            tiles.placeOnTile(cursor, possibleLocs.removeAt(randint(0, possibleLocs.length - 1)))
            count = 0
            if (cursor.tileKindAt(TileDirection.Top, assets.tile`myTile`)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Bottom, assets.tile`myTile`)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Left, assets.tile`myTile`)) {
                count += 1
            }
            if (cursor.tileKindAt(TileDirection.Right, assets.tile`myTile`)) {
                count += 1
            }
            if (count == 1) {
                visitLoc.push(temp)
                visitLoc.push(cursor.tilemapLocation())
                break;
            }
        }
    }
    wallTiles = tiles.getTilesByType(assets.tile`transparency16`)
    for (let wallTile of wallTiles) {
        tiles.setTileAt(wallTile, assets.tile`myTile0`)
        tiles.setWallAt(wallTile, true)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 500)
    if (sprite == p1) {
        info.player1.changeScoreBy(1)
    } else {
        info.player2.changeScoreBy(1)
    }
})
let wallTiles: tiles.Location[] = []
let count = 0
let temp: tiles.Location = null
let possibleLocs: tiles.Location[] = []
let currentTile: tiles.Location = null
let visitLoc: tiles.Location[] = []
let cursor: Sprite = null
let currentLoc: tiles.Location = null
let adjLoc: tiles.Location[] = []
let count2 = 0
let row = 0
let col = 0
let prizePosHolder: Sprite = null
let pathTiles: tiles.Location[][] = []
let reprize: Sprite = null
let prizeLoc: tiles.Location[] = []
let prize: Sprite = null
let p2: Sprite = null
let p1: Sprite = null
let end = false
tiles.setCurrentTilemap(tilemap`level7`)
end = false
game.splash("Find 5 potions to win!")
info.player1.setScore(0)
info.player2.setScore(0)
p1 = sprites.create(assets.image`redPlayer`, SpriteKind.Player)
controller.moveSprite(p1)
p1.setStayInScreen(true)
p2 = sprites.create(assets.image`bluePlayer`, SpriteKind.Player)
controller.player2.moveSprite(p2)
p2.setStayInScreen(true)
let cam = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
scene.cameraFollowSprite(cam)
createMaze()
tiles.placeOnTile(p1, tiles.getTileLocation(0, 0))
tiles.placeOnTile(p2, tiles.getTileLocation(0, 0))
prize = sprites.create(assets.image`myImage0`, SpriteKind.Food)
tiles.placeOnTile(prize, tiles.getTileLocation(0, 0))
prizeLoc = [prize.tilemapLocation()]
tiles.placeOnTile(prize, newPrizeLoc(prizeLoc))
prizeLoc.push(prize.tilemapLocation())
game.onUpdate(function () {
    cam.setPosition((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
})
