<template>
    <v-container fluid>
        <v-layout >
            <v-spacer></v-spacer>
                <v-card
                style="width: 500px; margin-top: 5%;"
                flat
                >
                <v-card-title
                class="title pb-4"
                >
                    Create Admin Account
                </v-card-title>
                <v-card-text
                >
                    <v-text-field
                    v-model="username"
                    outlined
                    color="blue darken-4"
                    placeholder="Username"
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="email"
                    outlined
                    color="blue darken-4"
                    placeholder="Email"
                    >
                    </v-text-field>
                    <v-text-field
                    v-model="password"
                    outlined
                    color="blue darken-4"
                    placeholder="Password"
                    :type="showPass ? 'text' : 'password'"
                    :append-icon="showPass ? 'visibility' : 'visibility_off'"
                    @click:append="showPass = !showPass"
                    >
                    </v-text-field>
                    <v-layout>
                        <v-btn
                        text  
                        outlined
                        color="blue darken-4"
                        height="50px"
                        @click='createAdmin'
                        >
                            Create Account
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                            <v-icon
                            v-on="on"
                            large
                            >help</v-icon>    
                            </template>
                            <span>Account creation is limited to McMaster Kinesiology graduate students.</span>
                            </v-tooltip>
                    </v-layout>
                </v-card-text>
            </v-card>
        <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>


<script>
import {validationMixin} from 'vuelidate';
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';


export default {
    mixins: [validationMixin],
    data () {
        return {
            // create account information
            showPass: false,
            username: '',
            email: '',
            password: '',
        }
    },
    validations: {
        email:{
            required,
            email,
        },
        password: {
            minLength: minLength(6),
            maxLength: maxLength(20),
        }
    },
       computed: {
         emailError(){
              const errors = [];
              if(!this.$v.email.$error){
                   return errors;
              }else{
                   errors.push('Please enter a valid email address.')
                   return errors;
              }
         },
         passwordError(){
              const errors = [];
              if(!this.$v.password.$error){
                   return errors;
              }else{
                   errors.push('Please enter a valid password between 6 and 20 characters.')
                   return errors;
              }
         },
    },
      methods: {
        createAdmin: function(){
            this.$axios.post('auth/admin/create', {
                name: this.name,
                email: this.email.toLowerCase(),
                password: this.password,
            })
            .then((res) => {
                if(typeof res.data.error === 'string'){
                    alert(res.data.error);
                    this.alertDialog = true;
                    this.alertText = res.data.error;
                    this.alertTitle = 'Error'
                }else if(res.data.error){
                    // alert('Invalid Form Input.')
                    this.alertDialog = true;
                    this.alertText = 'Invalid form input, please check all inputs are filled out correctly.';
                    this.alertTitle = 'Error'
                }else{
                    //clear fields
                    this.name = '';
                    this.email = '';
                    this.password = '';
                    // alert('Please check your email to confirm your account!');
                    this.alertDialog = true;
                    this.alertText = 'Please check your email to confirm your account.';
                    this.alertTitle = 'Success!'
                    setTimeout(this.$router.push('/login'), 2500); //delay redirect for 2.5 second to give user time to read
                }              
            }).catch((e)  =>  {
                console.log(e);
            })
        }
    },
}
</script>