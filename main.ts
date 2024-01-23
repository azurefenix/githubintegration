function locPossibilities () {
    adjLoc = []
    currentLoc = cursor.tilemapLocation()
    if (currentLoc.row > 0 && cursor.tileKindAt(TileDirection.Top, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column, currentLoc.row - 1))
    }
    if (currentLoc.row < 35 && cursor.tileKindAt(TileDirection.Bottom, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column, currentLoc.row + 1))
    }
    if (currentLoc.column > 0 && cursor.tileKindAt(TileDirection.Left, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column - 1, currentLoc.row))
    }
    if (currentLoc.column < 35 && cursor.tileKindAt(TileDirection.Right, assets.tile`transparency16`)) {
        adjLoc.push(tiles.getTileLocation(currentLoc.column + 1, currentLoc.row))
    }
    return adjLoc
}
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
let wallTiles: tiles.Location[] = []
let count = 0
let temp: tiles.Location = null
let possibleLocs: tiles.Location[] = []
let currentTile: tiles.Location = null
let visitLoc: tiles.Location[] = []
let cursor: Sprite = null
let currentLoc: tiles.Location = null
let adjLoc: tiles.Location[] = []
let score1 = 0
let score2 = 0
createMaze()
let p1 = sprites.create(img`
    e e e . . . . e e e . . . . 
    c d d c . . c d d c . . . . 
    c b d d f f d d b c . . . . 
    c 3 b d d b d b 3 c . . . . 
    f b 3 d d d d 3 b f . . . . 
    e d d d d d d d d e . . . . 
    e d f d d d d f d e . b f b 
    f d d f d d f d d f . f d f 
    f b d d b b d d 2 f . f d f 
    . f 2 2 2 2 2 2 b b f f d f 
    . f b d d d d d d b b d b f 
    . f d d d d d b d d f f f . 
    . f d f f f d f f d f . . . 
    . f f . . f f . . f f . . . 
    `, SpriteKind.Player)
p1.setPosition(7, 7)
let p2 = sprites.create(img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `, SpriteKind.Player)
p2.setPosition(153, 113)
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
game.onUpdate(function () {
    cam.setPosition((p1.x + p2.x) / 2, (p1.y + p2.y) / 2)
})
