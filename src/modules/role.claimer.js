// 要占领房间的 creep
const creep123 = Game.creeps['claimer']
// 要占领的房间
const room = Game.rooms['W38N46']
// 如果该房间不存在就先往房间走
if (!room) {
    creep123.moveTo(new RoomPosition(25, 25, 'W38N46'), { reusePath: 50 })
}
else {
    // 如果房间存在了就说明已经进入了该房间
    // 移动到房间的控制器并占领
    if (creep123.claimController(room.controller) == ERR_NOT_IN_RANGE) {
        creep123.moveTo(room.controller)
    }
}