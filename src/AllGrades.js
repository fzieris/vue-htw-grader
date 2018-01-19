export default {
    // Diese Eigenschaften werden von reingereicht, damit die Tabelle
    // die tatsächliche Notenkonfiguration durch CSS-Klassen hervorheben kann
    props: ['examGrade', 'exerciseGrade', 'totalGrade'],
    methods: {
        /**
         * ermittelt k-te Note; k=1 -> 1.0, k=2 -> 1.3, ...
         */
        grade: function(k) {
            return (k > 10) ? '5.0' : ((k+2)/3).toFixed(1);
        },
        /**
         * prüft ob in der Klausur die k-te Note erreicht wurde
         */
        isExam: function(k) {
            return (this.grade(k) === this.examGrade) ? 'exam' : '';
        },
        /**
         * prüft ob in der Übung die u-te Note erreicht wurde
         */
        isExercise: function(u) {
            return (this.grade(u) === this.exerciseGrade) ? 'exercise' : '';
        }
    }
}
