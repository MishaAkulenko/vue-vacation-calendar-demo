<template>
    <main  class="login-page flex-column">
        <LocalisationSelector></LocalisationSelector>
        <div class="form-wrapper">
            <header>
                <div class="flex-center title">
                    <h1>Yellow Duck</h1>
                    <img class='logo' src="../assets/img/logo.png"  alt="logo"/>
                </div>
                <h4>{{'auth.vacation_manager' | translate}}</h4>
            </header>
            <form>
                <BaseInput v-focus
                           @onEnter="validateForm"
                           v-model.trim="loginData.login"
                           :error="errors.login">
                    {{'auth.enter_login' | translate}}
                </BaseInput>
                <BaseInput type="password"
                           @onEnter="validateForm"
                           v-model.trim="loginData.password"
                           :error="errors.password">
                    {{'auth.enter_password' | translate}}
                </BaseInput>
                <div class="button-wrapper">
                    <BaseButton @click="validateForm" :processing="requestIsActive">{{'auth.login' | translate}}</BaseButton>
                </div>
            </form>
            <div class="help">
                <q>{{'auth.prompt' | translate}}</q>
            </div>
        </div>
    </main>

</template>

<script>
    import {mapActions} from 'vuex';
   import {forEach} from 'lodash';

   import LocalisationSelector from '../components/LocalisationSelectorComponent.vue'

    export default {
        name: "LoginPage",
        components:{
            LocalisationSelector
        },
        data(){
            return {
                requestIsActive: false,
                loginData:{
                    login: '',
                    password: '',
                },
                errors: {
                    login: '',
                    password: '',
                }
            }
        },
        computed:{
            formHasErrors(){
                return  Object.values(this.errors).some(err => err.length)
            }
        },
        methods:{
            ...mapActions('auth', ['DO_LOGIN']),
            validateForm(){
                if (this.requestIsActive) return;
                this.formHasErrors && this.clearErrors();

                const {login, password} = this.loginData,
                    emptyFieldErrText = 'Поле не может быть пустым';

                if (!login.length) this.setError('login', emptyFieldErrText);
                if (!password.length) this.setError('password', emptyFieldErrText);

                if(this.formHasErrors) return;

                this.doLogin();
            },
            setError(field, text){
                this.errors[field] = text;
            },
            clearErrors(){
                forEach(this.errors, (val, prop, obj) => obj[prop] = '')
            },
            doLogin(){
                this.requestIsActive = true;
                const {login, password} = this.loginData;

                this.DO_LOGIN({
                    login,
                    password,
                }).then(()=>{
                    this.$router.push({name: 'dashboard'})
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .login-page {
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        .form-wrapper {
            width: 100%;
            max-width: 400px;
            height: 470px;
            border: 1px solid #afc7da;
            padding: 40px 35px 15px;
            border-radius: 5px;
            position: relative;

            header {
                .title  {
                    justify-content: flex-start;
                }
                h1 {
                    font-size: 35px;
                    font-weight: 800;
                    margin: 0;
                }
                h4 {
                    margin: 5px;
                    color: #afc7da;
                }
                .logo {
                    height: 40px;
                    margin-top: -5px;
                }
            }
            form {
                margin-top: 40px;

                .button-wrapper {
                    display: flex;
                    justify-content: flex-end;
                }

            }
        }

    }
    .help {
        font-size: 12px;
        color: #424242;
        position: absolute;
        bottom: -30px;
        left: 0;
    }
    ::v-deep .localisation-selector {
        position: fixed;
        top: 50px;
        right: 100px;
    }
</style>
