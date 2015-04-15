import $ = require("jquery");

export enum Overbounce {
    None,
    Fall,
    Jump
}

export class OverbounceCalculator {
    private $minHeight: any;
    private $maxHeight: any;
    private $fallObs: any;
    private $jumpObs: any;

    constructor(public gravity: number, public pmove_msec: number) {
        this.$minHeight = $("#minimum-height");
        this.$maxHeight = $("#maximum-height");
        this.$fallObs = $("#fall-ob-heights");
        this.$jumpObs = $("#jump-ob-heights");

        this.run();
    }

    run() {
        this.$minHeight.change(this.calculateOverbounces);
        this.$maxHeight.change(this.calculateOverbounces);
        this.calculateOverbounces();
    }

    calculateOverbounces=() => {
        var i, max;
        this.$fallObs.text("");
        this.$jumpObs.text("");


        for (i = parseInt(this.$minHeight.val(), 10),
                 max = parseInt(this.$maxHeight.val(), 10); i <= max; i++) {
            var overbounceTypes = this.checkOverbounce(i);

            if (overbounceTypes.length > 0) {
                if (overbounceTypes.indexOf(Overbounce.Fall) !== -1) {
                    this.$fallObs.append(i + "</br>");
                }
                if (overbounceTypes.indexOf(Overbounce.Jump) !== -1) {
                    this.$jumpObs.append(i + "</br>");
                }
            }
        }
    }

    checkOverbounce(height: number, gravity?: number, pmove_msec?:number): Array<Overbounce> {
        var psec = pmove_msec ? pmove_msec / 1000 : this.pmove_msec / 1000,
            gravity = gravity ? gravity : this.gravity,
            v0 = 0,
            h0 = height,
            rintv = Math.round(gravity * psec),
            t = 0,
            a,
            b,
            c,
            n2,
            n,
            hn,
            overbounceTypes = [];

        // Fall OB
        a = -psec * rintv / 2;
        b = psec * (v0 - gravity * psec / 2 + rintv / 2);
        c = h0 - t;
        n2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        n  = Math.floor(n2);
        hn = h0 + psec * n * (v0 - gravity * psec / 2 - (n - 1) * rintv / 2);

        if (n && hn < t + 0.25 && hn > t) {
            overbounceTypes.push(Overbounce.Fall);
        }

        // Jump OB

        v0 += 270; // JUMP_VELOCITY
        b   = psec * (v0 - gravity * psec / 2 + rintv / 2);
        // n1 = (-b + sqrt(b * b - 4 * a * c ) ) / (2 * a);
        n2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
        //CG_Printf("%f, %f\n", n1, n2);

        n  = Math.floor(n2);
        hn = h0 + psec * n * (v0 - gravity * psec / 2 - (n - 1) * rintv / 2);
        //CG_Printf("h0: %f, v0: %f, n: %d, hn: %f, t: %f\n", h0, v0, n, hn, t);
        if (hn < t + 0.25 && hn > t) {
            overbounceTypes.push(Overbounce.Jump);
        }

        return overbounceTypes;
    }
}