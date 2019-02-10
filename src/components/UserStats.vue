<template>
<table>
  <tbody>
    <tr>
      <td class="status" colspan="2">{{ current.status }}</td>
    </tr>
    <tr>
      <td>Scen</td>
      <td>{{ current.scenario ? current.scenario.name : '-' }}</td>
    </tr>
    <tr>
      <td>Time:</td>
      <td>+ {{ current.minutesPassed }}</td>
    </tr>
    <tr>
      <td>Loc:</td>
      <td>{{ !! current.location ? current.location.name : '-' }}</td>
    </tr>
    <tr>
      <td>Per:</td>
      <td>{{ !! current.person ? current.person.name : '-' }}</td>
    </tr>
    <tr></tr>
    <tr>
      <td class="heading" colspan="2">Current Interaction</td>
    </tr>
    <tr>
      <td colspan="2" v-if="current.interactions && current.interactions.length">
        {{ current.interactions[0] }}
        {{ current.interactionContentIndex + 1 }} / {{ current.interactionContent.length }}
      </td>
      <td colspan="2" v-else>
        None
      </td>
    </tr>
    <tr v-if="current.triggers && current.triggers.length">
      <td colspan="2" >Triggers</td>
    </tr>
    <tr v-for="(trigger, index) in current.triggers" :key="index">
      <td>@ {{ trigger.triggeredAt }}</td>
      <td >{{ trigger.label }}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      'current'
    ])
  }
}

</script>

<style>
table, tbody, tr, td {
  color: white;
  border: 1px solid white;
  padding: 3px;
  margin: 0;
}
table {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0;
}
</style>