<template>
<div>
<NavBar/>
<v-row>
  <v-col>
    <img class= "logo" src="../assets/Gargi.jpg">
  </v-col>
  <v-col>
    <h2>Welcome to our Payment Portal</h2>
    <div class="intro">
      <ul>
        Types of Payment accepted here:
        <li class="m-2">Credit Card</li>
        <li class="m-2">Debit Card</li>
        <li class="m-2">Banking</li>
      </ul>
    </div>
    </v-col>
</v-row>

</div>
</template>

<script>
import NavBar from '../components/Navbar'
export default {
  components: {
    NavBar
  }
}

</script>

<style>
.intro{
  margin: 100px 100px;
}
.logo{
  margin:20% 30%;
  width:50%;
  height:50%;
  border:2px solid pink;
  border-radius: 3.5rem;
}
</style>
