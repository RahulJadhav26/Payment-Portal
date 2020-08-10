<template>
<div>
<NavBar/>
<h2>Welcome to our Payment Portal</h2>
    <div class="intro">
      <ul>
        Types of Payment accepted here:
        <li class="m-2">Netbanking</li>
        <li class="m-2">UPI</li>
        <li class="m-2">Paytm</li>
        <li class="m-2">Credit Card</li>
        <li class="m-2">Debit Card</li>
        <li class="m-2">Banking</li>
      </ul>
    </div>
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
