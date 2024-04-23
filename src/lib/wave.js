export class Wave{
    constructor(amplitude, period, phase){
        this.amplitude = amplitude
        this.period = period
        this.phase = phase

    }

    calculate(x){
        return Math.sin(this.phase +( (2 * Math.PI * x) / this.period) )* this.amplitude
    }

    calculateAudio(x){
        return Math.sin(( (2 * Math.PI * x) / this.period) )
    }
}