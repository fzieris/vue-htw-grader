import AllGrades from './AllGrades.vue';

export default {
    // Diese Eigenschaften werden von "außen" gesetzt, mehr braucht die
    // Komponente aber nicht um autark zu funktionieren.
    props: {
        maxExercisePoints: {
            type: Number,
            default: 100
        },
        maxBonusPoints: {
            type: Number,
            default: 0
        },
        examPoints: {
            type: Number,
            default: 90
        }
    },
    data() {
        return {
            regularPoints: this.maxExercisePoints,
            bonusPoints: 0
        }
    },
    components: { AllGrades },
    computed: {
        /**
         * zwischen 0 und maxExercisePoints
         */
        exercisePoints: function () {
            return Math.max(Math.min(this.regularPoints + this.bonusPoints, this.maxExercisePoints), 0);
        },
        /**
         * zwischen 0 und 100
         */
        exercisePercentage: function () {
            return this.exercisePoints / this.maxExercisePoints * 100;
        },
        /**
         * zwischen 1.0 und 5.0
         */
        exerciseGrade: function() {
            return this.percentageToMark(this.exercisePercentage);
        },
        /**
         * zwischen 0 und 100
         */
        examPercentage: function() {
            return this.examPoints / 90 * 100;
        },
        /**
         * zwischen 1.0 und 5.0
         */
        examGrade: function() {
            return this.percentageToMark(this.examPercentage);
        },
        /**
         * gemittelte Note, nach zwei Nachkommastellen abgeschnitten
         */
        totalRaw: function() {
            return this.calcRawAverage(this.examGrade, this.exerciseGrade);
        },
        /**
         * Gesamtnote auf Notenskala gerundet (bessere Note falls zwischen zwei Boten)
         */
        total: function() {
            return this.calcRoundedAverage(this.examGrade, this.exerciseGrade);
        }
    },
    methods: {
        /**
         * Berechnet Note (1.0 bis 5.0) aus Prozentsatz
         */
        percentageToMark: function (p) {
            if (p === 100) { return '1.0'; }
            if (p < 50) { return '5.0'; }

            let diff = 100-p;
            let steps = Math.ceil(diff / 5) - 1;
            let raw_mark = 1 + steps / 3;
            return raw_mark.toFixed(1);
        },
        /**
         * Ermittelt sprachlichen Ausdruck für Note (1.0 bis 5.0)
         */
        markToText: function (mark) {
            let markTexts = {
                1 : 'sehr gut',
                2 : 'gut',
                3 : 'befriedigend',
                4 : 'ausreichend',
                5 : 'nicht ausreichend'
            };
            return markTexts[Math.round(mark)];
        },
        /**
         * mittelt Noten, schneidet ab nach zwei Nachkommastellen
         */
        calcRawAverage: function(a, b) {
            let avgRaw = a * 0.5 + b * 0.5;
            return avgRaw.toFixed(3).substr(0, 4);
        },
        /**
         * mittelt Noten gemäß Notenskala (bessere Note falls zwischen zwei Noten)
         */
        calcRoundedAverage: function(a, b) {
            let raw = this.calcRawAverage(a, b);
            return (raw <= 4) ? (Math.floor(Math.round(raw * 6)/2)/3).toFixed(1) : '5.0';
        }
    }
}
