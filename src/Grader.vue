<!--
Vue-Komponente, die das Formular anzeigt (das meiste Markup ist für Bootstrap).
Die Stellen an denen Vue.js aktiv wird sind durch {{  }} und die HTML-Attribute
v-bind und v-model zu erkennen.
-->
<template>
  <div id="grader">
    <div class="col-sm-6">
      <h3 class="text-center">Übungsaufgaben</h3>
      <div class="form-horizontal">
        <div class="form-group ">
          <span class="col-xs-6 control-label">
            Reguläre Aufgaben
          </span>
          <div class="col-xs-6 input-group">
            <input class="form-control" type="number" required="required"
                   size="5" autofocus="autofocus" step=".5"
                   v-bind:max="maxExercisePoints"
                   v-model.number="regularPoints"/>
            <div class="input-group-addon">Punkte</div>
          </div>
        </div>

        <div class="form-group ">
          <span class="col-xs-6 control-label">
            Zusatzaufgaben
          </span>
          <div class="col-xs-6 input-group">
            <input class="form-control" type="number" required="required"
                   size="5" step=".5" min="0"
                   v-bind:max="maxBonusPoints"
                   v-model.number="bonusPoints"/>
            <div class="input-group-addon">Punkte</div>
          </div>
        </div>

        <div class="form-group">
          <span class="col-xs-6 control-label">
            Gesamtpunkte
            <small>(max.&nbsp;{{maxExercisePoints.toFixed(1)}})</small>
          </span>
          <div class="col-xs-6 form-control-static">
            {{ exercisePoints.toFixed(1) }}&nbsp;/&nbsp;{{maxExercisePoints.toFixed(1)}}&nbsp;=
            {{ exercisePercentage.toFixed(1) }} %
          </div>
        </div>
        <div class="form-group form-group-lg">
          <span class="col-xs-6 control-label">
            Note
            <span class="hidden-xs hidden-sm">Übungsaufgaben</span>
          </span>
          <div class="col-xs-6 form-control-static exercise">
            {{ exerciseGrade }} ({{ markToText(exerciseGrade) }})
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6">
      <h3 class="text-center">Klausur</h3>
      <div class="form-horizontal">
        <div class="form-group ">
          <span class="col-xs-6 control-label">
            Ergebnis
          </span>
          <div class="col-xs-6 input-group">
            <input type="number" required="required" size="5"
                   step=".5" min="0" max="100" class="form-control"
                   v-model.number="examPercentage"/>
            <div class="input-group-addon">%</div>
          </div>
        </div>

        <div class="form-group form-group-lg">
          <span class="col-xs-6 control-label">
            Note
            <span class="hidden-xs hidden-sm">Klausur</span>
          </span>
          <div class="col-xs-6 form-control-static exam">
            {{ examGrade }} ({{ markToText(examGrade) }})
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12">
      <h3 class="text-center">Modulnote</h3>
      <div class="form-horizontal">
        <div class="form-group">
          <div class="col-xs-6 control-label">
            Mittelwert
            <span class="help-block small">beschnitten auf zwei Nachkommastellen</span>
          </div>
          <div class="col-xs-6 form-control-static">
            &half; &times; <span class="exercise">{{ exerciseGrade }}</span> +
            &half; &times; <span class="exam">{{ examGrade }}</span> =
            <span class="total">{{ totalRaw }}</span>
          </div>
        </div>
        <div class="form-group form-group-lg">
          <div class="col-xs-6 control-label">Gerundet auf Notenskala</div>
          <div class="col-xs-6 total form-control-static">
            {{ total }} ({{ markToText(total) }})
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 text-center">
      <h3>Alle Notenkombinationen</h3>
      <!-- An dieser Stelle wird eine weitere Komponenten eingebunden,
           die die beiden Teilnoten und eine Funktion zur Notenermittlung
           übergeben bekommt -->
      <AllGrades v-bind:exam-grade="examGrade"
                 v-bind:exercise-grade="exerciseGrade"
                 v-bind:total-grade="calcRoundedAverage"></AllGrades>
    </div>
  </div>
</template>

<script src="./Grader.js"></script>

<style lang="scss">
  /* tweak Bootstrap */
  .form-control { font-size: 1.2em; }
  .form-control-static { text-align: left; }

  @import "variables";

  .exercise { background-color: $exercise }
  .exam     { background-color: $exam }
  .total    { background-color: $total }

  p.exercise, p.exam, p.total,
  div.exercise, div.exam, div.total {
    padding: 0 0.5em;
  }
  span.exercise, span.exam, span.total {
    padding: 0 0.3em;
  }
</style>
