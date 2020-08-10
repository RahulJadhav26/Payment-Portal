<template>
  <div>
      <NavBar/>
     <div>
         <h2 class="text-center">Payment</h2>
          <form class="PayeeDetails">
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="20"
      label="Name"
      clear-icon="mdi-close-circle"
      clearable
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      clear-icon="mdi-close-circle"
      clearable
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="amount"
      label="Amount"
      prefix="₹"
      required
      clear-icon="mdi-close-circle"
      clearable
      @blur="numberToWords"
    ></v-text-field>
    <p>{{words}}</p>
    <v-text-field
      v-model="phone"
      clear-icon="mdi-close-circle"
      clearable
      label="Phone number"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Check to Confirm"
      required
      :disabled='check'
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
    <v-btn class="mb-2" @click="submit1">Paytm/Netbanking/Upi</v-btn>
    <v-btn class="mr-2" @click="submit">Card Payment</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>

  </div>
  </div>
</template>

<script>
import NavBar from '../components/Navbar'
import payCred from '../services/payCred'
import sdev from '../config/StripeDev'
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import { loadStripe } from '@stripe/stripe-js'
import converter from 'number-to-words'
const stripePromise = loadStripe(sdev.pkey)

export default {
  mixins: [validationMixin],
  components: {
    NavBar
  },
  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },

  data: () => ({
    name: '',
    email: '',
    set: false,
    amount: 0,
    phone: '',
    select: null,
    checkbox: false,
    stripe: null,
    words: '',
    form: '',
    paytmParams: {}
  }),

  computed: {
    check () {
      if (isNaN(this.amount)) {
        return true
      } else {
        return false
      }
    },
    checkboxErrors () {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must Check the box to continue!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    }
  },
  methods: {
    async submit () {
      this.$v.$touch()
      if (this.checkbox === true && this.name && this.email && this.amount) {
        // alert(this.name + ' has successfully paid ' + this.amount + ' with registered email-id ' + this.email)
        const response = await payCred.pay({
          email: this.email,
          name: this.name,
          amount: this.amount
        })
        var sessionId = response.data.sessionId
        console.log(sessionId)
        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({
          sessionId
        })
        if (error) {
          alert(error.message)
        }
      }
    },
    async submit1 () {
      this.$v.$touch()
      if (this.checkbox === true && this.name && this.email && this.amount) {
        // alert(this.name + ' has successfully paid ' + this.amount + ' with registered email-id ' + this.email)
        // eslint-disable-next-line no-unused-vars
        const response = await payCred.paytmpay({
          email: this.email,
          name: this.name,
          amount: this.amount,
          phone: this.phone
        })
        this.paytmParams = await response.data
        console.log(this.paytmParams)
        var details = {
          action: 'https://securegw-stage.paytm.in/order/process',
          params: this.paytmParams
        }
        this.post(details)
      }
    },
    buildForm ({ action, params }) {
      console.log('building form....')
      const form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', action)

      Object.keys(params).forEach(key => {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', key)
        input.setAttribute('value', params[key])
        form.appendChild(input)
      })
      return form
    },
    post (details) {
      console.log('POSTING.......')
      const form = this.buildForm(details)
      document.body.appendChild(form)
      form.submit()
      form.remove()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.phone = ''
      this.amount = 0
      this.words = ''
      this.select = null
      this.checkbox = false
    },
    numberToWords () {
      this.amount = Number(this.amount)
      console.log(this.amount)
      if (Number.isInteger(this.amount)) {
        this.words = converter.toWords(this.amount) + ' Rupees Only'
      } else {
        this.checkbox = false
        this.words = 'Invalid Amount'
      }
    }
  }
}
</script>

<style>
.PayeeDetails{
    margin:50px 500px 100px 500px;
    padding: 50px;
    border: 1px solid Black;
    border-radius:3.5rem;

}
</style>
