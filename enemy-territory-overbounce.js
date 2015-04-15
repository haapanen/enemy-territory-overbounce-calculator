define(["require", "exports", "jquery"], function (require, exports, $) {
    (function (Overbounce) {
        Overbounce[Overbounce["None"] = 0] = "None";
        Overbounce[Overbounce["Fall"] = 1] = "Fall";
        Overbounce[Overbounce["Jump"] = 2] = "Jump";
    })(exports.Overbounce || (exports.Overbounce = {}));
    var Overbounce = exports.Overbounce;
    var OverbounceCalculator = (function () {
        function OverbounceCalculator(gravity, pmove_msec) {
            var _this = this;
            this.gravity = gravity;
            this.pmove_msec = pmove_msec;
            this.calculateOverbounces = function () {
                var i, max;
                _this.$fallObs.text("");
                _this.$jumpObs.text("");
                for (i = parseInt(_this.$minHeight.val(), 10), max = parseInt(_this.$maxHeight.val(), 10); i <= max; i++) {
                    var overbounceTypes = _this.checkOverbounce(i);
                    if (overbounceTypes.length > 0) {
                        if (overbounceTypes.indexOf(1 /* Fall */) !== -1) {
                            _this.$fallObs.append(i + "</br>");
                        }
                        if (overbounceTypes.indexOf(2 /* Jump */) !== -1) {
                            _this.$jumpObs.append(i + "</br>");
                        }
                    }
                }
            };
            this.$minHeight = $("#minimum-height");
            this.$maxHeight = $("#maximum-height");
            this.$fallObs = $("#fall-ob-heights");
            this.$jumpObs = $("#jump-ob-heights");
            this.run();
        }
        OverbounceCalculator.prototype.run = function () {
            this.$minHeight.change(this.calculateOverbounces);
            this.$maxHeight.change(this.calculateOverbounces);
            this.calculateOverbounces();
        };
        OverbounceCalculator.prototype.checkOverbounce = function (height, gravity, pmove_msec) {
            var psec = pmove_msec ? pmove_msec / 1000 : this.pmove_msec / 1000, gravity = gravity ? gravity : this.gravity, v0 = 0, h0 = height, rintv = Math.round(gravity * psec), t = 0, a, b, c, n2, n, hn, overbounceTypes = [];
            // Fall OB
            a = -psec * rintv / 2;
            b = psec * (v0 - gravity * psec / 2 + rintv / 2);
            c = h0 - t;
            n2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
            n = Math.floor(n2);
            hn = h0 + psec * n * (v0 - gravity * psec / 2 - (n - 1) * rintv / 2);
            if (n && hn < t + 0.25 && hn > t) {
                overbounceTypes.push(1 /* Fall */);
            }
            // Jump OB
            v0 += 270; // JUMP_VELOCITY
            b = psec * (v0 - gravity * psec / 2 + rintv / 2);
            // n1 = (-b + sqrt(b * b - 4 * a * c ) ) / (2 * a);
            n2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
            //CG_Printf("%f, %f\n", n1, n2);
            n = Math.floor(n2);
            hn = h0 + psec * n * (v0 - gravity * psec / 2 - (n - 1) * rintv / 2);
            //CG_Printf("h0: %f, v0: %f, n: %d, hn: %f, t: %f\n", h0, v0, n, hn, t);
            if (hn < t + 0.25 && hn > t) {
                overbounceTypes.push(2 /* Jump */);
            }
            return overbounceTypes;
        };
        return OverbounceCalculator;
    })();
    exports.OverbounceCalculator = OverbounceCalculator;
});
//# sourceMappingURL=enemy-territory-overbounce.js.map