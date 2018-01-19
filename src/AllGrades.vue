<!-- Das ist Tabelle mit allen möglichen Noten-Kombinationen -->
<template>
  <table class="table table-bordered table-condensed">
    <tbody>
      <tr>
        <th>&nbsp;</th>
        <th scope="col" v-for="k in 11" v-bind:class="isExam(k)">
          {{ grade(k) }}
        </th>
      </tr>
      <tr v-for="u in 11">
        <th scope="row" v-bind:class="isExercise(u)">
          {{ grade(u) }}
        </th>
        <td v-for="k in 11" v-bind:class="[isExam(k), isExercise(u)]">
          {{ totalGrade(grade(u), grade(k)) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script src="./AllGrades.js"></script>

<style lang="scss" scoped>
  @import "variables";

  table {
    font-size: 0.75em;
  }

  td, th {
    background-color: white;
    text-align: center;
  }
  th {
    &.exercise { background-color: $exercise }
    &.exam     { background-color: $exam }
  }
  td {
    &.exercise, &.exam { background-color: lighten($total, 12%) }
    &.exercise.exam    { background-color: $total }
  }
</style>
