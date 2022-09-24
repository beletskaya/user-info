<template>
  <div class="header"></div>
  <div class="home">
    <div class="home__form">
      <div class="home__form__description">
        description
      </div>
      <div class="home__form__description__wrap">
        <p>description</p>
        <form>
          <div class="home__form__description__wrap-input">
            <input type="text" placeholder="Username" v-model="name" @keydown="isLetter($event)" required>
          </div>
          <div class="home__form__description__wrap-input">
            <input type="number" placeholder="Phone Number" v-model="phone" required>
          </div>
          <div class="home__form__description__wrap-input">
            <button @click.prevent="applyForm" :class="{'load': load}">Register</button>
          </div>
          <p v-if="loginError" class="home__form__description__wrap-error">Login error</p>
        </form>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      name: null,
      phone: null,
      loginError: false,
      load: false
    }
  },
  methods: {
    ...mapActions([
      'getUsers'
    ]),
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if(/^[A-Za-z\s]+$/.test(char)) return true;
      else e.preventDefault();
    },
    applyForm() {
      if(this.name && this.phone) {
        this.load = true
        this.loginError = false
        this.getUsers().then((result) => {
          result.forEach( (item) => {
            let number = item.phone
            if(number.indexOf('x') !== -1) {
              number = number.substring(0, number.indexOf('x'))
            }
            number = number.replace( /[^0-9]/g, '');
            if(Number(number) === this.phone && this.name.toLowerCase() === item.name.toLowerCase()) {
              this.$store.commit('CHANGE_LOCALSTORAGE_NAME', item.name);
              this.$router.replace('/users')
            } else {
              this.loginError = true
            }
          })
        })
        .catch(() => {
          this.loginError = true
        })
        .finally(() => {
          this.load = false
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .header, .footer {
    height: 60px;
    background-color: #474747;

  }
  .footer {
    height: 200px;
  }
  .home {
    background-color: #545454;

    &__form {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
      padding: 90px 0;

      &__description {
        padding: 15px;
        text-align: center;
        background-color: #a5a5a5;
        color: #5f5f5f;
        font-size: 20px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

        &__wrap {
          background-color: #c3c3c3;
          color: #5f5f5f;
          padding: 20px 25px 35px;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;

          p {
            padding-bottom: 10px;
          }

          &-input {

            input {
              width: 100%;
              padding: 13px 10px;
              font-size: 18px;
              box-sizing: border-box;
              border-radius: 5px;
              border: 0;
              margin-bottom: 10px;
              margin-top: 10px;
              &::-webkit-input-placeholder {
                color: #353535;
              }
              &::-moz-placeholder {
                color: #353535;
              }
              &:-ms-input-placeholder {
                color: #353535;
              }
              &:-moz-placeholder {
                color: #353535;
              }
            }

            button {
              width: 100%;
              margin-top: 20px;
            }
          }
          &-error {
            margin-top: 10px;
            color: red;
          }
        }
      }
    }
  }
</style>
