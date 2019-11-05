<template>
    <v-container fluid>
        <v-layout >
            <v-spacer></v-spacer>
                <v-card
                style="width: 300px; margin-top: 5%;"
                flat
                >
                <v-card-title
                class="title pb-4"
                >
                    Administrator Login
                </v-card-title>
                <v-card-text
                >
                    <v-text-field
                    name="username"
                    v-model="username"
                    label="Username"
                    outlined
                    color="blue darken-4"
                    required
                    >
                    </v-text-field>
                    <v-text-field
                    name="password"
                    :type="showPass1 ? 'text' : 'password'"
                    :append-icon="showPass1 ? 'visibility' : 'visibility_off'"
                    @click:append="showPass1 = !showPass1"
                    v-model="password"
                    :error-messages="passwordError"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    color="blue darken-4"
                    label="Password"
                    outlined
                    required
                    >
                    </v-text-field>
                    <v-btn
                    text 
                    block 
                    outlined
                    color="blue darken-4"
                    height="55px"
                    v-on:click='login'
                    >
                        Login
                    </v-btn>
                </v-card-text>
            </v-card>
        <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>


<script>
import { required, minLength, maxLength, email, url } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    data () {
        return {
            username: '',
            password: '',
            showPass1: false,
        }
    },
    computed: {
        passwordError(){
            const errors = [];
            if(!this.$v.password.$error){
                return errors;
            }else{
                errors.push('Please enter a valid password between 6 and 20 characters.')
                return errors;
            }
        },
     admin(){
        return this.$store.getters['auth/getAdmin'];
      },
    },
    mixins: [validationMixin],
    validations: {
        password:{
            required,
            minLength: minLength(6),
            maxLength: maxLength(20),
        }
    },
    fetch({store, redirect})    {
    },
     methods: {
        login: async function(event) {
                    this.$store.dispatch('auth/login', {username: this.username, password: this.password}).then((res)    =>  {
                        this.$router.push('/admin/manageClass'); //push to browse on successful login
                    }).catch((err)   =>  {
                        //the error object is appending Mongoose Error to it so this seems to be the easiest fix for now
                        let error = String(err);
                        if(error.includes('noAdmin')){
                           alert('There are no admin accounts with those credentials') 
                        }else{
                          alert('An unexpected error has occured, please contact the system administrator.')
                        }
                        
                    })     
               }
    },
}
</script>