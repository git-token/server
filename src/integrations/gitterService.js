import Gitter from 'node-gitter'

export default function gitterService() {
  this.gitter = new Gitter(this.gitterToken)
  this.gitter.rooms.join(this.gitterRoomName).then((room) => {
    this.gitterRoom = room
  }).catch((error) => {
    console.log('Error connecting to Gitter Service')
  })
}
