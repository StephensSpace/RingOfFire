export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] 
    public currentPlayer: number = 0;

    constructor() {
        for (let i=1; i <= 13; i++) {
            this.stack.push('ace_' + i)
            this.stack.push('clubs_' + i)
            this.stack.push('diamonds_' + i)
            this.stack.push('hearts_' + i)
            
        };
        this.shuffle(this.stack);
        this.playedCard = [];
    }

    toJson() {
        return {
          players: this.players,
          stack: this.stack,
          playedCard: this.playedCard,
          currentPlayer: this.currentPlayer
        }
      }

    shuffle(array: string[]) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }
}